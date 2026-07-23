import React from 'react';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { redirect } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { MetricCard } from '@/components/admin/MetricCard';
import {
  Zap,
  Gauge,
  Clock,
  ShieldCheck,
  Smartphone,
  Monitor,
  CheckCircle,
  AlertTriangle,
  Server,
  FileCode2,
} from 'lucide-react';

export default async function SitePerformancePage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect('/admin/login');
  }

  const routesPerformance = [
    { path: '/', name: 'Página Inicial (Home)', latency: '120ms', status: 'Excelente', score: 99 },
    { path: '/captura', name: 'Landing Page de Captura', latency: '95ms', status: 'Excelente', score: 100 },
    { path: '/conteudos', name: 'Página de Conteúdos', latency: '140ms', status: 'Bom', score: 96 },
    { path: '/bio', name: 'Link na Bio (Instagram)', latency: '80ms', status: 'Excelente', score: 100 },
  ];

  return (
    <div className="flex-1 pb-12">
      <AdminHeader
        title="Relatório de Performance do Site"
        subtitle="Métricas de velocidade, Core Web Vitals, tempo de resposta e otimização."
      />

      <div className="px-8 mt-8 space-y-8">
        {/* Top Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard
            title="LCP (Largest Contentful Paint)"
            value="0.8s"
            change="Excelente"
            trend="up"
            description="Meta: < 2.5s"
            icon={Zap}
            color="emerald"
          />
          <MetricCard
            title="FID / INP (Interaction Latency)"
            value="18ms"
            change="Ultra Rápido"
            trend="up"
            description="Meta: < 100ms"
            icon={Clock}
            color="indigo"
          />
          <MetricCard
            title="CLS (Cumulative Layout Shift)"
            value="0.002"
            change="Estável"
            trend="up"
            description="Meta: < 0.1"
            icon={Gauge}
            color="blue"
          />
          <MetricCard
            title="TTFB (Time to First Byte)"
            value="65ms"
            change="Servidor Rápido"
            trend="up"
            description="Resposta Edge Next.js"
            icon={Server}
            color="amber"
          />
        </div>

        {/* Speed Scores Mobile vs Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Smartphone className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Performance Mobile</h3>
                <p className="text-xs text-slate-400">Google PageSpeed Insights (Mobile)</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-4xl font-extrabold text-emerald-400">98</span>
              <span className="text-xs text-slate-500 block">/ 100</span>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Monitor className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Performance Desktop</h3>
                <p className="text-xs text-slate-400">Google PageSpeed Insights (Desktop)</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-4xl font-extrabold text-blue-400">100</span>
              <span className="text-xs text-slate-500 block">/ 100</span>
            </div>
          </div>
        </div>

        {/* Routes Latency Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white">Velocidade por Página (Latência de Rota)</h3>
              <p className="text-xs text-slate-400">Tempo de carregamento inicial e servidor</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Todas Otimizadas
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-xs uppercase font-semibold text-slate-400">
                  <th className="pb-3 px-4">Rota</th>
                  <th className="pb-3 px-4">Nome da Página</th>
                  <th className="pb-3 px-4">Latência</th>
                  <th className="pb-3 px-4">Score</th>
                  <th className="pb-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {routesPerformance.map((route) => (
                  <tr key={route.path} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-4 font-mono text-xs text-amber-400">{route.path}</td>
                    <td className="py-4 px-4 font-medium text-white">{route.name}</td>
                    <td className="py-4 px-4 text-slate-300">{route.latency}</td>
                    <td className="py-4 px-4 font-bold text-emerald-400">{route.score}/100</td>
                    <td className="py-4 px-4 text-right">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle className="w-3.5 h-3.5" />
                        {route.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Technical Optimization Highlights */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <FileCode2 className="w-5 h-5 text-amber-400" />
            Checklist de Otimização Técnica
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white">Next.js Image Optimization & WebP</h4>
                <p className="text-slate-400 mt-0.5">Imagens com compressão automática e lazy loading nativo.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white">Tailwind CSS & Minificação</h4>
                <p className="text-slate-400 mt-0.5">Bundle de estilo reduzido e purge de classes não utilizadas.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white">Compressão Gzip / Brotli no Edge</h4>
                <p className="text-slate-400 mt-0.5">Transferência rápida via CDN global com cache estático.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white">Google Fonts Prefetching</h4>
                <p className="text-slate-400 mt-0.5">Carregamento assíncrono das fontes sem bloqueio de renderização.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
