export type CrmStageKind = 'open' | 'won' | 'lost';

export interface CrmStage {
  id: string;
  name: string;
  position: number;
  color: string;
  kind: CrmStageKind;
}

export interface CrmLead {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  job_title: string | null;
  city: string | null;
  source: string | null;
  stage_id: string | null;
  value: number | null;
  tags: string[];
  notes: string | null;
  next_action: string | null;
  next_action_at: string | null;
  last_contact_at: string | null;
  lost_reason: string | null;
  site_lead_id: string | null;
  import_batch: string | null;
  stage_changed_at: string;
  created_at: string;
  updated_at: string;
}

export type CrmActivityType = 'nota' | 'ligacao' | 'whatsapp' | 'email' | 'reuniao' | 'tarefa' | 'etapa' | 'sistema';

export interface CrmActivity {
  id: string;
  lead_id: string;
  type: CrmActivityType;
  content: string;
  due_at: string | null;
  done: boolean;
  created_at: string;
}

// Campos que podem ser criados/editados pelo painel ou pela importação.
export const CRM_LEAD_EDITABLE_FIELDS = [
  'name',
  'email',
  'phone',
  'company',
  'job_title',
  'city',
  'source',
  'stage_id',
  'value',
  'tags',
  'notes',
  'next_action',
  'next_action_at',
  'last_contact_at',
  'lost_reason',
] as const;

export type CrmLeadInput = Partial<Pick<CrmLead, (typeof CRM_LEAD_EDITABLE_FIELDS)[number]>>;

export const CRM_ACTIVITY_TYPES: { value: CrmActivityType; label: string }[] = [
  { value: 'nota', label: 'Nota' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'ligacao', label: 'Ligação' },
  { value: 'email', label: 'E-mail' },
  { value: 'reuniao', label: 'Reunião' },
  { value: 'tarefa', label: 'Tarefa' },
];
