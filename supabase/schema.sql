create table if not exists public.diagnosis_reports (
  id text primary key,
  user_id text not null,
  business_name text not null,
  created_at timestamptz not null default now(),
  free_leak jsonb not null,
  leaks jsonb not null,
  answers jsonb not null,
  pro_unlocked boolean not null default false,
  payment_status text not null default 'free'
);

create index if not exists diagnosis_reports_user_id_idx
  on public.diagnosis_reports (user_id, created_at desc);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  report_id text not null references public.diagnosis_reports(id) on delete cascade,
  user_id text not null,
  provider text not null,
  provider_payment_id text,
  amount_usd numeric(10,2) not null,
  status text not null,
  created_at timestamptz not null default now()
);

create index if not exists payments_user_id_idx
  on public.payments (user_id, created_at desc);
