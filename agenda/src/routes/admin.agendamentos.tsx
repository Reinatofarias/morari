import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  buildSlots,
  deleteAppointment,
  rescheduleAppointment,
  setAppointmentStatus,
  todayKey,
  useAgendaMutation,
  useAppointments,
  useAvailability,
  useBlocks,
  useBookedTimes,
} from "@/lib/scheduling/data";
import { formatDateShort } from "@/lib/scheduling/time";
import { toViewer, useTimezone } from "@/lib/scheduling/timezone";
import type { Appointment, AppointmentStatus } from "@/lib/scheduling/types";

export const Route = createFileRoute("/admin/agendamentos")({
  component: AppointmentsPage,
});

const statusStyles: Record<AppointmentStatus, string> = {
  confirmado: "border-primary/40 text-primary",
  cancelado: "border-destructive/40 text-destructive",
  concluido: "border-border text-muted-foreground",
};

const filters = [
  { id: "proximos", label: "Próximos" },
  { id: "confirmado", label: "Confirmados" },
  { id: "cancelado", label: "Cancelados" },
  { id: "concluido", label: "Concluídos" },
  { id: "todos", label: "Todos" },
] as const;

function AppointmentsPage() {
  const { data: appointments, isLoading } = useAppointments();
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("proximos");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Appointment | null>(null);
  const { zone, label: zoneName } = useTimezone();
  const at = (date: string, time: string) => toViewer(date, time, zone).time;

  const status = useAgendaMutation((v: { id: string; status: AppointmentStatus }) =>
    setAppointmentStatus(v.id, v.status),
  );
  const remove = useAgendaMutation((id: string) => deleteAppointment(id));

  const list = useMemo(() => {
    const today = todayKey();
    const term = search.trim().toLowerCase();
    return (appointments ?? [])
      .filter((a) => {
        if (filter === "proximos") return a.status === "confirmado" && a.date >= today;
        if (filter === "todos") return true;
        return a.status === filter;
      })
      .filter((a) => !term || a.name.toLowerCase().includes(term) || a.whatsapp.includes(term))
      .sort((a, b) => (b.date + b.start).localeCompare(a.date + a.start));
  }, [appointments, filter, search]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Agendamentos</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Todos os registros ficam salvos no banco de dados até você excluí-los.
        </p>
        <p className="text-xs text-muted-foreground">Horários no seu fuso: {zoneName}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <Button
            key={f.id}
            size="sm"
            variant={filter === f.id ? "default" : "outline"}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </Button>
        ))}
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nome ou WhatsApp"
          className="ml-auto w-full sm:w-64"
        />
      </div>

      <div className="divide-y divide-border rounded-lg border border-border bg-card">
        {isLoading && <p className="p-5 text-sm text-muted-foreground">Carregando...</p>}
        {!isLoading && list.length === 0 && (
          <p className="p-5 text-sm text-muted-foreground">Nenhum agendamento encontrado.</p>
        )}
        {list.map((a) => (
          <div key={a.id} className="flex flex-wrap items-center justify-between gap-4 p-4">
            <div className="min-w-48 text-sm">
              <p className="text-primary">
                {formatDateShort(a.date)} · {at(a.date, a.start)} — {at(a.date, a.end)}
              </p>
              <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">{a.kind}</p>
              <p className="mt-1">{a.name}</p>
              <p className="text-xs text-muted-foreground">{a.whatsapp}</p>
              {a.notes && <p className="mt-1 text-xs text-muted-foreground">{a.notes}</p>}
            </div>
            <span
              className={`rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.16em] ${statusStyles[a.status]}`}
            >
              {a.status}
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              <Button size="sm" variant="outline" onClick={() => setEditing(a)}>
                Remarcar
              </Button>
              {a.status !== "confirmado" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => status.mutate({ id: a.id, status: "confirmado" })}
                >
                  Reativar
                </Button>
              )}
              {a.status === "confirmado" && (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => status.mutate({ id: a.id, status: "concluido" })}
                  >
                    Concluir
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => status.mutate({ id: a.id, status: "cancelado" })}
                  >
                    Cancelar
                  </Button>
                </>
              )}
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  if (!window.confirm(`Excluir definitivamente o agendamento de ${a.name}?`)) return;
                  remove.mutate(a.id, { onSuccess: () => toast.success("Agendamento excluído.") });
                }}
              >
                Excluir
              </Button>
            </div>
          </div>
        ))}
      </div>

      <RescheduleDialog appointment={editing} onClose={() => setEditing(null)} />
    </div>
  );
}

function RescheduleDialog({
  appointment,
  onClose,
}: {
  appointment: Appointment | null;
  onClose: () => void;
}) {
  const [date, setDate] = useState<string>(appointment?.date ?? todayKey());
  const [start, setStart] = useState<string>(appointment?.start ?? "");
  const [key, setKey] = useState<string | null>(null);

  if (appointment && key !== appointment.id) {
    setKey(appointment.id);
    setDate(appointment.date);
    setStart(appointment.start);
  }

  const { data: availability } = useAvailability();
  const { data: blocks } = useBlocks();
  const { data: booked } = useBookedTimes(appointment ? date : null);

  const slots = buildSlots({
    date,
    availability: availability ?? [],
    blocks: blocks ?? [],
    booked: booked ?? [],
    keep: appointment && appointment.date === date ? appointment.start : undefined,
  });

  const { zone, label: zoneName } = useTimezone();

  const move = useAgendaMutation((v: { id: string; date: string; start: string }) =>
    rescheduleAppointment(v.id, v.date, v.start),
  );

  return (
    <Dialog open={!!appointment} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remarcar atendimento</DialogTitle>
          <DialogDescription>{appointment?.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="re-date">Nova data</Label>
          <Input
            id="re-date"
            type="date"
            value={date}
            min={todayKey()}
            onChange={(e) => {
              setDate(e.target.value);
              setStart("");
            }}
          />
        </div>

        <div className="mt-2">
          <Label>Horário ({zoneName})</Label>
          <div className="mt-2 grid max-h-52 grid-cols-3 gap-2 overflow-y-auto sm:grid-cols-4">
            {slots.length === 0 && (
              <p className="col-span-full text-sm text-muted-foreground">Nenhum horário livre nesta data.</p>
            )}
            {slots.map((s) => (
              <button
                key={s}
                onClick={() => setStart(s)}
                className={`soft-transition rounded border px-2 py-2 text-sm ${
                  start === s ? "border-primary text-primary" : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                {toViewer(date, s, zone).time}
              </button>
            ))}
          </div>
        </div>

        <Button
          className="mt-4"
          disabled={!start || move.isPending}
          onClick={() =>
            appointment &&
            move.mutate(
              { id: appointment.id, date, start },
              {
                onSuccess: () => {
                  toast.success("Atendimento remarcado.");
                  onClose();
                },
                onError: (error: unknown) =>
                  toast.error(error instanceof Error ? error.message : "Não foi possível remarcar."),
              },
            )
          }
        >
          {move.isPending ? "Salvando..." : "Confirmar remarcação"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
