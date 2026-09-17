'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';

import { AgendaButton, AgendaInput, AgendaLabel, AgendaTextarea, Message } from '@/components/agenda/ui';
import { addBlock, removeBlock, todayKey, useAgendaMutation, useBlocks } from '@/lib/agenda/data';
import { formatDateShort } from '@/lib/agenda/time';

export default function AgendaBlocksPage() {
  const { data: blocks, isLoading, refetch } = useBlocks();
  const [date, setDate] = useState(todayKey());
  const [allDay, setAllDay] = useState(true);
  const [start, setStart] = useState('12:00');
  const [end, setEnd] = useState('13:00');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const create = useAgendaMutation(() => addBlock({ date, allDay, start, end, reason }));
  const drop = useAgendaMutation((id: string) => removeBlock(id));
  const upcoming = (blocks ?? []).filter((item) => item.date >= todayKey());

  function saved(text: string) {
    setMessage(text);
    void refetch();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl">Bloqueios</h1>
        <p className="mt-1 text-sm text-muted-foreground">Feriados, ferias e pausas. Horarios bloqueados somem da agenda publica.</p>
        <p className="text-xs text-muted-foreground">Informe os horarios no fuso de Brasilia.</p>
      </div>

      {message ? <Message type="success">{message}</Message> : null}

      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="font-display text-xl">Novo bloqueio</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <AgendaLabel htmlFor="block-date">Data</AgendaLabel>
            <AgendaInput id="block-date" type="date" value={date} min={todayKey()} onChange={(event) => setDate(event.target.value)} />
          </div>
          <label className="flex items-end gap-3 pb-2 text-sm">
            <input type="checkbox" checked={allDay} onChange={(event) => setAllDay(event.target.checked)} className="h-4 w-4 accent-[var(--color-gold)]" />
            Dia inteiro
          </label>
          {!allDay ? (
            <>
              <div className="space-y-2">
                <AgendaLabel htmlFor="block-start">Inicio</AgendaLabel>
                <AgendaInput id="block-start" type="time" value={start} onChange={(event) => setStart(event.target.value)} />
              </div>
              <div className="space-y-2">
                <AgendaLabel htmlFor="block-end">Fim</AgendaLabel>
                <AgendaInput id="block-end" type="time" value={end} onChange={(event) => setEnd(event.target.value)} />
              </div>
            </>
          ) : null}
          <div className="space-y-2 sm:col-span-2">
            <AgendaLabel htmlFor="block-reason">Motivo (opcional)</AgendaLabel>
            <AgendaTextarea
              id="block-reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="Feriado, compromisso pessoal..."
              rows={2}
            />
          </div>
        </div>
        <AgendaButton
          className="mt-5"
          disabled={create.isPending}
          onClick={() =>
            void create.mutate(undefined, {
              onSuccess: () => {
                setReason('');
                saved('Bloqueio criado.');
              },
            })
          }
        >
          {create.isPending ? 'Salvando...' : 'Bloquear'}
        </AgendaButton>
      </section>

      <section>
        <h2 className="font-display text-xl">Bloqueios ativos</h2>
        <div className="mt-3 divide-y divide-border rounded-lg border border-border bg-card">
          {isLoading ? <p className="p-5 text-sm text-muted-foreground">Carregando...</p> : null}
          {!isLoading && upcoming.length === 0 ? <p className="p-5 text-sm text-muted-foreground">Nenhum bloqueio futuro.</p> : null}
          {upcoming.map((block) => (
            <div key={block.id} className="flex flex-wrap items-center justify-between gap-3 p-4 text-sm">
              <div>
                <p className="text-primary">
                  {formatDateShort(block.date)} - {block.allDay ? 'Dia inteiro' : `${block.start} ate ${block.end}`}
                </p>
                {block.reason ? <p className="text-xs text-muted-foreground">{block.reason}</p> : null}
              </div>
              <button
                type="button"
                onClick={() => void drop.mutate(block.id, { onSuccess: () => saved('Bloqueio removido.') })}
                className="soft-transition flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-red-300"
              >
                <Trash2 className="h-3.5 w-3.5" /> Remover
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
