import type { WastePrediction } from './waste-predictor.js';

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
  category: string;
}

interface AnalysisResult {
  riskScore: number; // 0-100 overall risk score
  highRiskItems: WastePrediction[];
  mediumRiskItems: WastePrediction[];
  lowRiskItems: WastePrediction[];
  totalPotentialLoss: number;
  recommendedCampaignValue: number; // expected revenue if campaign sent
  topCategories: Array<{ category: string; wasteValue: number; count: number }>;
  campaignRecommendation: CampaignRecommendation;
}

interface CampaignRecommendation {
  shouldSend: boolean;
  urgency: 'immediate' | 'scheduled' | 'optional' | 'none';
  targetSegment: 'vip' | 'regulars' | 'all';
  estimatedRecovery: number;
  recommendedSendTime: string;
  itemsToFeature: WastePrediction[];
  reasoning: string;
}

export class InventoryAnalyzer {
  analyze(inventoryItems: InventoryItem[], predictions: WastePrediction[]): AnalysisResult {
    const highRiskItems = predictions.filter((p) => p.riskLevel === 'high');
    const mediumRiskItems = predictions.filter((p) => p.riskLevel === 'medium');
    const lowRiskItems = predictions.filter((p) => p.riskLevel === 'low');

    const totalPotentialLoss = predictions.reduce((sum, p) => sum + p.potentialLoss, 0);

    // Calculate overall risk score (0-100)
    const riskScore = Math.min(
      100,
      Math.round(
        (highRiskItems.length * 30 +
          mediumRiskItems.length * 10 +
          totalPotentialLoss * 2) /
          Math.max(1, predictions.length)
      )
    );

    // Group by category
    const categoryMap = new Map<string, { wasteValue: number; count: number }>();
    for (const pred of predictions) {
      const item = inventoryItems.find((i) => i.id === pred.itemId);
      if (!item) continue;
      const existing = categoryMap.get(item.category) ?? { wasteValue: 0, count: 0 };
      categoryMap.set(item.category, {
        wasteValue: existing.wasteValue + pred.potentialLoss,
        count: existing.count + 1,
      });
    }

    const topCategories = Array.from(categoryMap.entries())
      .map(([category, data]) => ({ category, ...data }))
      .sort((a, b) => b.wasteValue - a.wasteValue)
      .slice(0, 5);

    const campaignRecommendation = this.buildCampaignRecommendation(
      highRiskItems,
      mediumRiskItems,
      totalPotentialLoss
    );

    // Estimated recovery = potential loss * average recovery rate (68%)
    const recommendedCampaignValue = totalPotentialLoss * 0.68;

    return {
      riskScore,
      highRiskItems,
      mediumRiskItems,
      lowRiskItems,
      totalPotentialLoss: Math.round(totalPotentialLoss * 100) / 100,
      recommendedCampaignValue: Math.round(recommendedCampaignValue * 100) / 100,
      topCategories,
      campaignRecommendation,
    };
  }

  private buildCampaignRecommendation(
    highRiskItems: WastePrediction[],
    mediumRiskItems: WastePrediction[],
    totalPotentialLoss: number
  ): CampaignRecommendation {
    const hour = new Date().getHours();

    // Determine urgency
    let urgency: CampaignRecommendation['urgency'];
    if (highRiskItems.length >= 3 || totalPotentialLoss > 80) {
      urgency = 'immediate';
    } else if (highRiskItems.length >= 1 || totalPotentialLoss > 40) {
      urgency = 'scheduled';
    } else if (mediumRiskItems.length >= 2) {
      urgency = 'optional';
    } else {
      urgency = 'none';
    }

    // Determine target segment
    const targetSegment: CampaignRecommendation['targetSegment'] =
      totalPotentialLoss > 100 ? 'all' : highRiskItems.length > 2 ? 'regulars' : 'vip';

    // Optimal send time
    const recommendedSendTime = hour < 15 ? '15:30' : hour < 16 ? '16:00' : hour < 17 ? '16:30' : '17:00';

    // Items to feature (max 3, highest risk first)
    const itemsToFeature = [...highRiskItems, ...mediumRiskItems].slice(0, 3);

    const estimatedRecovery = itemsToFeature.reduce((sum, item) => sum + item.potentialLoss * 0.65, 0);

    return {
      shouldSend: urgency !== 'none',
      urgency,
      targetSegment,
      estimatedRecovery: Math.round(estimatedRecovery * 100) / 100,
      recommendedSendTime,
      itemsToFeature,
      reasoning: this.buildReasoning(highRiskItems, mediumRiskItems, totalPotentialLoss, urgency),
    };
  }

  private buildReasoning(
    highRisk: WastePrediction[],
    mediumRisk: WastePrediction[],
    totalLoss: number,
    urgency: string
  ): string {
    if (urgency === 'none') return 'No significant waste risk detected today.';

    const parts: string[] = [];
    if (highRisk.length > 0) {
      parts.push(`${highRisk.length} high-risk item(s): ${highRisk.map((i) => i.itemName).join(', ')}`);
    }
    if (mediumRisk.length > 0) {
      parts.push(`${mediumRisk.length} medium-risk item(s)`);
    }
    parts.push(`€${totalLoss.toFixed(2)} total potential loss`);
    parts.push(`Urgency: ${urgency}`);

    return parts.join('. ');
  }
}
