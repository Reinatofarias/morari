import React from 'react';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { redirect } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import {
  Settings,
  Globe,
  Share2,
  Phone,
  Webhook,
  ShieldAlert,
  Save,
  CheckCircle,
  Copy,
  Info,
} from 'lucide-react';

export default async function SettingsAdminPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect('/admin/login');
  }

  const currentGaId = process.env.NEXT_PUBLIC_GA_ID || '';
  const currentPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';
  const currentWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5569984024809';
  const currentWebhook = process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL || 'https://hook.us2.make.com/...';

  return (
    <div className="flex-1 pb-12">
      <AdminHeader
        title="Configurações de Integrações & APIs"
        subtitle="Gerencie as chaves do Google Analytics, Meta Pixel, Webhook de Leads e WhatsApp."
      />

      <div className="px-8 mt-8 space-y-8 max-w-5xl">
        {/* Credentials & Access Info */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Credenciais do Painel de Administração</h3>
              <p className="text-xs text-slate-400">Dados cadastrados para acesso interno seguro</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-sans">E-mail Cadastrado</span>
                <span className="text-amber-400 font-bold">admin@matheusmorari.com.br</span>
              </div>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-sans">Senha de Acesso</span>
                <span className="text-amber-400 font-bold">matheus@2026</span>
              </div>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Integration Keys Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-400" />
            IDs e Chaves de Monitoramento Rastreáveis
          </h3>

          <div className="space-y-5">
            {/* GA4 ID */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                Google Analytics 4 Property ID (G-XXXXXXX)
              </label>
              <input
                type="text"
                readOnly
                defaultValue={currentGaId || 'G-XXXXXXXXXX'}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-amber-400 focus:outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                <Info className="w-3 h-3 text-slate-400" />
                Variável: <code className="text-slate-300 font-mono">NEXT_PUBLIC_GA_ID</code> no arquivo <code className="text-slate-300 font-mono">.env.local</code>
              </p>
            </div>

            {/* Meta Pixel ID */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Share2 className="w-3.5 h-3.5 text-purple-400" />
                Meta Pixel ID (Facebook Ads Pixel)
              </label>
              <input
                type="text"
                readOnly
                defaultValue={currentPixelId || '123456789012345'}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-amber-400 focus:outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                <Info className="w-3 h-3 text-slate-400" />
                Variável: <code className="text-slate-300 font-mono">NEXT_PUBLIC_META_PIXEL_ID</code> no arquivo <code className="text-slate-300 font-mono">.env.local</code>
              </p>
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                Número do WhatsApp para Redirecionamento Direto
              </label>
              <input
                type="text"
                readOnly
                defaultValue={currentWhatsApp}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-emerald-400 focus:outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                <Info className="w-3 h-3 text-slate-400" />
                Variável: <code className="text-slate-300 font-mono">NEXT_PUBLIC_WHATSAPP_NUMBER</code>
              </p>
            </div>

            {/* Lead Webhook URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Webhook className="w-3.5 h-3.5 text-indigo-400" />
                Webhook para Captura de Leads (Make.com / CRM)
              </label>
              <input
                type="text"
                readOnly
                defaultValue={currentWebhook}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-indigo-400 focus:outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                <Info className="w-3 h-3 text-slate-400" />
                Variável: <code className="text-slate-300 font-mono">NEXT_PUBLIC_LEAD_WEBHOOK_URL</code>
              </p>
            </div>
          </div>
        </div>

        {/* How to configure guide */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-3xl p-6 text-amber-200 text-xs space-y-3">
          <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
            <ShieldAlert className="w-4 h-4" />
            Como atualizar as variáveis no servidor de produção (Vercel ou servidor próprio)
          </div>
          <p>
            Para atualizar o ID do Google Analytics ou do Meta Pixel em produção sem precisar recompilar a aplicação manualmente, basta acessar as variáveis de ambiente na Vercel ou no arquivo <code className="text-white font-mono font-semibold">.env.local</code> da raiz do projeto.
          </p>
          <pre className="p-3 bg-slate-950 rounded-xl font-mono text-[11px] text-slate-300 border border-slate-800 overflow-x-auto">
{`NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
NEXT_PUBLIC_SITE_URL=https://matheusmorari.com.br
NEXT_PUBLIC_WHATSAPP_NUMBER=5569984024809
NEXT_PUBLIC_LEAD_WEBHOOK_URL=https://hook.us2.make.com/v5sidsdvt1ccp5nd9w6mdi284ydxr416`}
          </pre>
        </div>
      </div>
    </div>
  );
}
