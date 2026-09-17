'use client';

import { useEffect, useState } from 'react';

import { AgendaButton, AgendaInput, Message } from '@/components/agenda/ui';
import { saveAvailability, useAgendaMutation, useAvailability } from '@/lib/agenda/data';
import { WEEKDAY_LABELS } from '@/lib/agenda/time';
import type { DayAvailability } from '@/lib/agenda/types';

const defaults: DayAvailability[] = WEEKDAY_LABELS.map((_, weekday) => ({
  weekday,
  enabled: weekday >= 1 && weekday <= 5,
  start: '08:00',
  end: '18:00',
}));

export default function AgendaAvailabilityPage() {
  const { data, isLoading, refetch } = useAvailability();
  const [rows, setRows] = useState<DayAvailability[]>(defaults);
  const [message, setMessage] = useState<string | null>(null);
  const save = useAgendaMutation((next: DayAvailability[]) => saveAvailability(next));

  useEffect(() => {
    if (!data) return;
    setRows(defaults.map((item) => data.find((row) => row.weekday === item.weekday) ?? item));
  }, [data]);

  function update(weekday: number, patch: Partial<DayAvailability>) {
    setRows((previous) => previous.map((row) => (row.weekday === weekday ? { ...row, ...patch } : row)));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Disponibilidade</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Defina os dias e o intervalo de atendimento. Os horarios livres sao gerados automaticamente.
        </p>
        <p className="text-xs text-muted-foreground">Estes horarios sao definidos no fuso de Brasilia.</p>
      </div>

      {message ? <Message type="success">{message}</Message> : null}

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : (
        <div className="divide-y divide-border rounded-lg border border-border bg-card">
          {rows.map((row) => (
            <div key={row.weekday} className="flex flex-wrap items-center gap-4 p-4">
              <label className="flex w-48 items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={row.enabled}
                  onChange={(event) => update(row.weekday, { enabled: event.target.checked })}
                  className="h-4 w-4 accent-[var(--color-gold)]"
                />
                <span className={row.enabled ? '' : 'text-muted-foreground'}>{WEEKDAY_LABELS[row.weekday]}</span>
              </label>
              <div className="flex items-center gap-2">
                <AgendaInput
                  type="time"
                  value={row.start}
                  disabled={!row.enabled}
                  onChange={(event) => update(row.weekday, { start: event.target.value })}
                  className="w-32"
                />
                <span className="text-muted-foreground">as</span>
                <AgendaInput
                  type="time"
                  value={row.end}
                  disabled={!row.enabled}
                  onChange={(event) => update(row.weekday, { end: event.target.value })}
                  className="w-32"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <AgendaButton
        disabled={save.isPending}
        onClick={() =>
          void save.mutate(rows, {
            onSuccess: () => {
              setMessage('Disponibilidade salva.');
              void refetch();
            },
          })
        }
      >
        {save.isPending ? 'Salvando...' : 'Salvar disponibilidade'}
      </AgendaButton>
    </div>
  );
}
