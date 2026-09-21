DO $$
BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END;
$$;

CREATE TABLE IF NOT EXISTS public.availability (
  weekday smallint PRIMARY KEY CHECK (weekday BETWEEN 0 AND 6),
  enabled boolean NOT NULL DEFAULT true,
  start_time time without time zone NOT NULL DEFAULT '08:00',
  end_time time without time zone NOT NULL DEFAULT '18:00',
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CHECK (start_time < end_time)
);

CREATE TABLE IF NOT EXISTS public.blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  all_day boolean NOT NULL DEFAULT false,
  start_time time without time zone NOT NULL DEFAULT '00:00',
  end_time time without time zone NOT NULL DEFAULT '23:59',
  reason text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CHECK (all_day OR start_time < end_time)
);

CREATE TABLE IF NOT EXISTS public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  start_time time without time zone NOT NULL,
  end_time time without time zone NOT NULL,
  name text NOT NULL,
  whatsapp text NOT NULL,
  notes text,
  kind text NOT NULL DEFAULT 'Atendimento',
  status text NOT NULL DEFAULT 'confirmado',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CHECK (start_time < end_time),
  CHECK (kind IN ('Atendimento','Alinhamento','Reunião')),
  CHECK (status IN ('confirmado','cancelado','concluido'))
);

CREATE UNIQUE INDEX IF NOT EXISTS appointments_confirmed_slot_key
  ON public.appointments (date, start_time)
  WHERE status = 'confirmado';

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

CREATE OR REPLACE FUNCTION public.claim_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN false;
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (auth.uid(), 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION public.booked_times(p_date date)
RETURNS text[]
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT COALESCE(array_agg(to_char(start_time, 'HH24:MI') ORDER BY start_time), ARRAY[]::text[])
  FROM public.appointments
  WHERE date = p_date
    AND status = 'confirmado';
$$;

CREATE OR REPLACE FUNCTION public.book_appointment(
  p_date date,
  p_start time without time zone,
  p_name text,
  p_whatsapp text,
  p_notes text DEFAULT ''::text,
  p_kind text DEFAULT 'Atendimento'::text
)
RETURNS public.appointments
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_slot integer := 60;
  v_av public.availability;
  v_end time;
  v_row public.appointments;
  v_name text := btrim(coalesce(p_name, ''));
  v_phone text := btrim(coalesce(p_whatsapp, ''));
  v_kind text := coalesce(nullif(btrim(p_kind), ''), 'Atendimento');
BEGIN
  IF length(v_name) < 3 OR length(v_name) > 120 THEN
    RAISE EXCEPTION 'Informe seu nome completo.';
  END IF;
  IF length(v_phone) < 10 OR length(v_phone) > 20 THEN
    RAISE EXCEPTION 'Informe um WhatsApp válido com DDD.';
  END IF;
  IF v_kind NOT IN ('Atendimento','Alinhamento','Reunião') THEN
    RAISE EXCEPTION 'Tipo de encontro inválido.';
  END IF;

  v_end := p_start + make_interval(mins => v_slot);

  SELECT * INTO v_av FROM public.availability WHERE weekday = EXTRACT(DOW FROM p_date)::smallint;
  IF v_av IS NULL OR NOT v_av.enabled THEN
    RAISE EXCEPTION 'Não há atendimento nesta data.';
  END IF;
  IF p_start < v_av.start_time OR v_end > v_av.end_time THEN
    RAISE EXCEPTION 'Horário fora do período de atendimento.';
  END IF;
  IF (EXTRACT(EPOCH FROM (p_start - v_av.start_time))::integer % (v_slot * 60)) <> 0 THEN
    RAISE EXCEPTION 'Horário inválido.';
  END IF;

  IF ((p_date + p_start) AT TIME ZONE 'America/Sao_Paulo') <= now() THEN
    RAISE EXCEPTION 'Não é possível agendar em um horário que já passou.';
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.blocks b
    WHERE b.date = p_date
      AND (b.all_day OR (p_start < b.end_time AND b.start_time < v_end))
  ) THEN
    RAISE EXCEPTION 'Este horário está bloqueado na agenda.';
  END IF;

  BEGIN
    INSERT INTO public.appointments (date, start_time, end_time, name, whatsapp, notes, kind)
    VALUES (p_date, p_start, v_end, v_name, v_phone, btrim(coalesce(p_notes, '')), v_kind)
    RETURNING * INTO v_row;
  EXCEPTION WHEN unique_violation THEN
    RAISE EXCEPTION 'Este horário acabou de ser reservado por outra pessoa.';
  END;

  RETURN v_row;
END;
$$;

CREATE OR REPLACE FUNCTION public.reschedule_appointment(p_id uuid, p_date date, p_start time without time zone)
RETURNS public.appointments
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_slot integer := 60;
  v_av public.availability;
  v_end time;
  v_row public.appointments;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Acesso negado.';
  END IF;

  v_end := p_start + make_interval(mins => v_slot);

  SELECT * INTO v_av FROM public.availability WHERE weekday = EXTRACT(DOW FROM p_date)::smallint;
  IF v_av IS NULL OR NOT v_av.enabled THEN
    RAISE EXCEPTION 'Não há atendimento nesta data.';
  END IF;
  IF p_start < v_av.start_time OR v_end > v_av.end_time THEN
    RAISE EXCEPTION 'Horário fora do período de atendimento.';
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.blocks b
    WHERE b.date = p_date
      AND (b.all_day OR (p_start < b.end_time AND b.start_time < v_end))
  ) THEN
    RAISE EXCEPTION 'Este horário está bloqueado na agenda.';
  END IF;

  UPDATE public.appointments
  SET date = p_date, start_time = p_start, end_time = v_end, status = 'confirmado'
  WHERE id = p_id
  RETURNING * INTO v_row;

  IF v_row IS NULL THEN
    RAISE EXCEPTION 'Agendamento não encontrado.';
  END IF;

  RETURN v_row;
END;
$$;

DROP POLICY IF EXISTS "Agenda availability is public" ON public.availability;
CREATE POLICY "Agenda availability is public"
  ON public.availability FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Agenda blocks are public" ON public.blocks;
CREATE POLICY "Agenda blocks are public"
  ON public.blocks FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admins manage availability" ON public.availability;
CREATE POLICY "Admins manage availability"
  ON public.availability FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins manage blocks" ON public.blocks;
CREATE POLICY "Admins manage blocks"
  ON public.blocks FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins manage appointments" ON public.appointments;
CREATE POLICY "Admins manage appointments"
  ON public.appointments FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins read roles" ON public.user_roles;
CREATE POLICY "Admins read roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM public;
REVOKE ALL ON FUNCTION public.claim_admin() FROM public;
REVOKE ALL ON FUNCTION public.reschedule_appointment(uuid, date, time) FROM public;
REVOKE ALL ON FUNCTION public.book_appointment(date, time, text, text, text, text) FROM public;
REVOKE ALL ON FUNCTION public.booked_times(date) FROM public;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.claim_admin() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.reschedule_appointment(uuid, date, time) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.book_appointment(date, time, text, text, text, text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.booked_times(date) TO anon, authenticated, service_role;

INSERT INTO public.availability (weekday, enabled, start_time, end_time) VALUES
  (0, false, '08:00', '18:00'),
  (1, true,  '08:00', '18:00'),
  (2, true,  '08:00', '18:00'),
  (3, true,  '08:00', '18:00'),
  (4, true,  '08:00', '18:00'),
  (5, true,  '08:00', '18:00'),
  (6, false, '08:00', '12:00')
ON CONFLICT (weekday) DO NOTHING;
