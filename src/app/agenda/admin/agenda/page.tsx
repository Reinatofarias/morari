'use client';

import { useState } from 'react';

import { AgendaButton } from '@/components/agenda/ui';
import { buildDaySlots, useAppointments, useAvailability, useBlocks } from '@/lib/agenda/data';
import { formatDateLong, fromDateKey, toDateKey, WEEKDAY_LABELS } from '@/lib/agenda/time';
import { toViewer, useTimezone } from '@/lib/agenda/timezone';

export default function AgendaCalendarPage() {
  const { data: appointments, isLoading } = useAppointments();
  const { data: blocks } = useBlocks();
  const { data: availability } = useAvailability();
  const [offset, setOffset] = useState(0);
  const [view, setView] = useState<'dia' | 'semana'>('dia');
  const { zone, label: zoneName } = useTimezone();
  const at = (date: string, time: string) => toViewer(date, time, zone).time;

  const base = new Date();
  base.setDate(base.getDate() + offset);

  const days =
    view === 'dia'
      ? [toDateKey(base)]
      : Array.from({ length: 7 }, (_, index) => {
          const day = new Date(base);
          day.setDate(base.getDate() + index);
          return toDateKey(day);
        });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Agenda</h1>
          <p className="text-xs text-muted-foreground">Horarios no seu fuso: {zoneName}</p>
        </div>
        <div className="flex gap-2">
          <AgendaButton variant={view === 'dia' ? 'primary' : 'outline'} onClick={() => setView('dia')}>
            Dia
          </AgendaButton>
          <AgendaButton variant={view === 'semana' ? 'primary' : 'outline'} onClick={() => setView('semana')}>
            Semana
          </AgendaButton>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <AgendaButton variant="outline" onClick={() => setOffset(offset - (view === 'dia' ? 1 : 7))}>
          Anterior
        </AgendaButton>
        <AgendaButton variant="outline" onClick={() => setOffset(0)}>
          Hoje
        </AgendaButton>
        <AgendaButton variant="outline" onClick={() => setOffset(offset + (view === 'dia' ? 1 : 7))}>
          Proximo
        </AgendaButton>
      </div>

      {isLoading ? <p className="text-sm text-muted-foreground">Carregando agenda...</p> : null}

      <div className="grid gap-4 md:grid-cols-2">
        {days.map((key) => {
          const list = (appointments ?? [])
            .filter((item) => item.date === key && item.status !== 'cancelado')
            .sort((a, b) => a.start.localeCompare(b.start));
          const dayBlocks = (blocks ?? []).filter((item) => item.date === key);
          const booked = list.filter((item) => item.status === 'confirmado').map((item) => item.start);
          const slots = buildDaySlots({
            date: key,
            availability: availability ?? [],
            blocks: blocks ?? [],
            booked,
          });
          const free = slots.filter((slot) => slot.available);
          const unavailable = slots.filter((slot) => !slot.available);
          const weekday = WEEKDAY_LABELS[fromDateKey(key).getDay()];
          return (
            <section key={key} className="rounded-lg border border-border bg-card p-5">
              <h2 className="font-display text-lg capitalize">
                {view === 'dia' ? formatDateLong(key) : `${weekday} - ${key.slice(8)}/${key.slice(5, 7)}`}
              </h2>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded border border-border p-2">
                  <span className="block text-lg text-primary">{free.length}</span>
                  <span className="text-muted-foreground">livres</span>
                </div>
                <div className="rounded border border-border p-2">
                  <span className="block text-lg text-muted-foreground">{unavailable.length}</span>
                  <span className="text-muted-foreground">indisp.</span>
                </div>
                <div className="rounded border border-border p-2">
                  <span className="block text-lg text-foreground">{list.length}</span>
                  <span className="text-muted-foreground">agend.</span>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                {slots.length === 0 ? <p className="text-muted-foreground">Dia sem disponibilidade configurada.</p> : null}
                {free.length > 0 ? (
                  <div className="rounded border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
                    <span className="block text-xs uppercase tracking-[0.14em] text-emerald-300">Horarios livres</span>
                    <span className="mt-1 block text-muted-foreground">
                      {free.map((slot) => at(key, slot.time)).join(', ')}
                    </span>
                  </div>
                ) : null}
                {list.map((item) => (
                  <div key={item.id} className="rounded border border-border px-3 py-2">
                    <span className="text-primary">
                      {at(item.date, item.start)} ate {at(item.date, item.end)}
                    </span>{' '}
                    - {item.name}
                    <span className="block text-xs text-muted-foreground">
                      {item.kind} - {item.whatsapp} - {item.status}
                    </span>
                  </div>
                ))}
                {dayBlocks.map((block) => (
                  <div key={block.id} className="rounded border border-dashed border-border px-3 py-2 text-muted-foreground">
                    {block.allDay ? 'Dia inteiro bloqueado' : `${at(block.date, block.start)} ate ${at(block.date, block.end)} bloqueado`}
                    {block.reason ? <span className="block text-xs">{block.reason}</span> : null}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
