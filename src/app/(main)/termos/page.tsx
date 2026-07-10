import { Metadata } from 'next';
import { VisualPageIntro } from '@/components/sections/VisualPageIntro';
import { portraitAssets } from '@/lib/visual-assets';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos de uso do site do Dr. Matheus Morari.',
};

const sections = [
  {
    title: 'Caráter informativo',
    text: 'O conteúdo deste site tem finalidade informativa e educativa. Ele não substitui avaliação psicológica, médica ou atendimento de emergência.',
  },
  {
    title: 'Atendimento profissional',
    text: 'O contato pelo site não estabelece relação terapêutica automaticamente. O atendimento depende de conversa inicial, disponibilidade e adequação técnica.',
  },
  {
    title: 'Emergência',
    text: 'Em situação de crise, risco imediato ou urgência, procure CVV 188, SAMU 192 ou o pronto-socorro mais próximo.',
  },
  {
    title: 'Uso responsável',
    text: 'O visitante se compromete a enviar informações verdadeiras e usar os canais de contato de maneira respeitosa.',
  },
];

export default function TermosPage() {
  return (
    <>
      <VisualPageIntro
        label="Legal"
        title="Termos de Uso"
        description="Regras básicas para uso responsável do site e dos canais de contato."
        asset={portraitAssets.profileSide}
      />

      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-5">
            {sections.map((section) => (
              <div key={section.title} className="rounded-lg border border-surface-soft bg-surface p-6">
                <h2 className="mb-2 font-display text-xl font-semibold text-ice">{section.title}</h2>
                <p className="text-sm leading-relaxed text-muted-light">{section.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

