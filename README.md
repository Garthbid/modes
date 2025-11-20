# Modes - The Founder Efficiency Platform

A $9/month subscription app that guides users through pre-built daily "Modes" inspired by world-class founder archetypes.

## Features

- **Founder Archetypes**: Elon, Jensen, Beast modes.
- **Realtime Dashboard**: Track your current block and context switches.
- **Hybrid Mode Builder**: Remix blocks to create your own schedule.
- **Subscription Paywall**: Integrated with Stripe.
- **Notifications**: Web Push notifications for context switching.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Supabase (Postgres + Auth)
- Stripe Billing

## Setup

1. **Clone the repo**
2. **Install dependencies**: `npm install`
3. **Environment Variables**: Copy `env.template` to `.env.local` and fill in your keys.
   - Supabase URL & Anon Key
   - Stripe Secret & Publishable Key
   - Stripe Webhook Secret
4. **Database Setup**:
   - Run the SQL in `supabase/schema.sql` in your Supabase SQL Editor.
   - Run the SQL in `supabase/seed.sql` to populate founders.
5. **Run Locally**: `npm run dev`

## Deployment

1. Push to GitHub.
2. Import to Vercel.
3. Add Environment Variables in Vercel.
4. Deploy!

## Cron Jobs

The suggestion engine runs daily via Vercel Cron (`vercel.json`).
