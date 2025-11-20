import Stripe from 'stripe';

// Use a dummy key if STRIPE_SECRET_KEY is not set (for mock mode/development)
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key_for_build';

export const stripe = new Stripe(stripeKey, {
    apiVersion: '2025-11-17.clover',
    appInfo: {
        name: 'Modes Platform',
        version: '0.1.0',
    },
});
