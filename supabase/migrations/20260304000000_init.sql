-- =============================================================================
-- Migration: 20260304000000_init.sql
-- Description: Initial schema — profiles table with auto-create trigger & RLS
-- =============================================================================

create table if not exists public.profiles (
  id          uuid        not null references auth.users (id) on delete cascade,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  email       text,
  full_name   text,
  avatar_url  text,

  constraint profiles_pkey primary key (id)
);

create index if not exists profiles_email_idx on public.profiles (email);

comment on table public.profiles is
  'Public user profile data. Extended from auth.users via trigger.';

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger profiles_set_updated_at
  before update on public.profiles
  for each row
  execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name'
    ),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "No direct inserts"
  on public.profiles
  for insert
  with check (false);

create policy "No direct deletes"
  on public.profiles
  for delete
  using (false);