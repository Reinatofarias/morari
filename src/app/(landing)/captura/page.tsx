'use client';

import { useState } from 'react';
import { ShieldCheck, Lock, ArrowRight, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { YouTubeEmbed } from '@/components/ui/YouTubeEmbed';
import { portraitAssets } from '@/lib/visual-assets';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';

export default function CapturaPage() {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [perfil, setPerfil] = useState('');
  const [desafio, setDesafio] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !whatsapp.trim() || !perfil) return;

    setStatus('loading');

    // Data payload
    const payload = {
      nome: nome.trim(),
      whatsapp: whatsapp.trim(),
      perfil: perfil,
      desafio: desafio.trim() || 'Não especificado',
      timestamp: new Date().toISOString(),
      source: 'landing_page_captura',
    };

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL;
      
      if (webhookUrl) {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          mode: 'no-cors', // standard for webhook posts if CORS isn't configured on spreadsheet apps
        });
        console.log('Webhook triggered successfully', response);
      } else {
        console.warn('Webhook URL not configured. Simulating success.');
      }

      setStatus('success');

      // Pre-filled WhatsApp message redirect
      const rawMsg = `Olá Dr. Matheus, acabei de preencher o diagnóstico no site e quero garantir minha sessão de triagem. Meu nome é ${nome.trim()}, atuo como ${perfil} e meu maior desafio hoje é: ${desafio.trim() || 'Melhorar governo interno'}.`;
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(rawMsg)}`;
      
      // Delay slightly to show success message before redirect
      setTimeout(() => {
        window.location.href = waUrl;
      }, 1000);

    } catch (err) {
      console.error('Error submitting lead:', err);
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen text-foreground flex flex-col justify-between selection:bg-gold/30 selection:text-ice relative overflow-hidden">
      {/* Background Image of Matheus with luxury dark overlay */}
      <div className="absolute inset-0 -z-10 w-full h-full bg-background">
        <Image
          src={portraitAssets.library.src}
          alt="Matheus Morari Background"
          fill
          className="object-cover object-center filter grayscale opacity-[0.22]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/85 to-background z-0" />
      </div>

      {/* Glow effects for premium dark mood */}
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-gold/[0.015] rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-dark/20 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Header */}
      <header className="py-3 border-b border-surface-soft/20 bg-background/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="relative h-12 w-44 sm:h-18 sm:w-64">
            <Image
              src="/assets/branding/logo-horizontal-nobg-cropped.png"
              alt="Dr. Matheus Morari"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
          <div className="text-[10px] sm:text-xs text-muted-light font-semibold uppercase tracking-wider flex items-center gap-1.5 border border-surface-soft px-3 py-1 rounded bg-surface/40">
            <Lock size={12} className="text-gold" />
            <span>Ambiente Seguro</span>
          </div>
        </div>
      </header>

      {/* Hero / Landing Section */}
      <section className="flex-grow max-w-6xl mx-auto w-full px-6 py-12 md:py-16 space-y-12 z-10 relative">
        {/* Copy - Hormozi Style Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="font-display font-bold text-ice text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.1] tracking-tight">
            Você está vencendo fora, mas <span className="text-gold">perdendo o governo</span> de si mesmo?
          </h1>
          <p className="text-muted-light text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Sem receitas mágicas. Sem autoajuda. Assista ao vídeo de 5 minutos abaixo para entender exatamente como eu atendo, o que eu entrego e o que eu espero de você.
          </p>
        </div>

        {/* 2-Column Desktop Grid / 1-Column Mobile Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left Column: Video & Benefits */}
          <div className="lg:col-span-7 w-full space-y-6">
            <YouTubeEmbed 
              videoId="4IUCI-JB4nY"
              thumbnailUrl={portraitAssets.profileDesk.src}
              title="O que eu entrego, como atendo e o que eu espero de Você"
            />

            {/* Benefícios / Diferenciais abaixo do vídeo */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {[
                {
                  title: '100% Confidencial',
                  desc: 'Sigilo ético e profissional absoluto garantido em todas as etapas da triagem.',
                  icon: <ShieldCheck className="text-gold flex-shrink-0" size={16} />,
                },
                {
                  title: 'Foco em Solução',
                  desc: 'Abordagem direta e técnica, sem teorias vazias ou fórmulas mágicas de autoajuda.',
                  icon: <Sparkles className="text-gold flex-shrink-0" size={16} />,
                },
                {
                  title: 'Presença e Governo',
                  desc: 'Construa autodomínio para liderar seus negócios e resgatar a presença na família.',
                  icon: <CheckCircle2 className="text-gold flex-shrink-0" size={16} />,
                },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-xl bg-surface/40 border border-surface-soft/60 space-y-2 flex flex-col justify-between">
                  <h4 className="font-display font-semibold text-gold text-sm flex items-center gap-2">
                    {item.icon}
                    {item.title}
                  </h4>
                  <p className="text-muted-light text-[11px] leading-relaxed flex-grow">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-5 w-full">
            {/* The Action Card - Form */}
            <div className="bg-surface border border-surface-soft/60 rounded-2xl p-6 sm:p-8 shadow-2xl relative w-full">
              <div className="text-center space-y-2 mb-6">
                <h3 className="font-display font-bold text-ice text-xl">
                  Garanta sua Sessão de Triagem
                </h3>
                <p className="text-muted text-xs sm:text-sm">
                  Preencha seus dados abaixo para validar o diagnóstico e ser redirecionado para o WhatsApp.
                </p>
              </div>

              {status === 'success' ? (
                <div className="py-8 text-center space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold border border-gold/20 animate-pulse">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="font-display font-bold text-ice text-lg">
                    Diagnóstico Concluído!
                  </h4>
                  <p className="text-muted-light text-sm max-w-xs mx-auto">
                    Redirecionando você para o WhatsApp oficial em alguns instantes para iniciar sua triagem...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Input: Nome */}
                  <div className="space-y-1.5">
                    <label htmlFor="nome" className="text-xs font-semibold uppercase tracking-wider text-muted-light">
                      Seu Nome
                    </label>
                    <input
                      type="text"
                      id="nome"
                      required
                      placeholder="Ex: Matheus Morari"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="w-full bg-background border border-surface-soft rounded-lg px-4 py-3 text-ice text-sm placeholder:text-muted focus:border-gold focus:outline-none transition-all"
                      disabled={status === 'loading'}
                    />
                  </div>

                  {/* Input: WhatsApp */}
                  <div className="space-y-1.5">
                    <label htmlFor="whatsapp" className="text-xs font-semibold uppercase tracking-wider text-muted-light">
                      Seu WhatsApp
                    </label>
                    <input
                      type="tel"
                      id="whatsapp"
                      required
                      placeholder="Ex: (69) 99840-2480"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full bg-background border border-surface-soft rounded-lg px-4 py-3 text-ice text-sm placeholder:text-muted focus:border-gold focus:outline-none transition-all"
                      disabled={status === 'loading'}
                    />
                    <span className="text-[10px] text-muted block">
                      Utilize o formato com DDD. Ex: (69) 998402480
                    </span>
                  </div>

                  {/* Input: Perfil / Ocupação */}
                  <div className="space-y-1.5">
                    <label htmlFor="perfil" className="text-xs font-semibold uppercase tracking-wider text-muted-light block">
                      Qual o seu perfil / ocupação?
                    </label>
                    <div className="relative">
                      <select
                        id="perfil"
                        required
                        value={perfil}
                        onChange={(e) => setPerfil(e.target.value)}
                        className="w-full bg-background border border-surface-soft rounded-lg px-4 py-3 text-ice text-sm focus:border-gold focus:outline-none transition-all appearance-none cursor-pointer"
                        disabled={status === 'loading'}
                      >
                        <option value="" disabled className="text-muted">Selecione uma opção...</option>
                        <option value="Empreendedor" className="bg-surface text-ice">Empreendedor</option>
                        <option value="Profissional Liberal" className="bg-surface text-ice">Profissional Liberal (Médico, Advogado, etc.)</option>
                        <option value="Diretor / Gestor / Executivo" className="bg-surface text-ice">Diretor / Gestor / Executivo</option>
                        <option value="Outro" className="bg-surface text-ice">Outro cargo de responsabilidade</option>
                      </select>
                      {/* Custom Arrow Accent */}
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gold">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Input Qualificadora: Desafio */}
                  <div className="space-y-1.5">
                    <label htmlFor="desafio" className="text-xs font-semibold uppercase tracking-wider text-muted-light">
                      Qual o seu maior desafio atual hoje na liderança ou vida pessoal?
                    </label>
                    <textarea
                      id="desafio"
                      rows={3}
                      placeholder="Ex: Não consigo desligar do trabalho e isso está afetando minha família / sinto cansaço extremo."
                      value={desafio}
                      onChange={(e) => setDesafio(e.target.value)}
                      className="w-full bg-background border border-surface-soft rounded-lg px-4 py-3 text-ice text-sm placeholder:text-muted focus:border-gold focus:outline-none transition-all resize-none"
                      disabled={status === 'loading'}
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-500 text-xs text-center font-medium">
                      Ocorreu um erro no envio. Por favor, tente novamente ou fale diretamente no WhatsApp.
                    </p>
                  )}

                  {/* Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold/90 text-background font-semibold text-sm px-6 py-4 rounded-lg shadow-lg hover:shadow-gold/10 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        <span>Enviando Diagnóstico...</span>
                      </>
                    ) : (
                      <>
                        <span>QUERO INICIAR MINHA TRIAGEM</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-muted text-[10px] sm:text-xs pt-2">
                    <ShieldCheck size={14} className="text-gold" />
                    <span>Seus dados estão protegidos por sigilo ético profissional.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Objection Handling / Why trust Section */}
        <div className="max-w-2xl mx-auto space-y-6 pt-6">
          <h4 className="font-display font-bold text-ice text-lg text-center">
            Perguntas Frequentes & Objeções
          </h4>
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 rounded-xl bg-surface/50 border border-surface-soft/60">
              <h5 className="font-semibold text-gold text-sm mb-1">Vocês vão tentar me vender algo na triagem?</h5>
              <p className="text-muted-light text-xs sm:text-sm leading-relaxed">
                Sim, mas apenas se ficar claro que o meu método faz sentido para o seu momento e que eu realmente posso te ajudar. Se eu perceber que não posso ajudar, serei o primeiro a te dizer isso de forma ética e profissional.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-surface/50 border border-surface-soft/60">
              <h5 className="font-semibold text-gold text-sm mb-1">Como funciona a triagem?</h5>
              <p className="text-muted-light text-xs sm:text-sm leading-relaxed">
                Ao clicar no botão e enviar o formulário, seus dados de contato chegam ao meu painel e você é direcionado ao WhatsApp. Nossa equipe validará o seu perfil e agendará sua conversa inicial rápida de avaliação de forma 100% online.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-surface-soft/20 bg-surface/40 mt-12">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-muted text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Dr. Matheus Morari. Todos os direitos reservados.
            <span className="block sm:inline sm:ml-2 text-[10px] text-muted-light">CRP 24/03569</span>
          </div>
          <div className="flex gap-4 text-xs">
            <Link href="/privacidade" className="text-muted hover:text-gold transition-colors">
              Privacidade
            </Link>
            <span className="text-surface-soft">|</span>
            <Link href="/termos" className="text-muted hover:text-gold transition-colors">
              Termos
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
