import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { WhatsAppService } from '../services/whatsapp.js';

export default async function whatsappRoutes(fastify: FastifyInstance) {
  const whatsapp = new WhatsAppService();

  // GET /api/whatsapp/webhook — webhook verification (Meta)
  fastify.get('/webhook', async (request: FastifyRequest, reply: FastifyReply) => {
    const query = request.query as {
      'hub.mode': string;
      'hub.verify_token': string;
      'hub.challenge': string;
    };

    if (
      query['hub.mode'] === 'subscribe' &&
      query['hub.verify_token'] === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN
    ) {
      fastify.log.info('WhatsApp webhook verified');
      return reply.code(200).send(query['hub.challenge']);
    }

    return reply.code(403).send({ error: 'Forbidden' });
  });

  // POST /api/whatsapp/webhook — incoming messages
  fastify.post('/webhook', async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body as any;

    // Process incoming WhatsApp messages
    if (body.object === 'whatsapp_business_account') {
      for (const entry of body.entry ?? []) {
        for (const change of entry.changes ?? []) {
          if (change.field === 'messages') {
            const messages = change.value.messages ?? [];
            for (const message of messages) {
              await whatsapp.processIncomingMessage(message, change.value.metadata);
            }
          }
        }
      }
    }

    // Always return 200 to Meta
    return reply.code(200).send({ received: true });
  });

  // POST /api/whatsapp/send — manually send a message (testing)
  fastify.post<{ Body: { to: string; message: string } }>(
    '/send',
    async (request, reply) => {
      const { to, message } = request.body;
      const result = await whatsapp.sendTextMessage(to, message);
      return result;
    }
  );
}
