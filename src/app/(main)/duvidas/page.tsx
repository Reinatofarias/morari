import { Metadata } from 'next';
import { VisualPageIntro } from '@/components/sections/VisualPageIntro';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { CTASection } from '@/components/sections/CTASection';
import { FAQ_ITEMS } from '@/lib/constants';
import { faqPageSchema } from '@/lib/seo';
import { portraitAssets } from '@/lib/visual-assets';

export const metadata: Metadata = {
  title: 'Dúvidas Frequentes',
  description: 'Perguntas frequentes sobre atendimento psicológico para homens. Entenda como funciona, valores, formato e próximos passos.',
};

export default function DuvidasPage() {
  return (
    <>
      <VisualPageIntro
        label="FAQ"
        title="Perguntas que homens sérios fazem antes de começar."
        highlightWord="homens sérios"
        description="Respostas diretas, éticas e sem promessa de cura rápida."
        asset={portraitAssets.profileSide}
      />

      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div>
            <FAQAccordion items={FAQ_ITEMS.map(f => ({ question: f.question, answer: f.answer }))} />
          </div>
        </div>
      </section>

      <CTASection
        headline="Sua dúvida não está aqui? Fale com a equipe."
        primaryCTA={{ label: 'Iniciar Caminho de Resolução', href: '/caminho-de-resolucao' }}
        secondaryCTA={{ label: 'Falar no WhatsApp', href: '/contato' }}
        variant="dark"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageSchema(FAQ_ITEMS.map(f => ({ question: f.question, answer: f.answer })))),
        }}
      />
    </>
  );
}
