import { createFileRoute, Link } from "@tanstack/react-router";

import { todayKey, useAppointments } from "@/lib/scheduling/data";
import { formatDateLong, formatDateShort, toDateKey } from "@/lib/scheduling/time";
import { CANONICAL_ZONE, toViewer, useTimezone, zonedToUtc } from "@/lib/scheduling/timezone";

export const Route = createFileRoute("/admin/")({
  component: Overview,
});

function Overview() {
  const { data: appointments, isLoading, isError } = useAppointments();
  const today = todayKey();
  const { zone, label: zoneName } = useTimezone();
  const at = (date: string, time: string) => toViewer(date, time, zone).time;

  const weekKeys: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    weekKeys.push(toDateKey(d));
  }

  const active = (appointments ?? []).filter((a) => a.status === "confirmado");
  const todayList = active.filter((a) => a.date === today).sort((a, b) => a.start.localeCompare(b.start));
  const week = active
    .filter((a) => weekKeys.includes(a.date))
    .sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));

  const nowMs = Date.now();
  const next =
    todayList.find((a) => zonedToUtc(a.date, a.start, CANONICAL_ZONE).getTime() >= nowMs) ??
    week.find((a) => a.date > today) ??
    null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl">Visão geral</h1>
        <p className="mt-1 text-sm capitalize text-muted-foreground">{formatDateLong(today)}</p>
        <p className="text-xs text-muted-foreground">Horários no seu fuso: {zoneName}</p>
      </div>

      {isError && (
        <p className="rounded-lg border border-destructive/40 bg-card p-4 text-sm text-destructive">
          Não foi possível carregar a agenda. Atualize a página.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Hoje", value: todayList.length },
          { label: "Próximos 7 dias", value: week.length },
          { label: "Total confirmados", value: active.length },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-3xl text-primary">{isLoading ? "—" : s.value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-xl">Próximo atendimento</h2>
        {isLoading ? (
          <p className="mt-3 text-sm text-muted-foreground">Carregando...</p>
        ) : next ? (
          <div className="mt-3 text-sm">
            <p className="text-primary">
              {formatDateShort(next.date)} · {at(next.date, next.start)} — {at(next.date, next.end)}
            </p>
            <p className="mt-1">
              {next.name} · {next.kind}
            </p>
            <p className="text-muted-foreground">{next.whatsapp}</p>
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">Nenhum atendimento futuro confirmado.</p>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl">Agenda de hoje</h2>
          <Link
            to="/admin/agenda"
            className="soft-transition text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
          >
            Ver agenda
          </Link>
        </div>
        <div className="mt-3 divide-y divide-border rounded-lg border border-border bg-card">
          {isLoading && <p className="p-5 text-sm text-muted-foreground">Carregando...</p>}
          {!isLoading && todayList.length === 0 && (
            <p className="p-5 text-sm text-muted-foreground">Nenhum agendamento hoje.</p>
          )}
          {todayList.map((a) => (
            <div key={a.id} className="flex flex-wrap items-center justify-between gap-2 p-4 text-sm">
              <span className="text-primary">
                {at(a.date, a.start)} — {at(a.date, a.end)}
              </span>
              <span>{a.name}</span>
              <span className="text-muted-foreground">{a.whatsapp}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
