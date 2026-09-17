import { Globe } from "lucide-react";

import { BRAZIL_ZONES, useTimezone } from "@/lib/scheduling/timezone";

/** Seletor de fuso horário: detectado automaticamente, ajustável pelo usuário. */
export function TimezonePicker({ className = "" }: { className?: string }) {
  const { zone, manual, setZone, resetZone } = useTimezone();

  return (
    <div className={`flex flex-wrap items-center gap-2 text-xs text-muted-foreground ${className}`}>
      <Globe className="h-3.5 w-3.5 text-primary" />
      <label htmlFor="tz" className="uppercase tracking-[0.16em]">
        Seu fuso
      </label>
      <select
        id="tz"
        value={zone}
        onChange={(e) => setZone(e.target.value)}
        className="soft-transition rounded-md border border-border bg-card px-2 py-1 text-xs text-foreground focus:border-primary focus:outline-none"
      >
        {BRAZIL_ZONES.map((z) => (
          <option key={z.id} value={z.id}>
            {z.label}
          </option>
        ))}
      </select>
      {manual ? (
        <button type="button" onClick={resetZone} className="soft-transition underline hover:text-primary">
          detectar automaticamente
        </button>
      ) : (
        <span className="opacity-70">detectado automaticamente</span>
      )}
    </div>
  );
}
