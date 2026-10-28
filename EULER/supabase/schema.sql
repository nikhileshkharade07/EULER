-- EULER starter schema. Apply in a Supabase SQL editor only after reviewing.
create extension if not exists pgcrypto;
create extension if not exists vector;

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'New conversation',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'queued'
    check (status in ('queued', 'running', 'awaiting_approval', 'completed', 'failed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.memories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  category text not null default 'general',
  pinned boolean not null default false,
  embedding vector(1536),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  task_id uuid references public.tasks(id) on delete set null,
  event_type text not null,
  status text not null default 'info',
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.tasks enable row level security;
alter table public.memories enable row level security;
alter table public.activity_logs enable row level security;

create policy "Users can manage their own conversations"
  on public.conversations for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can manage their own messages"
  on public.messages for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can manage their own tasks"
  on public.tasks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can manage their own memories"
  on public.memories for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can read their own activity"
  on public.activity_logs for select using (auth.uid() = user_id);
