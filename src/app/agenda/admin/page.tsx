'use client';

import Link from 'next/link';

import { todayKey, useAppointments } from '@/lib/agenda/data';
import { formatDateLong, formatDateShort, toDateKey } from '@/lib/agenda/time';
import { CANONICAL_ZONE, toViewer, useTimezone, zonedToUtc } from '@/lib/agenda/timezone';
import { Message } from '@/components/agenda/ui';

export default function AgendaAdminOverviewPage() {
  const { data: appointments, isLoading, isError } = useAppointments();
  const today = todayKey();
  const { zone, label: zoneName } = useTimezone();
  const at = (date: string, time: string) => toViewer(date, time, zone).time;

  const weekKeys = Array.from({ length: 7 }, (_, index) => {
    const day = new Date();
    day.setDate(day.getDate() + index);
    return toDateKey(day);
  });

  const active = (appointments ?? []).filter((item) => item.status === 'confirmado');
  const todayList = active.filter((item) => item.date === today).sort((a, b) => a.start.localeCompare(b.start));
  const week = active
    .filter((item) => weekKeys.includes(item.date))
    .sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));

  const nowMs = Date.now();
  const next =
    todayList.find((item) => zonedToUtc(item.date, item.start, CANONICAL_ZONE).getTime() >= nowMs) ??
    week.find((item) => item.date > today) ??
    null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl">Visao geral</h1>
        <p className="mt-1 text-sm capitalize text-muted-foreground">{formatDateLong(today)}</p>
        <p className="text-xs text-muted-foreground">Horarios no seu fuso: {zoneName}</p>
      </div>

      {isError ? <Message type="error">Nao foi possivel carregar a agenda. Atualize a pagina.</Message> : null}

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Hoje', value: todayList.length },
          { label: 'Proximos 7 dias', value: week.length },
          { label: 'Total confirmados', value: active.length },
        ].map((item) => (
          <div key={item.label} className="rounded-lg border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.label}</p>
            <p className="mt-2 font-display text-3xl text-primary">{isLoading ? '-' : item.value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="font-display text-xl">Proximo atendimento</h2>
        {isLoading ? (
          <p className="mt-3 text-sm text-muted-foreground">Carregando...</p>
        ) : next ? (
          <div className="mt-3 text-sm">
            <p className="text-primary">
              {formatDateShort(next.date)} - {at(next.date, next.start)} ate {at(next.date, next.end)}
            </p>
            <p className="mt-1">
              {next.name} - {next.kind}
            </p>
            <p className="text-muted-foreground">{next.whatsapp}</p>
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">Nenhum atendimento futuro confirmado.</p>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl">Agenda de hoje</h2>
          <Link
            href="/agenda/admin/agenda"
            className="soft-transition text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
          >
            Ver agenda
          </Link>
        </div>
        <div className="mt-3 divide-y divide-border rounded-lg border border-border bg-card">
          {isLoading ? <p className="p-5 text-sm text-muted-foreground">Carregando...</p> : null}
          {!isLoading && todayList.length === 0 ? <p className="p-5 text-sm text-muted-foreground">Nenhum agendamento hoje.</p> : null}
          {todayList.map((item) => (
            <div key={item.id} className="flex flex-wrap items-center justify-between gap-2 p-4 text-sm">
              <span className="text-primary">
                {at(item.date, item.start)} ate {at(item.date, item.end)}
              </span>
              <span>{item.name}</span>
              <span className="text-muted-foreground">{item.whatsapp}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
