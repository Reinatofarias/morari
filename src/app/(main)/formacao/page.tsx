import { Metadata } from 'next';
import { CTASection } from '@/components/sections/CTASection';
import { VisualPageIntro } from '@/components/sections/VisualPageIntro';
import { GoldenDivider } from '@/components/ui/GoldenDivider';
import { portraitAssets } from '@/lib/visual-assets';
import { GraduationCap, Award, Briefcase, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Formação',
  description: 'Formação acadêmica, certificações e experiência clínica do Dr. Matheus Morari.',
};

const formacoes = [
  { icon: GraduationCap, title: 'Graduação em Psicologia', desc: 'Formação superior em Psicologia com habilitação clínica.' },
  { icon: Award, title: 'Especialização em Psicologia Sistêmica', desc: 'Formação especializada em abordagem sistêmica e dinâmicas familiares.' },
  { icon: Award, title: 'Formação em Hipnoterapia Clínica', desc: 'Certificação em hipnoterapia clínica aplicada com ética e responsabilidade.' },
  { icon: Briefcase, title: 'Experiência Clínica', desc: 'Prática clínica com foco em homens em posição de liderança, empresários e gestores.' },
  { icon: BookOpen, title: 'Educação Continuada', desc: 'Atualização constante em saúde mental masculina, ansiedade, esgotamento e liderança.' },
];

export default function FormacaoPage() {
  return (
    <>
      <VisualPageIntro
        label="Formação"
        title="Formação, experiência e compromisso com a verdade clínica."
        highlightWord="verdade clínica"
        description="Credenciais técnicas que sustentam um trabalho sério. Sem autopromoção exagerada — apenas os fatos."
        asset={portraitAssets.profileDesk}
      />

      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-4">
            {formacoes.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-5 p-6 rounded-xl bg-surface border border-surface-soft">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                    <Icon size={24} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-ice text-lg mb-1">{item.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <GoldenDivider width="100%" alignment="center" animated={false} className="my-12" />

          {/* Ethics */}
          <div className="p-6 rounded-xl bg-blue-dark/30 border border-surface-soft">
            <h3 className="font-display font-semibold text-ice text-lg mb-3">Compromisso Ético</h3>
            <p className="text-muted-light text-sm leading-relaxed">
              Registro ativo no Conselho Regional de Psicologia (CRP). Todo o trabalho segue 
              as normas éticas do CFP, incluindo sigilo, responsabilidade e respeito ao código 
              de ética profissional. Nenhum resultado é prometido ou garantido.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        headline="Credenciais são importantes. Mas o que importa é o que elas significam na prática."
        primaryCTA={{ label: 'Conhecer atendimentos', href: '/atendimentos' }}
        variant="default"
      />
    </>
  );
}
