import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { CTASection } from '@/components/sections/CTASection';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { SERVICES } from '@/lib/constants';
import { portraitAssets } from '@/lib/visual-assets';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';

export const metadata: Metadata = {
  title: 'Atendimentos',
  description:
    'Atendimento psicológico para homens que lideram. Psicologia sistêmica, hipnoterapia e acompanhamento para líderes e empresários.',
};

export default function AtendimentosPage() {
  return (
    <>
      <HeroSection
        headline="Atendimento para homens que não podem mais liderar no automático."
        highlightWord="no automático"
        subheadline="Um espaço técnico, profundo e direto para trabalhar ansiedade, esgotamento, padrões emocionais, conflitos internos e reconstrução de autodomínio."
        variant="page"
        image={portraitAssets.profileSide.src}
        imageAlt={portraitAssets.profileSide.alt}
        imagePosition={portraitAssets.profileSide.position}
        imagePresentation="editorial"
      />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.href}
                title={service.title}
                description={service.description}
                href={service.href}
                icon={service.icon}
                tags={service.tags}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Formato */}
      <section className="py-20 bg-surface/50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display font-bold text-ice text-2xl sm:text-3xl">Como funciona</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-3 gap-x-10 mt-8">
            {[
              { title: 'Primeiro contato', desc: 'Você preenche o formulário ou chama no WhatsApp.' },
              { title: 'Sessão de diagnóstico', desc: 'Uma conversa para entender a sua situação e definir o acompanhamento indicado para você.' },
              { title: 'Acompanhamento', desc: 'Sessões online, com profundidade, técnica e direção.' },
            ].map((item, i) => (
              <li key={item.title} className="flex gap-4 py-5 border-t border-surface-soft/70">
                <span className="font-display text-gold text-2xl leading-none w-8 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-display font-semibold text-ice">{item.title}</h3>
                  <p className="text-muted-light text-sm leading-relaxed mt-1">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Depoimentos / Histórias de Transformação */}
      <TestimonialsSection limit={3} />

      <CTASection
        headline="Entender qual atendimento faz sentido para mim."
        primaryCTA={{ label: 'Iniciar Caminho de Resolução', href: '/caminho-de-resolucao' }}
        secondaryCTA={{ label: 'Falar no WhatsApp', href: '/contato' }}
        variant="dark"
      />
    </>
  );
}
