'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  Settings2,
  FileSpreadsheet,
  MessageCircle,
  CalendarClock,
  Building2,
  Users,
  Wallet,
  Trophy,
  AlertTriangle,
} from 'lucide-react';
import type { CrmLead, CrmStage } from '@/lib/crm/types';
import { whatsappLink } from '@/lib/crm/normalize';
import {
  ErrorState,
  LoadingState,
  NewLeadModal,
  buttonGhost,
  buttonPrimary,
  crmFetch,
  daysSince,
  formatDate,
  formatMoney,
  inputClass,
  isOverdue,
  leadMatches,
  stageColor,
  useCrmLeads,
} from './shared';

export function CrmPipelineView() {
  const router = useRouter();
  const { leads, setLeads, stages, loading, error, reload } = useCrmLeads();
  const [query, setQuery] = React.useState('');
  const [source, setSource] = React.useState('');
  const [newLeadStage, setNewLeadStage] = React.useState<string | null>(null);
  const [dragOver, setDragOver] = React.useState<string | null>(null);
  const [moveError, setMoveError] = React.useState('');

  const sources = React.useMemo(
    () => Array.from(new Set(leads.map((lead) => lead.source).filter(Boolean) as string[])).sort(),
    [leads]
  );

  const visible = React.useMemo(
    () => leads.filter((lead) => leadMatches(lead, query) && (!source || lead.source === source)),
    [leads, query, source]
  );

  const stats = React.useMemo(() => {
    const kindOf = new Map(stages.map((stage) => [stage.id, stage.kind]));
    const open = leads.filter((lead) => kindOf.get(lead.stage_id ?? '') === 'open');
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    const wonThisMonth = leads.filter(
      (lead) => kindOf.get(lead.stage_id ?? '') === 'won' && new Date(lead.stage_changed_at) >= monthStart
    );
    return {
      open: open.length,
      pipeline: open.reduce((sum, lead) => sum + Number(lead.value ?? 0), 0),
      won: wonThisMonth.length,
      wonValue: wonThisMonth.reduce((sum, lead) => sum + Number(lead.value ?? 0), 0),
      overdue: open.filter((lead) => isOverdue(lead.next_action_at)).length,
    };
  }, [leads, stages]);

  const moveLead = async (leadId: string, stageId: string) => {
    const lead = leads.find((item) => item.id === leadId);
    if (!lead || lead.stage_id === stageId) return;
    const previous = lead.stage_id;
    setMoveError('');
    setLeads((current) =>
      current.map((item) =>
        item.id === leadId ? { ...item, stage_id: stageId, stage_changed_at: new Date().toISOString() } : item
      )
    );
    try {
      await crmFetch(`/api/admin/crm/leads/${leadId}`, { method: 'PATCH', body: JSON.stringify({ stage_id: stageId }) });
    } catch (err) {
      setLeads((current) => current.map((item) => (item.id === leadId ? { ...item, stage_id: previous } : item)));
      setMoveError(err instanceof Error ? err.message : 'Não foi possível mover o lead.');
    }
  };

  if (loading) return <LoadingState label="Carregando o funil..." />;
  if (error) return <ErrorState message={error} onRetry={reload} />;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Leads em aberto" value={String(stats.open)} />
        <StatCard icon={Wallet} label="Valor no funil" value={formatMoney(stats.pipeline)} />
        <StatCard icon={Trophy} label="Ganhos no mês" value={`${stats.won} · ${formatMoney(stats.wonValue)}`} />
        <StatCard
          icon={AlertTriangle}
          label="Follow-ups atrasados"
          value={String(stats.overdue)}
          tone={stats.overdue > 0 ? 'alert' : 'default'}
          href="/admin/crm/prospeccao"
        />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            className={`${inputClass} pl-9`}
            placeholder="Buscar por nome, empresa, telefone, etiqueta..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <select className={`${inputClass} lg:w-56`} value={source} onChange={(event) => setSource(event.target.value)}>
          <option value="">Todas as origens</option>
          {sources.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <Link href="/admin/crm/etapas" className={buttonGhost}>
            <Settings2 className="w-4 h-4" />
            Etapas
          </Link>
          <Link href="/admin/crm/importar" className={buttonGhost}>
            <FileSpreadsheet className="w-4 h-4" />
            Importar
          </Link>
          <button onClick={() => setNewLeadStage(stages[0]?.id ?? '')} className={buttonPrimary}>
            <Plus className="w-4 h-4" />
            Novo lead
          </button>
        </div>
      </div>

      {moveError && <p className="text-sm text-rose-300">{moveError}</p>}

      <div className="flex gap-4 overflow-x-auto pb-4 -mx-8 px-8">
        {stages.map((stage) => (
          <StageColumn
            key={stage.id}
            stage={stage}
            leads={visible.filter((lead) => lead.stage_id === stage.id)}
            isDragOver={dragOver === stage.id}
            onDragOver={() => setDragOver(stage.id)}
            onDragLeave={() => setDragOver((current) => (current === stage.id ? null : current))}
            onDrop={(leadId) => {
              setDragOver(null);
              void moveLead(leadId, stage.id);
            }}
            onAdd={() => setNewLeadStage(stage.id)}
          />
        ))}
      </div>

      {newLeadStage !== null && (
        <NewLeadModal
          stages={stages}
          defaultStageId={newLeadStage}
          onClose={() => setNewLeadStage(null)}
          onCreated={(lead) => {
            setLeads((current) => [lead, ...current]);
            setNewLeadStage(null);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone = 'default',
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone?: 'default' | 'alert';
  href?: string;
}) {
  const content = (
    <div
      className={`rounded-2xl border p-4 transition-all ${
        tone === 'alert' ? 'border-rose-500/30 bg-rose-500/10' : 'border-slate-800 bg-slate-900/60'
      } ${href ? 'hover:border-slate-700' : ''}`}
    >
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        <Icon className={`w-3.5 h-3.5 ${tone === 'alert' ? 'text-rose-400' : 'text-amber-400'}`} />
        {label}
      </div>
      <p className="mt-2 text-lg font-bold text-white">{value}</p>
    </div>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}

function StageColumn({
  stage,
  leads,
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onAdd,
}: {
  stage: CrmStage;
  leads: CrmLead[];
  isDragOver: boolean;
  onDragOver: () => void;
  onDragLeave: () => void;
  onDrop: (leadId: string) => void;
  onAdd: () => void;
}) {
  const color = stageColor(stage.color);
  const total = leads.reduce((sum, lead) => sum + Number(lead.value ?? 0), 0);

  return (
    <div
      className={`flex-shrink-0 w-72 rounded-2xl border border-t-4 ${color.border} bg-slate-900/50 flex flex-col max-h-[calc(100vh-320px)] min-h-64 transition-all ${
        isDragOver ? 'border-amber-500/60 bg-slate-900' : 'border-slate-800'
      }`}
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        onDragOver();
      }}
      onDragLeave={onDragLeave}
      onDrop={(event) => {
        event.preventDefault();
        const leadId = event.dataTransfer.getData('text/plain');
        if (leadId) onDrop(leadId);
      }}
    >
      <div className="px-4 pt-3 pb-2 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-white truncate">{stage.name}</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {leads.length} {leads.length === 1 ? 'lead' : 'leads'} · {formatMoney(total)}
          </p>
        </div>
        <button
          onClick={onAdd}
          className="p-1 rounded-lg text-slate-500 hover:text-amber-400 hover:bg-slate-800"
          title={`Adicionar lead em ${stage.name}`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2">
        {leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
        {leads.length === 0 && (
          <p className="text-center text-[11px] text-slate-600 py-6 border border-dashed border-slate-800 rounded-xl">
            Arraste leads para cá
          </p>
        )}
      </div>
    </div>
  );
}

function LeadCard({ lead }: { lead: CrmLead }) {
  const wa = whatsappLink(lead.phone);
  const days = daysSince(lead.stage_changed_at);
  const overdue = isOverdue(lead.next_action_at);

  return (
    <div
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData('text/plain', lead.id);
        event.dataTransfer.effectAllowed = 'move';
      }}
      className="group rounded-xl border border-slate-800 bg-slate-950 p-3 cursor-grab active:cursor-grabbing hover:border-slate-700 transition-all"
    >
      <div className="flex items-start justify-between gap-2">
        <Link href={`/admin/crm/leads/${lead.id}`} className="text-sm font-semibold text-white hover:text-amber-400 leading-snug">
          {lead.name}
        </Link>
        {wa && (
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="p-1 rounded-md text-emerald-400 hover:bg-emerald-500/10 flex-shrink-0"
            title="Abrir WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
      {(lead.company || lead.job_title) && (
        <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-400 truncate">
          <Building2 className="w-3 h-3 flex-shrink-0" />
          {[lead.job_title, lead.company].filter(Boolean).join(' · ')}
        </p>
      )}
      {lead.next_action && (
        <p className={`mt-2 flex items-start gap-1 text-[11px] ${overdue ? 'text-rose-300' : 'text-slate-300'}`}>
          <CalendarClock className="w-3 h-3 mt-0.5 flex-shrink-0" />
          <span>
            {lead.next_action}
            {lead.next_action_at && <span className="text-slate-500"> · {formatDate(lead.next_action_at, true)}</span>}
          </span>
        </p>
      )}
      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1 min-w-0">
          {lead.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-1.5 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-300 truncate max-w-24">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-500 flex-shrink-0">
          {lead.value ? <span className="text-amber-300 font-semibold">{formatMoney(lead.value)}</span> : null}
          {days !== null && <span title="Dias nesta etapa">{days}d</span>}
        </div>
      </div>
    </div>
  );
}
