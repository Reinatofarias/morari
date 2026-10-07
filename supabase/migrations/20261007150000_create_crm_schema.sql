-- CRM de gestão de leads (painel /admin/crm)
-- Acesso somente pelo servidor (service role). RLS ligada e sem políticas públicas.

CREATE TABLE IF NOT EXISTS public.crm_stages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  color text NOT NULL DEFAULT 'slate',
  kind text NOT NULL DEFAULT 'open' CHECK (kind IN ('open', 'won', 'lost')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.crm_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  company text,
  job_title text,
  city text,
  source text,
  stage_id uuid REFERENCES public.crm_stages(id) ON DELETE SET NULL,
  value numeric(12, 2),
  tags text[] NOT NULL DEFAULT '{}',
  notes text,
  next_action text,
  next_action_at timestamptz,
  last_contact_at timestamptz,
  lost_reason text,
  site_lead_id uuid UNIQUE,
  import_batch text,
  stage_changed_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS crm_leads_stage_idx ON public.crm_leads (stage_id);
CREATE INDEX IF NOT EXISTS crm_leads_next_action_idx ON public.crm_leads (next_action_at);
CREATE INDEX IF NOT EXISTS crm_leads_email_idx ON public.crm_leads (lower(email));
CREATE INDEX IF NOT EXISTS crm_leads_phone_idx ON public.crm_leads (phone);

CREATE TABLE IF NOT EXISTS public.crm_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.crm_leads(id) ON DELETE CASCADE,
  type text NOT NULL DEFAULT 'nota'
    CHECK (type IN ('nota', 'ligacao', 'whatsapp', 'email', 'reuniao', 'tarefa', 'etapa', 'sistema')),
  content text NOT NULL DEFAULT '',
  due_at timestamptz,
  done boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS crm_activities_lead_idx ON public.crm_activities (lead_id, created_at DESC);

CREATE OR REPLACE FUNCTION public.crm_touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  IF NEW.stage_id IS DISTINCT FROM OLD.stage_id THEN
    NEW.stage_changed_at := now();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS crm_leads_touch ON public.crm_leads;
CREATE TRIGGER crm_leads_touch
  BEFORE UPDATE ON public.crm_leads
  FOR EACH ROW EXECUTE FUNCTION public.crm_touch_updated_at();

ALTER TABLE public.crm_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_activities ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.crm_stages, public.crm_leads, public.crm_activities FROM anon, authenticated;
GRANT ALL ON public.crm_stages, public.crm_leads, public.crm_activities TO service_role;

-- Etapas iniciais do funil (podem ser editadas no painel)
INSERT INTO public.crm_stages (name, position, color, kind)
SELECT * FROM (VALUES
  ('Novo lead', 0, 'sky', 'open'),
  ('Primeiro contato', 1, 'violet', 'open'),
  ('Qualificado', 2, 'amber', 'open'),
  ('Sessão agendada', 3, 'orange', 'open'),
  ('Proposta / negociação', 4, 'pink', 'open'),
  ('Cliente (ganho)', 5, 'emerald', 'won'),
  ('Perdido', 6, 'rose', 'lost')
) AS seed(name, position, color, kind)
WHERE NOT EXISTS (SELECT 1 FROM public.crm_stages);
