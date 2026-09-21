'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { AgendaBrand, AgendaButton, AgendaInput, AgendaLabel, Message } from '@/components/agenda/ui';
import { getAgendaSupabase } from '@/lib/agenda/supabase-client';
import { useAdminSession } from '@/lib/agenda/auth';

export default function AgendaLoginPage() {
  const router = useRouter();
  const session = useAdminSession();
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (session.isAdmin) router.replace('/agenda/admin');
  }, [session.isAdmin, router]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      const response = await fetch('/api/agenda/admin/unlock', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const result = (await response.json()) as { ok?: boolean; tokenHash?: string; reason?: string };
      if (!response.ok || !result.ok || !result.tokenHash) {
        const details: Record<string, string> = {
          missing_config: 'Configuracao incompleta na Vercel.',
          supabase_admin_key_invalid: 'A service role key do Supabase parece invalida ou de outro projeto.',
          user_roles_unavailable: 'A tabela user_roles nao esta acessivel no Supabase.',
          create_role_failed: 'Nao foi possivel criar a permissao de admin no Supabase.',
          create_user_failed: 'Nao foi possivel criar o usuario admin no Supabase.',
          magiclink_failed: 'Nao foi possivel gerar a sessao de login no Supabase.',
        };
        setMessage(result.reason ? details[result.reason] ?? result.reason : 'Senha incorreta.');
        return;
      }
      const { error } = await getAgendaSupabase().auth.verifyOtp({
        type: 'magiclink',
        token_hash: result.tokenHash,
      });
      if (error) throw new Error(error.message);
      router.replace('/agenda/admin');
      router.refresh();
    } catch {
      setMessage('Nao foi possivel entrar. Tente novamente.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-6">
      <Link
        href="/agenda"
        className="soft-transition absolute left-5 top-5 inline-flex items-center gap-2 rounded-lg border border-border bg-card/70 px-3 py-2 text-xs uppercase tracking-[0.14em] text-muted-foreground hover:border-primary/40 hover:text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Voltar
      </Link>

      <div className="w-full max-w-sm">
        <div className="flex justify-center">
          <AgendaBrand subtitle="Painel" />
        </div>
        <form onSubmit={submit} className="mt-10 rounded-lg border border-border bg-card p-8">
          <h1 className="font-display text-2xl">Acesso restrito</h1>
          <p className="mt-2 text-sm text-muted-foreground">Digite a senha para gerenciar os agendamentos.</p>

          {message ? (
            <div className="mt-5">
              <Message type="error">{message}</Message>
            </div>
          ) : null}

          <div className="mt-6 space-y-2">
            <AgendaLabel htmlFor="password">Senha</AgendaLabel>
            <AgendaInput
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoFocus
              required
            />
          </div>

          <AgendaButton type="submit" className="mt-6 w-full" disabled={busy}>
            {busy ? 'Entrando...' : 'Entrar'}
          </AgendaButton>
        </form>
      </div>
    </div>
  );
}
