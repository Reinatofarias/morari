import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { PainCard } from '@/components/cards/PainCard';
import { LeadForm } from '@/components/forms/LeadForm';
import { Check } from 'lucide-react';
import { portraitAssets } from '@/lib/visual-assets';

export const metadata: Metadata = {
  title: 'Caminho de Resolução',
  description:
    'O primeiro passo para homens que carregam pressão demais e precisam entender o que está acontecendo. Diagnóstico emocional e direcionamento profissional.',
};

const sinais = [
  { icon: 'Brain', title: 'Pensamentos que não param', description: 'Sua mente não desliga nem quando você quer descansar.' },
  { icon: 'Flame', title: 'Reações desproporcionais', description: 'Explosões em casa por coisas que não justificam.' },
  { icon: 'Battery', title: 'Exaustão crônica', description: 'Nem férias, nem sono, nada resolve o cansaço.' },
  { icon: 'Users', title: 'Distanciamento familiar', description: 'Presente fisicamente, ausente emocionalmente.' },
  { icon: 'Lock', title: 'Controle excessivo', description: 'Se você não resolver, ninguém resolve. Mas isso pesa.' },
  { icon: 'TrendingDown', title: 'Sensação de colapso', description: 'A impressão de que algo vai desmoronar a qualquer momento.' },
];

const oqueSera = [
  'Sua situação emocional atual',
  'Padrões que podem estar se repetindo',
  'O impacto da pressão na sua família e nos seus relacionamentos',
  'Possíveis caminhos de trabalho (atendimento, produto, conteúdo)',
  'Qual o próximo passo mais adequado para você',
];

const oqueRecebe = [
  'Contato personalizado da equipe em até 24h',
  'Direcionamento baseado na sua situação real',
  'Clareza sobre qual caminho faz mais sentido',
  'Sem compromisso — é uma conversa inicial',
];

export default function CaminhoDeResolucaoPage() {
  return (
    <>
      {/* Hero */}
      <HeroSection
        headline="Antes de resolver, você precisa enxergar o que está te quebrando."
        highlightWord="te quebrando"
        subheadline="O Caminho de Resolução é o primeiro passo para homens que carregam pressão demais, se sentem emocionalmente no limite e precisam entender o que está acontecendo antes que o colapso cobre a conta."
        variant="page"
        image={portraitAssets.heroConcept.src}
        imageAlt={portraitAssets.heroConcept.alt}
        imagePosition={portraitAssets.heroConcept.position}
        imagePresentation="editorial"
      />

      {/* O que é */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader
            label="O que é"
            title="Um diagnóstico emocional. Não uma venda."
            highlightWord="diagnóstico emocional"
            description="O Caminho de Resolução é o ponto de partida para entender o que está acontecendo com você. Sem pressa, sem pressão, sem compromisso. Você preenche o formulário, a equipe analisa e entra em contato para uma conversa inicial."
            alignment="center"
          />
        </div>
      </section>

      {/* Sinais */}
      <section className="py-16 bg-surface/50">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            label="Sinais"
            title="Sinais de que você precisa começar"
            alignment="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {sinais.map((sinal) => (
              <PainCard
                key={sinal.title}
                icon={sinal.icon}
                title={sinal.title}
                description={sinal.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* O que será avaliado + O que recebe */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <SectionHeader
                label="Avaliação"
                title="O que será avaliado"
              />
              <ul className="space-y-3">
                {oqueSera.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check size={18} className="text-gold shrink-0 mt-0.5" />
                    <span className="text-muted-light text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeader
                label="Resultado"
                title="O que você recebe"
              />
              <ul className="space-y-3">
                {oqueRecebe.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check size={18} className="text-gold shrink-0 mt-0.5" />
                    <span className="text-muted-light text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section className="py-20 bg-surface/50" id="formulario">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader
            label="Seu primeiro passo"
            title="Comece seu caminho de resolução"
            highlightWord="caminho de resolução"
            description="Preencha o formulário abaixo. É simples, rápido e sem compromisso. A equipe analisa suas informações e entra em contato no horário que você preferir."
            alignment="center"
          />
          <div className="mt-8 p-6 sm:p-10 rounded-2xl bg-surface border border-surface-soft">
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
