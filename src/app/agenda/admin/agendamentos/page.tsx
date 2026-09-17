'use client';

import { useEffect, useMemo, useState } from 'react';

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
} from '@/lib/agenda/data';
import { formatDateShort } from '@/lib/agenda/time';
import { toViewer, useTimezone } from '@/lib/agenda/timezone';
import type { Appointment, AppointmentStatus } from '@/lib/agenda/types';
import { AgendaButton, AgendaInput, AgendaLabel, Message, cn } from '@/components/agenda/ui';

const statusStyles: Record<AppointmentStatus, string> = {
  confirmado: 'border-primary/40 text-primary',
  cancelado: 'border-red-500/40 text-red-300',
  concluido: 'border-border text-muted-foreground',
};

const filters = [
  { id: 'proximos', label: 'Proximos' },
  { id: 'confirmado', label: 'Confirmados' },
  { id: 'cancelado', label: 'Cancelados' },
  { id: 'concluido', label: 'Concluidos' },
  { id: 'todos', label: 'Todos' },
] as const;

export default function AgendaAppointmentsPage() {
  const { data: appointments, isLoading, refetch } = useAppointments();
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('proximos');
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Appointment | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { zone, label: zoneName } = useTimezone();
  const at = (date: string, time: string) => toViewer(date, time, zone).time;

  const status = useAgendaMutation((value: { id: string; status: AppointmentStatus }) =>
    setAppointmentStatus(value.id, value.status),
  );
  const remove = useAgendaMutation((id: string) => deleteAppointment(id));

  const list = useMemo(() => {
    const today = todayKey();
    const term = search.trim().toLowerCase();
    return (appointments ?? [])
      .filter((item) => {
        if (filter === 'proximos') return item.status === 'confirmado' && item.date >= today;
        if (filter === 'todos') return true;
        return item.status === filter;
      })
      .filter((item) => !term || item.name.toLowerCase().includes(term) || item.whatsapp.includes(term))
      .sort((a, b) => (b.date + b.start).localeCompare(a.date + a.start));
  }, [appointments, filter, search]);

  function afterSuccess(text: string) {
    setMessage(text);
    void refetch();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Agendamentos</h1>
        <p className="mt-1 text-sm text-muted-foreground">Todos os registros ficam salvos no banco de dados ate voce exclui-los.</p>
        <p className="text-xs text-muted-foreground">Horarios no seu fuso: {zoneName}</p>
      </div>

      {message ? <Message type="success">{message}</Message> : null}

      <div className="flex flex-wrap items-center gap-2">
        {filters.map((item) => (
          <AgendaButton
            key={item.id}
            variant={filter === item.id ? 'primary' : 'outline'}
            onClick={() => setFilter(item.id)}
            className="min-h-9 px-3"
          >
            {item.label}
          </AgendaButton>
        ))}
        <AgendaInput
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por nome ou WhatsApp"
          className="ml-auto w-full sm:w-64"
        />
      </div>

      <div className="divide-y divide-border rounded-lg border border-border bg-card">
        {isLoading ? <p className="p-5 text-sm text-muted-foreground">Carregando...</p> : null}
        {!isLoading && list.length === 0 ? <p className="p-5 text-sm text-muted-foreground">Nenhum agendamento encontrado.</p> : null}
        {list.map((item) => (
          <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 p-4">
            <div className="min-w-48 text-sm">
              <p className="text-primary">
                {formatDateShort(item.date)} - {at(item.date, item.start)} ate {at(item.date, item.end)}
              </p>
              <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">{item.kind}</p>
              <p className="mt-1">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.whatsapp}</p>
              {item.notes ? <p className="mt-1 text-xs text-muted-foreground">{item.notes}</p> : null}
            </div>
            <span className={cn('rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.16em]', statusStyles[item.status])}>
              {item.status}
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              <AgendaButton variant="outline" onClick={() => setEditing(item)} className="min-h-9 px-3">
                Remarcar
              </AgendaButton>
              {item.status !== 'confirmado' ? (
                <AgendaButton
                  variant="outline"
                  onClick={() => void status.mutate({ id: item.id, status: 'confirmado' }, { onSuccess: () => afterSuccess('Agendamento reativado.') })}
                  className="min-h-9 px-3"
                >
                  Reativar
                </AgendaButton>
              ) : (
                <>
                  <AgendaButton
                    variant="outline"
                    onClick={() => void status.mutate({ id: item.id, status: 'concluido' }, { onSuccess: () => afterSuccess('Agendamento concluido.') })}
                    className="min-h-9 px-3"
                  >
                    Concluir
                  </AgendaButton>
                  <AgendaButton
                    variant="outline"
                    onClick={() => void status.mutate({ id: item.id, status: 'cancelado' }, { onSuccess: () => afterSuccess('Agendamento cancelado.') })}
                    className="min-h-9 px-3"
                  >
                    Cancelar
                  </AgendaButton>
                </>
              )}
              <AgendaButton
                variant="danger"
                onClick={() => {
                  if (!window.confirm(`Excluir definitivamente o agendamento de ${item.name}?`)) return;
                  void remove.mutate(item.id, { onSuccess: () => afterSuccess('Agendamento excluido.') });
                }}
                className="min-h-9 px-3"
              >
                Excluir
              </AgendaButton>
            </div>
          </div>
        ))}
      </div>

      <RescheduleDialog
        appointment={editing}
        onClose={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          afterSuccess('Atendimento remarcado.');
        }}
      />
    </div>
  );
}

function RescheduleDialog({
  appointment,
  onClose,
  onSaved,
}: {
  appointment: Appointment | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [date, setDate] = useState(todayKey());
  const [start, setStart] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const { data: availability } = useAvailability();
  const { data: blocks } = useBlocks();
  const { data: booked } = useBookedTimes(appointment ? date : null);
  const { zone, label: zoneName } = useTimezone();
  const move = useAgendaMutation((value: { id: string; date: string; start: string }) =>
    rescheduleAppointment(value.id, value.date, value.start),
  );

  useEffect(() => {
    if (!appointment) return;
    setDate(appointment.date);
    setStart(appointment.start);
    setMessage(null);
  }, [appointment]);

  if (!appointment) return null;

  const slots = buildSlots({
    date,
    availability: availability ?? [],
    blocks: blocks ?? [],
    booked: booked ?? [],
    keep: appointment.date === date ? appointment.start : undefined,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-lg rounded-lg border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl">Remarcar atendimento</h2>
            <p className="text-sm text-muted-foreground">{appointment.name}</p>
          </div>
          <AgendaButton variant="ghost" onClick={onClose}>
            Fechar
          </AgendaButton>
        </div>

        {message ? (
          <div className="mt-4">
            <Message type="error">{message}</Message>
          </div>
        ) : null}

        <div className="mt-5 space-y-2">
          <AgendaLabel htmlFor="re-date">Nova data</AgendaLabel>
          <AgendaInput
            id="re-date"
            type="date"
            value={date}
            min={todayKey()}
            onChange={(event) => {
              setDate(event.target.value);
              setStart('');
            }}
          />
        </div>

        <div className="mt-5">
          <AgendaLabel>Horario ({zoneName})</AgendaLabel>
          <div className="mt-2 grid max-h-52 grid-cols-3 gap-2 overflow-y-auto sm:grid-cols-4">
            {slots.length === 0 ? <p className="col-span-full text-sm text-muted-foreground">Nenhum horario livre nesta data.</p> : null}
            {slots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setStart(slot)}
                className={`soft-transition rounded border px-2 py-2 text-sm ${
                  start === slot ? 'border-primary text-primary' : 'border-border text-muted-foreground hover:border-primary/40'
                }`}
              >
                {toViewer(date, slot, zone).time}
              </button>
            ))}
          </div>
        </div>

        <AgendaButton
          className="mt-5 w-full"
          disabled={!start || move.isPending}
          onClick={() =>
            void move.mutate(
              { id: appointment.id, date, start },
              {
                onSuccess: onSaved,
                onError: (error) => setMessage(error.message || 'Nao foi possivel remarcar.'),
              },
            )
          }
        >
          {move.isPending ? 'Salvando...' : 'Confirmar remarcacao'}
        </AgendaButton>
      </div>
    </div>
  );
}
