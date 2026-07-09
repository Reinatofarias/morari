import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { CTASection } from '@/components/sections/CTASection';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Curso: Ansiedade em Homens',
  description: 'Curso sobre ansiedade para homens que lideram. Entenda o que está por trás da sua ansiedade e recupere o governo emocional.',
};

export default function CursoAnsiedadePage() {
  return (
    <>
      <HeroSection
        headline="A ansiedade não é o problema. É o sinal de que algo dentro de você não está sendo governado."
        highlightWord="não está sendo governado"
        subheadline="Um curso para homens que querem entender de verdade o que está por trás da ansiedade — e começar a recuperar o governo emocional."
        variant="page"
      />
      <div className="py-4 max-w-6xl mx-auto px-6">
        <Breadcrumb items={[{ label: 'Produtos', href: '/produtos' }, { label: 'Curso: Ansiedade em Homens' }]} />
      </div>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block px-6 py-3 rounded-full bg-gold/10 border border-gold/30 text-gold text-sm font-medium mb-8">
            Em desenvolvimento — em breve disponível
          </div>
          <SectionHeader
            label="Sobre o curso"
            title="O que você vai encontrar neste curso"
            alignment="center"
            description="Um material profundo, direto e prático sobre ansiedade masculina. Sem fórmulas mágicas. Com verdade, técnica e direção."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 text-left">
            {[
              'O que é ansiedade de verdade (e o que ela não é)',
              'Por que homens que lideram são mais vulneráveis',
              'Os sinais que você ignora e o que eles significam',
              'A relação entre controle, pressão e ansiedade',
              'Como a ansiedade afeta sua família, mesmo que você esconda',
              'Caminhos práticos para começar a governar o que sente',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-surface-soft">
                <span className="text-gold font-display font-bold text-lg">{i + 1}.</span>
                <span className="text-muted-light text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Quer ser avisado quando o curso estiver disponível?"
        description="Preencha o formulário do Caminho de Resolução e indique seu interesse no campo de mensagem."
        primaryCTA={{ label: 'Iniciar Caminho de Resolução', href: '/caminho-de-resolucao' }}
        variant="gold"
      />
    </>
  );
}
