import { NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe/server';
import { createClient } from '@/utils/supabase/server';
import { STRIPE_CONFIG } from '@/utils/stripe/config';

export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const { priceId } = await req.json();

        // Check if user already has a customer ID
        const { data: subscription } = await supabase
            .from('subscriptions')
            .select('stripe_customer_id')
            .eq('user_id', user.id)
            .single();

        let customerId = subscription?.stripe_customer_id;

        if (!customerId) {
            // Create a new customer in Stripe if not exists
            const customerData = {
                email: user.email,
                metadata: {
                    supabaseUUID: user.id,
                },
            };
            const customer = await stripe.customers.create(customerData);
            customerId = customer.id;
        }

        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            line_items: [
                {
                    price: priceId || 'price_1Q...', // Replace with actual price ID or use dynamic price_data
                    // For dynamic price if no ID:
                    // price_data: {
                    //   currency: STRIPE_CONFIG.currency,
                    //   product_data: {
                    //     name: STRIPE_CONFIG.subscriptionName,
                    //   },
                    //   unit_amount: STRIPE_CONFIG.priceAmount,
                    //   recurring: {
                    //     interval: 'month',
                    //   },
                    // },
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
            metadata: {
                userId: user.id,
            },
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (err: any) {
        console.error(err);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
