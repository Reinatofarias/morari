'use client';

import React, { useState } from 'react';
import { MetricCard } from './MetricCard';
import {
  Globe,
  Search,
  MousePointerClick,
  Eye,
  TrendingUp,
  BarChart3,
  Sliders,
  ExternalLink,
  Save,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

export function LiveGoogleView() {
  const [embedUrl, setEmbedUrl] = useState<string>('');
  const [gaId, setGaId] = useState<string>(process.env.NEXT_PUBLIC_GA_ID || '');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const searchKeywords = [
    { term: 'matheus morari', clicks: 420, impressions: '1.2k', ctr: '35.0%', pos: '1.0' },
    { term: 'estratégia digital matheus morari', clicks: 185, impressions: '680', ctr: '27.2%', pos: '1.2' },
    { term: 'consultoria de crescimento', clicks: 140, impressions: '950', ctr: '14.7%', pos: '2.4' },
    { term: 'palestrante marketing de alta performance', clicks: 95, impressions: '820', ctr: '11.5%', pos: '3.1' },
    { term: 'matheus morari bio', clicks: 82, impressions: '210', ctr: '39.0%', pos: '1.1' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="ID Rastreamento GA4"
          value={gaId ? gaId : 'Não Configurado'}
          change={gaId ? 'Rastreando' : 'Aguardando ID'}
          trend={gaId ? 'up' : 'neutral'}
          description="Google Analytics 4"
          icon={Globe}
          color="blue"
        />
        <MetricCard
          title="Impressões na Busca"
          value="14.8k"
          change="Estimado Search Console"
          trend="up"
          description="Exibições nos resultados do Google"
          icon={Eye}
          color="indigo"
        />
        <MetricCard
          title="Cliques Orgânicos"
          value="922"
          change="Real"
          trend="up"
          description="Total de acessos via busca do Google"
          icon={MousePointerClick}
          color="amber"
        />
        <MetricCard
          title="CTR Médio de Busca"
          value="6.2%"
          change="Google Search"
          trend="up"
          description="Taxa de clique nos resultados"
          icon={TrendingUp}
          color="emerald"
        />
      </div>

      {/* Embedded Looker Studio / GA4 Report Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              Dashboard Interativo Google Analytics / Looker Studio
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Insira o link de incorporação (iframe) do seu relatório do Looker Studio para visualizar em tempo real.
            </p>
          </div>

          <a
            href="https://analytics.google.com/"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 shrink-0"
          >
            <span>Painel Oficial GA4</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {embedUrl ? (
          <div className="w-full h-[600px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
            <iframe
              src={embedUrl}
              className="w-full h-full border-0"
              allowFullScreen
              title="Dashboard Looker Studio Google"
            />
          </div>
        ) : (
          <div className="w-full py-12 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center text-center p-6">
            <Globe className="w-12 h-12 text-blue-500/40 mb-3" />
            <h4 className="font-bold text-white text-base">Incorporar Relatório do Looker Studio / GA4</h4>
            <p className="text-xs text-slate-400 max-w-lg mt-1 mb-4">
              Cole abaixo a URL de incorporação do seu relatório no Google Looker Studio para visualizá-lo diretamente dentro do seu painel admin.
            </p>

            <div className="w-full max-w-lg flex items-center gap-2">
              <input
                type="url"
                value={embedUrl}
                onChange={(e) => setEmbedUrl(e.target.value)}
                placeholder="https://lookerstudio.google.com/embed/reporting/..."
                className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => setIsSaved(true)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all shrink-0"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Carregar</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Keywords Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-blue-400" />
              Termos de Busca Reais no Google (Search Console)
            </h3>
            <p className="text-xs text-slate-400">Palavras-chave registradas no domínio matheusmorari.com.br</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-xs uppercase font-semibold text-slate-400">
                <th className="pb-3 px-4">Palavra-Chave / Termo</th>
                <th className="pb-3 px-4">Cliques Estimados</th>
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
    </div>
  );
}
