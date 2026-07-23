import React from 'react';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { redirect } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { MetricCard } from '@/components/admin/MetricCard';
import Link from 'next/link';
import {
  Users,
  MessageSquare,
  Zap,
  Globe,
  Share2,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Activity,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect('/admin/login');
  }

  return (
    <div className="flex-1 pb-12">
      <AdminHeader
        title="Visão Geral do Painel"
        subtitle="Resumo de performance do site, tráfego do Google e Meta Ads em tempo real."
      />

      <div className="px-8 mt-8 space-y-8">
        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard
            title="Leads Capturados"
            value="142"
            change="+18.4%"
            trend="up"
            description="Formulários enviados nos últimos 30 dias"
            icon={Users}
            color="emerald"
          />
          <MetricCard
            title="Cliques no WhatsApp"
            value="389"
            change="+24.1%"
            trend="up"
            description="Contatos diretos iniciados"
            icon={MessageSquare}
            color="amber"
          />
          <MetricCard
            title="Sessões Totais"
            value="4,820"
            change="+12.5%"
            trend="up"
            description="Tráfego combinado (Google + Meta)"
            icon={Globe}
            color="blue"
          />
          <MetricCard
            title="Performance do Site"
            value="98/100"
            change="Excelente"
            trend="up"
            description="Pontuação no Google PageSpeed"
            icon={Zap}
            color="purple"
          />
        </div>

        {/* Traffic Channels Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Traffic Split */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-white">Distribuição de Tráfego</h3>
                <p className="text-xs text-slate-400">Origens de visitantes nos últimos 30 dias</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Ativo
              </span>
            </div>

            {/* Channels Progress Bars */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-slate-300 flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    Google Search (Orgânico + Ads)
                  </span>
                  <span className="text-white font-bold">2,140 (44.4%)</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-blue-500 h-full rounded-full w-[44.4%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-slate-300 flex items-center gap-2">
                    <Share2 className="w-3.5 h-3.5 text-purple-400" />
                    Meta Ads (Instagram + Facebook)
                  </span>
                  <span className="text-white font-bold">1,780 (36.9%)</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-purple-500 h-full rounded-full w-[36.9%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-slate-300 flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                    Link da Bio & Redes Sociais
                  </span>
                  <span className="text-white font-bold">610 (12.7%)</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-amber-500 h-full rounded-full w-[12.7%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-slate-300 flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    Tráfego Direto & Outros
                  </span>
                  <span className="text-white font-bold">290 (6.0%)</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-emerald-500 h-full rounded-full w-[6.0%]" />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Taxa de Conversão Média: <strong className="text-white">3.8%</strong></span>
              <span>Tempo Médio na Página: <strong className="text-white">2m 45s</strong></span>
            </div>
          </div>

          {/* Quick Access Navigation Cards */}
          <div className="space-y-4">
            <Link
              href="/admin/performance"
              className="block bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 shadow-xl backdrop-blur-md group transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors">
                      Relatório de Performance
                    </h4>
                    <p className="text-xs text-slate-400">Speed Index, SEO e Uptime</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
              </div>
            </Link>

            <Link
              href="/admin/google"
              className="block bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 shadow-xl backdrop-blur-md group transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">
                      Relatório Tráfego Google
                    </h4>
                    <p className="text-xs text-slate-400">GA4 e Palavras-chave</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </div>
            </Link>

            <Link
              href="/admin/meta"
              className="block bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-5 shadow-xl backdrop-blur-md group transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-purple-400 transition-colors">
                      Relatório Tráfego Meta
                    </h4>
                    <p className="text-xs text-slate-400">Pixel Events e Campanhas</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
              </div>
            </Link>
          </div>
        </div>

        {/* System Status & Activity Feed */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Status dos Serviços Integrados</h3>
            </div>
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Atualizado há 5 minutos
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400">Google Analytics 4</p>
                <p className="text-sm font-semibold text-white mt-0.5">Conectado</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400">Meta Pixel</p>
                <p className="text-sm font-semibold text-white mt-0.5">Disparando Events</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400">Webhook Make (Leads)</p>
                <p className="text-sm font-semibold text-white mt-0.5">Ativo (200 OK)</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400">Uptime do Servidor</p>
                <p className="text-sm font-semibold text-white mt-0.5">99.98% Operational</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
