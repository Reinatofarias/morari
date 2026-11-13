import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CTASection } from '@/components/sections/CTASection';
import { GoldenDivider } from '@/components/ui/GoldenDivider';
import { PAIN_POINTS, METHOD_STEPS, HOUSE_ROOMS } from '@/lib/constants';
import { portraitAssets } from '@/lib/visual-assets';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { AboutVideoTrigger } from '@/components/ui/AboutVideoTrigger';

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
        image={portraitAssets.heroCutout.src}
        imageAlt={portraitAssets.heroCutout.alt}
        imagePosition={portraitAssets.heroCutout.position}
        imagePresentation="cutout"
      />

      {/* 2. Diagnóstico da dor + sinais */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-display font-bold text-ice text-2xl sm:text-3xl leading-tight">
              Você está vencendo fora, mas <span className="text-gold">perdendo algo dentro</span>?
            </h2>
            <p className="text-muted-light leading-relaxed mt-5">
              Você responde por pessoas, decisões, dinheiro, família e futuro. Mas ninguém vê o peso que você carrega quando a porta fecha.
            </p>
            <p className="font-display text-ice text-lg mt-8 border-l-2 border-gold/60 pl-4">
              Não é vitória se o preço for sua sanidade.
            </p>
          </div>
          <ul className="lg:col-span-7 divide-y divide-surface-soft/70 border-y border-surface-soft/70">
            {PAIN_POINTS.map((pain) => (
              <li key={pain.title} className="py-4">
                <h3 className="font-display font-semibold text-ice text-base">{pain.title}</h3>
                <p className="text-muted text-sm mt-1 leading-relaxed">{pain.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. O método / caminho */}
      <section className="py-20 md:py-28 bg-surface/30">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display font-bold text-ice text-2xl sm:text-3xl leading-tight max-w-2xl">
            O caminho não é aguentar mais. É <span className="text-gold">governar melhor</span>.
          </h2>
          <p className="text-muted-light leading-relaxed mt-4 max-w-2xl">
            Quatro etapas para sair do automático e reconstruir presença, sanidade e liderança.
          </p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 mt-10">
            {METHOD_STEPS.map((step) => (
              <li key={step.step} className="flex gap-5 py-5 border-t border-surface-soft/70">
                <span className="font-display text-gold text-2xl leading-none w-8 shrink-0">
                  {String(step.step).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display font-bold text-ice text-lg">{step.title}</h3>
                  <p className="text-muted-light text-sm leading-relaxed mt-1">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. Sobre Matheus */}
      <section className="py-20 md:py-28 bg-blue-dark/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo / Video Trigger */}
            <div className="relative">
              <AboutVideoTrigger
                imageSrc={portraitAssets.library.src}
                imageAlt={portraitAssets.library.alt}
                videoId="4IUCI-JB4nY"
                videoTitle="O que eu entrego, como atendo e o que eu espero de Você"
              />
            </div>

            {/* Text */}
            <div>
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

      {/* 7.5. Depoimentos / Histórias de Transformação */}
      <TestimonialsSection limit={3} />

      {/* 7.6. Por onde seguir */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display font-bold text-ice text-xl sm:text-2xl">Por onde seguir</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 mt-6">
            {HOUSE_ROOMS.map((room) => (
              <li key={room.href} className="border-t border-surface-soft/70">
                <Link href={room.href} className="group flex items-baseline justify-between gap-4 py-4">
                  <span>
                    <span className="block font-display text-ice group-hover:text-gold transition-colors">{room.title}</span>
                    <span className="block text-muted text-sm mt-0.5">{room.description}</span>
                  </span>
                  <ArrowRight size={16} className="text-gold/60 group-hover:text-gold shrink-0 transition-colors" />
                </Link>
              </li>
            ))}
          </ul>
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
