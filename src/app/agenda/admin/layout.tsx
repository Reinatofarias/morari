'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LogOut } from 'lucide-react';

import { AgendaBrand, TimezonePicker, cn } from '@/components/agenda/ui';
import { signOut, useAdminSession } from '@/lib/agenda/auth';

const links = [
  { href: '/agenda/admin', label: 'Visao geral', exact: true },
  { href: '/agenda/admin/agenda', label: 'Agenda' },
  { href: '/agenda/admin/agendamentos', label: 'Agendamentos' },
  { href: '/agenda/admin/disponibilidade', label: 'Disponibilidade' },
  { href: '/agenda/admin/bloqueios', label: 'Bloqueios' },
];

export default function AgendaAdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const session = useAdminSession();

  useEffect(() => {
    if (!session.loading && !session.isAdmin) router.replace('/agenda/login');
  }, [session.loading, session.isAdmin, router]);

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
          <AgendaBrand subtitle="Painel" />
          <button
            type="button"
            onClick={async () => {
              await signOut();
              router.replace('/agenda/login');
            }}
            className="soft-transition flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
          >
            <LogOut className="h-3.5 w-3.5" /> Sair
          </button>
          <TimezonePicker className="w-full" />
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 pb-1">
          {links.map((link) => {
            const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'soft-transition whitespace-nowrap border-b-2 px-3 py-3 text-sm',
                  active ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground',
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
    </div>
  );
}
