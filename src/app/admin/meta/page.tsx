import React from 'react';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { redirect } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { MetricCard } from '@/components/admin/MetricCard';
import {
  Share2,
  Camera,
  Target,
  Users,
  MessageCircle,
  Sliders,
  ExternalLink,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

export default async function MetaTrafficPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect('/admin/login');
  }

  const campaignPerformance = [
    { name: 'Instagram Story — Mentoria & Estratégia', leads: 64, clicks: 540, ctr: '4.2%', status: 'Ativa' },
    { name: 'Feed Carousel — Casos de Sucesso', leads: 42, clicks: 410, ctr: '3.8%', status: 'Ativa' },
    { name: 'Link na Bio (Perfil Instagram Official)', leads: 38, clicks: 610, ctr: '6.2%', status: 'Orgânico' },
    { name: 'Reels Ads — Palestras & Treinamentos', leads: 22, clicks: 220, ctr: '2.9%', status: 'Pausada' },
  ];

  return (
    <div className="flex-1 pb-12">
      <AdminHeader
        title="Relatório de Tráfego do Meta (Instagram & Facebook)"
        subtitle="Métricas do Meta Pixel, conversões de anúncios e tráfego da bio."
      />

      <div className="px-8 mt-8 space-y-8">
        {/* Top Meta Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard
            title="Sessões Meta (Ads + Bio)"
            value="1,780"
            change="+28.4%"
            trend="up"
            description="Visitantes oriundos do Instagram & FB"
            icon={Share2}
            color="purple"
          />
          <MetricCard
            title="Eventos Meta 'Lead'"
            value="166"
            change="+21.5%"
            trend="up"
            description="Disparos do Pixel em Formulários"
            icon={Target}
            color="emerald"
          />
          <MetricCard
            title="Eventos Meta 'Contact'"
            value="245"
            change="+19.0%"
            trend="up"
            description="Cliques rastreados no WhatsApp"
            icon={MessageCircle}
            color="amber"
          />
          <MetricCard
            title="CTR Médio Anúncios"
            value="4.1%"
            change="+0.6%"
            trend="up"
            description="Taxa de cliques nas campanhas"
            icon={TrendingUp}
            color="indigo"
          />
        </div>

        {/* Pixel Tracked Events */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-400" />
                Eventos Rastreados pelo Meta Pixel
              </h3>
              <p className="text-xs text-slate-400">Rastreamento automático ativo no código do site</p>
            </div>

            <Link
              href="/admin/configuracoes"
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 bg-purple-500/10 px-3 py-1.5 rounded-xl border border-purple-500/20"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Configurar Pixel ID</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>PageView</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-2xl font-bold text-white">4,820</span>
              <p className="text-[11px] text-slate-500 mt-1">Disparado em todas as rotas</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Lead</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-2xl font-bold text-emerald-400">166</span>
              <p className="text-[11px] text-slate-500 mt-1">Envio de formulários com sucesso</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Contact</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-2xl font-bold text-amber-400">245</span>
              <p className="text-[11px] text-slate-500 mt-1">Cliques no botão do WhatsApp</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>ViewContent</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-2xl font-bold text-purple-400">1,120</span>
              <p className="text-[11px] text-slate-500 mt-1">Visualização de serviços & produtos</p>
            </div>
          </div>
        </div>

        {/* Campaign Breakdown */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Camera className="w-4 h-4 text-purple-400" />
                Desempenho por Origem & Anúncio
              </h3>
              <p className="text-xs text-slate-400">Resultados de campanhas do Instagram Ads e Bio</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-xs uppercase font-semibold text-slate-400">
                  <th className="pb-3 px-4">Campanha / Origem</th>
                  <th className="pb-3 px-4">Leads Gerados</th>
                  <th className="pb-3 px-4">Cliques</th>
                  <th className="pb-3 px-4">CTR</th>
                  <th className="pb-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {campaignPerformance.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-4 font-semibold text-white">{item.name}</td>
                    <td className="py-4 px-4 font-bold text-emerald-400">{item.leads}</td>
                    <td className="py-4 px-4 text-slate-300">{item.clicks}</td>
                    <td className="py-4 px-4 text-purple-400 font-semibold">{item.ctr}</td>
                    <td className="py-4 px-4 text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.status === 'Ativa'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : item.status === 'Orgânico'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Embed Meta Dashboard */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Integração Gerenciador de Anúncios Meta</h3>
              <p className="text-xs text-slate-400">
                Conecte seu Meta Pixel ID para visualização direta de eventos no painel.
              </p>
            </div>
            <a
              href="https://adsmanager.facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800"
            >
              <span>Gerenciador de Anúncios Meta</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="w-full h-64 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center p-6">
            <Share2 className="w-12 h-12 text-purple-500/40 mb-3" />
            <h4 className="font-bold text-white text-base">Meta Pixel Integrado</h4>
            <p className="text-xs text-slate-400 max-w-md mt-1 mb-4">
              Defina a variável <code className="text-amber-400 font-mono">NEXT_PUBLIC_META_PIXEL_ID</code> nas configurações do painel.
            </p>
            <Link
              href="/admin/configuracoes"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-purple-500/20 transition-all"
            >
              Configurar Meta Pixel ID
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
