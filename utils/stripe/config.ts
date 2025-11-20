export const STRIPE_CONFIG = {
    currency: 'usd',
    priceAmount: 900, // $9.00
    priceId: process.env.STRIPE_PRICE_ID, // Optional if you want to use a specific price ID
    subscriptionName: 'Founder Mode Subscription',
    trialDays: 0,
};
