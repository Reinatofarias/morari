import React from 'react';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { redirect } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { MetricCard } from '@/components/admin/MetricCard';
import {
  Globe,
  Search,
  MousePointerClick,
  Eye,
  TrendingUp,
  BarChart3,
  Sliders,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

export default async function GoogleTrafficPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect('/admin/login');
  }

  const searchKeywords = [
    { term: 'matheus morari', clicks: 420, impressions: '1.2k', ctr: '35.0%', pos: '1.0' },
    { term: 'estratégia digital matheus morari', clicks: 185, impressions: '680', ctr: '27.2%', pos: '1.2' },
    { term: 'consultoria de crescimento', clicks: 140, impressions: '950', ctr: '14.7%', pos: '2.4' },
    { term: 'palestrante marketing de alta performance', clicks: 95, impressions: '820', ctr: '11.5%', pos: '3.1' },
    { term: 'matheus morari bio', clicks: 82, impressions: '210', ctr: '39.0%', pos: '1.1' },
  ];

  return (
    <div className="flex-1 pb-12">
      <AdminHeader
        title="Relatório de Tráfego do Google"
        subtitle="Métricas de busca orgânica, Google Analytics 4 (GA4) e Google Search Console."
      />

      <div className="px-8 mt-8 space-y-8">
        {/* Top Google Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard
            title="Usuários Orgânicos (GA4)"
            value="2,140"
            change="+14.2%"
            trend="up"
            description="Visitantes vindos do Google"
            icon={Globe}
            color="blue"
          />
          <MetricCard
            title="Impressões na Busca"
            value="14.8k"
            change="+22.0%"
            trend="up"
            description="Exibições nos resultados do Google"
            icon={Eye}
            color="indigo"
          />
          <MetricCard
            title="Cliques Orgânicos"
            value="922"
            change="+16.8%"
            trend="up"
            description="Total de acessos via Search Console"
            icon={MousePointerClick}
            color="amber"
          />
          <MetricCard
            title="CTR Médio de Busca"
            value="6.2%"
            change="+0.8%"
            trend="up"
            description="Taxa de clique nos resultados"
            icon={TrendingUp}
            color="emerald"
          />
        </div>

        {/* Top Organic Search Keywords */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-400" />
                Principais Termos de Busca (Google Search Console)
              </h3>
              <p className="text-xs text-slate-400">Palavras-chave que mais trazem visitantes para o site</p>
            </div>

            <Link
              href="/admin/configuracoes"
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 bg-blue-500/10 px-3 py-1.5 rounded-xl border border-blue-500/20"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Configurar ID GA4</span>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-xs uppercase font-semibold text-slate-400">
                  <th className="pb-3 px-4">Palavra-Chave / Termo</th>
                  <th className="pb-3 px-4">Cliques</th>
                  <th className="pb-3 px-4">Impressões</th>
                  <th className="pb-3 px-4">CTR</th>
                  <th className="pb-3 px-4 text-right">Posição Média</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {searchKeywords.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-4 font-semibold text-white flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-mono w-4">#{idx + 1}</span>
                      {item.term}
                    </td>
                    <td className="py-4 px-4 font-bold text-blue-400">{item.clicks}</td>
                    <td className="py-4 px-4 text-slate-300">{item.impressions}</td>
                    <td className="py-4 px-4 text-emerald-400 font-semibold">{item.ctr}</td>
                    <td className="py-4 px-4 text-right font-mono text-xs text-amber-400">{item.pos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Looker Studio / Live Embed Container */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                Painel do Google Analytics & Looker Studio
              </h3>
              <p className="text-xs text-slate-400">
                Você pode conectar seu dashboard do Looker Studio para ver relatórios ao vivo.
              </p>
            </div>
            <a
              href="https://analytics.google.com/"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800"
            >
              <span>Abrir GA4 Oficial</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="w-full h-80 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center p-6">
            <Globe className="w-12 h-12 text-blue-500/40 mb-3" />
            <h4 className="font-bold text-white text-base">Google Analytics 4 Pronto</h4>
            <p className="text-xs text-slate-400 max-w-md mt-1 mb-4">
              Defina a variável <code className="text-amber-400 font-mono">NEXT_PUBLIC_GA_ID</code> nas configurações do painel para rastrear eventos ao vivo de cada visitante.
            </p>
            <Link
              href="/admin/configuracoes"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all"
            >
              Vincular ID do Google Analytics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
