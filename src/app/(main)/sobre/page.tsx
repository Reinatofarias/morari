import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { CTASection } from '@/components/sections/CTASection';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { GoldenDivider } from '@/components/ui/GoldenDivider';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Conheça o Dr. Matheus Morari. Psicólogo especializado em saúde emocional masculina, liderança e autodomínio.',
};

export default function SobrePage() {
  return (
    <>
      <HeroSection
        headline="Eu não ajudo homens a parecerem fortes. Eu os ajudo a voltarem a ter governo."
        highlightWord="ter governo"
        subheadline="Psicólogo clínico com formação em psicologia sistêmica e hipnoterapia. Trabalho com homens que lideram — e que precisam de mais que resiliência."
        variant="page"
      />

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 space-y-16">
          {/* Quem é */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-7 space-y-4">
              <SectionHeader label="Quem sou" title="Matheus Morari" />
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                Psicólogo clínico com formação em psicologia sistêmica e hipnoterapia. 
                Atuo exclusivamente com homens em posição de liderança — empresários, 
                gestores, executivos — que vivem o conflito entre sucesso profissional 
                e vida pessoal.
              </p>
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                Não trabalho com fórmulas prontas. Cada homem que chega ao meu consultório 
                tem uma história, um sistema familiar, uma pressão e uma urgência diferente. 
                O que todos têm em comum é a necessidade de enxergar o que está acontecendo 
                antes que o preço fique alto demais.
              </p>
            </div>
            <div className="md:col-span-5 relative flex justify-center">
              <div className="w-full max-w-[340px] aspect-[4/5] rounded-2xl overflow-hidden border border-surface-soft relative">
                <Image
                  src="/assets/images/Foto 2.jpeg"
                  alt="Dr. Matheus Morari"
                  fill
                  className="object-cover object-top select-none"
                  sizes="(max-w-768px) 100vw, 340px"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 md:-right-4 w-20 h-20 border-2 border-gold/20 rounded-2xl -z-10" />
            </div>
          </div>

          <GoldenDivider width="100%" alignment="center" animated={false} />

          {/* O que acredita */}
          <div>
            <SectionHeader label="Princípios" title="O que eu acredito" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Verdade', desc: 'O trabalho começa quando o homem para de mentir para si mesmo.' },
                { title: 'Responsabilidade', desc: 'Você não é vítima. Você é agente. E isso é a melhor notícia.' },
                { title: 'Profundidade', desc: 'Não existe atalho para saúde emocional. Existe processo.' },
                { title: 'Governo', desc: 'Liderar começa por governar a si mesmo. O resto é consequência.' },
              ].map((item) => (
                <div key={item.title} className="p-5 rounded-xl bg-surface border border-surface-soft">
                  <h3 className="font-display font-semibold text-gold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <GoldenDivider width="100%" alignment="center" animated={false} />

          {/* Por que homens */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-5 relative flex justify-center order-last md:order-first">
              <div className="w-full max-w-[340px] aspect-[4/5] rounded-2xl overflow-hidden border border-surface-soft relative">
                <Image
                  src="/assets/images/Foto 3.jpeg"
                  alt="Consultório Dr. Matheus"
                  fill
                  className="object-cover object-top select-none"
                  sizes="(max-w-768px) 100vw, 340px"
                />
              </div>
              <div className="absolute -top-3 -left-3 md:-left-4 w-20 h-20 border-2 border-gold/20 rounded-2xl -z-10" />
            </div>
            <div className="md:col-span-7 space-y-4">
              <SectionHeader label="Escolha" title="Por que trabalho com homens que lideram" />
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                Porque homens em posição de liderança são treinados para resolver, decidir, 
                aguentar e performar. Mas ninguém os ensina a governar o que sentem. E quando 
                o peso interno ultrapassa a capacidade de suportar, o colapso não avisa. 
                Ele simplesmente cobra.
              </p>
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                Eu escolhi trabalhar com esses homens porque sei que, por trás da fachada de 
                controle, existe alguém que precisa de um espaço onde não precise performar. 
                Onde possa ser honesto. Onde possa começar a reconstruir.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Se algo nesse texto fez sentido, o próximo passo é simples."
        primaryCTA={{ label: 'Conhecer atendimentos', href: '/atendimentos' }}
        secondaryCTA={{ label: 'Iniciar Caminho de Resolução', href: '/caminho-de-resolucao' }}
        variant="dark"
      />
    </>
  );
}
