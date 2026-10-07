'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUp, Loader2, Plus, Save, Trash2, ArrowLeft } from 'lucide-react';
import type { CrmStage, CrmStageKind } from '@/lib/crm/types';
import { ErrorState, LoadingState, STAGE_COLORS, buttonGhost, buttonPrimary, crmFetch, inputClass, stageColor } from './shared';

type DraftStage = Pick<CrmStage, 'name' | 'color' | 'kind'> & { id?: string; key: string };

export function CrmStagesEditor() {
  const [stages, setStages] = React.useState<DraftStage[]>([]);
  const [deleted, setDeleted] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const load = React.useCallback(async () => {
    try {
      const data = await crmFetch<{ stages: CrmStage[] }>('/api/admin/crm/stages');
      setStages(data.stages.map((stage) => ({ ...stage, key: stage.id })));
      setDeleted([]);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar etapas.');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    // Adia a primeira carga para fora do corpo do efeito.
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  const update = (key: string, patch: Partial<DraftStage>) =>
    setStages((current) => current.map((stage) => (stage.key === key ? { ...stage, ...patch } : stage)));

  const move = (index: number, delta: number) =>
    setStages((current) => {
      const next = [...current];
      const target = index + delta;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  const remove = (stage: DraftStage) => {
    if (stages.length <= 1) return;
    if (stage.id && !window.confirm(`Remover a etapa "${stage.name}"? Os leads dela vão para a primeira etapa.`)) return;
    setStages((current) => current.filter((item) => item.key !== stage.key));
    if (stage.id) setDeleted((current) => [...current, stage.id as string]);
  };

  const add = () =>
    setStages((current) => [
      ...current,
      { key: `new-${Date.now()}`, name: 'Nova etapa', color: 'slate', kind: 'open' },
    ]);

  const save = async () => {
    setSaving(true);
    setMessage('');
    try {
      const data = await crmFetch<{ stages: CrmStage[] }>('/api/admin/crm/stages', {
        method: 'PUT',
        body: JSON.stringify({
          stages: stages.map(({ id, name, color, kind }) => ({ id, name, color, kind })),
          deleted,
        }),
      });
      setStages(data.stages.map((stage) => ({ ...stage, key: stage.id })));
      setDeleted([]);
      setMessage('Funil salvo.');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Erro ao salvar.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={load} />;

  return (
    <div className="max-w-3xl space-y-5">
      <Link href="/admin/crm" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white">
        <ArrowLeft className="w-3.5 h-3.5" />
        Voltar ao funil
      </Link>
      <p className="text-sm text-slate-400">
        Organize as fases do seu processo comercial. Marque como <strong className="text-emerald-300">Ganho</strong> a etapa de
        cliente fechado e como <strong className="text-rose-300">Perdido</strong> a de quem desistiu, para os números do painel
        ficarem certos.
      </p>

      <div className="space-y-2">
        {stages.map((stage, index) => (
          <div key={stage.key} className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-3">
            <span className={`w-2.5 h-2.5 rounded-full ${stageColor(stage.color).dot}`} />
            <input
              className={`${inputClass} flex-1 min-w-40`}
              value={stage.name}
              onChange={(event) => update(stage.key, { name: event.target.value })}
            />
            <select className={`${inputClass} w-36`} value={stage.color} onChange={(event) => update(stage.key, { color: event.target.value })}>
              {Object.entries(STAGE_COLORS).map(([value, color]) => (
                <option key={value} value={value}>
                  {color.label}
                </option>
              ))}
            </select>
            <select
              className={`${inputClass} w-32`}
              value={stage.kind}
              onChange={(event) => update(stage.key, { kind: event.target.value as CrmStageKind })}
            >
              <option value="open">Em aberto</option>
              <option value="won">Ganho</option>
              <option value="lost">Perdido</option>
            </select>
            <div className="flex">
              <button onClick={() => move(index, -1)} disabled={index === 0} className="p-2 text-slate-400 hover:text-white disabled:opacity-30" title="Subir">
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => move(index, 1)}
                disabled={index === stages.length - 1}
                className="p-2 text-slate-400 hover:text-white disabled:opacity-30"
                title="Descer"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
              <button onClick={() => remove(stage)} disabled={stages.length <= 1} className="p-2 text-slate-400 hover:text-rose-300 disabled:opacity-30" title="Remover">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button onClick={add} className={buttonGhost}>
          <Plus className="w-4 h-4" />
          Adicionar etapa
        </button>
        <div className="flex items-center gap-3">
          {message && <span className="text-xs text-slate-400">{message}</span>}
          <button onClick={save} disabled={saving} className={buttonPrimary}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Salvar funil
          </button>
        </div>
      </div>
    </div>
  );
}
