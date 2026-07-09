import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { CTASection } from '@/components/sections/CTASection';
import { PainCard } from '@/components/cards/PainCard';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Psicólogo para Homens',
  description: 'Atendimento psicológico especializado para homens que lideram. Trabalho com ansiedade, esgotamento, presença familiar e autodomínio emocional.',
};

const dores = [
  { icon: 'Brain', title: 'Ansiedade que não para' },
  { icon: 'Battery', title: 'Esgotamento crônico' },
  { icon: 'Heart', title: 'Distanciamento familiar' },
  { icon: 'Flame', title: 'Explosões emocionais' },
  { icon: 'Lock', title: 'Necessidade de controle' },
  { icon: 'Eye', title: 'Solidão no topo' },
];

export default function PsicologiaParaHomensPage() {
  return (
    <>
      <HeroSection
        headline="Psicologia para quem não pode mais aguentar no automático."
        highlightWord="no automático"
        subheadline="Atendimento psicológico especializado para homens que lideram, carregam pressão e precisam recuperar governo emocional sem abandonar suas responsabilidades."
        variant="page"
      />

      <section className="py-4">
        <div className="max-w-6xl mx-auto px-6">
          <Breadcrumb items={[
            { label: 'Atendimentos', href: '/atendimentos' },
            { label: 'Psicologia para Homens' },
          ]} />
        </div>
      </section>

      {/* Dores tratadas */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            label="Dores tratadas"
            title="O que trabalhamos juntos"
            alignment="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {dores.map((dor) => (
              <PainCard key={dor.title} icon={dor.icon} title={dor.title} />
            ))}
          </div>
        </div>
      </section>

      {/* Para quem é */}
      <section className="py-20 bg-surface/50">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader label="Para quem é" title="Este atendimento é para você se:" />
          <ul className="space-y-3 mt-6">
            {[
              'Você é empresário, líder, gestor ou profissional de alta responsabilidade',
              'Carrega pressão emocional que ninguém ao seu redor percebe',
              'Sente que está vencendo fora, mas perdendo algo dentro',
              'Quer entender o que está acontecendo antes que o preço fique alto demais',
              'Já tentou "aguentar sozinho" e percebeu que não está funcionando',
              'Busca um espaço técnico, direto e sem julgamento',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check size={18} className="text-gold shrink-0 mt-0.5" />
                <span className="text-muted-light text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* O que NÃO é */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader label="Diferenciação" title="O que este atendimento não é" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {[
              'Não é coaching',
              'Não é autoajuda',
              'Não é mentoria de negócios',
              'Não é promessa de transformação rápida',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 rounded-lg bg-surface border border-surface-soft">
                <span className="text-red-accent/70 text-lg">✕</span>
                <span className="text-muted-light text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Se você chegou até aqui, algo dentro de você já sabe que precisa de atenção."
        primaryCTA={{ label: 'Iniciar Caminho de Resolução', href: '/caminho-de-resolucao' }}
        variant="dark"
      />
    </>
  );
}
