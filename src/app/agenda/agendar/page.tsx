'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';

import {
  bookAppointment,
  buildDaySlots,
  buildSlots,
  todayKey,
  useAgendaMutation,
  useAvailability,
  useBlocks,
  useBookedTimes,
} from '@/lib/agenda/data';
import { formatDateLong, formatDateShort, fromDateKey, toDateKey } from '@/lib/agenda/time';
import { APPOINTMENT_KINDS, type AppointmentKind } from '@/lib/agenda/types';
import { CANONICAL_ZONE, toViewer, useTimezone, zoneLabel } from '@/lib/agenda/timezone';
import {
  AgendaBrand,
  AgendaButton,
  AgendaInput,
  AgendaLabel,
  AgendaTextarea,
  Message,
  TimezonePicker,
} from '@/components/agenda/ui';

const WHATSAPP = '556984024809';

function nextDays(count: number): string[] {
  const out: string[] = [];
  const base = new Date();
  for (let i = 0; i < count; i += 1) {
    const day = new Date(base);
    day.setDate(base.getDate() + i);
    out.push(toDateKey(day));
  }
  return out;
}

function onlyDigits(value: string): string {
  return value.replace(/\D/g, '');
}

function maskPhone(value: string): string {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function whatsappLink(data: {
  name: string;
  phone: string;
  date: string;
  start: string;
  end: string;
  notes: string;
  kind: string;
  zone: string;
}): string {
  const local = toViewer(data.date, data.start, data.zone);
  const lines = [
    '*Novo agendamento confirmado*',
    '',
    `*Tipo:* ${data.kind}`,
    `*Nome:* ${data.name}`,
    `*Telefone:* ${data.phone}`,
    `*Data:* ${formatDateLong(local.date)}`,
    `*Horario:* ${local.time} (${zoneLabel(data.zone)})`,
  ];
  if (data.zone !== CANONICAL_ZONE) {
    lines.push(`*Equivale a:* ${formatDateShort(data.date)} as ${data.start} (${zoneLabel(CANONICAL_ZONE)})`);
  }
  if (data.notes.trim()) lines.push(`*Observacao:* ${data.notes.trim()}`);
  lines.push('', 'Enviado pelo site de agendamentos.');
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export default function BookingPage() {
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [kind, setKind] = useState<AppointmentKind>('Atendimento');
  const [date, setDate] = useState<string>(todayKey());
  const [start, setStart] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [link, setLink] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const { zone, label: zoneName } = useTimezone();

  const { data: availability, isLoading: loadingAvailability, isError } = useAvailability();
  const { data: blocks } = useBlocks();
  const { data: booked, isFetching: loadingSlots, refetch: reloadBooked } = useBookedTimes(step >= 2 ? date : null);
  const book = useAgendaMutation(() =>
    bookAppointment({ date, start: start!, name: name.trim(), whatsapp: phone, notes, kind }),
  );

  const daySlots = buildDaySlots({
    date,
    availability: availability ?? [],
    blocks: blocks ?? [],
    booked: booked ?? [],
  });

  const view = (time: string) => toViewer(date, time, zone);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step]);

  useEffect(() => {
    if (!link) return;
    const timer = window.setTimeout(() => {
      window.location.href = link;
    }, 1400);
    return () => window.clearTimeout(timer);
  }, [link]);

  function confirm() {
    setMessage(null);
    if (name.trim().length < 3) {
      setMessage('Informe seu nome completo.');
      return;
    }
    if (onlyDigits(phone).length < 10) {
      setMessage('Informe um WhatsApp valido com DDD.');
      return;
    }
    if (!start) {
      setMessage('Escolha um horario.');
      return;
    }

    void book.mutate(undefined, {
      onSuccess: (appointment) => {
        setLink(
          whatsappLink({
            name: name.trim(),
            phone,
            date,
            start: appointment.start,
            end: appointment.end,
            notes,
            kind,
            zone,
          }),
        );
        setStep(4);
      },
      onError: (error) => {
        const text = error.message;
        if (/ocupado|reserv|unique|duplic/i.test(text)) {
          setMessage('Este horario acabou de ser reservado. Escolha outro.');
          setStart(null);
          setStep(2);
          void reloadBooked();
          return;
        }
        setMessage('Nao foi possivel concluir o agendamento. Tente novamente.');
      },
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-4">
          <Link
            href="/agenda"
            className="soft-transition inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar
          </Link>
          <AgendaBrand />
        </div>
      </header>

      <main ref={topRef} className="mx-auto max-w-3xl px-5 py-10">
        <TimezonePicker className="mb-6" />
        <ol className="mb-8 flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.16em]">
          {['Tipo', 'Data', 'Horario', 'Seus dados'].map((label, index) => (
            <li
              key={label}
              className={`soft-transition flex-1 border-t-2 pt-2 ${
                step >= index ? 'border-primary text-primary' : 'border-border text-muted-foreground'
              }`}
            >
              {label}
            </li>
          ))}
        </ol>

        {message ? <Message type="error">{message}</Message> : null}
        {isError ? <Message type="error">Nao foi possivel carregar a agenda. Atualize a pagina.</Message> : null}

        {step === 0 && (
          <section className="step-in mt-6">
            <h1 className="font-display text-3xl">O que voce deseja marcar?</h1>
            <p className="mt-2 text-sm text-muted-foreground">Selecione o tipo de encontro.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {APPOINTMENT_KINDS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setKind(option);
                    setStep(1);
                  }}
                  className={`soft-transition rounded-lg border p-5 text-left ${
                    kind === option
                      ? 'border-primary text-primary'
                      : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  }`}
                >
                  <span className="block text-lg text-foreground">{option}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 1 && (
          <section className="step-in mt-6">
            <h1 className="font-display text-3xl">Escolha a data</h1>
            <p className="mt-2 text-sm text-muted-foreground">{kind} - selecione o dia.</p>
            {loadingAvailability ? (
              <p className="mt-6 text-sm text-muted-foreground">Carregando agenda...</p>
            ) : (
              <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {nextDays(21).map((key) => {
                  const free = buildSlots({
                    date: key,
                    availability: availability ?? [],
                    blocks: blocks ?? [],
                    booked: [],
                  }).length;
                  const day = fromDateKey(key);
                  return (
                    <button
                      key={key}
                      type="button"
                      disabled={free === 0}
                      onClick={() => {
                        setDate(key);
                        setStart(null);
                        setStep(2);
                      }}
                      className={`soft-transition rounded-lg border p-3 text-left disabled:cursor-not-allowed disabled:opacity-30 ${
                        date === key ? 'border-primary' : 'border-border hover:border-primary/40'
                      }`}
                    >
                      <span className="block text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
                        {day.toLocaleDateString('pt-BR', { weekday: 'short' })}
                      </span>
                      <span className="mt-1 block font-display text-xl text-foreground">
                        {key.slice(8)}/{key.slice(5, 7)}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
            <AgendaButton variant="outline" className="mt-8" onClick={() => setStep(0)}>
              Trocar tipo
            </AgendaButton>
          </section>
        )}

        {step === 2 && (
          <section className="step-in mt-6">
            <h1 className="font-display text-3xl">Escolha o horario</h1>
            <p className="mt-2 text-sm capitalize text-muted-foreground">
              {kind} - {formatDateLong(date)}
            </p>
            <p className="mt-1 text-xs normal-case text-muted-foreground">Horarios no seu fuso: {zoneName}.</p>

            {loadingSlots ? (
              <p className="mt-6 text-sm text-muted-foreground">Buscando horarios livres...</p>
            ) : daySlots.length === 0 ? (
              <p className="mt-6 text-sm text-muted-foreground">Nao ha horarios livres nesta data.</p>
            ) : (
              <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-5">
                {daySlots.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => {
                      if (!slot.available) return;
                      setStart(slot.time);
                      setStep(3);
                    }}
                    className={`soft-transition rounded-lg border py-3 text-sm ${
                      !slot.available
                        ? 'cursor-not-allowed border-border/50 text-muted-foreground/40 line-through'
                        : start === slot.time
                          ? 'border-primary text-primary'
                          : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                    }`}
                  >
                    {view(slot.time).time}
                    {!view(slot.time).sameDay && (
                      <span className="ml-1 text-[0.6rem] align-super">
                        {view(slot.time).date > date ? '+1d' : '-1d'}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
            <AgendaButton variant="outline" className="mt-8" onClick={() => setStep(1)}>
              Trocar data
            </AgendaButton>
          </section>
        )}

        {step === 3 && (
          <section className="step-in mt-6">
            <h1 className="font-display text-3xl">Seus dados</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {kind} - {start ? formatDateShort(view(start).date) : formatDateShort(date)} as {start ? view(start).time : ''} ({zoneName})
            </p>
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <AgendaLabel htmlFor="name">Nome completo</AgendaLabel>
                <AgendaInput id="name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
              </div>
              <div className="space-y-2">
                <AgendaLabel htmlFor="phone">WhatsApp</AgendaLabel>
                <AgendaInput
                  id="phone"
                  value={phone}
                  onChange={(event) => setPhone(maskPhone(event.target.value))}
                  placeholder="(69) 98402-4809"
                  inputMode="tel"
                />
              </div>
              <div className="space-y-2">
                <AgendaLabel htmlFor="notes">Observacao (opcional)</AgendaLabel>
                <AgendaTextarea id="notes" value={notes} onChange={(event) => setNotes(event.target.value)} rows={3} />
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <AgendaButton onClick={confirm} disabled={book.isPending}>
                {book.isPending ? 'Confirmando...' : 'Confirmar agendamento'}
              </AgendaButton>
              <AgendaButton variant="outline" onClick={() => setStep(2)} disabled={book.isPending}>
                Voltar
              </AgendaButton>
            </div>
          </section>
        )}

        {step === 4 && (
          <section className="step-in mt-6 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/50 text-primary">
              <Check className="h-6 w-6" />
            </span>
            <h1 className="mt-6 font-display text-3xl">Horario confirmado</h1>
            <p className="mt-2 text-sm capitalize text-muted-foreground">
              {kind} - {start ? formatDateLong(view(start).date) : formatDateLong(date)} as {start ? view(start).time : ''}
            </p>
            <p className="mt-1 text-xs normal-case text-muted-foreground">{zoneName}</p>
            {start && zone !== CANONICAL_ZONE ? (
              <p className="text-xs normal-case text-muted-foreground">
                Equivale a {formatDateShort(date)} as {start} em {zoneLabel(CANONICAL_ZONE)}.
              </p>
            ) : null}
            <p className="mt-6 text-sm text-muted-foreground">Estamos abrindo o WhatsApp de Matheus com os seus dados...</p>
            {link ? (
              <a
                href={link}
                className="soft-transition mt-6 inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110"
              >
                Abrir WhatsApp agora
              </a>
            ) : null}
          </section>
        )}
      </main>
    </div>
  );
}
