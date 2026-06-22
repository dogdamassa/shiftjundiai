-- Shift Wiki LLM interviews, approved knowledge and agent audit trail
create type public.wiki_respondent_role as enum ('owner', 'leader');
create type public.wiki_review_status as enum ('submitted', 'reviewed', 'approved');
create type public.wiki_entry_status as enum ('draft', 'approved', 'archived');

create table public.wiki_interviews (
  id uuid primary key default gen_random_uuid(),
  respondent_name text not null,
  respondent_role public.wiki_respondent_role not null,
  respondent_title text not null,
  answers jsonb not null default '[]'::jsonb,
  status public.wiki_review_status not null default 'submitted',
  jotform_submission_id text unique,
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  approved_at timestamptz
);

create table public.wiki_entries (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null,
  content text not null,
  source_role public.wiki_respondent_role not null,
  source_interview_id uuid references public.wiki_interviews(id) on delete set null,
  status public.wiki_entry_status not null default 'draft',
  approved_by uuid references public.profiles(id),
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.wiki_agent_events (
  id uuid primary key default gen_random_uuid(),
  channel text not null default 'whatsapp',
  contact_id text,
  question text not null,
  answer text,
  outcome text not null check (outcome in ('answered', 'handoff', 'unanswered', 'error')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create trigger wiki_entries_set_updated_at
before update on public.wiki_entries
for each row execute function public.set_updated_at();

alter table public.wiki_interviews enable row level security;
alter table public.wiki_entries enable row level security;
alter table public.wiki_agent_events enable row level security;

create policy "admins manage wiki interviews"
  on public.wiki_interviews for all
  using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');
create policy "admins manage wiki entries"
  on public.wiki_entries for all
  using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');
create policy "admins read agent events"
  on public.wiki_agent_events for select
  using (public.current_role() = 'admin');

insert into storage.buckets (id, name, public)
values ('wiki-interview-audio', 'wiki-interview-audio', false)
on conflict (id) do nothing;

create policy "admins read wiki interview audio"
  on storage.objects for select
  using (bucket_id = 'wiki-interview-audio' and public.current_role() = 'admin');

