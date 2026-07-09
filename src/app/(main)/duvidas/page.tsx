import { Metadata } from 'next';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { CTASection } from '@/components/sections/CTASection';
import { FAQ_ITEMS } from '@/lib/constants';
import { faqPageSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Dúvidas Frequentes',
  description: 'Perguntas frequentes sobre atendimento psicológico para homens. Entenda como funciona, valores, formato e próximos passos.',
};

export default function DuvidasPage() {
  return (
    <>
      <section className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeader
            label="FAQ"
            title="Perguntas que homens sérios fazem antes de começar."
            highlightWord="homens sérios"
            description="Respostas diretas, éticas e sem promessa de cura rápida."
            alignment="center"
          />
          <div className="mt-12">
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
