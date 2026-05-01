import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!

  if (!signature) {
    return new Response('No signature', { status: 400 })
  }

  try {
    const body = await req.text()
    const event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret)

    console.log('Webhook event type:', event.type)

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string
        const subscriptionId = subscription.id
        const status = subscription.status
        const tier = subscription.items.data[0].price.recurring?.interval === 'year' ? 'annual' : 'monthly'

        // 'incomplete' is only meaningful at creation; skip it on updates to prevent
        // a late-arriving incomplete event from stomping an already-active subscription.
        if (event.type === 'customer.subscription.updated' && status === 'incomplete') break

        // Find user by stripe_customer_id
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (profile) {
          await supabase
            .from('profiles')
            .update({
              stripe_subscription_id: subscriptionId,
              subscription_status: status,
              subscription_tier: tier,
              subscription_started_at: new Date(subscription.created * 1000).toISOString(),
            })
            .eq('id', profile.id)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const subscriptionId = subscription.id

        await supabase
          .from('profiles')
          .update({
            subscription_status: 'canceled',
            subscription_ends_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscriptionId)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        const subscriptionId = invoice.subscription as string
        const customerId = invoice.customer as string

        // Look up by stripe_customer_id — it's set before checkout starts so it's always
        // present regardless of event order. Also write stripe_subscription_id here so
        // this handler is self-sufficient even if subscription.created hasn't run yet.
        if (subscriptionId && customerId) {
          await supabase
            .from('profiles')
            .update({
              subscription_status: 'active',
              stripe_subscription_id: subscriptionId,
            })
            .eq('stripe_customer_id', customerId)
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const subscriptionId = invoice.subscription as string

        if (subscriptionId) {
          await supabase
            .from('profiles')
            .update({
              subscription_status: 'past_due',
            })
            .eq('stripe_subscription_id', subscriptionId)
        }
        break
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err) {
    console.error('Webhook error:', err.message)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }
})
