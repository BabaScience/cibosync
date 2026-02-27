import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutCompleted(session);
      break;
    }
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionUpdated(subscription);
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionDeleted(subscription);
      break;
    }
    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      await handlePaymentFailed(invoice);
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const restaurantId = session.metadata?.restaurant_id;
  const planId = session.metadata?.plan_id;

  if (!restaurantId || !planId) return;

  await supabase.from('restaurants').update({
    stripe_customer_id: session.customer as string,
    stripe_subscription_id: session.subscription as string,
    plan_id: planId,
    plan_status: 'active',
    trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  }).eq('id', restaurantId);
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const restaurantId = subscription.metadata?.restaurant_id;
  if (!restaurantId) return;

  const status = subscription.status === 'active' ? 'active' :
    subscription.status === 'trialing' ? 'trialing' :
    subscription.status === 'past_due' ? 'past_due' : 'inactive';

  await supabase.from('restaurants').update({
    plan_status: status,
  }).eq('id', restaurantId);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const restaurantId = subscription.metadata?.restaurant_id;
  if (!restaurantId) return;

  await supabase.from('restaurants').update({
    plan_status: 'cancelled',
    plan_id: 'starter',
  }).eq('id', restaurantId);
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id, name')
    .eq('stripe_customer_id', customerId)
    .single();

  if (restaurant) {
    console.log(`Payment failed for restaurant: ${restaurant.name} (${restaurant.id})`);
    // TODO: send notification email / WhatsApp to restaurant owner
  }
}
