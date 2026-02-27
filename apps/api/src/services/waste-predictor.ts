interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
  category: string;
  expiresAt?: string;
}

interface HistoricalSummary {
  date: string;
  dayOfWeek: number;
  totalCovers: number;
  wasteValue: number;
  recoveredValue: number;
  items: Array<{ name: string; sold: number; wasted: number }>;
}

export interface WastePrediction {
  itemId: string;
  itemName: string;
  quantity: number;
  unit: string;
  predictedWasteQuantity: number;
  wasteProbability: number;
  potentialLoss: number;
  recommendedDiscount: number;
  riskLevel: 'high' | 'medium' | 'low';
  reasoning: string;
}

// Category-based base waste rates (from Italian restaurant industry data)
const CATEGORY_BASE_RATES: Record<string, number> = {
  Pesce: 0.72,
  Carne: 0.45,
  Verdure: 0.58,
  Pasta: 0.35,
  Latticini: 0.48,
  Dolci: 0.52,
  Bevande: 0.28,
  Erbe: 0.65,
  Pane: 0.60,
  default: 0.40,
};

// Day of week multipliers (Italians eat out more Fri/Sat/Sun)
const DOW_MULTIPLIERS: Record<number, number> = {
  0: 0.85, // Sunday (many restaurants closed)
  1: 1.15, // Monday (quiet, high waste)
  2: 1.10, // Tuesday
  3: 1.05, // Wednesday
  4: 0.95, // Thursday
  5: 0.75, // Friday (busy, low waste)
  6: 0.70, // Saturday (busiest)
};

export class WastePredictor {
  predict(
    inventoryItems: InventoryItem[],
    historicalData: HistoricalSummary[]
  ): WastePrediction[] {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const dowMultiplier = DOW_MULTIPLIERS[dayOfWeek] ?? 1.0;

    // Build historical item sell rates
    const itemSellRates = this.buildItemSellRates(historicalData);

    return inventoryItems.map((item) => {
      const baseRate = CATEGORY_BASE_RATES[item.category] ?? CATEGORY_BASE_RATES.default;
      const historicalRate = itemSellRates[item.name.toLowerCase()];

      // Blend base rate with historical rate
      let wasteProbability: number;
      if (historicalRate !== undefined) {
        // 70% weight on historical, 30% on category base
        wasteProbability = historicalRate * 0.7 + baseRate * 0.3;
      } else {
        wasteProbability = baseRate;
      }

      // Apply day-of-week adjustment
      wasteProbability = Math.min(0.98, wasteProbability * dowMultiplier);

      // Apply expiry urgency boost
      if (item.expiresAt) {
        const hoursUntilExpiry = this.hoursUntilExpiry(item.expiresAt);
        if (hoursUntilExpiry < 8) wasteProbability = Math.min(0.98, wasteProbability + 0.2);
        else if (hoursUntilExpiry < 16) wasteProbability = Math.min(0.98, wasteProbability + 0.1);
      }

      const predictedWasteQuantity = item.quantity * wasteProbability;
      const potentialLoss = predictedWasteQuantity * item.costPerUnit;

      // Recommend discount based on waste probability
      const recommendedDiscount = this.calculateDiscount(wasteProbability, potentialLoss);

      const riskLevel: 'high' | 'medium' | 'low' =
        wasteProbability > 0.65 ? 'high' : wasteProbability > 0.40 ? 'medium' : 'low';

      return {
        itemId: item.id,
        itemName: item.name,
        quantity: item.quantity,
        unit: item.unit,
        predictedWasteQuantity: Math.round(predictedWasteQuantity * 10) / 10,
        wasteProbability: Math.round(wasteProbability * 100) / 100,
        potentialLoss: Math.round(potentialLoss * 100) / 100,
        recommendedDiscount,
        riskLevel,
        reasoning: this.generateReasoning(item, wasteProbability, dowMultiplier, historicalRate),
      };
    });
  }

  private buildItemSellRates(historicalData: HistoricalSummary[]): Record<string, number> {
    const rates: Record<string, { totalSold: number; totalWasted: number }> = {};

    for (const day of historicalData) {
      for (const item of day.items ?? []) {
        const key = item.name.toLowerCase();
        if (!rates[key]) rates[key] = { totalSold: 0, totalWasted: 0 };
        rates[key].totalSold += item.sold;
        rates[key].totalWasted += item.wasted;
      }
    }

    const sellRates: Record<string, number> = {};
    for (const [key, data] of Object.entries(rates)) {
      const total = data.totalSold + data.totalWasted;
      if (total > 0) {
        sellRates[key] = data.totalWasted / total; // waste rate
      }
    }

    return sellRates;
  }

  private hoursUntilExpiry(expiresAt: string): number {
    const expiry = new Date(expiresAt);
    const now = new Date();
    return (expiry.getTime() - now.getTime()) / (1000 * 60 * 60);
  }

  private calculateDiscount(wasteProbability: number, potentialLoss: number): number {
    // Higher waste probability = higher discount needed
    if (wasteProbability > 0.8) return 65; // 65% off
    if (wasteProbability > 0.65) return 55; // 55% off
    if (wasteProbability > 0.50) return 40; // 40% off
    if (wasteProbability > 0.35) return 30; // 30% off
    return 20; // 20% off
  }

  private generateReasoning(
    item: InventoryItem,
    wasteProbability: number,
    dowMultiplier: number,
    historicalRate?: number
  ): string {
    const parts: string[] = [];

    if (historicalRate !== undefined) {
      parts.push(`Historical waste rate: ${(historicalRate * 100).toFixed(0)}%`);
    }

    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date().getDay()];
    parts.push(`${dayName} multiplier: ${dowMultiplier.toFixed(2)}x`);

    if (item.expiresAt) {
      const hours = this.hoursUntilExpiry(item.expiresAt);
      parts.push(`Expires in ${hours.toFixed(1)}h`);
    }

    parts.push(`Category base rate: ${((CATEGORY_BASE_RATES[item.category] ?? 0.4) * 100).toFixed(0)}%`);

    return parts.join(' · ');
  }
}
