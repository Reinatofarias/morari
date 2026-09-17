import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LogOut } from "lucide-react";

import { Brand } from "@/components/Brand";
import { TimezonePicker } from "@/components/TimezonePicker";
import { signOut, useAdminSession } from "@/lib/scheduling/auth";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Painel | Agenda de Matheus Morari" },
      {
        name: "description",
        content: "Painel administrativo da agenda: agendamentos, disponibilidade e bloqueios.",
      },
      { property: "og:title", content: "Painel | Agenda de Matheus Morari" },
      { property: "og:description", content: "Gestão completa da agenda." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

const links = [
  { to: "/admin", label: "Visão geral", exact: true },
  { to: "/admin/agenda", label: "Agenda" },
  { to: "/admin/agendamentos", label: "Agendamentos" },
  { to: "/admin/disponibilidade", label: "Disponibilidade" },
  { to: "/admin/bloqueios", label: "Bloqueios" },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const session = useAdminSession();

  useEffect(() => {
    if (!session.loading && !session.isAdmin) void navigate({ to: "/login", replace: true });
  }, [session.loading, session.isAdmin, navigate]);

  if (session.loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!session.isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
        <p className="text-sm text-muted-foreground">Redirecionando para a tela de acesso...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5">
          <Brand subtitle="Painel" />
          <button
            onClick={async () => {
              await signOut();
              void navigate({ to: "/login", replace: true });
            }}
            className="soft-transition flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
          >
            <LogOut className="h-3.5 w-3.5" /> Sair
          </button>
          <TimezonePicker className="w-full" />
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 pb-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: "exact" in l }}
              activeProps={{ className: "border-primary text-primary" }}
              inactiveProps={{ className: "border-transparent text-muted-foreground hover:text-foreground" }}
              className="soft-transition whitespace-nowrap border-b-2 px-3 py-3 text-sm"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">
        <Outlet />
      </main>
    </div>
  );
}
