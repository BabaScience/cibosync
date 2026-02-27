import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import sensible from '@fastify/sensible';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import plugins
import supabasePlugin from './plugins/supabase.js';
import authPlugin from './plugins/auth.js';

// Import routes
import inventoryRoutes from './routes/inventory.js';
import predictionsRoutes from './routes/predictions.js';
import whatsappRoutes from './routes/whatsapp.js';
import campaignsRoutes from './routes/campaigns.js';

const server = Fastify({
  logger: {
    level: process.env.LOG_LEVEL ?? 'info',
    transport:
      process.env.NODE_ENV === 'development'
        ? { target: 'pino-pretty', options: { colorize: true } }
        : undefined,
  },
});

// ── Register plugins ──────────────────────────────────────────────────────
await server.register(cors, {
  origin: process.env.WEB_URL ?? 'http://localhost:3000',
  credentials: true,
});

await server.register(helmet, { global: true });

await server.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
});

await server.register(sensible);
await server.register(supabasePlugin);
await server.register(authPlugin);

// ── Register routes ───────────────────────────────────────────────────────
await server.register(inventoryRoutes, { prefix: '/api/inventory' });
await server.register(predictionsRoutes, { prefix: '/api/predictions' });
await server.register(whatsappRoutes, { prefix: '/api/whatsapp' });
await server.register(campaignsRoutes, { prefix: '/api/campaigns' });

// ── Health check ──────────────────────────────────────────────────────────
server.get('/health', async () => ({
  status: 'ok',
  version: '0.1.0',
  timestamp: new Date().toISOString(),
}));

// ── Start server ──────────────────────────────────────────────────────────
const start = async () => {
  try {
    const port = parseInt(process.env.PORT ?? '3001', 10);
    await server.listen({ port, host: '0.0.0.0' });
    server.log.info(`CiboSync API running on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

// Graceful shutdown
const shutdown = async (signal: string) => {
  server.log.info(`Received ${signal}, shutting down gracefully...`);
  await server.close();
  process.exit(0);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

start();
