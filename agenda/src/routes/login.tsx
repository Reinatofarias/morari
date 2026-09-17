import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { Brand } from "@/components/Brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { unlockAdmin } from "@/lib/scheduling/admin-access.functions";
import { useAdminSession } from "@/lib/scheduling/auth";

export const Route = createFileRoute("/login")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Entrar | Agenda de Matheus Morari" },
      { name: "description", content: "Acesso restrito ao painel administrativo da agenda." },
      { property: "og:title", content: "Entrar | Agenda de Matheus Morari" },
      { property: "og:description", content: "Acesso restrito ao painel administrativo da agenda." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const session = useAdminSession();
  const unlock = useServerFn(unlockAdmin);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (session.isAdmin) void navigate({ to: "/admin", replace: true });
  }, [session.isAdmin, navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const result = await unlock({ data: { password } });
      if (!result.ok) {
        toast.error("Senha incorreta.");
        return;
      }
      const { error } = await supabase.auth.verifyOtp({
        type: "magiclink",
        token_hash: result.tokenHash,
      });
      if (error) throw new Error(error.message);
      void navigate({ to: "/admin", replace: true });
    } catch {
      toast.error("Não foi possível entrar. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-6">
      <Link
        to="/"
        className="soft-transition absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-sm hover:border-primary/40 hover:text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Voltar para agendamentos
      </Link>

      <div className="w-full max-w-sm">
        <div className="flex justify-center">
          <Brand subtitle="Painel" />
        </div>
        <form onSubmit={submit} className="mt-10 rounded-xl border border-border bg-card p-8">
          <h1 className="text-2xl">Acesso restrito</h1>
          <p className="mt-2 text-sm text-muted-foreground">Digite a senha para ver os clientes agendados.</p>

          <div className="mt-6 space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoFocus
              required
            />
          </div>

          <Button type="submit" className="mt-6 w-full" disabled={busy}>
            {busy ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
