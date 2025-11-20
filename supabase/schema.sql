-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS
create table public.users (
  id uuid references auth.users not null primary key,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  timezone text default 'UTC',
  default_wake_time time default '07:00:00',
  onboarding_complete boolean default false
);
alter table public.users enable row level security;
create policy "Users can view own data" on public.users for select using (auth.uid() = id);
create policy "Users can update own data" on public.users for update using (auth.uid() = id);

-- SUBSCRIPTIONS
create table public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text,
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.subscriptions enable row level security;
create policy "Users can view own subscription" on public.subscriptions for select using (auth.uid() = user_id);

-- FOUNDERS (Archetypes)
create table public.founders (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  display_name text not null,
  bio text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.founders enable row level security;
create policy "Public can view active founders" on public.founders for select using (true);

-- DAY TEMPLATES
create table public.day_templates (
  id uuid default uuid_generate_v4() primary key,
  founder_id uuid references public.founders(id) not null,
  name text not null,
  description text,
  is_default boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.day_templates enable row level security;
create policy "Public can view templates" on public.day_templates for select using (true);

-- TEMPLATE BLOCKS
create table public.template_blocks (
  id uuid default uuid_generate_v4() primary key,
  day_template_id uuid references public.day_templates(id) not null,
  mode_name text not null,
  start_time time not null, -- Relative to wake time usually, or absolute if fixed. Assuming relative for now or fixed schedule. Prompt says "Convert all blocks to absolute timestamps in user's timezone", implying templates might be relative or fixed. Let's assume fixed times for simplicity or relative to wake. Let's use TIME type.
  end_time time not null,
  instructions text,
  order_index integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.template_blocks enable row level security;
create policy "Public can view template blocks" on public.template_blocks for select using (true);

-- USER MODES (Custom/Remix)
create table public.user_modes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  name text not null,
  description text,
  is_hybrid boolean default true,
  base_day_template_id uuid references public.day_templates(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.user_modes enable row level security;
create policy "Users can CRUD own modes" on public.user_modes using (auth.uid() = user_id);

-- USER MODE BLOCKS
create table public.user_mode_blocks (
  id uuid default uuid_generate_v4() primary key,
  user_mode_id uuid references public.user_modes(id) on delete cascade not null,
  start_time time not null,
  end_time time not null,
  label text not null,
  instructions text,
  source_founder_id uuid references public.founders(id),
  order_index integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.user_mode_blocks enable row level security;
create policy "Users can CRUD own mode blocks" on public.user_mode_blocks using (
  exists (select 1 from public.user_modes where id = user_mode_blocks.user_mode_id and user_id = auth.uid())
);

-- USER DAY RUNS
create table public.user_day_runs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  user_mode_id uuid references public.user_modes(id), -- Can be null if running a raw template? Or we always create a user_mode wrapper? Let's allow null and link to template if needed, or just enforce user_mode. Prompt says "user_mode_id (or template_id)". Let's add template_id too.
  day_template_id uuid references public.day_templates(id),
  date date not null,
  status text default 'planned', -- planned, in_progress, completed
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.user_day_runs enable row level security;
create policy "Users can CRUD own day runs" on public.user_day_runs using (auth.uid() = user_id);

-- USER BLOCK RUNS
create table public.user_block_runs (
  id uuid default uuid_generate_v4() primary key,
  user_day_run_id uuid references public.user_day_runs(id) on delete cascade not null,
  block_id uuid, -- Reference to original block if needed, but might be loose.
  actual_start timestamp with time zone,
  actual_end timestamp with time zone,
  status text default 'planned', -- planned, completed, skipped
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.user_block_runs enable row level security;
create policy "Users can CRUD own block runs" on public.user_block_runs using (
  exists (select 1 from public.user_day_runs where id = user_block_runs.user_day_run_id and user_id = auth.uid())
);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
