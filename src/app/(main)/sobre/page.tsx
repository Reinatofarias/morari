import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { CTASection } from '@/components/sections/CTASection';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { GoldenDivider } from '@/components/ui/GoldenDivider';

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
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          {/* Quem é */}
          <div>
            <SectionHeader label="Quem sou" title="Matheus Morari" />
            <p className="text-muted-light leading-relaxed mb-4">
              Psicólogo clínico com formação em psicologia sistêmica e hipnoterapia. 
              Atuo exclusivamente com homens em posição de liderança — empresários, 
              gestores, executivos — que vivem o conflito entre sucesso profissional 
              e vida pessoal.
            </p>
            <p className="text-muted-light leading-relaxed">
              Não trabalho com fórmulas prontas. Cada homem que chega ao meu consultório 
              tem uma história, um sistema familiar, uma pressão e uma urgência diferente. 
              O que todos têm em comum é a necessidade de enxergar o que está acontecendo 
              antes que o preço fique alto demais.
            </p>
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
          <div>
            <SectionHeader label="Escolha" title="Por que trabalho com homens que lideram" />
            <p className="text-muted-light leading-relaxed mb-4">
              Porque homens em posição de liderança são treinados para resolver, decidir, 
              aguentar e performar. Mas ninguém os ensina a governar o que sentem. E quando 
              o peso interno ultrapassa a capacidade de suportar, o colapso não avisa. 
              Ele simplesmente cobra.
            </p>
            <p className="text-muted-light leading-relaxed">
              Eu escolhi trabalhar com esses homens porque sei que, por trás da fachada de 
              controle, existe alguém que precisa de um espaço onde não precise performar. 
              Onde possa ser honesto. Onde possa começar a reconstruir.
            </p>
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
