import { Metadata } from 'next';
import { PRODUCTS } from '@/lib/products';
import { WHATSAPP_URL } from '@/lib/constants';
import { portraitAssets } from '@/lib/visual-assets';
import { ConversionButton } from '@/components/ui/ConversionButton';
import Image from 'next/image';
import { Shield, Sparkles, MessageSquare, ArrowRight, UserCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Links — Dr. Matheus Morari',
  description: 'Acesse atendimentos clínicos e programas de desenvolvimento para homens que lideram.',
  robots: { index: false, follow: true },
};

export default function BioLinkTreePage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6">
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold/[0.02] rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-dark/20 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        
        {/* Avatar and Header */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-28 w-28 overflow-hidden rounded-full border border-gold/30 bg-surface shadow-xl">
            <Image
              src={portraitAssets.profileDesk.src}
              alt={portraitAssets.profileDesk.alt}
              fill
              priority
              sizes="112px"
              className="object-cover object-top select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
          <div>
            <h1 className="font-display font-bold text-ice text-xl tracking-tight">Dr. Matheus Morari</h1>
            <p className="text-gold text-[10px] uppercase tracking-[0.2em] font-medium mt-1">Psicólogo para homens que lideram</p>
          </div>
        </div>

        {/* Intro description */}
        <div className="bg-surface/40 p-5 rounded-2xl border border-surface-soft/40 backdrop-blur-md">
          <p className="text-muted-light text-sm leading-relaxed">
            &ldquo;Creio que o homem é o pilar da casa. Fortifico homens para buscar reparar e proteger suas famílias e seus negócios.&rdquo;
          </p>
        </div>

        {/* Link Section 1: Atendimentos & Acesso Direto */}
        <div className="space-y-3">
          <h3 className="text-gold text-[10px] uppercase tracking-[0.15em] font-bold text-left px-2 flex items-center gap-1.5">
            <UserCheck size={12} />
            Atendimento e Orientação
          </h3>
          <div className="space-y-3">
            <ConversionButton
              label="Iniciar Caminho de Resolução"
              href="/caminho-de-resolucao"
              variant="primary"
              size="lg"
              fullWidth
              eventName="bio_caminho_resolucao"
            />
            <ConversionButton
              label="Conhecer Atendimentos Clínicos"
              href="/atendimentos"
              variant="secondary"
              size="lg"
              fullWidth
              eventName="bio_atendimentos"
            />
            <ConversionButton
              label="Falar no WhatsApp"
              href={WHATSAPP_URL}
              variant="secondary"
              size="lg"
              fullWidth
              eventName="bio_whatsapp"
            />
          </div>
        </div>

        {/* Link Section 2: Programas, Cursos e Materiais */}
        <div className="space-y-3 pt-2">
          <h3 className="text-gold text-[10px] uppercase tracking-[0.15em] font-bold text-left px-2 flex items-center gap-1.5">
            <Sparkles size={12} />
            Cursos, Programas e Materiais
          </h3>
          <div className="space-y-2">
            {PRODUCTS.map((product) => (
              <a
                key={product.slug}
                href={`/lp/${product.slug}`}
                className="flex items-center justify-between p-4 rounded-xl border border-surface-soft bg-surface/30 hover:bg-surface hover:border-gold/30 hover:scale-[1.01] transition-all duration-300 group text-left"
              >
                <div className="space-y-0.5">
                  <h4 className="font-display font-bold text-ice text-sm sm:text-base group-hover:text-gold transition-colors">
                    {product.title}
                  </h4>
                  <p className="text-muted text-xs line-clamp-1 max-w-[280px]">
                    {product.description}
                  </p>
                </div>
                <ArrowRight size={16} className="text-muted group-hover:text-gold group-hover:translate-x-1 transition-all shrink-0 ml-3" />
              </a>
            ))}
          </div>
        </div>

        {/* Footer / CRP Info */}
        <div className="pt-6 space-y-2">
          <p className="text-muted text-[10px] uppercase tracking-[0.1em]">
            CRP XX/XXXXX • Psicologia Sistêmica & Hipnoterapia
          </p>
          <div className="flex items-center justify-center gap-1 text-muted-dark text-[10px]">
            <Shield size={10} className="text-gold/50" />
            <span>Ambiente seguro e confidencial</span>
          </div>
        </div>

      </div>
    </main>
  );
}
