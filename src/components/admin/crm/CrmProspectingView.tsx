'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, PhoneCall, Loader2, CheckCircle2 } from 'lucide-react';
import type { CrmActivityType, CrmLead, CrmStage } from '@/lib/crm/types';
import { CRM_ACTIVITY_TYPES } from '@/lib/crm/types';
import { formatPhone, whatsappLink } from '@/lib/crm/normalize';
import {
  ErrorState,
  Field,
  LoadingState,
  Modal,
  StageBadge,
  buttonGhost,
  buttonPrimary,
  crmFetch,
  daysSince,
  formatDate,
  fromLocalInput,
  inputClass,
  isOverdue,
  isToday,
  leadMatches,
  useCrmLeads,
} from './shared';

type QueueKey = 'overdue' | 'today' | 'week' | 'no_action' | 'never';

const QUEUES: { key: QueueKey; label: string; hint: string }[] = [
  { key: 'overdue', label: 'Atrasados', hint: 'Follow-ups com data vencida.' },
  { key: 'today', label: 'Para hoje', hint: 'Ações marcadas para hoje.' },
  { key: 'week', label: 'Próximos 7 dias', hint: 'O que vem pela frente.' },
  { key: 'never', label: 'Nunca contatados', hint: 'Leads em aberto que ainda não receberam contato.' },
  { key: 'no_action', label: 'Sem próxima ação', hint: 'Leads em aberto sem follow-up marcado.' },
];

const TEMPLATE_KEY = 'mm_crm_whatsapp_template';
const DEFAULT_TEMPLATE = 'Olá, {nome}! Aqui é o Matheus Morari. Tudo bem?';

function fillTemplate(template: string, lead: CrmLead) {
  const firstName = lead.name.split(' ')[0] ?? lead.name;
  return template.replaceAll('{nome}', firstName).replaceAll('{empresa}', lead.company ?? '');
}

export function CrmProspectingView() {
  const { leads, setLeads, stages, loading, error, reload } = useCrmLeads();
  const [queue, setQueue] = React.useState<QueueKey>('overdue');
  const [query, setQuery] = React.useState('');
  const [template, setTemplate] = React.useState(DEFAULT_TEMPLATE);
  const [now] = React.useState(() => Date.now());
  const [contactLead, setContactLead] = React.useState<{ lead: CrmLead; type: CrmActivityType } | null>(null);

  React.useEffect(() => {
    try {
      const saved = window.localStorage.getItem(TEMPLATE_KEY);
      // Lido só no navegador, depois da hidratação, para não divergir do HTML do servidor.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setTemplate(saved);
    } catch {
      // armazenamento indisponível: usa o modelo padrão
    }
  }, []);

  const saveTemplate = (value: string) => {
    setTemplate(value);
    try {
      window.localStorage.setItem(TEMPLATE_KEY, value);
    } catch {
      // ignora
    }
  };

  const openLeads = React.useMemo(() => {
    const openStages = new Set(stages.filter((stage) => stage.kind === 'open').map((stage) => stage.id));
    return leads.filter((lead) => lead.stage_id && openStages.has(lead.stage_id));
  }, [leads, stages]);

  const queues = React.useMemo(() => {
    const weekAhead = now + 7 * 86_400_000;
    const byDate = (a: CrmLead, b: CrmLead) =>
      new Date(a.next_action_at ?? 0).getTime() - new Date(b.next_action_at ?? 0).getTime();
    return {
      overdue: openLeads.filter((lead) => isOverdue(lead.next_action_at) && !isToday(lead.next_action_at)).sort(byDate),
      today: openLeads.filter((lead) => isToday(lead.next_action_at)).sort(byDate),
      week: openLeads
        .filter((lead) => {
          if (!lead.next_action_at || isToday(lead.next_action_at)) return false;
          const time = new Date(lead.next_action_at).getTime();
          return time > now && time <= weekAhead;
        })
        .sort(byDate),
      never: openLeads.filter((lead) => !lead.last_contact_at),
      no_action: openLeads.filter((lead) => !lead.next_action_at),
    } satisfies Record<QueueKey, CrmLead[]>;
  }, [openLeads, now]);

  const list = queues[queue].filter((lead) => leadMatches(lead, query));
  const stageById = new Map(stages.map((stage) => [stage.id, stage]));

  if (loading) return <LoadingState label="Montando sua fila de prospecção..." />;
  if (error) return <ErrorState message={error} onRetry={reload} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {QUEUES.map((item) => (
          <button
            key={item.key}
            onClick={() => setQueue(item.key)}
            className={`px-3.5 py-2 rounded-xl text-sm font-medium border transition-all ${
              queue === item.key
                ? 'bg-amber-500 text-slate-950 border-amber-500 font-semibold'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {item.label}
            <span
              className={`ml-2 px-1.5 py-0.5 rounded-md text-[11px] ${
                queue === item.key ? 'bg-slate-950/20' : item.key === 'overdue' && queues.overdue.length ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800'
              }`}
            >
              {queues[item.key].length}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <input
            className={inputClass}
            placeholder="Filtrar a fila por nome, empresa, etiqueta..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <p className="mt-2 text-xs text-slate-500">{QUEUES.find((item) => item.key === queue)?.hint}</p>
        </div>
        <Field label="Mensagem padrão do WhatsApp ({nome}, {empresa})">
          <textarea className={`${inputClass} min-h-16 text-xs`} value={template} onChange={(event) => saveTemplate(event.target.value)} />
        </Field>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 divide-y divide-slate-800">
        {list.length === 0 && (
          <div className="py-14 text-center text-sm text-slate-500">
            <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
            Nada nesta fila. Bom trabalho!
          </div>
        )}
        {list.map((lead) => {
          const wa = whatsappLink(lead.phone, fillTemplate(template, lead));
          const overdue = isOverdue(lead.next_action_at);
          return (
            <div key={lead.id} className="p-4 flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/admin/crm/leads/${lead.id}`} className="font-semibold text-white hover:text-amber-400">
                    {lead.name}
                  </Link>
                  <StageBadge stage={stageById.get(lead.stage_id ?? '')} />
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  {[lead.job_title, lead.company, lead.city].filter(Boolean).join(' · ') || 'Sem empresa'}
                  {lead.phone && <span className="text-slate-500"> · {formatPhone(lead.phone)}</span>}
                </p>
                <p className={`mt-1 text-xs ${overdue ? 'text-rose-300' : 'text-slate-300'}`}>
                  {lead.next_action
                    ? `${lead.next_action}${lead.next_action_at ? ` · ${formatDate(lead.next_action_at, true)}` : ''}`
                    : 'Sem próxima ação definida'}
                  {lead.last_contact_at
                    ? <span className="text-slate-500"> · último contato há {daysSince(lead.last_contact_at)}d</span>
                    : <span className="text-slate-500"> · nunca contatado</span>}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {wa && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setContactLead({ lead, type: 'whatsapp' })}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 text-sm font-medium"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                )}
                <button onClick={() => setContactLead({ lead, type: 'ligacao' })} className={buttonGhost}>
                  <PhoneCall className="w-4 h-4" />
                  Registrar contato
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {contactLead && (
        <QuickContactModal
          lead={contactLead.lead}
          initialType={contactLead.type}
          stages={stages}
          onClose={() => setContactLead(null)}
          onSaved={(updated) => {
            setLeads((current) => current.map((item) => (item.id === updated.id ? updated : item)));
            setContactLead(null);
          }}
        />
      )}
    </div>
  );
}

export function QuickContactModal({
  lead,
  initialType,
  stages,
  onClose,
  onSaved,
}: {
  lead: CrmLead;
  initialType: CrmActivityType;
  stages: CrmStage[];
  onClose: () => void;
  onSaved: (lead: CrmLead) => void;
}) {
  const [type, setType] = React.useState<CrmActivityType>(initialType);
  const [content, setContent] = React.useState('');
  const [stageId, setStageId] = React.useState(lead.stage_id ?? '');
  const [nextAction, setNextAction] = React.useState('');
  const [nextAt, setNextAt] = React.useState('');
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState('');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      const label = CRM_ACTIVITY_TYPES.find((item) => item.value === type)?.label ?? 'Contato';
      await crmFetch('/api/admin/crm/activities', {
        method: 'POST',
        body: JSON.stringify({ lead_id: lead.id, type, content: content.trim() || `${label} realizado.` }),
      });
      const patch: Record<string, unknown> = {
        next_action: nextAction || null,
        next_action_at: fromLocalInput(nextAt),
      };
      if (stageId && stageId !== lead.stage_id) patch.stage_id = stageId;
      const data = await crmFetch<{ lead: CrmLead }>(`/api/admin/crm/leads/${lead.id}`, {
        method: 'PATCH',
        body: JSON.stringify(patch),
      });
      onSaved(data.lead);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar.');
      setSaving(false);
    }
  };

  return (
    <Modal title={`Registrar contato · ${lead.name}`} onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Tipo de contato">
            <select className={inputClass} value={type} onChange={(event) => setType(event.target.value as CrmActivityType)}>
              {CRM_ACTIVITY_TYPES.filter((item) => item.value !== 'tarefa').map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Mover para a etapa">
            <select className={inputClass} value={stageId} onChange={(event) => setStageId(event.target.value)}>
              {stages.map((stage) => (
                <option key={stage.id} value={stage.id}>
                  {stage.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Como foi? (resumo)" className="sm:col-span-2">
            <textarea
              className={`${inputClass} min-h-20`}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Respondeu, pediu para falar semana que vem..."
              autoFocus
            />
          </Field>
          <Field label="Próxima ação">
            <input className={inputClass} value={nextAction} onChange={(event) => setNextAction(event.target.value)} placeholder="Retornar contato" />
          </Field>
          <Field label="Quando">
            <input className={inputClass} type="datetime-local" value={nextAt} onChange={(event) => setNextAt(event.target.value)} />
          </Field>
        </div>
        {error && <p className="text-sm text-rose-300">{error}</p>}
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className={buttonGhost}>
            Cancelar
          </button>
          <button type="submit" disabled={saving} className={buttonPrimary}>
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Salvar contato
          </button>
        </div>
      </form>
    </Modal>
  );
}
