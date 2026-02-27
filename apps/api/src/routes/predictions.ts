import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { WastePredictor } from '../services/waste-predictor.js';
import { InventoryAnalyzer } from '../services/inventory-analyzer.js';

export default async function predictionsRoutes(fastify: FastifyInstance) {
  const predictor = new WastePredictor();
  const analyzer = new InventoryAnalyzer();

  // POST /api/predictions/run — trigger a new prediction for today
  fastify.post('/run', async (request: FastifyRequest, reply: FastifyReply) => {
    const restaurantId = (request as any).user?.restaurantId;

    // 1. Fetch today's inventory
    const { data: inventoryItems, error: invError } = await fastify.supabase
      .from('inventory_items')
      .select('*')
      .eq('restaurant_id', restaurantId);

    if (invError) return reply.internalServerError(invError.message);
    if (!inventoryItems?.length) return reply.badRequest('No inventory items found');

    // 2. Fetch historical patterns (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: historicalData } = await fastify.supabase
      .from('daily_summaries')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .gte('date', thirtyDaysAgo.toISOString().split('T')[0])
      .order('date', { ascending: false });

    // 3. Run waste prediction
    const predictions = await predictor.predict(inventoryItems, historicalData ?? []);

    // 4. Analyse and score
    const analysis = analyzer.analyze(inventoryItems, predictions);

    // 5. Save predictions to DB
    const predictionsToSave = predictions.map((p) => ({
      restaurant_id: restaurantId,
      inventory_item_id: p.itemId,
      predicted_waste_quantity: p.predictedWasteQuantity,
      waste_probability: p.wasteProbability,
      potential_loss: p.potentialLoss,
      recommended_discount: p.recommendedDiscount,
      prediction_date: new Date().toISOString().split('T')[0],
    }));

    const { data: savedPredictions, error: saveError } = await fastify.supabase
      .from('waste_predictions')
      .upsert(predictionsToSave, { onConflict: 'restaurant_id,inventory_item_id,prediction_date' })
      .select();

    if (saveError) fastify.log.error('Failed to save predictions:', saveError);

    return {
      predictions: savedPredictions ?? predictions,
      analysis,
      summary: {
        totalItemsAnalysed: inventoryItems.length,
        highRiskItems: predictions.filter((p) => p.wasteProbability > 0.7).length,
        estimatedTotalLoss: predictions.reduce((sum, p) => sum + p.potentialLoss, 0),
        recommendedCampaignValue: analysis.recommendedCampaignValue,
      },
    };
  });

  // GET /api/predictions/latest — get today's predictions
  fastify.get('/latest', async (request: FastifyRequest, reply: FastifyReply) => {
    const restaurantId = (request as any).user?.restaurantId;
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await fastify.supabase
      .from('waste_predictions')
      .select('*, inventory_items(*)')
      .eq('restaurant_id', restaurantId)
      .eq('prediction_date', today)
      .order('waste_probability', { ascending: false });

    if (error) return reply.internalServerError(error.message);
    return data ?? [];
  });

  // GET /api/predictions/history — past predictions
  fastify.get('/history', async (request: FastifyRequest, reply: FastifyReply) => {
    const restaurantId = (request as any).user?.restaurantId;
    const query = request.query as { days?: string };
    const days = parseInt(query.days ?? '30', 10);

    const since = new Date();
    since.setDate(since.getDate() - days);

    const { data, error } = await fastify.supabase
      .from('waste_predictions')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .gte('prediction_date', since.toISOString().split('T')[0])
      .order('prediction_date', { ascending: false });

    if (error) return reply.internalServerError(error.message);
    return data ?? [];
  });
}
