'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Zap,
  Globe,
  Share2,
  Settings,
  LogOut,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

const menuItems = [
  {
    name: 'Visão Geral',
    href: '/admin',
    icon: LayoutDashboard,
    badge: 'Live',
  },
  {
    name: 'Performance do Site',
    href: '/admin/performance',
    icon: Zap,
  },
  {
    name: 'Tráfego Google',
    href: '/admin/google',
    icon: Globe,
  },
  {
    name: 'Tráfego Meta',
    href: '/admin/meta',
    icon: Share2,
  },
  {
    name: 'Configurações & APIs',
    href: '/admin/configuracoes',
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Erro ao sair:', err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col h-screen sticky top-0 z-40">
      {/* Header / Brand */}
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 font-bold">
          MM
        </div>
        <div>
          <h2 className="font-bold text-white text-base leading-tight">Matheus Morari</h2>
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium mt-0.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Painel Interno</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Relatórios & Métricas
        </div>

        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </div>

              {item.badge ? (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    isActive
                      ? 'bg-slate-950/20 text-slate-950'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}
                >
                  {item.badge}
                </span>
              ) : (
                isActive && <ChevronRight className="w-4 h-4 text-slate-950" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Footer / Logout */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/40">
        <div className="flex items-center justify-between mb-3 px-2">
          <div className="text-xs">
            <p className="text-slate-200 font-medium truncate max-w-[140px]">
              admin@matheusmorari.com.br
            </p>
            <p className="text-slate-500 text-[10px]">Sessão Ativa</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all duration-200 disabled:opacity-50"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{isLoggingOut ? 'Saindo...' : 'Sair da Conta'}</span>
        </button>
      </div>
    </aside>
  );
}
