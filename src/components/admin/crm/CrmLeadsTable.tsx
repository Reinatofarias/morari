'use client';

import React from 'react';
import Link from 'next/link';
import { Download, Plus, Search, Trash2, Tag, ArrowRightLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import type { CrmLead } from '@/lib/crm/types';
import { formatPhone } from '@/lib/crm/normalize';
import {
  ErrorState,
  LoadingState,
  NewLeadModal,
  StageBadge,
  buttonGhost,
  buttonPrimary,
  crmFetch,
  formatDate,
  formatMoney,
  inputClass,
  isOverdue,
  leadMatches,
  useCrmLeads,
} from './shared';

type SortKey = 'created_at' | 'name' | 'next_action_at' | 'value' | 'last_contact_at';
const PAGE_SIZE = 50;

function csvEscape(value: unknown) {
  const text = value === null || value === undefined ? '' : String(value);
  return /[";\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function CrmLeadsTable() {
  const { leads, setLeads, stages, loading, error, reload } = useCrmLeads();
  const [query, setQuery] = React.useState('');
  const [stageFilter, setStageFilter] = React.useState('');
  const [sourceFilter, setSourceFilter] = React.useState('');
  const [tagFilter, setTagFilter] = React.useState('');
  const [sort, setSort] = React.useState<{ key: SortKey; dir: 1 | -1 }>({ key: 'created_at', dir: -1 });
  const [page, setPage] = React.useState(0);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [bulkStage, setBulkStage] = React.useState('');
  const [bulkTag, setBulkTag] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [showNew, setShowNew] = React.useState(false);

  const stageById = React.useMemo(() => new Map(stages.map((stage) => [stage.id, stage])), [stages]);
  const sources = React.useMemo(
    () => Array.from(new Set(leads.map((lead) => lead.source).filter(Boolean) as string[])).sort(),
    [leads]
  );
  const tags = React.useMemo(() => Array.from(new Set(leads.flatMap((lead) => lead.tags))).sort(), [leads]);

  const filtered = React.useMemo(() => {
    const list = leads.filter(
      (lead) =>
        leadMatches(lead, query) &&
        (!stageFilter || lead.stage_id === stageFilter) &&
        (!sourceFilter || lead.source === sourceFilter) &&
        (!tagFilter || lead.tags.includes(tagFilter))
    );
    const value = (lead: CrmLead) => {
      const raw = lead[sort.key];
      if (sort.key === 'name') return lead.name.toLowerCase();
      if (sort.key === 'value') return Number(raw ?? 0);
      return raw ? new Date(String(raw)).getTime() : sort.dir === 1 ? Infinity : -Infinity;
    };
    return [...list].sort((a, b) => (value(a) > value(b) ? sort.dir : value(a) < value(b) ? -sort.dir : 0));
  }, [leads, query, stageFilter, sourceFilter, tagFilter, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const resetPage = <T,>(setter: (value: T) => void) => (value: T) => {
    setter(value);
    setPage(0);
  };
  const pageItems = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const allFilteredSelected = filtered.length > 0 && filtered.every((lead) => selected.has(lead.id));

  const toggleSort = (key: SortKey) =>
    setSort((current) => (current.key === key ? { key, dir: current.dir === 1 ? -1 : 1 } : { key, dir: key === 'name' ? 1 : -1 }));

  const toggle = (id: string) =>
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const runBulk = async (action: 'move' | 'tag' | 'delete') => {
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    if (action === 'delete' && !window.confirm(`Excluir ${ids.length} lead(s)? Isso não pode ser desfeito.`)) return;
    setBusy(true);
    setMessage('');
    try {
      await crmFetch('/api/admin/crm/leads/bulk', {
        method: 'POST',
        body: JSON.stringify({ ids, action, stage_id: bulkStage, tag: bulkTag }),
      });
      if (action === 'delete') {
        setLeads((current) => current.filter((lead) => !selected.has(lead.id)));
      } else if (action === 'move') {
        setLeads((current) => current.map((lead) => (selected.has(lead.id) ? { ...lead, stage_id: bulkStage } : lead)));
      } else {
        const tag = bulkTag.trim();
        setLeads((current) =>
          current.map((lead) =>
            selected.has(lead.id) && !lead.tags.includes(tag) ? { ...lead, tags: [...lead.tags, tag] } : lead
          )
        );
      }
      setMessage(`${ids.length} lead(s) atualizados.`);
      setSelected(new Set());
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Erro na ação em massa.');
    } finally {
      setBusy(false);
    }
  };

  const exportCsv = () => {
    const header = ['Nome', 'E-mail', 'Telefone', 'Empresa', 'Cargo', 'Cidade', 'Origem', 'Etapa', 'Valor', 'Etiquetas', 'Próxima ação', 'Data próxima ação', 'Último contato', 'Criado em', 'Observações'];
    const rows = filtered.map((lead) => [
      lead.name,
      lead.email,
      formatPhone(lead.phone),
      lead.company,
      lead.job_title,
      lead.city,
      lead.source,
      stageById.get(lead.stage_id ?? '')?.name,
      lead.value,
      lead.tags.join(', '),
      lead.next_action,
      formatDate(lead.next_action_at, true),
      formatDate(lead.last_contact_at, true),
      formatDate(lead.created_at),
      lead.notes,
    ]);
    const csv = [header, ...rows].map((row) => row.map(csvEscape).join(';')).join('\n');
    const blob = new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <LoadingState label="Carregando leads..." />;
  if (error) return <ErrorState message={error} onRetry={reload} />;

  const header = (key: SortKey, label: string) => (
    <button onClick={() => toggleSort(key)} className="font-semibold hover:text-white">
      {label}
      {sort.key === key ? (sort.dir === 1 ? ' ↑' : ' ↓') : ''}
    </button>
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col xl:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            className={`${inputClass} pl-9`}
            placeholder="Buscar por nome, e-mail, empresa, telefone..."
            value={query}
            onChange={(event) => resetPage(setQuery)(event.target.value)}
          />
        </div>
        <select className={`${inputClass} xl:w-48`} value={stageFilter} onChange={(event) => resetPage(setStageFilter)(event.target.value)}>
          <option value="">Todas as etapas</option>
          {stages.map((stage) => (
            <option key={stage.id} value={stage.id}>
              {stage.name}
            </option>
          ))}
        </select>
        <select className={`${inputClass} xl:w-48`} value={sourceFilter} onChange={(event) => resetPage(setSourceFilter)(event.target.value)}>
          <option value="">Todas as origens</option>
          {sources.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select className={`${inputClass} xl:w-44`} value={tagFilter} onChange={(event) => resetPage(setTagFilter)(event.target.value)}>
          <option value="">Todas as etiquetas</option>
          {tags.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <button onClick={exportCsv} className={buttonGhost} title="Exportar a lista filtrada">
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <button onClick={() => setShowNew(true)} className={buttonPrimary}>
            <Plus className="w-4 h-4" />
            Novo lead
          </button>
        </div>
      </div>

      {selected.size > 0 && (
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm">
          <span className="font-semibold text-amber-200">{selected.size} selecionado(s)</span>
          <div className="flex items-center gap-2">
            <select className={`${inputClass} w-44 py-1.5`} value={bulkStage} onChange={(event) => setBulkStage(event.target.value)}>
              <option value="">Mover para...</option>
              {stages.map((stage) => (
                <option key={stage.id} value={stage.id}>
                  {stage.name}
                </option>
              ))}
            </select>
            <button disabled={!bulkStage || busy} onClick={() => runBulk('move')} className={buttonGhost}>
              <ArrowRightLeft className="w-4 h-4" />
              Mover
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input className={`${inputClass} w-36 py-1.5`} placeholder="Etiqueta" value={bulkTag} onChange={(event) => setBulkTag(event.target.value)} />
            <button disabled={!bulkTag.trim() || busy} onClick={() => runBulk('tag')} className={buttonGhost}>
              <Tag className="w-4 h-4" />
              Etiquetar
            </button>
          </div>
          <button disabled={busy} onClick={() => runBulk('delete')} className={`${buttonGhost} text-rose-300 hover:text-rose-200`}>
            <Trash2 className="w-4 h-4" />
            Excluir
          </button>
          <button onClick={() => setSelected(new Set())} className="text-xs text-slate-400 hover:text-white ml-auto">
            Limpar seleção
          </button>
        </div>
      )}
      {message && <p className="text-sm text-slate-300">{message}</p>}

      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-900">
            <tr>
              <th className="p-3 w-10 text-left">
                <input
                  type="checkbox"
                  checked={allFilteredSelected}
                  onChange={() =>
                    setSelected(allFilteredSelected ? new Set() : new Set(filtered.map((lead) => lead.id)))
                  }
                  title="Selecionar todos os filtrados"
                  className="accent-amber-500"
                />
              </th>
              <th className="p-3 text-left">{header('name', 'Lead')}</th>
              <th className="p-3 text-left">Contato</th>
              <th className="p-3 text-left">Etapa</th>
              <th className="p-3 text-left">Origem</th>
              <th className="p-3 text-left">{header('next_action_at', 'Próxima ação')}</th>
              <th className="p-3 text-right">{header('value', 'Valor')}</th>
              <th className="p-3 text-left">{header('created_at', 'Criado')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {pageItems.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-900/80">
                <td className="p-3">
                  <input type="checkbox" checked={selected.has(lead.id)} onChange={() => toggle(lead.id)} className="accent-amber-500" />
                </td>
                <td className="p-3">
                  <Link href={`/admin/crm/leads/${lead.id}`} className="font-semibold text-white hover:text-amber-400">
                    {lead.name}
                  </Link>
                  <p className="text-xs text-slate-500">{[lead.job_title, lead.company].filter(Boolean).join(' · ')}</p>
                  {lead.tags.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {lead.tags.map((tag) => (
                        <span key={tag} className="px-1.5 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                <td className="p-3 text-xs text-slate-300">
                  <p>{formatPhone(lead.phone)}</p>
                  <p className="text-slate-500">{lead.email}</p>
                </td>
                <td className="p-3">
                  <StageBadge stage={stageById.get(lead.stage_id ?? '')} />
                </td>
                <td className="p-3 text-xs text-slate-400">{lead.source}</td>
                <td className={`p-3 text-xs ${isOverdue(lead.next_action_at) ? 'text-rose-300' : 'text-slate-300'}`}>
                  {lead.next_action}
                  {lead.next_action_at && <p className="text-slate-500">{formatDate(lead.next_action_at, true)}</p>}
                </td>
                <td className="p-3 text-right text-xs text-amber-300">{lead.value ? formatMoney(lead.value) : ''}</td>
                <td className="p-3 text-xs text-slate-500">{formatDate(lead.created_at)}</td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={8} className="p-10 text-center text-slate-500">
                  Nenhum lead encontrado. <Link href="/admin/crm/importar" className="text-amber-400 hover:underline">Importe uma lista</Link> ou crie um novo.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>
          {filtered.length} lead(s) {filtered.length !== leads.length && `de ${leads.length}`}
        </span>
        <div className="flex items-center gap-2">
          <button disabled={page === 0} onClick={() => setPage((value) => value - 1)} className={`${buttonGhost} px-2 py-1`}>
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span>
            Página {page + 1} de {pageCount}
          </span>
          <button disabled={page >= pageCount - 1} onClick={() => setPage((value) => value + 1)} className={`${buttonGhost} px-2 py-1`}>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showNew && (
        <NewLeadModal
          stages={stages}
          onClose={() => setShowNew(false)}
          onCreated={(lead) => {
            setLeads((current) => [lead, ...current]);
            setShowNew(false);
          }}
        />
      )}
    </div>
  );
}
