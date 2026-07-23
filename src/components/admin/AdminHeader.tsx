'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, RefreshCw, Bell, Sparkles } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <header className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-8 py-5 sticky top-0 z-30 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          {title}
        </h1>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition-all"
          title="Atualizar dados"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
          <span>Atualizar</span>
        </button>

        <div className="h-4 w-px bg-slate-800" />

        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 hover:bg-amber-500/20 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ver Site</span>
          <ExternalLink className="w-3 h-3 ml-0.5" />
        </Link>
      </div>
    </header>
  );
}
