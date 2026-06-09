-- Shift Jundiai - monthly check-in competition
create table public.league_profiles (
  student_id uuid primary key references public.students(id) on delete cascade,
  display_name text not null,
  initials text not null check (char_length(initials) between 1 and 3),
  opted_in boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger league_profiles_set_updated_at
before update on public.league_profiles
for each row execute function public.set_updated_at();

alter table public.league_profiles enable row level security;

create policy "authenticated read league participants"
  on public.league_profiles for select to authenticated
  using (opted_in or student_id = public.current_student_id() or public.current_role() = 'admin');

create policy "students update own league profile"
  on public.league_profiles for update
  using (student_id = public.current_student_id())
  with check (student_id = public.current_student_id());

create policy "admins manage league profiles"
  on public.league_profiles for all
  using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

create or replace function public.get_shift_league(
  p_month date default date_trunc('month', current_date)::date
)
returns table (
  position bigint,
  display_name text,
  initials text,
  checkins bigint,
  is_current_student boolean
)
language sql
stable
security definer
set search_path = public
as $$
  with monthly_scores as (
    select
      league.student_id,
      league.display_name,
      league.initials,
      count(attendance.id) as checkins
    from public.league_profiles league
    left join public.bookings booking
      on booking.student_id = league.student_id
    left join public.attendances attendance
      on attendance.booking_id = booking.id
      and attendance.checked_in_at >= date_trunc('month', p_month::timestamp)
      and attendance.checked_in_at < date_trunc('month', p_month::timestamp) + interval '1 month'
    where league.opted_in
    group by league.student_id, league.display_name, league.initials
  )
  select
    dense_rank() over (order by score.checkins desc, score.display_name) as position,
    score.display_name,
    score.initials,
    score.checkins,
    score.student_id = public.current_student_id() as is_current_student
  from monthly_scores score
  order by position, score.display_name;
$$;

revoke all on function public.get_shift_league(date) from public;
grant execute on function public.get_shift_league(date) to authenticated;

update public.site_content
set value = jsonb_set(value, '{whatsapp}', '"+55 (11) 97377-1914"'::jsonb, true),
    updated_at = now()
where key = 'contact';
