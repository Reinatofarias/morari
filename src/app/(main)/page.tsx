import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { CTASection } from '@/components/sections/CTASection';
import { HouseNavigation } from '@/components/sections/HouseNavigation';
import { EditorialQuote } from '@/components/ui/EditorialQuote';
import { PainCard } from '@/components/cards/PainCard';
import { PathCard } from '@/components/cards/PathCard';
import { GoldenDivider } from '@/components/ui/GoldenDivider';
import { PAIN_POINTS, METHOD_STEPS, HOUSE_ROOMS } from '@/lib/constants';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Dr. Matheus Morari — Psicólogo para Homens que Lideram',
  description:
    'Psicologia para homens que carregam pressão, vivem ansiedade silenciosa e precisam recuperar autodomínio, sanidade e presença familiar. Atendimento online.',
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection
        headline="Homem, seu sucesso não pode custar sua casa."
        highlightWord="sua casa"
        subheadline="Psicologia para homens que lideram, carregam pressão em silêncio e precisam recuperar autodomínio, sanidade e presença antes que o preço fique alto demais."
        primaryCTA={{ label: 'Iniciar Caminho de Resolução', href: '/caminho-de-resolucao' }}
        secondaryCTA={{ label: 'Conhecer os atendimentos', href: '/atendimentos' }}
        variant="home"
        image="/assets/images/Hero-nobg.png"
      />

      {/* 2. Diagnóstico da dor */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            label="Diagnóstico"
            title="Você está vencendo fora, mas perdendo algo dentro?"
            highlightWord="perdendo algo dentro"
            description="Você responde por pessoas, decisões, dinheiro, família e futuro. Mas ninguém vê o peso que você carrega quando a porta fecha."
            alignment="center"
          />
        </div>
      </section>

      {/* 3. Sinais de alerta */}
      <section className="py-16 bg-surface/50">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            label="Sinais de alerta"
            title="Reconheça os sinais antes que eles virem sintomas."
            alignment="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {PAIN_POINTS.map((pain) => (
              <PainCard
                key={pain.title}
                icon={pain.icon}
                title={pain.title}
                description={pain.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. A falsa vitória */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <EditorialQuote
            quote="Não é vitória se o preço for sua sanidade."
          />
        </div>
      </section>

      {/* 5. O método / caminho */}
      <section className="py-20 md:py-28 bg-surface/30">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            label="O Caminho"
            title="O caminho não é aguentar mais. É governar melhor."
            highlightWord="governar melhor"
            description="Quatro pilares para sair do automático e reconstruir presença, sanidade e liderança integral."
            alignment="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
            {METHOD_STEPS.map((step) => (
              <PathCard
                key={step.step}
                step={step.step}
                title={step.title}
                description={step.description}
                icon={step.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. A casa digital */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            label="Ecossistema"
            title="Cada cômodo desta casa foi pensado para você."
            highlightWord="para você"
            description="Explore os ambientes e encontre o caminho que faz sentido para o momento que você está vivendo."
            alignment="center"
          />
          <div className="mt-12">
            <HouseNavigation rooms={HOUSE_ROOMS} />
          </div>
        </div>
      </section>

      {/* 7. Sobre Matheus */}
      <section className="py-20 md:py-28 bg-blue-dark/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-surface-soft relative">
                <Image
                  src="/assets/images/Foto 1.jpeg"
                  alt="Dr. Matheus Morari"
                  fill
                  className="object-cover object-top select-none"
                  sizes="(max-w-768px) 100vw, 450px"
                />
              </div>
              {/* Golden accent */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-gold/20 rounded-2xl -z-10" />
            </div>

            {/* Text */}
            <div>
              <p className="text-gold text-xs uppercase tracking-[0.2em] font-medium mb-4">
                Sobre
              </p>
              <h2 className="font-display font-bold text-ice text-2xl sm:text-3xl leading-tight mb-4">
                Eu não ajudo homens a parecerem fortes.{' '}
                <span className="text-gold">Eu os ajudo a voltarem a ter governo.</span>
              </h2>
              <GoldenDivider width="80px" className="mb-6" />
              <p className="text-muted-light leading-relaxed mb-4">
                Psicólogo clínico com formação em psicologia sistêmica e hipnoterapia. 
                Trabalho com homens que lideram — empresários, gestores, executivos — 
                que carregam pressão emocional e vivem o conflito entre sucesso profissional 
                e vida pessoal.
              </p>
              <p className="text-muted-light leading-relaxed mb-6">
                Meu trabalho é técnico, direto e profundo. Sem autoajuda, sem fórmulas 
                mágicas, sem promessas de transformação rápida. Processo, responsabilidade 
                e verdade.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/sobre"
                  className="text-gold text-sm font-medium underline underline-offset-4 decoration-gold/50 hover:decoration-gold transition-colors"
                >
                  Conhecer minha história
                </a>
                <span className="text-surface-soft">|</span>
                <a
                  href="/formacao"
                  className="text-gold text-sm font-medium underline underline-offset-4 decoration-gold/50 hover:decoration-gold transition-colors"
                >
                  Ver formação
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA final */}
      <CTASection
        headline="Antes de tentar aguentar mais uma fase sozinho, entenda o que está acontecendo com você."
        primaryCTA={{ label: 'Começar agora', href: '/caminho-de-resolucao' }}
        secondaryCTA={{ label: 'Falar no WhatsApp', href: '/contato' }}
        variant="dark"
      />
    </>
  );
}
