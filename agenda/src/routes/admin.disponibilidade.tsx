import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { saveAvailability, useAgendaMutation, useAvailability } from "@/lib/scheduling/data";
import { WEEKDAY_LABELS } from "@/lib/scheduling/time";
import type { DayAvailability } from "@/lib/scheduling/types";

export const Route = createFileRoute("/admin/disponibilidade")({
  component: AvailabilityPage,
});

const defaults: DayAvailability[] = WEEKDAY_LABELS.map((_, weekday) => ({
  weekday,
  enabled: weekday >= 1 && weekday <= 5,
  start: "08:00",
  end: "18:00",
}));

function AvailabilityPage() {
  const { data, isLoading } = useAvailability();
  const [rows, setRows] = useState<DayAvailability[]>(defaults);

  useEffect(() => {
    if (!data) return;
    setRows(
      defaults.map((d) => data.find((r) => r.weekday === d.weekday) ?? d),
    );
  }, [data]);

  const save = useAgendaMutation((next: DayAvailability[]) => saveAvailability(next));

  function update(weekday: number, patch: Partial<DayAvailability>) {
    setRows((prev) => prev.map((r) => (r.weekday === weekday ? { ...r, ...patch } : r)));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Disponibilidade</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Defina os dias e o intervalo de atendimento. Os horários livres são gerados automaticamente.
        </p>
        <p className="text-xs text-muted-foreground">
          Estes horários são definidos no fuso de Brasília (UTC−3) e aparecem convertidos para cada pessoa.
        </p>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : (
        <div className="divide-y divide-border rounded-lg border border-border bg-card">
          {rows.map((row) => (
            <div key={row.weekday} className="flex flex-wrap items-center gap-4 p-4">
              <div className="flex w-44 items-center gap-3">
                <Switch
                  checked={row.enabled}
                  onCheckedChange={(enabled) => update(row.weekday, { enabled })}
                />
                <span className={row.enabled ? "text-sm" : "text-sm text-muted-foreground"}>
                  {WEEKDAY_LABELS[row.weekday]}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="time"
                  value={row.start}
                  disabled={!row.enabled}
                  onChange={(e) => update(row.weekday, { start: e.target.value })}
                  className="w-32"
                />
                <span className="text-muted-foreground">às</span>
                <Input
                  type="time"
                  value={row.end}
                  disabled={!row.enabled}
                  onChange={(e) => update(row.weekday, { end: e.target.value })}
                  className="w-32"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <Button
        disabled={save.isPending}
        onClick={() =>
          save.mutate(rows, {
            onSuccess: () => toast.success("Disponibilidade salva."),
            onError: () => toast.error("Não foi possível salvar."),
          })
        }
      >
        {save.isPending ? "Salvando..." : "Salvar disponibilidade"}
      </Button>
    </div>
  );
}
