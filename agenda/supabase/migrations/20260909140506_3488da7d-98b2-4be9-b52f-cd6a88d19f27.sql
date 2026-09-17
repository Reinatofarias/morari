ALTER TABLE public.appointments
  ADD COLUMN IF NOT EXISTS kind text NOT NULL DEFAULT 'Atendimento';

ALTER TABLE public.appointments
  DROP CONSTRAINT IF EXISTS appointments_kind_check;
ALTER TABLE public.appointments
  ADD CONSTRAINT appointments_kind_check CHECK (kind IN ('Atendimento','Alinhamento','Reunião'));

CREATE OR REPLACE FUNCTION public.book_appointment(p_date date, p_start time without time zone, p_name text, p_whatsapp text, p_notes text DEFAULT ''::text, p_kind text DEFAULT 'Atendimento'::text)
 RETURNS appointments
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
$function$;

REVOKE ALL ON FUNCTION public.book_appointment(date, time, text, text, text, text) FROM public;
GRANT EXECUTE ON FUNCTION public.book_appointment(date, time, text, text, text, text) TO anon, authenticated;