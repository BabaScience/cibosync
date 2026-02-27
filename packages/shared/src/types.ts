// ============================================================
// CiboSync Shared TypeScript Types
// Used across apps/api and apps/web
// ============================================================

// ── Core Entities ─────────────────────────────────────────────────────────

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  address: Address;
  phone: string;
  email: string;
  cuisine: string[];
  averageCovers: number;
  openingHours: OpeningHours;
  posIntegration?: POSIntegration;
  whatsappConfig?: WhatsAppConfig;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  planId: PlanId;
  planStatus: PlanStatus;
  trialEndsAt?: Date;
  settings: RestaurantSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  coordinates?: { lat: number; lng: number };
}

export interface OpeningHours {
  monday?: DayHours;
  tuesday?: DayHours;
  wednesday?: DayHours;
  thursday?: DayHours;
  friday?: DayHours;
  saturday?: DayHours;
  sunday?: DayHours;
}

export interface DayHours {
  open: string; // 'HH:MM'
  close: string;
  isOpen: boolean;
}

export interface POSIntegration {
  provider: 'cassa_in_cloud' | 'lightspeed' | 'square' | 'manual';
  apiKey?: string;
  locationId?: string;
  lastSync?: Date;
}

export interface WhatsAppConfig {
  phoneNumberId: string;
  businessAccountId: string;
  verifyToken: string;
  isVerified: boolean;
  templateNamespace?: string;
}

export interface RestaurantSettings {
  defaultSendTime: string; // 'HH:MM'
  defaultDiscount: number; // percentage
  autoSendEnabled: boolean;
  minWasteProbability: number; // 0-1, threshold to trigger campaign
  maxDailyMessages: number;
  timezone: string;
  language: 'it' | 'en';
  tone: 'formal' | 'casual' | 'friendly';
}

// ── Inventory ─────────────────────────────────────────────────────────────

export interface InventoryItem {
  id: string;
  restaurantId: string;
  name: string;
  quantity: number;
  unit: InventoryUnit;
  costPerUnit: number;
  sellingPrice?: number;
  category: FoodCategory;
  subCategory?: string;
  expiresAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type InventoryUnit =
  | 'g'
  | 'kg'
  | 'ml'
  | 'l'
  | 'pz'
  | 'pcs'
  | 'btl'
  | 'box'
  | 'bunch'
  | 'portion';

export type FoodCategory =
  | 'Pesce'
  | 'Carne'
  | 'Verdure'
  | 'Pasta'
  | 'Latticini'
  | 'Dolci'
  | 'Bevande'
  | 'Erbe'
  | 'Pane'
  | 'Altro';

// ── Waste Predictions ─────────────────────────────────────────────────────

export interface WastePrediction {
  id: string;
  restaurantId: string;
  inventoryItemId: string;
  inventoryItem?: InventoryItem;
  predictedWasteQuantity: number;
  wasteProbability: number; // 0-1
  potentialLoss: number; // €
  recommendedDiscount: number; // %
  riskLevel: RiskLevel;
  reasoning: string;
  predictionDate: Date;
  actualWasteQuantity?: number; // filled in after the day
  createdAt: Date;
}

export type RiskLevel = 'high' | 'medium' | 'low';

// ── Campaigns ─────────────────────────────────────────────────────────────

export interface Campaign {
  id: string;
  restaurantId: string;
  name: string;
  targetSegment: CustomerSegment;
  messageTemplate: string;
  status: CampaignStatus;
  scheduledFor?: Date;
  sentAt?: Date;
  wasteItemIds: string[];
  targetCustomerCount: number;
  sentCount: number;
  deliveredCount: number;
  readCount: number;
  replyCount: number;
  bookingCount: number;
  cancelledCount: number;
  failedCount: number;
  revenueRecovered: number; // €
  wastePreventedKg: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CampaignStatus =
  | 'draft'
  | 'scheduled'
  | 'sending'
  | 'sent'
  | 'paused'
  | 'cancelled';

export type CustomerSegment = 'all' | 'vip' | 'regulars' | 'occasional';

// ── Customers ─────────────────────────────────────────────────────────────

export interface Customer {
  id: string;
  restaurantId: string;
  firstName: string;
  lastName?: string;
  phone: string;
  email?: string;
  optedInWhatsApp: boolean;
  segment: CustomerSegment;
  visitCount: number;
  totalSpent: number;
  averageOrderValue: number;
  lastVisit?: Date;
  preferredCategories: FoodCategory[];
  tags: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ── WhatsApp Messages ─────────────────────────────────────────────────────

export interface WhatsAppMessage {
  id: string;
  restaurantId: string;
  campaignId?: string;
  customerId: string;
  direction: 'outbound' | 'inbound';
  content: string;
  mediaUrl?: string;
  status: MessageStatus;
  waMessageId?: string;
  sentAt?: Date;
  deliveredAt?: Date;
  readAt?: Date;
  repliedAt?: Date;
  createdAt: Date;
}

export type MessageStatus =
  | 'pending'
  | 'sent'
  | 'delivered'
  | 'read'
  | 'replied'
  | 'failed'
  | 'blocked';

// ── Analytics ─────────────────────────────────────────────────────────────

export interface DailyAnalytics {
  restaurantId: string;
  date: Date;
  totalWasteValue: number; // €
  recoveredValue: number; // €
  preventedWasteKg: number;
  campaignsSent: number;
  messagesSent: number;
  messagesRead: number;
  replies: number;
  bookings: number;
  recoveryRate: number; // 0-1
  topWasteCategories: Array<{ category: FoodCategory; value: number }>;
}

export interface MonthlyStats {
  restaurantId: string;
  year: number;
  month: number;
  totalWasteValue: number;
  totalRecoveredValue: number;
  totalPreventedWasteKg: number;
  totalCampaigns: number;
  avgRecoveryRate: number;
  totalRevenueFromCampaigns: number;
  roi: number; // recovered / subscription_cost
}

// ── Billing ───────────────────────────────────────────────────────────────

export type PlanId = 'starter' | 'pro' | 'enterprise';

export type PlanStatus =
  | 'active'
  | 'trialing'
  | 'past_due'
  | 'cancelled'
  | 'inactive';

export interface Plan {
  id: PlanId;
  name: string;
  price: number; // €/month
  stripePriceId: string;
  features: PlanFeature[];
  limits: PlanLimits;
}

export interface PlanFeature {
  key: string;
  label: string;
  included: boolean;
}

export interface PlanLimits {
  maxLocations: number;
  maxMonthlyMessages: number; // -1 = unlimited
  maxCustomers: number;
  maxCampaignsPerDay: number;
  hasAdvancedAI: boolean;
  hasPOSIntegration: boolean;
  hasWhiteLabel: boolean;
  hasAPIAccess: boolean;
}

// ── API Response wrappers ─────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  error?: string;
  meta?: Record<string, unknown>;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
  };
}
