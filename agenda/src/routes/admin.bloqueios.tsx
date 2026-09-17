import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { addBlock, removeBlock, todayKey, useAgendaMutation, useBlocks } from "@/lib/scheduling/data";
import { formatDateShort } from "@/lib/scheduling/time";

export const Route = createFileRoute("/admin/bloqueios")({
  component: BlocksPage,
});

function BlocksPage() {
  const { data: blocks, isLoading } = useBlocks();
  const [date, setDate] = useState(todayKey());
  const [allDay, setAllDay] = useState(true);
  const [start, setStart] = useState("12:00");
  const [end, setEnd] = useState("13:00");
  const [reason, setReason] = useState("");

  const create = useAgendaMutation(() => addBlock({ date, allDay, start, end, reason }));
  const drop = useAgendaMutation((id: string) => removeBlock(id));

  const upcoming = (blocks ?? []).filter((b) => b.date >= todayKey());

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl">Bloqueios</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Feriados, férias e pausas. Horários bloqueados somem da agenda pública.
        </p>
        <p className="text-xs text-muted-foreground">
          Informe os horários no fuso de Brasília (UTC−3); eles valem para todos os fusos.
        </p>
      </div>

      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-xl">Novo bloqueio</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="block-date">Data</Label>
            <Input id="block-date" type="date" value={date} min={todayKey()} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="flex items-end gap-3 pb-2">
            <Switch id="all-day" checked={allDay} onCheckedChange={setAllDay} />
            <Label htmlFor="all-day">Dia inteiro</Label>
          </div>
          {!allDay && (
            <>
              <div className="space-y-2">
                <Label htmlFor="block-start">Início</Label>
                <Input id="block-start" type="time" value={start} onChange={(e) => setStart(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="block-end">Fim</Label>
                <Input id="block-end" type="time" value={end} onChange={(e) => setEnd(e.target.value)} />
              </div>
            </>
          )}
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="block-reason">Motivo (opcional)</Label>
            <Textarea
              id="block-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Feriado, compromisso pessoal..."
              rows={2}
            />
          </div>
        </div>
        <Button
          className="mt-5"
          disabled={create.isPending}
          onClick={() =>
            create.mutate(undefined, {
              onSuccess: () => {
                toast.success("Bloqueio criado.");
                setReason("");
              },
              onError: (error: unknown) =>
                toast.error(error instanceof Error ? error.message : "Não foi possível bloquear."),
            })
          }
        >
          {create.isPending ? "Salvando..." : "Bloquear"}
        </Button>
      </section>

      <section>
        <h2 className="text-xl">Bloqueios ativos</h2>
        <div className="mt-3 divide-y divide-border rounded-lg border border-border bg-card">
          {isLoading && <p className="p-5 text-sm text-muted-foreground">Carregando...</p>}
          {!isLoading && upcoming.length === 0 && (
            <p className="p-5 text-sm text-muted-foreground">Nenhum bloqueio futuro.</p>
          )}
          {upcoming.map((b) => (
            <div key={b.id} className="flex flex-wrap items-center justify-between gap-3 p-4 text-sm">
              <div>
                <p className="text-primary">
                  {formatDateShort(b.date)} · {b.allDay ? "Dia inteiro" : `${b.start} — ${b.end}`}
                </p>
                {b.reason && <p className="text-xs text-muted-foreground">{b.reason}</p>}
              </div>
              <button
                onClick={() => drop.mutate(b.id, { onSuccess: () => toast.success("Bloqueio removido.") })}
                className="soft-transition flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-destructive"
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
