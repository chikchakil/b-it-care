create extension if not exists "pgcrypto";

do $$ begin
  create type public.user_role as enum ('admin', 'staff');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.lead_status as enum (
    'new',
    'contacted',
    'call_scheduled',
    'proposal_pending',
    'converted',
    'not_relevant'
  );
exception
  when duplicate_object then null;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text,
  email text not null unique,
  role public.user_role not null default 'staff',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text not null,
  business_name text not null,
  message text not null,
  source text not null default 'website',
  status public.lead_status not null default 'new',
  assigned_to uuid references public.profiles(id) on delete set null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
before update on public.leads
for each row execute function public.set_updated_at();

create index if not exists profiles_user_id_idx on public.profiles(user_id);
create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists leads_status_idx on public.leads(status);
create index if not exists leads_created_at_idx on public.leads(created_at desc);
create index if not exists leads_assigned_to_idx on public.leads(assigned_to);

create or replace function public.current_profile_role()
returns public.user_role
language sql
security definer
set search_path = public
as $$
  select role
  from public.profiles
  where user_id = auth.uid()
    and is_active = true
  limit 1;
$$;

alter table public.profiles enable row level security;
alter table public.leads enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
on public.profiles
for select
to authenticated
using (
  user_id = auth.uid()
  or public.current_profile_role() = 'admin'
);

drop policy if exists "profiles_admin_write" on public.profiles;
create policy "profiles_admin_write"
on public.profiles
for all
to authenticated
using (public.current_profile_role() = 'admin')
with check (public.current_profile_role() = 'admin');

drop policy if exists "leads_admin_staff_select" on public.leads;
create policy "leads_admin_staff_select"
on public.leads
for select
to authenticated
using (public.current_profile_role() in ('admin', 'staff'));

drop policy if exists "leads_admin_staff_update" on public.leads;
create policy "leads_admin_staff_update"
on public.leads
for update
to authenticated
using (public.current_profile_role() in ('admin', 'staff'))
with check (public.current_profile_role() in ('admin', 'staff'));

drop policy if exists "leads_admin_delete" on public.leads;
create policy "leads_admin_delete"
on public.leads
for delete
to authenticated
using (public.current_profile_role() = 'admin');

-- Public website inserts are handled through the Next.js API route with SUPABASE_SERVICE_ROLE_KEY.
-- Do not create an anonymous insert policy unless you intentionally want direct browser inserts.
