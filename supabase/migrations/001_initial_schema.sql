-- Shift Jundiaí - initial production schema
create extension if not exists "pgcrypto";

create type public.user_role as enum ('admin', 'trainer', 'student');
create type public.booking_status as enum ('confirmed', 'completed', 'cancelled', 'no_show');
create type public.credit_entry_type as enum ('grant', 'debit', 'refund', 'adjustment');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'student',
  full_name text not null,
  phone text,
  avatar_url text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.students (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  goal text,
  member_since date not null default current_date,
  notes text,
  created_at timestamptz not null default now()
);

create table public.professionals (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  specialty text not null,
  bio text,
  created_at timestamptz not null default now()
);

create table public.trainer_students (
  trainer_id uuid not null references public.professionals(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  active boolean not null default true,
  assigned_at timestamptz not null default now(),
  primary key (trainer_id, student_id)
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  duration_minutes integer not null check (duration_minutes > 0),
  default_capacity integer not null default 1 check (default_capacity > 0),
  requires_credit boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.availability_slots (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id),
  professional_id uuid not null references public.professionals(id),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  capacity integer not null check (capacity > 0),
  status text not null default 'open' check (status in ('open', 'blocked', 'cancelled')),
  created_at timestamptz not null default now(),
  check (ends_at > starts_at)
);

create index availability_slots_starts_at_idx
  on public.availability_slots(starts_at);
create index availability_slots_professional_idx
  on public.availability_slots(professional_id, starts_at);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  slot_id uuid not null references public.availability_slots(id),
  student_id uuid not null references public.students(id),
  status public.booking_status not null default 'confirmed',
  booked_at timestamptz not null default now(),
  cancelled_at timestamptz,
  cancellation_reason text,
  created_by uuid not null default auth.uid() references public.profiles(id)
);

create unique index bookings_unique_active_student_slot
  on public.bookings(slot_id, student_id)
  where status in ('confirmed', 'completed');
create index bookings_slot_status_idx on public.bookings(slot_id, status);
create index bookings_student_idx on public.bookings(student_id, booked_at desc);

create table public.student_service_rules (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  service_id uuid not null references public.services(id) on delete cascade,
  grant_quantity integer not null default 1 check (grant_quantity >= 0),
  cycle_days integer check (cycle_days > 0),
  next_grant_at timestamptz,
  active boolean not null default true,
  unique (student_id, service_id)
);

create table public.credit_ledger (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  service_id uuid not null references public.services(id),
  entry_type public.credit_entry_type not null,
  quantity integer not null check (quantity <> 0),
  booking_id uuid references public.bookings(id),
  expires_at timestamptz,
  note text,
  created_by uuid default auth.uid() references public.profiles(id),
  created_at timestamptz not null default now()
);

create index credit_ledger_balance_idx
  on public.credit_ledger(student_id, service_id, expires_at);

create table public.assessments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  professional_id uuid not null references public.professionals(id),
  assessed_at timestamptz not null default now(),
  weight_kg numeric(6,2),
  body_fat_percentage numeric(5,2),
  muscle_mass_kg numeric(6,2),
  observations text,
  created_at timestamptz not null default now()
);

create table public.measurements (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments(id) on delete cascade,
  name text not null,
  value_cm numeric(7,2) not null,
  unique (assessment_id, name)
);

create table public.progress_photos (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  storage_path text not null unique,
  angle text check (angle in ('front', 'side', 'back', 'other')),
  created_at timestamptz not null default now()
);

create table public.exercises (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  instructions text,
  video_url text,
  active boolean not null default true
);

create table public.workout_plans (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  trainer_id uuid not null references public.professionals(id),
  name text not null,
  goal text,
  starts_on date not null,
  ends_on date,
  active boolean not null default true,
  notes text,
  created_at timestamptz not null default now()
);

create table public.workout_items (
  id uuid primary key default gen_random_uuid(),
  workout_plan_id uuid not null references public.workout_plans(id) on delete cascade,
  exercise_id uuid not null references public.exercises(id),
  position integer not null,
  sets integer not null check (sets > 0),
  reps text not null,
  prescribed_load text,
  rest_seconds integer,
  notes text,
  unique (workout_plan_id, position)
);

create table public.workout_logs (
  id uuid primary key default gen_random_uuid(),
  workout_item_id uuid not null references public.workout_items(id),
  student_id uuid not null references public.students(id) on delete cascade,
  performed_at timestamptz not null default now(),
  sets_completed integer not null,
  reps_completed text,
  load_used text,
  perceived_effort integer check (perceived_effort between 1 and 10),
  notes text
);

create table public.attendances (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null unique references public.bookings(id),
  checked_in_at timestamptz not null default now(),
  checked_in_by uuid not null default auth.uid() references public.profiles(id),
  notes text
);

create table public.site_content (
  key text primary key,
  value jsonb not null,
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create or replace function public.current_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.current_student_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id from public.students where profile_id = auth.uid();
$$;

create or replace function public.current_professional_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id from public.professionals where profile_id = auth.uid();
$$;

create or replace function public.can_access_student(p_student_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    public.current_role() = 'admin'
    or public.current_student_id() = p_student_id
    or exists (
      select 1
      from public.trainer_students ts
      where ts.student_id = p_student_id
        and ts.trainer_id = public.current_professional_id()
        and ts.active
    );
$$;

create or replace function public.available_credit_balance(
  p_student_id uuid,
  p_service_id uuid
)
returns integer
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(sum(quantity), 0)::integer
  from public.credit_ledger
  where student_id = p_student_id
    and service_id = p_service_id
    and (expires_at is null or expires_at > now());
$$;

create or replace function public.book_session(p_slot_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_student_id uuid;
  v_service_id uuid;
  v_capacity integer;
  v_requires_credit boolean;
  v_active_bookings integer;
  v_booking_id uuid;
begin
  v_student_id := public.current_student_id();
  if v_student_id is null then
    raise exception 'Somente alunos podem realizar reservas';
  end if;

  select slot.service_id, slot.capacity, service.requires_credit
    into v_service_id, v_capacity, v_requires_credit
  from public.availability_slots slot
  join public.services service on service.id = slot.service_id
  where slot.id = p_slot_id
    and slot.status = 'open'
    and slot.starts_at > now()
  for update of slot;

  if not found then
    raise exception 'Horário indisponível';
  end if;

  select count(*)::integer
    into v_active_bookings
  from public.bookings
  where slot_id = p_slot_id
    and status = 'confirmed';

  if v_active_bookings >= v_capacity then
    raise exception 'Horário lotado';
  end if;

  if v_requires_credit
    and public.available_credit_balance(v_student_id, v_service_id) < 1 then
    raise exception 'Saldo de crédito insuficiente';
  end if;

  insert into public.bookings (slot_id, student_id)
  values (p_slot_id, v_student_id)
  returning id into v_booking_id;

  if v_requires_credit then
    insert into public.credit_ledger (
      student_id,
      service_id,
      entry_type,
      quantity,
      booking_id,
      note
    ) values (
      v_student_id,
      v_service_id,
      'debit',
      -1,
      v_booking_id,
      'Crédito consumido na reserva'
    );
  end if;

  return v_booking_id;
end;
$$;

create or replace function public.cancel_booking(
  p_booking_id uuid,
  p_reason text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_booking public.bookings%rowtype;
  v_service_id uuid;
  v_requires_credit boolean;
begin
  select * into v_booking
  from public.bookings
  where id = p_booking_id
  for update;

  if not found or not public.can_access_student(v_booking.student_id) then
    raise exception 'Reserva não encontrada';
  end if;

  if v_booking.status <> 'confirmed' then
    raise exception 'A reserva não pode mais ser cancelada';
  end if;

  update public.bookings
  set status = 'cancelled',
      cancelled_at = now(),
      cancellation_reason = p_reason
  where id = p_booking_id;

  select service.id, service.requires_credit
    into v_service_id, v_requires_credit
  from public.availability_slots slot
  join public.services service on service.id = slot.service_id
  where slot.id = v_booking.slot_id;

  if v_requires_credit then
    insert into public.credit_ledger (
      student_id,
      service_id,
      entry_type,
      quantity,
      booking_id,
      note
    ) values (
      v_booking.student_id,
      v_service_id,
      'refund',
      1,
      p_booking_id,
      'Crédito devolvido por cancelamento'
    );
  end if;
end;
$$;

create or replace function public.grant_due_service_credits()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_rule public.student_service_rules%rowtype;
  v_count integer := 0;
begin
  if public.current_role() <> 'admin' then
    raise exception 'Acesso restrito';
  end if;

  for v_rule in
    select *
    from public.student_service_rules
    where active
      and cycle_days is not null
      and next_grant_at <= now()
    for update
  loop
    insert into public.credit_ledger (
      student_id,
      service_id,
      entry_type,
      quantity,
      note
    ) values (
      v_rule.student_id,
      v_rule.service_id,
      'grant',
      v_rule.grant_quantity,
      'Liberação recorrente'
    );

    update public.student_service_rules
    set next_grant_at = v_rule.next_grant_at + make_interval(days => v_rule.cycle_days)
    where id = v_rule.id;

    v_count := v_count + 1;
  end loop;

  return v_count;
end;
$$;

alter table public.profiles enable row level security;
alter table public.students enable row level security;
alter table public.professionals enable row level security;
alter table public.trainer_students enable row level security;
alter table public.services enable row level security;
alter table public.availability_slots enable row level security;
alter table public.bookings enable row level security;
alter table public.student_service_rules enable row level security;
alter table public.credit_ledger enable row level security;
alter table public.assessments enable row level security;
alter table public.measurements enable row level security;
alter table public.progress_photos enable row level security;
alter table public.exercises enable row level security;
alter table public.workout_plans enable row level security;
alter table public.workout_items enable row level security;
alter table public.workout_logs enable row level security;
alter table public.attendances enable row level security;
alter table public.site_content enable row level security;

create policy "profiles own or admin read"
  on public.profiles for select
  using (id = auth.uid() or public.current_role() = 'admin');
create policy "admins manage profiles"
  on public.profiles for all
  using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

create policy "authorized student access"
  on public.students for select
  using (public.can_access_student(id));
create policy "admins manage students"
  on public.students for all
  using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

create policy "authenticated read professionals"
  on public.professionals for select to authenticated using (true);
create policy "admins manage professionals"
  on public.professionals for all
  using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

create policy "authorized trainer assignments"
  on public.trainer_students for select
  using (
    public.current_role() = 'admin'
    or trainer_id = public.current_professional_id()
    or student_id = public.current_student_id()
  );
create policy "admins manage trainer assignments"
  on public.trainer_students for all
  using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

create policy "authenticated read active services"
  on public.services for select to authenticated using (active or public.current_role() = 'admin');
create policy "admins manage services"
  on public.services for all
  using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

create policy "authenticated read open slots"
  on public.availability_slots for select to authenticated
  using (status = 'open' or public.current_role() in ('admin', 'trainer'));
create policy "staff manage slots"
  on public.availability_slots for all
  using (public.current_role() in ('admin', 'trainer'))
  with check (public.current_role() in ('admin', 'trainer'));

create policy "authorized booking read"
  on public.bookings for select
  using (public.can_access_student(student_id));
create policy "admins manage bookings"
  on public.bookings for all
  using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

create policy "authorized service rules read"
  on public.student_service_rules for select
  using (public.can_access_student(student_id));
create policy "admins manage service rules"
  on public.student_service_rules for all
  using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

create policy "authorized credits read"
  on public.credit_ledger for select
  using (public.can_access_student(student_id));
create policy "admins manage credits"
  on public.credit_ledger for all
  using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

create policy "authorized assessments read"
  on public.assessments for select
  using (public.can_access_student(student_id));
create policy "staff manage assessments"
  on public.assessments for all
  using (
    public.current_role() = 'admin'
    or (
      public.current_role() = 'trainer'
      and public.can_access_student(student_id)
    )
  )
  with check (
    public.current_role() = 'admin'
    or (
      public.current_role() = 'trainer'
      and public.can_access_student(student_id)
    )
  );

create policy "authorized measurements read"
  on public.measurements for select
  using (
    exists (
      select 1 from public.assessments a
      where a.id = assessment_id and public.can_access_student(a.student_id)
    )
  );
create policy "staff manage measurements"
  on public.measurements for all
  using (
    exists (
      select 1 from public.assessments a
      where a.id = assessment_id
        and public.can_access_student(a.student_id)
        and public.current_role() in ('admin', 'trainer')
    )
  )
  with check (
    exists (
      select 1 from public.assessments a
      where a.id = assessment_id
        and public.can_access_student(a.student_id)
        and public.current_role() in ('admin', 'trainer')
    )
  );

create policy "authorized progress photos"
  on public.progress_photos for select
  using (public.can_access_student(student_id));
create policy "staff manage progress photos"
  on public.progress_photos for all
  using (
    public.current_role() in ('admin', 'trainer')
    and public.can_access_student(student_id)
  )
  with check (
    public.current_role() in ('admin', 'trainer')
    and public.can_access_student(student_id)
  );

create policy "authenticated exercise read"
  on public.exercises for select to authenticated using (active);
create policy "staff manage exercises"
  on public.exercises for all
  using (public.current_role() in ('admin', 'trainer'))
  with check (public.current_role() in ('admin', 'trainer'));

create policy "authorized workout plans"
  on public.workout_plans for select
  using (public.can_access_student(student_id));
create policy "staff manage workout plans"
  on public.workout_plans for all
  using (
    public.current_role() in ('admin', 'trainer')
    and public.can_access_student(student_id)
  )
  with check (
    public.current_role() in ('admin', 'trainer')
    and public.can_access_student(student_id)
  );

create policy "authorized workout items"
  on public.workout_items for select
  using (
    exists (
      select 1 from public.workout_plans plan
      where plan.id = workout_plan_id
        and public.can_access_student(plan.student_id)
    )
  );
create policy "staff manage workout items"
  on public.workout_items for all
  using (
    exists (
      select 1 from public.workout_plans plan
      where plan.id = workout_plan_id
        and public.can_access_student(plan.student_id)
        and public.current_role() in ('admin', 'trainer')
    )
  )
  with check (
    exists (
      select 1 from public.workout_plans plan
      where plan.id = workout_plan_id
        and public.can_access_student(plan.student_id)
        and public.current_role() in ('admin', 'trainer')
    )
  );

create policy "authorized workout logs read"
  on public.workout_logs for select
  using (public.can_access_student(student_id));
create policy "students create own logs"
  on public.workout_logs for insert
  with check (student_id = public.current_student_id());
create policy "staff manage workout logs"
  on public.workout_logs for all
  using (
    public.current_role() in ('admin', 'trainer')
    and public.can_access_student(student_id)
  )
  with check (
    public.current_role() in ('admin', 'trainer')
    and public.can_access_student(student_id)
  );

create policy "authorized attendances read"
  on public.attendances for select
  using (
    exists (
      select 1 from public.bookings b
      where b.id = booking_id and public.can_access_student(b.student_id)
    )
  );
create policy "staff manage attendances"
  on public.attendances for all
  using (public.current_role() in ('admin', 'trainer'))
  with check (public.current_role() in ('admin', 'trainer'));

create policy "public read site content"
  on public.site_content for select using (true);
create policy "admins manage site content"
  on public.site_content for all
  using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

insert into public.services (slug, name, duration_minutes, default_capacity, requires_credit)
values
  ('training', 'Treino personalizado', 60, 2, false),
  ('recovery', 'Recovery', 40, 1, true),
  ('physiotherapy', 'Fisioterapia', 50, 1, true),
  ('nutrition', 'Nutrição', 60, 1, true)
on conflict (slug) do nothing;

insert into public.site_content (key, value)
values
  (
    'contact',
    '{"whatsapp":"+55 (11) 97377-1914","address":"Av. 9 de Julho, 3290 - Loja 4, Centro, Jundiaí - SP"}'::jsonb
  ),
  (
    'hero',
    '{"headline":"Não é academia. É Shift.","description":"Um método de treino construído ao redor de você."}'::jsonb
  )
on conflict (key) do nothing;

insert into storage.buckets (id, name, public)
values ('progress-photos', 'progress-photos', false)
on conflict (id) do nothing;

create policy "authorized users read progress photo objects"
  on storage.objects for select
  using (
    bucket_id = 'progress-photos'
    and public.can_access_student((storage.foldername(name))[1]::uuid)
  );

create policy "staff upload progress photo objects"
  on storage.objects for insert
  with check (
    bucket_id = 'progress-photos'
    and public.current_role() in ('admin', 'trainer')
    and public.can_access_student((storage.foldername(name))[1]::uuid)
  );

create policy "staff update progress photo objects"
  on storage.objects for update
  using (
    bucket_id = 'progress-photos'
    and public.current_role() in ('admin', 'trainer')
    and public.can_access_student((storage.foldername(name))[1]::uuid)
  );

create policy "staff delete progress photo objects"
  on storage.objects for delete
  using (
    bucket_id = 'progress-photos'
    and public.current_role() in ('admin', 'trainer')
    and public.can_access_student((storage.foldername(name))[1]::uuid)
  );
