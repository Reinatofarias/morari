import { Link } from "@tanstack/react-router";

import logo from "@/assets/logo.jpg.asset.json";

export function Brand({ subtitle = "Psicólogo" }: { subtitle?: string }) {
  return (
    <Link to="/" className="group inline-flex flex-col items-center gap-2 sm:items-start">
      <img
        src={logo.url}
        alt="Matheus Morari — Psicólogo Sistêmico"
        className="h-16 rounded-md object-contain sm:h-20"
        loading="lazy"
      />
      <span className="text-[0.68rem] uppercase tracking-[0.32em] text-muted-foreground">{subtitle}</span>
    </Link>
  );
}
