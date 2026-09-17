import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useAppointments, useBlocks } from "@/lib/scheduling/data";
import { formatDateLong, fromDateKey, toDateKey, WEEKDAY_LABELS } from "@/lib/scheduling/time";
import { toViewer, useTimezone } from "@/lib/scheduling/timezone";

export const Route = createFileRoute("/admin/agenda")({
  component: AgendaPage,
});

function AgendaPage() {
  const { data: appointments, isLoading } = useAppointments();
  const { data: blocks } = useBlocks();
  const [offset, setOffset] = useState(0);
  const [view, setView] = useState<"dia" | "semana">("dia");
  const { zone, label: zoneName } = useTimezone();
  const at = (date: string, time: string) => toViewer(date, time, zone).time;

  const base = new Date();
  base.setDate(base.getDate() + offset);

  const days =
    view === "dia"
      ? [toDateKey(base)]
      : Array.from({ length: 7 }, (_, i) => {
          const d = new Date(base);
          d.setDate(base.getDate() + i);
          return toDateKey(d);
        });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl">Agenda</h1>
          <p className="text-xs text-muted-foreground">Horários no seu fuso: {zoneName}</p>
        </div>
        <div className="flex gap-2">
          <Button variant={view === "dia" ? "default" : "outline"} size="sm" onClick={() => setView("dia")}>
            Dia
          </Button>
          <Button variant={view === "semana" ? "default" : "outline"} size="sm" onClick={() => setView("semana")}>
            Semana
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => setOffset(offset - (view === "dia" ? 1 : 7))}>
          Anterior
        </Button>
        <Button variant="outline" size="sm" onClick={() => setOffset(0)}>
          Hoje
        </Button>
        <Button variant="outline" size="sm" onClick={() => setOffset(offset + (view === "dia" ? 1 : 7))}>
          Próximo
        </Button>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Carregando agenda...</p>}

      <div className="grid gap-4 md:grid-cols-2">
        {days.map((key) => {
          const list = (appointments ?? [])
            .filter((a) => a.date === key && a.status !== "cancelado")
            .sort((a, b) => a.start.localeCompare(b.start));
          const dayBlocks = (blocks ?? []).filter((b) => b.date === key);
          const weekday = WEEKDAY_LABELS[fromDateKey(key).getDay()];
          return (
            <section key={key} className="rounded-lg border border-border bg-card p-5">
              <h2 className="text-lg capitalize">
                {view === "dia" ? formatDateLong(key) : `${weekday} · ${key.slice(8)}/${key.slice(5, 7)}`}
              </h2>
              <div className="mt-4 space-y-2 text-sm">
                {list.length === 0 && dayBlocks.length === 0 && (
                  <p className="text-muted-foreground">Sem compromissos.</p>
                )}
                {list.map((a) => (
                  <div key={a.id} className="rounded border border-border px-3 py-2">
                    <span className="text-primary">
                      {at(a.date, a.start)} — {at(a.date, a.end)}
                    </span>{" "}
                    · {a.name}
                    <span className="block text-xs text-muted-foreground">
                      {a.kind} · {a.whatsapp} · {a.status}
                    </span>
                  </div>
                ))}
                {dayBlocks.map((b) => (
                  <div
                    key={b.id}
                    className="rounded border border-dashed border-border px-3 py-2 text-muted-foreground"
                  >
                    {b.allDay
                      ? "Dia inteiro bloqueado"
                      : `${at(b.date, b.start)} — ${at(b.date, b.end)} bloqueado`}
                    {b.reason && <span className="block text-xs">{b.reason}</span>}
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
