-- Shift Jundiai - classes, finance, announcements and self check-in
create type public.invoice_status as enum (
  'pending',
  'paid',
  'overdue',
  'cancelled',
  'exempt'
);

create type public.subscription_status as enum (
  'active',
  'paused',
  'cancelled',
  'ended'
);

alter table public.professionals
  add column if not exists public_name text,
  add column if not exists public_role text,
  add column if not exists public_bio text,
  add column if not exists public_image_url text,
  add column if not exists instagram text,
  add column if not exists modalities text[] not null default '{}',
  add column if not exists featured boolean not null default false,
  add column if not exists display_order integer not null default 0;

create table public.plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  amount numeric(10,2) not null check (amount >= 0),
  billing_day integer not null default 10 check (billing_day between 1 and 28),
  includes_flow boolean not null default true,
  includes_move boolean not null default true,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.student_subscriptions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  plan_id uuid not null references public.plans(id),
  status public.subscription_status not null default 'active',
  starts_on date not null,
  ends_on date,
  access_suspended boolean not null default false,
  suspension_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index student_one_active_subscription
  on public.student_subscriptions(student_id)
  where status = 'active';

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references public.student_subscriptions(id),
  reference_month date not null,
  due_date date not null,
  amount numeric(10,2) not null check (amount >= 0),
  discount numeric(10,2) not null default 0 check (discount >= 0),
  status public.invoice_status not null default 'pending',
  paid_at timestamptz,
  notes text,
  created_by uuid default auth.uid() references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (subscription_id, reference_month)
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  amount numeric(10,2) not null check (amount > 0),
  paid_at timestamptz not null default now(),
  method text not null default 'manual',
  note text,
  confirmed_by uuid not null default auth.uid() references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.recurring_class_templates (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id),
  professional_id uuid not null references public.professionals(id),
  weekday integer not null check (weekday between 0 and 6),
  starts_at_local time not null,
  duration_minutes integer not null check (duration_minutes > 0),
  capacity integer not null check (capacity > 0),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.class_exceptions (
  id uuid primary key default gen_random_uuid(),
  template_id uuid references public.recurring_class_templates(id) on delete cascade,
  class_date date not null,
  action text not null check (action in ('cancel', 'replace', 'add')),
  professional_id uuid references public.professionals(id),
  starts_at_local time,
  capacity integer check (capacity > 0),
  reason text,
  created_at timestamptz not null default now()
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  image_url text,
  priority text not null default 'normal'
    check (priority in ('normal', 'important', 'urgent')),
  pinned boolean not null default false,
  published_at timestamptz not null default now(),
  expires_at timestamptz,
  archived_at timestamptz,
  created_by uuid not null default auth.uid() references public.profiles(id),
  updated_at timestamptz not null default now()
);

create table public.announcement_reads (
  announcement_id uuid not null references public.announcements(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  read_at timestamptz not null default now(),
  primary key (announcement_id, profile_id)
);

create trigger plans_set_updated_at
before update on public.plans
for each row execute function public.set_updated_at();

create trigger subscriptions_set_updated_at
before update on public.student_subscriptions
for each row execute function public.set_updated_at();

create trigger invoices_set_updated_at
before update on public.invoices
for each row execute function public.set_updated_at();

create trigger announcements_set_updated_at
before update on public.announcements
for each row execute function public.set_updated_at();

create or replace function public.student_has_active_access(p_student_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.student_subscriptions subscription
    where subscription.student_id = p_student_id
      and subscription.status = 'active'
      and not subscription.access_suspended
      and subscription.starts_on <= current_date
      and (subscription.ends_on is null or subscription.ends_on >= current_date)
  );
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
  v_starts_at timestamptz;
  v_capacity integer;
  v_requires_credit boolean;
  v_active_bookings integer;
  v_booking_id uuid;
begin
  v_student_id := public.current_student_id();
  if v_student_id is null then
    raise exception 'Somente alunos podem realizar reservas';
  end if;

  if not public.student_has_active_access(v_student_id) then
    raise exception 'Plano inativo ou acesso suspenso';
  end if;

  select slot.service_id, slot.starts_at, slot.capacity, service.requires_credit
    into v_service_id, v_starts_at, v_capacity, v_requires_credit
  from public.availability_slots slot
  join public.services service on service.id = slot.service_id
  where slot.id = p_slot_id
    and slot.status = 'open'
  for update of slot;

  if not found then
    raise exception 'Horario indisponivel';
  end if;

  if now() < v_starts_at - interval '7 days' then
    raise exception 'A agenda abre sete dias antes';
  end if;

  if now() >= v_starts_at - interval '10 minutes' then
    raise exception 'A agenda deste horario esta encerrada';
  end if;

  select count(*)::integer into v_active_bookings
  from public.bookings
  where slot_id = p_slot_id and status = 'confirmed';

  if v_active_bookings >= v_capacity then
    raise exception 'Horario lotado';
  end if;

  if v_requires_credit
    and public.available_credit_balance(v_student_id, v_service_id) < 1 then
    raise exception 'Saldo de credito insuficiente';
  end if;

  insert into public.bookings (slot_id, student_id)
  values (p_slot_id, v_student_id)
  returning id into v_booking_id;

  if v_requires_credit then
    insert into public.credit_ledger (
      student_id, service_id, entry_type, quantity, booking_id, note
    ) values (
      v_student_id, v_service_id, 'debit', -1, v_booking_id,
      'Credito consumido na reserva'
    );
  end if;

  return v_booking_id;
end;
$$;

create or replace function public.check_in_booking(p_booking_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_booking public.bookings%rowtype;
  v_starts_at timestamptz;
  v_attendance_id uuid;
begin
  select booking, slot.starts_at
    into v_booking, v_starts_at
  from public.bookings booking
  join public.availability_slots slot on slot.id = booking.slot_id
  where booking.id = p_booking_id
  for update of booking;

  if not found then
    raise exception 'Reserva nao encontrada';
  end if;

  if v_booking.status <> 'confirmed' then
    raise exception 'Reserva sem check-in disponivel';
  end if;

  if public.current_role() = 'student'
    and v_booking.student_id <> public.current_student_id() then
    raise exception 'Acesso restrito';
  end if;

  if public.current_role() = 'student'
    and (now() < v_starts_at - interval '10 minutes'
      or now() > v_starts_at + interval '30 minutes') then
    raise exception 'Check-in fora da janela permitida';
  end if;

  insert into public.attendances (booking_id, checked_in_by)
  values (p_booking_id, auth.uid())
  returning id into v_attendance_id;

  update public.bookings
  set status = 'completed'
  where id = p_booking_id;

  return v_attendance_id;
exception
  when unique_violation then
    raise exception 'Check-in ja realizado';
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
  v_starts_at timestamptz;
  v_service_id uuid;
  v_requires_credit boolean;
begin
  select booking, slot.starts_at
    into v_booking, v_starts_at
  from public.bookings booking
  join public.availability_slots slot on slot.id = booking.slot_id
  where booking.id = p_booking_id
  for update of booking;

  if not found or not public.can_access_student(v_booking.student_id) then
    raise exception 'Reserva nao encontrada';
  end if;

  if v_booking.status <> 'confirmed' then
    raise exception 'A reserva nao pode mais ser cancelada';
  end if;

  if public.current_role() = 'student'
    and now() >= v_starts_at - interval '10 minutes' then
    raise exception 'O cancelamento encerrou dez minutos antes';
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
      student_id, service_id, entry_type, quantity, booking_id, note
    ) values (
      v_booking.student_id, v_service_id, 'refund', 1, p_booking_id,
      'Credito devolvido por cancelamento'
    );
  end if;
end;
$$;

create or replace function public.mark_expired_bookings_no_show()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
begin
  if public.current_role() not in ('admin', 'trainer') then
    raise exception 'Acesso restrito';
  end if;

  update public.bookings booking
  set status = 'no_show'
  from public.availability_slots slot
  where booking.slot_id = slot.id
    and booking.status = 'confirmed'
    and slot.starts_at + interval '30 minutes' < now()
    and not exists (
      select 1 from public.attendances attendance
      where attendance.booking_id = booking.id
    );

  get diagnostics v_count = row_count;
  return v_count;
end;
$$;

alter table public.plans enable row level security;
alter table public.student_subscriptions enable row level security;
alter table public.invoices enable row level security;
alter table public.payments enable row level security;
alter table public.recurring_class_templates enable row level security;
alter table public.class_exceptions enable row level security;
alter table public.announcements enable row level security;
alter table public.announcement_reads enable row level security;

create policy "authenticated read plans"
  on public.plans for select to authenticated using (active or public.current_role() = 'admin');
create policy "admins manage plans"
  on public.plans for all using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

create policy "authorized subscriptions read"
  on public.student_subscriptions for select
  using (public.can_access_student(student_id));
create policy "admins manage subscriptions"
  on public.student_subscriptions for all using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

create policy "authorized invoices read"
  on public.invoices for select using (
    exists (
      select 1 from public.student_subscriptions subscription
      where subscription.id = subscription_id
        and public.can_access_student(subscription.student_id)
    )
  );
create policy "admins manage invoices"
  on public.invoices for all using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

create policy "authorized payments read"
  on public.payments for select using (
    exists (
      select 1
      from public.invoices invoice
      join public.student_subscriptions subscription
        on subscription.id = invoice.subscription_id
      where invoice.id = invoice_id
        and public.can_access_student(subscription.student_id)
    )
  );
create policy "admins manage payments"
  on public.payments for all using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

create policy "authenticated read class templates"
  on public.recurring_class_templates for select to authenticated using (active);
create policy "admins manage class templates"
  on public.recurring_class_templates for all using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

create policy "authenticated read class exceptions"
  on public.class_exceptions for select to authenticated using (true);
create policy "admins manage class exceptions"
  on public.class_exceptions for all using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

create policy "students read active announcements"
  on public.announcements for select to authenticated using (
    (
      archived_at is null
      and published_at <= now()
      and (expires_at is null or expires_at > now())
    )
    or public.current_role() = 'admin'
  );
create policy "admins manage announcements"
  on public.announcements for all using (public.current_role() = 'admin')
  with check (public.current_role() = 'admin');

create policy "users read own announcement status"
  on public.announcement_reads for select using (profile_id = auth.uid());
create policy "users mark own announcements read"
  on public.announcement_reads for insert with check (profile_id = auth.uid());
create policy "admins read announcement status"
  on public.announcement_reads for select using (public.current_role() = 'admin');

insert into public.services (slug, name, duration_minutes, default_capacity, requires_credit)
values
  ('shift-flow', 'Shift Flow', 45, 14, false),
  ('shift-move', 'Shift Move', 50, 12, false)
on conflict (slug) do update set
  name = excluded.name,
  duration_minutes = excluded.duration_minutes,
  default_capacity = excluded.default_capacity,
  requires_credit = false,
  active = true;

insert into public.plans (name, description, amount, billing_day)
values (
  'Shift Performance',
  'Treino personalizado e acesso livre as aulas Shift Flow e Shift Move.',
  1400,
  15
);
