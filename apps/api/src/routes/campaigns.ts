import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { AIAgent } from '../services/ai-agent.js';
import { WhatsAppService } from '../services/whatsapp.js';
import { z } from 'zod';

const CreateCampaignSchema = z.object({
  name: z.string().min(1).max(100),
  targetSegment: z.enum(['all', 'vip', 'regulars', 'occasional']).default('regulars'),
  scheduledFor: z.string().datetime().optional(),
  inventoryItemIds: z.array(z.string().uuid()).optional(),
  customMessage: z.string().max(1000).optional(),
});

type CreateCampaignInput = z.infer<typeof CreateCampaignSchema>;

export default async function campaignsRoutes(fastify: FastifyInstance) {
  const aiAgent = new AIAgent();
  const whatsapp = new WhatsAppService();

  // GET /api/campaigns — list all campaigns
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const restaurantId = (request as any).user?.restaurantId;

    const { data, error } = await fastify.supabase
      .from('campaigns')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('created_at', { ascending: false });

    if (error) return reply.internalServerError(error.message);
    return data ?? [];
  });

  // POST /api/campaigns — create a new campaign
  fastify.post<{ Body: CreateCampaignInput }>(
    '/',
    async (request, reply) => {
      const restaurantId = (request as any).user?.restaurantId;
      const parsed = CreateCampaignSchema.safeParse(request.body);

      if (!parsed.success) return reply.badRequest(parsed.error.message);

      // 1. Get waste predictions for items
      const { data: predictions } = await fastify.supabase
        .from('waste_predictions')
        .select('*, inventory_items(*)')
        .eq('restaurant_id', restaurantId)
        .eq('prediction_date', new Date().toISOString().split('T')[0])
        .order('waste_probability', { ascending: false })
        .limit(5);

      // 2. Get target customers
      const customerQuery = fastify.supabase
        .from('customers')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .eq('opted_in_whatsapp', true);

      if (parsed.data.targetSegment !== 'all') {
        customerQuery.eq('segment', parsed.data.targetSegment);
      }

      const { data: customers } = await customerQuery.limit(200);

      if (!customers?.length) return reply.badRequest('No opted-in customers found');

      // 3. Generate AI message
      const aiMessage = parsed.data.customMessage ?? await aiAgent.generateCampaignMessage({
        restaurantId,
        predictions: predictions ?? [],
        customers,
        targetSegment: parsed.data.targetSegment,
      });

      // 4. Save campaign
      const { data: campaign, error } = await fastify.supabase
        .from('campaigns')
        .insert({
          restaurant_id: restaurantId,
          name: parsed.data.name,
          target_segment: parsed.data.targetSegment,
          message_template: aiMessage,
          status: parsed.data.scheduledFor ? 'scheduled' : 'draft',
          scheduled_for: parsed.data.scheduledFor,
          target_customer_count: customers.length,
          waste_item_ids: parsed.data.inventoryItemIds ?? [],
        })
        .select()
        .single();

      if (error) return reply.internalServerError(error.message);
      return reply.code(201).send(campaign);
    }
  );

  // POST /api/campaigns/:id/send — send a campaign
  fastify.post<{ Params: { id: string } }>(
    '/:id/send',
    async (request, reply) => {
      const restaurantId = (request as any).user?.restaurantId;

      // Fetch campaign
      const { data: campaign, error: campError } = await fastify.supabase
        .from('campaigns')
        .select('*')
        .eq('id', request.params.id)
        .eq('restaurant_id', restaurantId)
        .single();

      if (campError || !campaign) return reply.notFound('Campaign not found');
      if (campaign.status === 'sent') return reply.badRequest('Campaign already sent');

      // Fetch customers
      const customerQuery = fastify.supabase
        .from('customers')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .eq('opted_in_whatsapp', true);

      if (campaign.target_segment !== 'all') {
        customerQuery.eq('segment', campaign.target_segment);
      }

      const { data: customers } = await customerQuery.limit(200);
      if (!customers?.length) return reply.badRequest('No customers to send to');

      // Send messages
      let sent = 0;
      let failed = 0;
      const results = [];

      for (const customer of customers) {
        try {
          // Personalise message
          const personalizedMessage = campaign.message_template
            .replace('{name}', customer.first_name ?? 'Caro cliente')
            .replace('{restaurant}', campaign.restaurant_name ?? 'il nostro ristorante');

          await whatsapp.sendTextMessage(customer.phone, personalizedMessage);
          sent++;
          results.push({ customerId: customer.id, status: 'sent' });
        } catch (err) {
          failed++;
          results.push({ customerId: customer.id, status: 'failed', error: String(err) });
        }
      }

      // Update campaign status
      await fastify.supabase
        .from('campaigns')
        .update({
          status: 'sent',
          sent_at: new Date().toISOString(),
          sent_count: sent,
          failed_count: failed,
        })
        .eq('id', campaign.id);

      return { sent, failed, results };
    }
  );

  // GET /api/campaigns/:id/analytics
  fastify.get<{ Params: { id: string } }>(
    '/:id/analytics',
    async (request, reply) => {
      const restaurantId = (request as any).user?.restaurantId;

      const { data, error } = await fastify.supabase
        .from('campaign_analytics')
        .select('*')
        .eq('campaign_id', request.params.id)
        .eq('restaurant_id', restaurantId)
        .single();

      if (error) return reply.internalServerError(error.message);
      if (!data) return reply.notFound('Analytics not found');
      return data;
    }
  );
}
