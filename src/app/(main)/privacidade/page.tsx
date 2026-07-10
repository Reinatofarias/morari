import { Metadata } from 'next';
import { VisualPageIntro } from '@/components/sections/VisualPageIntro';
import { portraitAssets } from '@/lib/visual-assets';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Como os dados pessoais são tratados no site do Dr. Matheus Morari.',
};

const sections = [
  {
    title: 'Dados coletados',
    text: 'Coletamos apenas os dados necessários para contato profissional: nome, WhatsApp, e-mail e informações opcionais enviadas voluntariamente no formulário.',
  },
  {
    title: 'Finalidade',
    text: 'Os dados são usados exclusivamente para responder solicitações, direcionar o primeiro contato e organizar o atendimento quando houver interesse.',
  },
  {
    title: 'Base legal',
    text: 'O tratamento ocorre mediante consentimento informado no formulário, conforme a Lei Geral de Proteção de Dados.',
  },
  {
    title: 'Exclusão',
    text: 'Você pode solicitar correção ou exclusão dos seus dados a qualquer momento pelos canais oficiais de contato.',
  },
  {
    title: 'Cookies e analytics',
    text: 'Ferramentas de análise e marketing devem ser usadas apenas com consentimento quando configuradas no site.',
  },
];

export default function PrivacidadePage() {
  return (
    <>
      <VisualPageIntro
        label="LGPD"
        title="Política de Privacidade"
        description="Transparência sobre os dados enviados pelo site e a finalidade do contato profissional."
        asset={portraitAssets.profileDesk}
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

