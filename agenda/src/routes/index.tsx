import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import matheus from "@/assets/matheus.png.asset.json";
import logo from "@/assets/logo.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agendar horário | Matheus Morari — Psicólogo" },
      {
        name: "description",
        content:
          "Agende seu horário com o psicólogo Matheus Morari: escolha a data, veja os horários livres e confirme na hora.",
      },
      { property: "og:title", content: "Agendar horário | Matheus Morari — Psicólogo" },
      {
        property: "og:description",
        content: "Escolha a data, veja os horários livres e confirme na hora.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <img
        src={matheus.url}
        alt="Matheus Morari, psicólogo"
        className="absolute inset-y-0 right-0 h-full w-full object-cover object-[62%_center] sm:w-[72%] sm:object-center"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,var(--background)_34%,color-mix(in_oklab,var(--background)_92%,transparent)_48%,color-mix(in_oklab,var(--background)_25%,transparent)_74%,color-mix(in_oklab,var(--background)_52%,transparent)_100%)] sm:bg-[linear-gradient(90deg,var(--background)_0%,var(--background)_38%,color-mix(in_oklab,var(--background)_88%,transparent)_52%,color-mix(in_oklab,var(--background)_12%,transparent)_78%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,color-mix(in_oklab,var(--background)_48%,transparent),transparent_34%,transparent_72%,color-mix(in_oklab,var(--background)_28%,transparent))]" />

      <img
        src={logo.url}
        alt="Matheus Morari — Psicólogo Sistêmico"
        className="absolute left-6 top-6 z-20 h-16 rounded-md object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] sm:left-10 sm:h-20 lg:left-16 lg:h-24"
      />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-16 sm:px-10 lg:px-16">
        <div className="step-in w-full max-w-lg">
          <p className="text-[10px] uppercase tracking-[0.4em] text-primary/80">Psicólogo · Matheus Morari</p>
          <h1 className="mt-5 text-4xl leading-[1.1] sm:text-5xl">
            Agende seu <span className="gold-text">horário</span>
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Escolha a data, veja os horários livres e confirme em poucos segundos.
          </p>

          <div className="mt-8">
            <Button asChild size="lg" className="w-full px-10 sm:w-auto">
              <Link to="/agendar">Agendar horário</Link>
            </Button>
          </div>

          <div className="mt-12 max-w-md border-t border-border pt-6">
            <Link
              to="/login"
              className="soft-transition text-[10px] uppercase tracking-[0.24em] text-muted-foreground hover:text-primary"
            >
              Acesso interno — ver clientes agendados
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
