import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import logo from "@/assets/logo.jpg.asset.json";
import {
  bookAppointment,
  buildDaySlots,
  buildSlots,
  todayKey,
  useAgendaMutation,
  useAvailability,
  useBlocks,
  useBookedTimes,
} from "@/lib/scheduling/data";
import { formatDateLong, formatDateShort, fromDateKey, toDateKey } from "@/lib/scheduling/time";
import { APPOINTMENT_KINDS, type AppointmentKind } from "@/lib/scheduling/types";
import { TimezonePicker } from "@/components/TimezonePicker";
import { CANONICAL_ZONE, toViewer, useTimezone, zoneLabel } from "@/lib/scheduling/timezone";

const WHATSAPP = "556984024809";

export const Route = createFileRoute("/agendar")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Agendar horário | Matheus Morari — Psicólogo" },
      {
        name: "description",
        content: "Escolha a data, selecione um horário livre e confirme seu atendimento em poucos segundos.",
      },
      { property: "og:title", content: "Agendar horário | Matheus Morari" },
      { property: "og:description", content: "Escolha a data, selecione o horário e confirme." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookingPage,
});

function nextDays(count: number): string[] {
  const out: string[] = [];
  const base = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    out.push(toDateKey(d));
  }
  return out;
}

function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

function maskPhone(value: string): string {
  const d = onlyDigits(value).slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
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
    "*Novo agendamento confirmado*",
    "",
    `*Tipo:* ${data.kind}`,
    `*Nome:* ${data.name}`,
    `*Telefone:* ${data.phone}`,
    `*Data:* ${formatDateLong(local.date)}`,
    `*Horário:* ${local.time} (${zoneLabel(data.zone)})`,
  ];
  if (data.zone !== CANONICAL_ZONE) {
    lines.push(`*Equivale a:* ${formatDateShort(data.date)} às ${data.start} (${zoneLabel(CANONICAL_ZONE)})`);
  }
  if (data.notes.trim()) lines.push(`*Observação:* ${data.notes.trim()}`);
  lines.push("", "Enviado pelo site de agendamentos.");
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`;
}

function BookingPage() {
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [kind, setKind] = useState<AppointmentKind>("Atendimento");
  const [date, setDate] = useState<string>(todayKey());
  const [start, setStart] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [link, setLink] = useState<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const { zone, label: zoneName } = useTimezone();

  /** Horário salvo (fuso canônico) exibido no fuso do usuário. */
  const view = (time: string) => toViewer(date, time, zone);


  const { data: availability, isLoading: loadingAvailability } = useAvailability();
  const { data: blocks } = useBlocks();
  const { data: booked, isFetching: loadingSlots } = useBookedTimes(step >= 2 ? date : null);

  const daySlots = buildDaySlots({
    date,
    availability: availability ?? [],
    blocks: blocks ?? [],
    booked: booked ?? [],
  });

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  useEffect(() => {
    if (!link) return;
    const t = window.setTimeout(() => {
      window.location.href = link;
    }, 1600);
    return () => window.clearTimeout(t);
  }, [link]);

  const book = useAgendaMutation(() =>
    bookAppointment({ date, start: start!, name: name.trim(), whatsapp: phone, notes, kind }),
  );

  function confirm() {
    if (name.trim().length < 3) {
      toast.error("Informe seu nome completo.");
      return;
    }
    if (onlyDigits(phone).length < 10) {
      toast.error("Informe um WhatsApp válido com DDD.");
      return;
    }
    if (!start) {
      toast.error("Escolha um horário.");
      return;
    }

    book.mutate(undefined, {
      onSuccess: (result) => {
        const appointment = result as { start: string; end: string };
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
      onError: (error: unknown) => {
        const message = error instanceof Error ? error.message : "";
        if (/ocupado|reserv|unique|duplic/i.test(message)) {
          toast.error("Este horário acabou de ser reservado. Escolha outro.");
          setStart(null);
          setStep(2);
        } else if (/indispon|bloque|passado/i.test(message)) {
          toast.error("Este horário não está mais disponível.");
          setStart(null);
          setStep(2);
        } else {
          toast.error("Não foi possível concluir o agendamento. Tente novamente.");
        }
      },
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-4">
          <Link
            to="/"
            className="soft-transition inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar
          </Link>
          <img
            src={logo.url}
            alt="Matheus Morari, psicólogo sistêmico"
            className="h-12 rounded-md object-contain sm:h-14"
          />
        </div>
      </header>

      <main ref={topRef} className="mx-auto max-w-3xl px-5 py-10">
        <TimezonePicker className="mb-6" />
        <ol className="mb-8 flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.18em]">
          {["Tipo", "Data", "Horário", "Seus dados"].map((label, i) => (
            <li
              key={label}
              className={`soft-transition flex-1 border-t-2 pt-2 ${
                step >= i ? "border-primary text-primary" : "border-border text-muted-foreground"
              }`}
            >
              {label}
            </li>
          ))}
        </ol>

        {step === 0 && (
          <section key="step0" className="step-in">
            <h1 className="text-3xl">O que você deseja marcar?</h1>
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
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  <span className="block text-lg text-foreground">{option}</span>
                </button>
              ))}
            </div>
          </section>
        )}


        {step === 1 && (
          <section key="step1" className="step-in">
            <h1 className="text-3xl">Escolha a data</h1>
            <p className="mt-2 text-sm text-muted-foreground">{kind} · selecione o dia.</p>


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
                  const d = fromDateKey(key);
                  return (
                    <button
                      key={key}
                      disabled={free === 0}
                      onClick={() => {
                        setDate(key);
                        setStart(null);
                        setStep(2);
                      }}
                      className={`soft-transition rounded-lg border p-3 text-left disabled:cursor-not-allowed disabled:opacity-30 ${
                        date === key ? "border-primary" : "border-border hover:border-primary/40"
                      }`}
                    >
                      <span className="block text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
                        {d.toLocaleDateString("pt-BR", { weekday: "short" })}
                      </span>
                      <span className="mt-1 block font-display text-xl text-foreground">
                        {key.slice(8)}/{key.slice(5, 7)}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            <Button variant="outline" className="mt-8" onClick={() => setStep(0)}>
              Trocar tipo
            </Button>
          </section>
        )}

        {step === 2 && (
          <section key="step2" className="step-in">
            <h1 className="text-3xl">Escolha o horário</h1>
            <p className="mt-2 text-sm capitalize text-muted-foreground">
              {kind} · {formatDateLong(date)}
            </p>
            <p className="mt-1 text-xs normal-case text-muted-foreground">
              Horários no seu fuso: {zoneName}.
            </p>


            {loadingSlots ? (
              <p className="mt-6 text-sm text-muted-foreground">Buscando horários livres...</p>
            ) : daySlots.length === 0 ? (
              <p className="mt-6 text-sm text-muted-foreground">
                Não há horários livres nesta data. Volte e escolha outro dia.
              </p>
            ) : (
              <>
                <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {daySlots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      aria-disabled={!slot.available}
                      title={
                        slot.reason === "ocupado"
                          ? "Horário já reservado"
                          : slot.reason === "bloqueado"
                            ? "Horário indisponível"
                            : slot.reason === "passado"
                              ? "Horário já passou"
                              : undefined
                      }
                      onClick={() => {
                        if (!slot.available) return;
                        setStart(slot.time);
                        setStep(3);
                      }}
                      className={`soft-transition rounded-lg border py-3 text-sm ${
                        !slot.available
                          ? "cursor-not-allowed border-border/50 text-muted-foreground/40 line-through"
                          : start === slot.time
                            ? "border-primary text-primary"
                            : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                      }`}
                    >
                      {view(slot.time).time}
                      {!view(slot.time).sameDay && (
                        <span className="ml-1 text-[0.6rem] align-super">
                          {view(slot.time).date > date ? "+1d" : "-1d"}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Horários riscados já estão reservados ou indisponíveis.
                </p>
              </>
            )}

            <Button variant="outline" className="mt-8" onClick={() => setStep(1)}>
              Trocar data
            </Button>
          </section>
        )}

        {step === 3 && (
          <section key="step3" className="step-in">
            <h1 className="text-3xl">Seus dados</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {kind} · {start ? formatDateShort(view(start).date) : formatDateShort(date)} às{" "}
              {start ? view(start).time : ""} ({zoneName})
            </p>


            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">WhatsApp</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(maskPhone(e.target.value))}
                  placeholder="(69) 98402-4809"
                  inputMode="tel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Observação (opcional)</Label>
                <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={confirm} disabled={book.isPending} size="lg">
                {book.isPending ? "Confirmando..." : "Confirmar agendamento"}
              </Button>
              <Button variant="outline" size="lg" onClick={() => setStep(2)} disabled={book.isPending}>
                Voltar
              </Button>
            </div>
          </section>
        )}

        {step === 4 && (
          <section key="step4" className="step-in text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/50 text-primary">
              <Check className="h-6 w-6" />
            </span>
            <h1 className="mt-6 text-3xl">Horário confirmado</h1>
            <p className="mt-2 text-sm capitalize text-muted-foreground">
              {kind} · {start ? formatDateLong(view(start).date) : formatDateLong(date)} às{" "}
              {start ? view(start).time : ""}
            </p>
            <p className="mt-1 text-xs normal-case text-muted-foreground">{zoneName}</p>
            {start && zone !== CANONICAL_ZONE && (
              <p className="text-xs normal-case text-muted-foreground">
                Equivale a {formatDateShort(date)} às {start} em {zoneLabel(CANONICAL_ZONE)}.
              </p>
            )}

            <p className="mt-6 text-sm text-muted-foreground">
              Estamos abrindo o WhatsApp de Matheus com os seus dados...
            </p>
            {link && (
              <Button asChild className="mt-6" size="lg">
                <a href={link}>Abrir WhatsApp agora</a>
              </Button>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
