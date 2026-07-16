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
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-ice text-2xl sm:text-3xl mb-6">Como funciona</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-gold font-display font-bold text-xl">1</span>
              </div>
              <h3 className="font-display font-semibold text-ice mb-2">Primeiro contato</h3>
              <p className="text-muted text-sm">Você preenche o formulário ou entra em contato pelo WhatsApp.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-gold font-display font-bold text-xl">2</span>
              </div>
              <h3 className="font-display font-semibold text-ice mb-2">Conversa inicial</h3>
              <p className="text-muted text-sm">Uma conversa para entender sua situação e definir se faz sentido para ambos.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-gold font-display font-bold text-xl">3</span>
              </div>
              <h3 className="font-display font-semibold text-ice mb-2">Acompanhamento</h3>
              <p className="text-muted text-sm">Sessões online, com profundidade, técnica e direção. No seu ritmo.</p>
            </div>
          </div>
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
