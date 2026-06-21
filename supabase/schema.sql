-- LabSight landing/admin database setup.
-- Run in the Supabase SQL editor before using the admin publishing workflow.

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text default 'Editorial',
  status text default 'Draft',
  reading_time text default '~5 min',
  author text default 'LabSight Editorial',
  summary text default '',
  tags text default '',
  body text default '',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text default 'labops_waitlist',
  message text,
  created_at timestamptz not null default now()
);

alter table public.articles enable row level security;
alter table public.waitlist_entries enable row level security;

drop policy if exists "Anyone can read published articles" on public.articles;
create policy "Anyone can read published articles"
  on public.articles for select
  using (status = 'Published');

-- Admin article writes should go through server route handlers using
-- SUPABASE_SERVICE_ROLE_KEY. Do not allow anonymous public article editing.

drop policy if exists "Anyone can join waitlist" on public.waitlist_entries;
create policy "Anyone can join waitlist"
  on public.waitlist_entries for insert
  with check (true);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
  before update on public.articles
  for each row
  execute function public.set_updated_at();
