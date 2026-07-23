'use client';

import React, { useState } from 'react';
import { MetricCard } from './MetricCard';
import {
  Share2,
  Camera,
  Target,
  MessageCircle,
  TrendingUp,
  ExternalLink,
  Save,
  CheckCircle2,
} from 'lucide-react';

export function LiveMetaView() {
  const [embedUrl, setEmbedUrl] = useState<string>('');
  const [pixelId, setPixelId] = useState<string>(process.env.NEXT_PUBLIC_META_PIXEL_ID || '');

  const campaignPerformance = [
    { name: 'Instagram Story — Mentoria & Estratégia', leads: 64, clicks: 540, ctr: '4.2%', status: 'Ativa' },
    { name: 'Feed Carousel — Casos de Sucesso', leads: 42, clicks: 410, ctr: '3.8%', status: 'Ativa' },
    { name: 'Link na Bio (Perfil Instagram Official)', leads: 38, clicks: 610, ctr: '6.2%', status: 'Orgânico' },
    { name: 'Reels Ads — Palestras & Treinamentos', leads: 22, clicks: 220, ctr: '2.9%', status: 'Pausada' },
  ];

  return (
    <div className="space-y-8">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Meta Pixel ID"
          value={pixelId ? pixelId : 'Não Configurado'}
          change={pixelId ? 'Ativo' : 'Aguardando ID'}
          trend={pixelId ? 'up' : 'neutral'}
          description="Rastreamento em tempo real no site"
          icon={Share2}
          color="purple"
        />
        <MetricCard
          title="Eventos 'Lead' Disparados"
          value="Ao Vivo"
          change="Formulários"
          trend="up"
          description="Capturas rastreadas pelo Pixel"
          icon={Target}
          color="emerald"
        />
        <MetricCard
          title="Eventos 'Contact' Disparados"
          value="Ao Vivo"
          change="WhatsApp"
          trend="up"
          description="Cliques no WhatsApp rastreados"
          icon={MessageCircle}
          color="amber"
        />
        <MetricCard
          title="CTR Anúncios Instagram"
          value="4.1%"
          change="Meta Ads"
          trend="up"
          description="Taxa média de cliques em campanhas"
          icon={TrendingUp}
          color="indigo"
        />
      </div>

      {/* Embed Meta Report Container */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Share2 className="w-5 h-5 text-purple-400" />
              Relatório do Gerenciador de Anúncios Meta / Looker Studio
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Insira o link do seu dashboard do Meta Ads para visualização direta no painel admin.
            </p>
          </div>

          <a
            href="https://adsmanager.facebook.com/"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 shrink-0"
          >
            <span>Gerenciador de Anúncios Meta</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {embedUrl ? (
          <div className="w-full h-[600px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
            <iframe
              src={embedUrl}
              className="w-full h-full border-0"
              allowFullScreen
              title="Dashboard Meta Ads"
            />
          </div>
        ) : (
          <div className="w-full py-12 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center text-center p-6">
            <Share2 className="w-12 h-12 text-purple-500/40 mb-3" />
            <h4 className="font-bold text-white text-base">Incorporar Dashboard Meta Ads / Looker Studio</h4>
            <p className="text-xs text-slate-400 max-w-lg mt-1 mb-4">
              Cole abaixo a URL de compartilhamento do seu painel do Meta Ads ou relatório do Looker Studio.
            </p>

            <div className="w-full max-w-lg flex items-center gap-2">
              <input
                type="url"
                value={embedUrl}
                onChange={(e) => setEmbedUrl(e.target.value)}
                placeholder="https://lookerstudio.google.com/embed/reporting/..."
                className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={() => {}}
                className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all shrink-0"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Carregar</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pixel Events Cards */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Target className="w-4 h-4 text-purple-400" />
          Eventos de Conversão Rastreados no Meta Pixel
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>PageView</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-xl font-bold text-white">Automático</span>
            <p className="text-[11px] text-slate-500 mt-1">Todas as páginas do site</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Lead</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-xl font-bold text-emerald-400">Ativo</span>
            <p className="text-[11px] text-slate-500 mt-1">Formulários de captura</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Contact</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-xl font-bold text-amber-400">Ativo</span>
            <p className="text-[11px] text-slate-500 mt-1">Botão do WhatsApp</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>ViewContent</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-xl font-bold text-purple-400">Ativo</span>
            <p className="text-[11px] text-slate-500 mt-1">Página de serviços e conteúdos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
