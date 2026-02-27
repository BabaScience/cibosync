import type { SupabaseClient } from '@supabase/supabase-js';

// Extend FastifyInstance type with our decorators
declare module 'fastify' {
  interface FastifyInstance {
    supabase: SupabaseClient;
    authenticate: (request: any, reply: any) => Promise<void>;
  }
}

// ── Request/Response Types ────────────────────────────────────────────────

export interface AuthenticatedUser {
  id: string;
  restaurantId: string;
  email: string;
  role: 'owner' | 'manager' | 'staff';
}

export interface ApiError {
  statusCode: number;
  error: string;
  message: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ── Supabase Table Types ──────────────────────────────────────────────────

export interface DbRestaurant {
  id: string;
  name: string;
  owner_id: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  plan_id: 'starter' | 'pro' | 'enterprise';
  plan_status: 'active' | 'trialing' | 'past_due' | 'cancelled' | 'inactive';
  trial_ends_at?: string;
  whatsapp_phone_number_id?: string;
  whatsapp_access_token?: string;
  settings: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface DbInventoryItem {
  id: string;
  restaurant_id: string;
  name: string;
  quantity: number;
  unit: string;
  cost_per_unit: number;
  category: string;
  expires_at?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface DbCustomer {
  id: string;
  restaurant_id: string;
  first_name: string;
  last_name?: string;
  phone: string;
  email?: string;
  opted_in_whatsapp: boolean;
  segment: 'vip' | 'regular' | 'occasional';
  visit_count: number;
  total_spent: number;
  last_visit?: string;
  preferred_categories: string[];
  created_at: string;
}
