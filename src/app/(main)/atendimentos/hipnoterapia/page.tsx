import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { CTASection } from '@/components/sections/CTASection';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SectionHeader } from '@/components/sections/SectionHeader';

export const metadata: Metadata = {
  title: 'Hipnoterapia',
  description: 'Hipnoterapia clínica aplicada com responsabilidade. Sem promessas mágicas. Um recurso técnico para acessar padrões emocionais profundos.',
};

export default function HipnoterapiaPage() {
  return (
    <>
      <HeroSection
        headline="Hipnoterapia não é magia. É acesso direto ao que seu racional insiste em esconder."
        highlightWord="insiste em esconder"
        subheadline="Um recurso técnico, regulamentado e ético para acessar padrões emocionais profundos que a conversa consciente, sozinha, não alcança."
        variant="page"
      />
      <div className="py-4 max-w-6xl mx-auto px-6">
        <Breadcrumb items={[{ label: 'Atendimentos', href: '/atendimentos' }, { label: 'Hipnoterapia' }]} />
      </div>
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          <div>
            <SectionHeader label="O que é" title="Hipnoterapia clínica" description="A hipnoterapia clínica é uma técnica reconhecida que utiliza um estado de atenção focada para acessar conteúdos emocionais que estão abaixo da superfície racional. Não é show de palco, não é perda de controle, não é magia." />
          </div>
          <div>
            <SectionHeader label="O que não é" title="Mitos que precisam ser desfeitos" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {['Não é perda de consciência', 'Não é manipulação', 'Não é show de entretenimento', 'Não substitui psicoterapia'].map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 rounded-lg bg-surface border border-surface-soft">
                  <span className="text-red-accent/70 text-lg">✕</span>
                  <span className="text-muted-light text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeader label="Aplicações" title="Para que serve" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {['Acessar bloqueios emocionais profundos', 'Trabalhar ansiedade e padrões de pensamento', 'Ressignificar experiências passadas', 'Desativar gatilhos emocionais recorrentes'].map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 rounded-lg bg-surface border border-gold/10">
                  <span className="text-gold text-lg">✓</span>
                  <span className="text-muted-light text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTASection headline="A hipnoterapia pode ser parte do seu caminho. Mas o primeiro passo é entender o que está acontecendo." primaryCTA={{ label: 'Iniciar Caminho de Resolução', href: '/caminho-de-resolucao' }} variant="dark" />
    </>
  );
}
