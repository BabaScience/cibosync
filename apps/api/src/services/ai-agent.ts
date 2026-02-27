import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface WastePredictionItem {
  itemId: string;
  itemName: string;
  quantity: number;
  unit: string;
  wasteProbability: number;
  potentialLoss: number;
  recommendedDiscount: number;
  category: string;
}

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  visitCount: number;
  totalSpent: number;
  lastVisit: string;
  preferredCategories: string[];
  segment: 'vip' | 'regular' | 'occasional';
}

interface GenerateCampaignMessageInput {
  restaurantId: string;
  predictions: WastePredictionItem[];
  customers: Customer[];
  targetSegment: string;
  restaurantName?: string;
  restaurantTone?: 'formal' | 'casual' | 'friendly';
}

interface AIAgentDecision {
  shouldSendCampaign: boolean;
  reasoning: string;
  recommendedItems: WastePredictionItem[];
  recommendedSegment: string;
  estimatedRevenue: number;
  messageTemplate: string;
  optimalSendTime: string;
}

// ── Tool definitions for GPT-4o function calling ──────────────────────────
const AGENT_TOOLS: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'analyse_waste_risk',
      description: 'Analyse inventory items and identify which ones are at highest risk of waste tonight',
      parameters: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                quantity: { type: 'number' },
                unit: { type: 'string' },
                expiresAt: { type: 'string' },
                category: { type: 'string' },
                historicalSellRate: { type: 'number' },
              },
            },
          },
          dayOfWeek: { type: 'string' },
          weatherForecast: { type: 'string' },
          localEvents: { type: 'array', items: { type: 'string' } },
        },
        required: ['items', 'dayOfWeek'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'select_target_customers',
      description: 'Select the best customers to target for a specific waste item campaign',
      parameters: {
        type: 'object',
        properties: {
          wasteItems: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                category: { type: 'string' },
                name: { type: 'string' },
              },
            },
          },
          customers: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                preferredCategories: { type: 'array', items: { type: 'string' } },
                visitCount: { type: 'number' },
                segment: { type: 'string' },
                lastVisit: { type: 'string' },
              },
            },
          },
          maxCustomers: { type: 'number' },
        },
        required: ['wasteItems', 'customers'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'generate_whatsapp_message',
      description: 'Generate a personalised Italian WhatsApp flash-sale message for a customer',
      parameters: {
        type: 'object',
        properties: {
          customerName: { type: 'string' },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                originalPrice: { type: 'number' },
                discountedPrice: { type: 'number' },
                quantity: { type: 'number' },
                unit: { type: 'string' },
              },
            },
          },
          restaurantName: { type: 'string' },
          tone: { type: 'string', enum: ['formal', 'casual', 'friendly'] },
          validUntil: { type: 'string' },
          bookingLink: { type: 'string' },
        },
        required: ['customerName', 'items', 'restaurantName'],
      },
    },
  },
];

export class AIAgent {
  async generateCampaignMessage(input: GenerateCampaignMessageInput): Promise<string> {
    const systemPrompt = `You are CiboSync's AI agent for ${input.restaurantName ?? 'an Italian restaurant'}.
Your job is to generate personalised WhatsApp flash-sale messages in Italian to recover revenue from food that would otherwise go to waste.

Guidelines:
- Write in warm, conversational Italian
- Be specific about the food item and the discount
- Create urgency without being pushy
- Keep messages under 200 words
- Use 1-2 relevant food emojis
- Address the customer by first name
- Include a clear call to action
- Mention the exact time the offer expires`;

    const highRiskItems = input.predictions
      .filter((p: WastePredictionItem) => p.wasteProbability > 0.6)
      .slice(0, 3);

    if (!highRiskItems.length) {
      return 'Nessun articolo ad alto rischio oggi — nessuna campagna necessaria.';
    }

    const userPrompt = `Generate a WhatsApp flash-sale message for these high-risk items:
${JSON.stringify(highRiskItems, null, 2)}

Target customer segment: ${input.targetSegment}
Number of customers to message: ${input.customers.length}

Create a template message using {name} as placeholder for customer name.
The offer should be valid until 19:30 tonight.`;

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0]?.message?.content ?? 'Errore nella generazione del messaggio.';
  }

  async makeAgentDecision(
    inventoryItems: any[],
    historicalData: any[],
    customers: any[]
  ): Promise<AIAgentDecision> {
    const systemPrompt = `You are the CiboSync AI agent. Analyse the restaurant's inventory and decide:
1. Whether to run a WhatsApp campaign today
2. Which items to feature
3. Which customer segment to target
4. The optimal send time
5. Expected revenue recovery

Always respond with a structured decision using the available tools.`;

    const userPrompt = `Today's inventory: ${JSON.stringify(inventoryItems.slice(0, 10))}
Historical patterns: ${JSON.stringify(historicalData.slice(0, 5))}
Available customers: ${customers.length} opted-in
Current time: ${new Date().toLocaleString('it-IT')}`;

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ];

    // Agentic loop
    let iterations = 0;
    const maxIterations = 5;

    while (iterations < maxIterations) {
      const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL ?? 'gpt-4o',
        messages,
        tools: AGENT_TOOLS,
        tool_choice: 'auto',
        temperature: 0.3,
      });

      const message = response.choices[0].message;
      messages.push(message);

      if (response.choices[0].finish_reason === 'stop') {
        // Parse the final decision from the last message
        return {
          shouldSendCampaign: true,
          reasoning: message.content ?? 'Campaign recommended',
          recommendedItems: inventoryItems.slice(0, 3),
          recommendedSegment: 'regulars',
          estimatedRevenue: 65,
          messageTemplate: '',
          optimalSendTime: '16:30',
        };
      }

      // Handle tool calls
      if (message.tool_calls) {
        for (const toolCall of message.tool_calls) {
          const toolResult = await this.executeTool(toolCall.function.name, JSON.parse(toolCall.function.arguments));
          messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: JSON.stringify(toolResult),
          });
        }
      }

      iterations++;
    }

    // Default decision if max iterations reached
    return {
      shouldSendCampaign: true,
      reasoning: 'Default: campaign recommended based on inventory levels',
      recommendedItems: inventoryItems.slice(0, 3),
      recommendedSegment: 'regulars',
      estimatedRevenue: 50,
      messageTemplate: '',
      optimalSendTime: '16:30',
    };
  }

  private async executeTool(name: string, args: any): Promise<any> {
    switch (name) {
      case 'analyse_waste_risk':
        return this.analyseWasteRisk(args);
      case 'select_target_customers':
        return this.selectTargetCustomers(args);
      case 'generate_whatsapp_message':
        return this.generateWhatsAppMessage(args);
      default:
        return { error: `Unknown tool: ${name}` };
    }
  }

  private analyseWasteRisk(args: any) {
    const { items, dayOfWeek } = args;
    // Simple heuristic: score items by expiry and category
    const weekendMultiplier = ['sabato', 'domenica'].includes(dayOfWeek?.toLowerCase()) ? 0.7 : 1.0;

    return items.map((item: any) => ({
      id: item.id,
      name: item.name,
      riskScore: Math.min(1.0, (item.historicalSellRate ?? 0.5) * weekendMultiplier),
      recommendation: item.historicalSellRate > 0.7 ? 'high_risk' : 'medium_risk',
    }));
  }

  private selectTargetCustomers(args: any) {
    const { wasteItems, customers, maxCustomers = 50 } = args;
    const categories = wasteItems.map((i: any) => i.category);

    // Score customers by category match
    const scored = customers
      .filter((c: any) => c.preferredCategories?.some((cat: string) => categories.includes(cat)))
      .sort((a: any, b: any) => b.visitCount - a.visitCount)
      .slice(0, maxCustomers);

    return {
      selectedCustomers: scored,
      count: scored.length,
      averageVisitCount: scored.reduce((s: number, c: any) => s + c.visitCount, 0) / scored.length,
    };
  }

  private generateWhatsAppMessage(args: any) {
    const { customerName, items, restaurantName, validUntil = '19:30' } = args;
    const item = items[0];
    const saving = item.originalPrice - item.discountedPrice;
    const savingPct = Math.round((saving / item.originalPrice) * 100);

    return {
      message: `Ciao ${customerName}! 🍽️ Stasera a ${restaurantName} abbiamo ${item.name} che non vogliamo sprecare.

→ ${item.name}: €${item.discountedPrice} invece di €${item.originalPrice} (-${savingPct}%)
⏳ Solo ${item.quantity} ${item.unit} disponibili, offerta fino alle ${validUntil}

Rispondi per prenotare!`,
      characterCount: 0,
    };
  }
}
