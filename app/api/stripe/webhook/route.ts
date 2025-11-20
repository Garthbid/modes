import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe/server';
import { createClient } from '@/utils/supabase/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const supabase = await createClient();

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                const subscriptionId = session.subscription as string;
                const customerId = session.customer as string;
                const userId = session.metadata?.userId;

                if (userId) {
                    await supabase.from('subscriptions').upsert({
                        user_id: userId,
                        stripe_customer_id: customerId,
                        stripe_subscription_id: subscriptionId,
                        status: 'active',
                        // We should fetch subscription details to get current_period_end
                        // For MVP, just setting active is key.
                    });
                }
                break;
            }
            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription;
                // Find user by stripe_customer_id
                const { data: existingSub } = await supabase
                    .from('subscriptions')
                    .select('user_id')
                    .eq('stripe_customer_id', subscription.customer as string)
                    .single();

                if (existingSub) {
                    await supabase.from('subscriptions').update({
                        status: subscription.status,
                        current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
                    }).eq('user_id', existingSub.user_id);
                }
                break;
            }
            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription;
                const { data: existingSub } = await supabase
                    .from('subscriptions')
                    .select('user_id')
                    .eq('stripe_customer_id', subscription.customer as string)
                    .single();

                if (existingSub) {
                    await supabase.from('subscriptions').update({
                        status: 'canceled',
                    }).eq('user_id', existingSub.user_id);
                }
                break;
            }
        }
    } catch (error) {
        console.error(error);
        return new NextResponse('Webhook handler failed', { status: 500 });
    }

    return new NextResponse(null, { status: 200 });
}
