'use client';

import React from 'react';
import { X, Loader2 } from 'lucide-react';
import type { CrmLead, CrmStage } from '@/lib/crm/types';
import { formatPhone } from '@/lib/crm/normalize';

export async function crmFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    cache: 'no-store',
  });
  const data = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) throw new Error(data.error || 'Erro ao falar com o servidor.');
  return data;
}

// Classes fixas para o Tailwind encontrar no build.
export const STAGE_COLORS: Record<string, { dot: string; badge: string; border: string; label: string }> = {
  slate: { dot: 'bg-slate-400', badge: 'bg-slate-500/10 text-slate-300 border-slate-500/30', border: 'border-t-slate-400', label: 'Cinza' },
  sky: { dot: 'bg-sky-400', badge: 'bg-sky-500/10 text-sky-300 border-sky-500/30', border: 'border-t-sky-400', label: 'Azul claro' },
  blue: { dot: 'bg-blue-500', badge: 'bg-blue-500/10 text-blue-300 border-blue-500/30', border: 'border-t-blue-500', label: 'Azul' },
  violet: { dot: 'bg-violet-400', badge: 'bg-violet-500/10 text-violet-300 border-violet-500/30', border: 'border-t-violet-400', label: 'Violeta' },
  amber: { dot: 'bg-amber-400', badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30', border: 'border-t-amber-400', label: 'Âmbar' },
  orange: { dot: 'bg-orange-400', badge: 'bg-orange-500/10 text-orange-300 border-orange-500/30', border: 'border-t-orange-400', label: 'Laranja' },
  pink: { dot: 'bg-pink-400', badge: 'bg-pink-500/10 text-pink-300 border-pink-500/30', border: 'border-t-pink-400', label: 'Rosa' },
  teal: { dot: 'bg-teal-400', badge: 'bg-teal-500/10 text-teal-300 border-teal-500/30', border: 'border-t-teal-400', label: 'Verde-água' },
  emerald: { dot: 'bg-emerald-400', badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30', border: 'border-t-emerald-400', label: 'Verde' },
  rose: { dot: 'bg-rose-400', badge: 'bg-rose-500/10 text-rose-300 border-rose-500/30', border: 'border-t-rose-400', label: 'Vermelho' },
};

export function stageColor(color: string | undefined) {
  return STAGE_COLORS[color ?? 'slate'] ?? STAGE_COLORS.slate;
}

export function StageBadge({ stage }: { stage: CrmStage | undefined }) {
  if (!stage) return <span className="text-xs text-slate-500">Sem etapa</span>;
  const color = stageColor(stage.color);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-semibold ${color.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${color.dot}`} />
      {stage.name}
    </span>
  );
}

const moneyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

export function formatMoney(value: number | null | undefined) {
  return moneyFormatter.format(Number(value ?? 0));
}

export function formatDate(value: string | null | undefined, withTime = false) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: withTime ? undefined : '2-digit',
    hour: withTime ? '2-digit' : undefined,
    minute: withTime ? '2-digit' : undefined,
    timeZone: 'America/Sao_Paulo',
  });
}

export function daysSince(value: string | null | undefined) {
  if (!value) return null;
  const diff = Date.now() - new Date(value).getTime();
  return Math.max(0, Math.floor(diff / 86_400_000));
}

export function isOverdue(value: string | null | undefined) {
  return !!value && new Date(value).getTime() < Date.now();
}

export function isToday(value: string | null | undefined) {
  if (!value) return false;
  const fmt = (date: Date) => date.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  return fmt(new Date(value)) === fmt(new Date());
}

// Converte ISO -> valor aceito por <input type="datetime-local"> no fuso de São Paulo.
export function toLocalInput(value: string | null | undefined) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const parts = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
  return parts.replace(' ', 'T');
}

// Interpreta o valor do <input type="datetime-local"> como horário de São Paulo (UTC-3).
export function fromLocalInput(value: string) {
  if (!value) return null;
  return new Date(`${value}:00-03:00`).toISOString();
}

export function leadMatches(lead: CrmLead, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const digits = q.replace(/\D/g, '');
  return (
    lead.name.toLowerCase().includes(q) ||
    (lead.email ?? '').includes(q) ||
    (lead.company ?? '').toLowerCase().includes(q) ||
    (lead.city ?? '').toLowerCase().includes(q) ||
    (lead.source ?? '').toLowerCase().includes(q) ||
    lead.tags.some((tag) => tag.toLowerCase().includes(q)) ||
    (digits.length >= 3 && (lead.phone ?? '').includes(digits))
  );
}

export const inputClass =
  'w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all';

export const buttonPrimary =
  'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-semibold transition-all disabled:opacity-50';

export const buttonGhost =
  'inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-sm font-medium transition-all disabled:opacity-50';

export function Field({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">{label}</span>
      {children}
    </label>
  );
}

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/80 backdrop-blur-sm p-4 sm:p-10" onMouseDown={onClose}>
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <h3 className="text-base font-bold text-white">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800" aria-label="Fechar">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function LoadingState({ label = 'Carregando...' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-20 text-sm text-slate-400">
      <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
      {label}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 text-sm text-rose-200">
      <p className="font-semibold">Não foi possível carregar o CRM.</p>
      <p className="mt-1 text-rose-200/80">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className={`${buttonGhost} mt-3`}>
          Tentar de novo
        </button>
      )}
    </div>
  );
}

export function useCrmLeads() {
  const [leads, setLeads] = React.useState<CrmLead[]>([]);
  const [stages, setStages] = React.useState<CrmStage[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  const reload = React.useCallback(async () => {
    setError('');
    try {
      const data = await crmFetch<{ leads: CrmLead[]; stages: CrmStage[] }>('/api/admin/crm/leads');
      setLeads(data.leads);
      setStages(data.stages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    let active = true;
    // Traz leads novos do formulário do site antes de carregar a lista.
    crmFetch('/api/admin/crm/sync-site', { method: 'POST' })
      .catch(() => undefined)
      .finally(() => {
        if (active) void reload();
      });
    return () => {
      active = false;
    };
  }, [reload]);

  return { leads, setLeads, stages, loading, error, reload };
}

export type LeadFormValues = {
  name: string;
  email: string;
  phone: string;
  company: string;
  job_title: string;
  city: string;
  source: string;
  stage_id: string;
  value: string;
  tags: string;
  next_action: string;
  next_action_at: string;
  notes: string;
};

export function leadToForm(lead?: Partial<CrmLead>, defaultStageId = ''): LeadFormValues {
  return {
    name: lead?.name ?? '',
    email: lead?.email ?? '',
    phone: lead?.phone ? formatPhone(lead.phone) : '',
    company: lead?.company ?? '',
    job_title: lead?.job_title ?? '',
    city: lead?.city ?? '',
    source: lead?.source ?? '',
    stage_id: lead?.stage_id ?? defaultStageId,
    value: lead?.value != null ? String(lead.value) : '',
    tags: (lead?.tags ?? []).join(', '),
    next_action: lead?.next_action ?? '',
    next_action_at: toLocalInput(lead?.next_action_at),
    notes: lead?.notes ?? '',
  };
}

export function formToPayload(values: LeadFormValues) {
  return {
    ...values,
    next_action_at: fromLocalInput(values.next_action_at),
    value: values.value,
    tags: values.tags,
  };
}

export function LeadFormFields({
  values,
  onChange,
  stages,
}: {
  values: LeadFormValues;
  onChange: (values: LeadFormValues) => void;
  stages: CrmStage[];
}) {
  const set = (key: keyof LeadFormValues) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    onChange({ ...values, [key]: event.target.value });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Nome *" className="sm:col-span-2">
        <input className={inputClass} value={values.name} onChange={set('name')} required autoFocus />
      </Field>
      <Field label="WhatsApp / Telefone">
        <input className={inputClass} value={values.phone} onChange={set('phone')} placeholder="(69) 99999-9999" />
      </Field>
      <Field label="E-mail">
        <input className={inputClass} type="email" value={values.email} onChange={set('email')} />
      </Field>
      <Field label="Empresa">
        <input className={inputClass} value={values.company} onChange={set('company')} />
      </Field>
      <Field label="Cargo">
        <input className={inputClass} value={values.job_title} onChange={set('job_title')} />
      </Field>
      <Field label="Cidade">
        <input className={inputClass} value={values.city} onChange={set('city')} />
      </Field>
      <Field label="Origem">
        <input className={inputClass} value={values.source} onChange={set('source')} placeholder="Instagram, indicação, evento..." />
      </Field>
      <Field label="Etapa do funil">
        <select className={inputClass} value={values.stage_id} onChange={set('stage_id')}>
          {stages.map((stage) => (
            <option key={stage.id} value={stage.id}>
              {stage.name}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Valor estimado (R$)">
        <input className={inputClass} inputMode="decimal" value={values.value} onChange={set('value')} placeholder="0,00" />
      </Field>
      <Field label="Etiquetas (separadas por vírgula)" className="sm:col-span-2">
        <input className={inputClass} value={values.tags} onChange={set('tags')} placeholder="empresário, indicação, quente" />
      </Field>
      <Field label="Próxima ação">
        <input className={inputClass} value={values.next_action} onChange={set('next_action')} placeholder="Ligar para apresentar o programa" />
      </Field>
      <Field label="Quando">
        <input className={inputClass} type="datetime-local" value={values.next_action_at} onChange={set('next_action_at')} />
      </Field>
      <Field label="Observações" className="sm:col-span-2">
        <textarea className={`${inputClass} min-h-24`} value={values.notes} onChange={set('notes')} />
      </Field>
    </div>
  );
}

export function NewLeadModal({
  stages,
  defaultStageId,
  onClose,
  onCreated,
}: {
  stages: CrmStage[];
  defaultStageId?: string;
  onClose: () => void;
  onCreated: (lead: CrmLead) => void;
}) {
  const [values, setValues] = React.useState(() => leadToForm(undefined, defaultStageId ?? stages[0]?.id ?? ''));
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState('');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      const data = await crmFetch<{ lead: CrmLead }>('/api/admin/crm/leads', {
        method: 'POST',
        body: JSON.stringify(formToPayload(values)),
      });
      onCreated(data.lead);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar.');
      setSaving(false);
    }
  };

  return (
    <Modal title="Novo lead" onClose={onClose}>
      <form onSubmit={submit} className="space-y-5">
        <LeadFormFields values={values} onChange={setValues} stages={stages} />
        {error && <p className="text-sm text-rose-300">{error}</p>}
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className={buttonGhost}>
            Cancelar
          </button>
          <button type="submit" disabled={saving} className={buttonPrimary}>
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Salvar lead
          </button>
        </div>
      </form>
    </Modal>
  );
}
