import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

// ── Zod schemas ───────────────────────────────────────────────────────────
const CreateInventoryItemSchema = z.object({
  name: z.string().min(1).max(100),
  quantity: z.number().positive(),
  unit: z.string().min(1).max(20),
  costPerUnit: z.number().nonnegative(),
  category: z.string().min(1).max(50),
  expiresAt: z.string().datetime().optional(),
  notes: z.string().max(500).optional(),
});

const UpdateInventoryItemSchema = CreateInventoryItemSchema.partial();

const BatchImportSchema = z.object({
  items: z.array(CreateInventoryItemSchema).min(1).max(100),
});

type CreateInventoryItemInput = z.infer<typeof CreateInventoryItemSchema>;
type BatchImportInput = z.infer<typeof BatchImportSchema>;

// ── Route handler ─────────────────────────────────────────────────────────
export default async function inventoryRoutes(fastify: FastifyInstance) {
  // GET /api/inventory — list all items for the restaurant
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const restaurantId = (request as any).user?.restaurantId;

    const { data, error } = await fastify.supabase
      .from('inventory_items')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('created_at', { ascending: false });

    if (error) return reply.internalServerError(error.message);
    return data;
  });

  // POST /api/inventory — create a new item
  fastify.post<{ Body: CreateInventoryItemInput }>(
    '/',
    async (request, reply) => {
      const restaurantId = (request as any).user?.restaurantId;
      const parsed = CreateInventoryItemSchema.safeParse(request.body);

      if (!parsed.success) {
        return reply.badRequest(parsed.error.message);
      }

      const { data, error } = await fastify.supabase
        .from('inventory_items')
        .insert({ ...parsed.data, restaurant_id: restaurantId })
        .select()
        .single();

      if (error) return reply.internalServerError(error.message);
      return reply.code(201).send(data);
    }
  );

  // PUT /api/inventory/:id — update an item
  fastify.put<{ Params: { id: string }; Body: Partial<CreateInventoryItemInput> }>(
    '/:id',
    async (request, reply) => {
      const restaurantId = (request as any).user?.restaurantId;
      const parsed = UpdateInventoryItemSchema.safeParse(request.body);

      if (!parsed.success) {
        return reply.badRequest(parsed.error.message);
      }

      const { data, error } = await fastify.supabase
        .from('inventory_items')
        .update(parsed.data)
        .eq('id', request.params.id)
        .eq('restaurant_id', restaurantId)
        .select()
        .single();

      if (error) return reply.internalServerError(error.message);
      if (!data) return reply.notFound('Inventory item not found');
      return data;
    }
  );

  // DELETE /api/inventory/:id
  fastify.delete<{ Params: { id: string } }>(
    '/:id',
    async (request, reply) => {
      const restaurantId = (request as any).user?.restaurantId;

      const { error } = await fastify.supabase
        .from('inventory_items')
        .delete()
        .eq('id', request.params.id)
        .eq('restaurant_id', restaurantId);

      if (error) return reply.internalServerError(error.message);
      return reply.code(204).send();
    }
  );

  // POST /api/inventory/batch — bulk import
  fastify.post<{ Body: BatchImportInput }>(
    '/batch',
    async (request, reply) => {
      const restaurantId = (request as any).user?.restaurantId;
      const parsed = BatchImportSchema.safeParse(request.body);

      if (!parsed.success) {
        return reply.badRequest(parsed.error.message);
      }

      const items = parsed.data.items.map((item) => ({
        ...item,
        restaurant_id: restaurantId,
      }));

      const { data, error } = await fastify.supabase
        .from('inventory_items')
        .insert(items)
        .select();

      if (error) return reply.internalServerError(error.message);
      return reply.code(201).send({ inserted: data?.length ?? 0, items: data });
    }
  );
}
