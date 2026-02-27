import type { Plan, FoodCategory } from './types.js';

// ── Pricing Plans ──────────────────────────────────────────────────────────

export const PLANS: Record<string, Plan> = {
  starter: {
    id: 'starter',
    name: 'Starter',
    price: 49,
    stripePriceId: process.env.STRIPE_PRICE_STARTER ?? 'price_starter_placeholder',
    features: [
      { key: 'whatsapp_messages', label: 'Up to 500 WhatsApp messages/month', included: true },
      { key: 'basic_ai', label: 'Basic AI waste predictions', included: true },
      { key: 'manual_inventory', label: 'Manual inventory input', included: true },
      { key: 'basic_analytics', label: 'Basic analytics dashboard', included: true },
      { key: 'email_support', label: 'Email support', included: true },
      { key: 'pos_integration', label: 'POS integration', included: false },
      { key: 'advanced_ai', label: 'Advanced GPT-4o AI', included: false },
      { key: 'white_label', label: 'White-label', included: false },
    ],
    limits: {
      maxLocations: 1,
      maxMonthlyMessages: 500,
      maxCustomers: 200,
      maxCampaignsPerDay: 1,
      hasAdvancedAI: false,
      hasPOSIntegration: false,
      hasWhiteLabel: false,
      hasAPIAccess: false,
    },
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 129,
    stripePriceId: process.env.STRIPE_PRICE_PRO ?? 'price_pro_placeholder',
    features: [
      { key: 'whatsapp_messages', label: 'Unlimited WhatsApp messages', included: true },
      { key: 'advanced_ai', label: 'Advanced GPT-4o AI predictions', included: true },
      { key: 'pos_integration', label: 'POS integration (Cassa in Cloud, Lightspeed)', included: true },
      { key: 'customer_segments', label: 'Up to 5 customer segments', included: true },
      { key: 'priority_support', label: 'Priority support', included: true },
      { key: 'full_analytics', label: 'Full analytics + revenue attribution', included: true },
      { key: 'ab_testing', label: 'A/B testing for messages', included: true },
      { key: 'custom_templates', label: 'Custom message templates', included: true },
      { key: 'white_label', label: 'White-label', included: false },
      { key: 'api_access', label: 'API access', included: false },
    ],
    limits: {
      maxLocations: 3,
      maxMonthlyMessages: -1,
      maxCustomers: 2000,
      maxCampaignsPerDay: 5,
      hasAdvancedAI: true,
      hasPOSIntegration: true,
      hasWhiteLabel: false,
      hasAPIAccess: false,
    },
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 399,
    stripePriceId: process.env.STRIPE_PRICE_ENTERPRISE ?? 'price_enterprise_placeholder',
    features: [
      { key: 'whatsapp_messages', label: 'Unlimited WhatsApp messages', included: true },
      { key: 'advanced_ai', label: 'Advanced GPT-4o AI predictions', included: true },
      { key: 'pos_integration', label: 'Custom POS integrations', included: true },
      { key: 'locations', label: 'Up to 10 locations', included: true },
      { key: 'white_label', label: 'White-label (your branding)', included: true },
      { key: 'dedicated_manager', label: 'Dedicated account manager', included: true },
      { key: 'sla', label: 'SLA guarantee', included: true },
      { key: 'api_access', label: 'API access', included: true },
      { key: 'custom_ai', label: 'Custom AI training on your data', included: true },
    ],
    limits: {
      maxLocations: 10,
      maxMonthlyMessages: -1,
      maxCustomers: -1,
      maxCampaignsPerDay: -1,
      hasAdvancedAI: true,
      hasPOSIntegration: true,
      hasWhiteLabel: true,
      hasAPIAccess: true,
    },
  },
};

// ── Food Categories ────────────────────────────────────────────────────────

export const FOOD_CATEGORIES: FoodCategory[] = [
  'Pesce',
  'Carne',
  'Verdure',
  'Pasta',
  'Latticini',
  'Dolci',
  'Bevande',
  'Erbe',
  'Pane',
  'Altro',
];

// ── WhatsApp Message Templates ────────────────────────────────────────────

export const WHATSAPP_TEMPLATES = {
  flashSale: `🍽️ Ciao {name}! Stasera a {restaurant} abbiamo {item} che non vogliamo sprecare.

→ {item}: €{discounted_price} invece di €{original_price} (-{discount}%)
⏳ Solo {quantity} {unit} disponibili, offerta fino alle {valid_until}

Rispondi "Prenoto" per riservare la tua porzione!`,

  confirmation: `✅ Perfetto {name}! La tua prenotazione è confermata.

Ti aspettiamo stasera alle {time}. 
A presto! 🍽️`,

  reminder: `⏰ {name}, ricorda che hai prenotato {item} per stasera alle {time}.
Ti aspettiamo! 🍽️`,

  thankYou: `Grazie {name}! Speriamo ti sia piaciuto. 
A presto da {restaurant}! 🤍`,

  optIn: `Ciao {name}! Sono {restaurant} 🍽️

Vuoi ricevere le nostre offerte flash WhatsApp? Recuperiamo gli ingredienti migliori a prezzi speciali per i nostri clienti fedeli.

Rispondi "Sì" per iscriverti (max 1 messaggio/giorno).`,
};

// ── AI Prompts ─────────────────────────────────────────────────────────────

export const AI_PROMPTS = {
  systemAgent: `You are CiboSync's AI agent for Italian restaurants.
Your mission: analyse daily inventory, predict waste, and craft personalised WhatsApp campaigns to recover revenue.

Core principles:
1. Always write in warm, conversational Italian
2. Be specific about the food and price
3. Create urgency without pressure
4. Personalise based on customer history
5. Keep messages under 200 words`,

  wasteAnalysis: `Analyse this restaurant's inventory and identify:
1. Items at highest risk of waste tonight
2. Recommended discount % for each item
3. Estimated revenue recovery potential
4. Best customer segments to target`,

  messageGeneration: `Generate a WhatsApp flash-sale message in Italian:
- Warm and personal tone
- Specific food item and discount
- Clear call to action
- Expiry time for urgency
- Max 3 sentences + CTA button text`,
};

// ── Error Codes ────────────────────────────────────────────────────────────

export const ERROR_CODES = {
  // Auth
  AUTH_REQUIRED: 'AUTH_REQUIRED',
  AUTH_INVALID_TOKEN: 'AUTH_INVALID_TOKEN',
  AUTH_EXPIRED_TOKEN: 'AUTH_EXPIRED_TOKEN',

  // Restaurant
  RESTAURANT_NOT_FOUND: 'RESTAURANT_NOT_FOUND',
  RESTAURANT_PLAN_LIMIT: 'RESTAURANT_PLAN_LIMIT',

  // Inventory
  INVENTORY_ITEM_NOT_FOUND: 'INVENTORY_ITEM_NOT_FOUND',
  INVENTORY_INVALID_QUANTITY: 'INVENTORY_INVALID_QUANTITY',

  // Campaigns
  CAMPAIGN_NOT_FOUND: 'CAMPAIGN_NOT_FOUND',
  CAMPAIGN_ALREADY_SENT: 'CAMPAIGN_ALREADY_SENT',
  CAMPAIGN_NO_CUSTOMERS: 'CAMPAIGN_NO_CUSTOMERS',

  // WhatsApp
  WHATSAPP_SEND_FAILED: 'WHATSAPP_SEND_FAILED',
  WHATSAPP_NOT_CONFIGURED: 'WHATSAPP_NOT_CONFIGURED',
  WHATSAPP_RATE_LIMIT: 'WHATSAPP_RATE_LIMIT',

  // Stripe
  STRIPE_WEBHOOK_INVALID: 'STRIPE_WEBHOOK_INVALID',
  STRIPE_PAYMENT_FAILED: 'STRIPE_PAYMENT_FAILED',

  // AI
  AI_GENERATION_FAILED: 'AI_GENERATION_FAILED',
  AI_RATE_LIMIT: 'AI_RATE_LIMIT',
} as const;

// ── App Constants ──────────────────────────────────────────────────────────

export const APP_CONSTANTS = {
  DEFAULT_SEND_TIME: '16:30',
  DEFAULT_OFFER_VALID_UNTIL: '19:30',
  MAX_WHATSAPP_MESSAGE_LENGTH: 4096,
  MAX_CAMPAIGN_CUSTOMERS: 500,
  PREDICTION_SCHEDULE: '0 15 * * *', // Every day at 15:00
  CAMPAIGN_SCHEDULE: '30 16 * * *', // Every day at 16:30
  MIN_WASTE_PROBABILITY_TO_CAMPAIGN: 0.5,
  TARGET_RECOVERY_RATE: 0.68,
  TRIAL_DAYS: 14,
} as const;
