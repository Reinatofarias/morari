'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  MessageCircle,
  Mail,
  Trash2,
  Loader2,
  Save,
  StickyNote,
  PhoneCall,
  CalendarCheck,
  ListTodo,
  ArrowRightLeft,
  Info,
  CheckSquare,
  Square,
  X,
} from 'lucide-react';
import type { CrmActivity, CrmActivityType, CrmLead, CrmStage } from '@/lib/crm/types';
import { CRM_ACTIVITY_TYPES } from '@/lib/crm/types';
import { whatsappLink } from '@/lib/crm/normalize';
import {
  ErrorState,
  LeadFormFields,
  LoadingState,
  buttonGhost,
  buttonPrimary,
  crmFetch,
  daysSince,
  formToPayload,
  formatDate,
  fromLocalInput,
  inputClass,
  isOverdue,
  leadToForm,
  stageColor,
  type LeadFormValues,
} from './shared';

const ACTIVITY_ICONS: Record<CrmActivityType, React.ComponentType<{ className?: string }>> = {
  nota: StickyNote,
  ligacao: PhoneCall,
  whatsapp: MessageCircle,
  email: Mail,
  reuniao: CalendarCheck,
  tarefa: ListTodo,
  etapa: ArrowRightLeft,
  sistema: Info,
};

export function CrmLeadDetail({ id }: { id: string }) {
  const router = useRouter();
  const [lead, setLead] = React.useState<CrmLead | null>(null);
  const [stages, setStages] = React.useState<CrmStage[]>([]);
  const [activities, setActivities] = React.useState<CrmActivity[]>([]);
  const [form, setForm] = React.useState<LeadFormValues | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [saving, setSaving] = React.useState(false);
  const [saveMessage, setSaveMessage] = React.useState('');

  const load = React.useCallback(async () => {
    try {
      const data = await crmFetch<{ lead: CrmLead; activities: CrmActivity[]; stages: CrmStage[] }>(
        `/api/admin/crm/leads/${id}`
      );
      setLead(data.lead);
      setStages(data.stages);
      setActivities(data.activities);
      setForm(leadToForm(data.lead));
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar o lead.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  React.useEffect(() => {
    // Adia a primeira carga para fora do corpo do efeito.
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  const refreshActivities = async () => {
    const data = await crmFetch<{ lead: CrmLead; activities: CrmActivity[] }>(`/api/admin/crm/leads/${id}`);
    setActivities(data.activities);
    setLead(data.lead);
  };

  const changeStage = async (stageId: string) => {
    if (!lead || lead.stage_id === stageId) return;
    let lostReason: string | null = lead.lost_reason;
    if (stages.find((stage) => stage.id === stageId)?.kind === 'lost') {
      lostReason = window.prompt('Motivo da perda (opcional):', lead.lost_reason ?? '') ?? lead.lost_reason;
    }
    try {
      const data = await crmFetch<{ lead: CrmLead }>(`/api/admin/crm/leads/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ stage_id: stageId, lost_reason: lostReason }),
      });
      setLead(data.lead);
      setForm((current) => (current ? { ...current, stage_id: stageId } : current));
      await refreshActivities();
    } catch (err) {
      setSaveMessage(err instanceof Error ? err.message : 'Erro ao mudar a etapa.');
    }
  };

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form) return;
    setSaving(true);
    setSaveMessage('');
    try {
      const data = await crmFetch<{ lead: CrmLead }>(`/api/admin/crm/leads/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(formToPayload(form)),
      });
      setLead(data.lead);
      setForm(leadToForm(data.lead));
      setSaveMessage('Alterações salvas.');
      if (data.lead.stage_id !== lead?.stage_id) await refreshActivities();
    } catch (err) {
      setSaveMessage(err instanceof Error ? err.message : 'Erro ao salvar.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!lead || !window.confirm(`Excluir ${lead.name}? O histórico também será apagado.`)) return;
    try {
      await crmFetch(`/api/admin/crm/leads/${id}`, { method: 'DELETE' });
      router.push('/admin/crm/leads');
    } catch (err) {
      setSaveMessage(err instanceof Error ? err.message : 'Erro ao excluir.');
    }
  };

  if (loading) return <LoadingState label="Carregando lead..." />;
  if (error || !lead || !form) return <ErrorState message={error || 'Lead não encontrado.'} onRetry={load} />;

  const wa = whatsappLink(lead.phone);
  const currentIndex = stages.findIndex((stage) => stage.id === lead.stage_id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link href="/admin/crm" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white">
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar ao funil
          </Link>
          <h2 className="mt-2 text-2xl font-bold text-white">{lead.name}</h2>
          <p className="text-sm text-slate-400">
            {[lead.job_title, lead.company, lead.city].filter(Boolean).join(' · ') || 'Sem empresa'} · criado em{' '}
            {formatDate(lead.created_at)} · {daysSince(lead.stage_changed_at)}d na etapa atual
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 text-sm font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          )}
          {lead.email && (
            <a href={`mailto:${lead.email}`} className={buttonGhost}>
              <Mail className="w-4 h-4" />
              E-mail
            </a>
          )}
          <button onClick={remove} className={`${buttonGhost} text-rose-300 hover:text-rose-200`}>
            <Trash2 className="w-4 h-4" />
            Excluir
          </button>
        </div>
      </div>

      {/* Barra de etapas, estilo Pipedrive: clique para mover o lead */}
      <div className="flex overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/50 p-1.5 gap-1">
        {stages.map((stage, index) => {
          const active = stage.id === lead.stage_id;
          const passed = currentIndex >= 0 && index < currentIndex && stage.kind === 'open';
          const color = stageColor(stage.color);
          return (
            <button
              key={stage.id}
              onClick={() => changeStage(stage.id)}
              className={`flex-1 min-w-32 px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                active
                  ? 'bg-amber-500 text-slate-950'
                  : passed
                    ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-slate-950' : color.dot}`} />
              {stage.name}
            </button>
          );
        })}
      </div>
      {lead.lost_reason && stages.find((stage) => stage.id === lead.stage_id)?.kind === 'lost' && (
        <p className="text-sm text-rose-300">Motivo da perda: {lead.lost_reason}</p>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <form onSubmit={save} className="xl:col-span-3 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Dados do lead</h3>
          <LeadFormFields values={form} onChange={setForm} stages={stages} />
          <div className="flex items-center justify-end gap-3">
            {saveMessage && <span className="text-xs text-slate-400">{saveMessage}</span>}
            <button type="submit" disabled={saving} className={buttonPrimary}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Salvar
            </button>
          </div>
        </form>

        <div className="xl:col-span-2 space-y-4">
          <ActivityComposer leadId={lead.id} onCreated={refreshActivities} />
          <ActivityTimeline activities={activities} onChange={setActivities} />
        </div>
      </div>
    </div>
  );
}

function ActivityComposer({ leadId, onCreated }: { leadId: string; onCreated: () => Promise<void> }) {
  const [type, setType] = React.useState<CrmActivityType>('nota');
  const [content, setContent] = React.useState('');
  const [dueAt, setDueAt] = React.useState('');
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState('');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!content.trim()) return;
    setSaving(true);
    setError('');
    try {
      await crmFetch('/api/admin/crm/activities', {
        method: 'POST',
        body: JSON.stringify({ lead_id: leadId, type, content, due_at: type === 'tarefa' ? fromLocalInput(dueAt) : null }),
      });
      setContent('');
      setDueAt('');
      await onCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao registrar.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
      <div className="flex flex-wrap gap-1">
        {CRM_ACTIVITY_TYPES.map((item) => {
          const Icon = ACTIVITY_ICONS[item.value];
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setType(item.value)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                type === item.value ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {item.label}
            </button>
          );
        })}
      </div>
      <textarea
        className={`${inputClass} min-h-20`}
        placeholder={type === 'tarefa' ? 'O que precisa ser feito?' : 'Registre o que aconteceu...'}
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      {type === 'tarefa' && (
        <input className={inputClass} type="datetime-local" value={dueAt} onChange={(event) => setDueAt(event.target.value)} />
      )}
      {error && <p className="text-xs text-rose-300">{error}</p>}
      <div className="flex justify-end">
        <button type="submit" disabled={saving || !content.trim()} className={buttonPrimary}>
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          Registrar
        </button>
      </div>
    </form>
  );
}

function ActivityTimeline({
  activities,
  onChange,
}: {
  activities: CrmActivity[];
  onChange: React.Dispatch<React.SetStateAction<CrmActivity[]>>;
}) {
  const toggleDone = async (activity: CrmActivity) => {
    onChange((current) => current.map((item) => (item.id === activity.id ? { ...item, done: !item.done } : item)));
    try {
      await crmFetch(`/api/admin/crm/activities/${activity.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ done: !activity.done }),
      });
    } catch {
      onChange((current) => current.map((item) => (item.id === activity.id ? activity : item)));
    }
  };

  const remove = async (activity: CrmActivity) => {
    if (!window.confirm('Apagar este registro do histórico?')) return;
    onChange((current) => current.filter((item) => item.id !== activity.id));
    try {
      await crmFetch(`/api/admin/crm/activities/${activity.id}`, { method: 'DELETE' });
    } catch {
      onChange((current) => [activity, ...current]);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5">
      <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Histórico</h3>
      {activities.length === 0 && <p className="text-sm text-slate-500">Nenhuma atividade registrada ainda.</p>}
      <ol className="space-y-3">
        {activities.map((activity) => {
          const Icon = ACTIVITY_ICONS[activity.type] ?? Info;
          const label = CRM_ACTIVITY_TYPES.find((item) => item.value === activity.type)?.label;
          const isTask = activity.type === 'tarefa';
          return (
            <li key={activity.id} className="group flex gap-3">
              <div className="mt-0.5 p-1.5 h-fit rounded-lg bg-slate-800 text-slate-300">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2">
                  {isTask && (
                    <button onClick={() => toggleDone(activity)} className="mt-0.5 text-amber-400" title="Marcar como feita">
                      {activity.done ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                    </button>
                  )}
                  <p className={`text-sm whitespace-pre-wrap ${activity.done && isTask ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {activity.content}
                  </p>
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  {label && `${label} · `}
                  {formatDate(activity.created_at, true)}
                  {activity.due_at && (
                    <span className={!activity.done && isOverdue(activity.due_at) ? 'text-rose-300' : ''}>
                      {' '}· prazo {formatDate(activity.due_at, true)}
                    </span>
                  )}
                </p>
              </div>
              {activity.type !== 'sistema' && activity.type !== 'etapa' && (
                <button
                  onClick={() => remove(activity)}
                  className="opacity-0 group-hover:opacity-100 p-1 h-fit rounded-md text-slate-500 hover:text-rose-300"
                  title="Apagar"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
