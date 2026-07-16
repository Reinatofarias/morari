import { Metadata } from 'next';
import { CTASection } from '@/components/sections/CTASection';
import { VisualPageIntro } from '@/components/sections/VisualPageIntro';
import { GoldenDivider } from '@/components/ui/GoldenDivider';
import { portraitAssets } from '@/lib/visual-assets';
import { GraduationCap, Award, Briefcase, BookOpen, Compass, Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Formação',
  description: 'Formação acadêmica, pós-graduações, certificações e experiência clínica do Dr. Matheus Morari.',
};

export default function FormacaoPage() {
  return (
    <>
      <VisualPageIntro
        label="Formação"
        title="Formação, experiência e compromisso com a verdade clínica."
        highlightWord="verdade clínica"
        description="Credenciais técnicas e científicas que sustentam um trabalho clínico sério. Sem autopromoção — apenas os fatos da formação profissional."
        asset={portraitAssets.profileDesk}
      />

      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          
          {/* Grid de Formação e Supervisão */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Bloco 1: Formação Principal */}
            <div className="p-6 sm:p-8 rounded-xl bg-surface border border-surface-soft/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-gold mb-6">
                  <GraduationCap size={24} />
                  <h3 className="font-display font-bold text-ice text-lg">Formação Acadêmica & Pós-Graduações</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'Bacharel em Psicologia e psicólogo - pela faculdade FAROL de Rolim de Moura – RO',
                    'Pós Graduado em Terapia Sistêmica Familiar, individual, casal e família - pelo instituto logos, ministrado pela Drª Marizete Rodrigues.',
                    'Pós Graduado em Neuropsicologia com Ênfase em Avaliações - FAMEESP - Faculdade Metropolitana do Estado de São Paulo'
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <Check size={16} className="text-gold shrink-0 mt-1" />
                      <span className="text-muted-light text-sm sm:text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bloco 2: Supervisão Clínica */}
            <div className="p-6 sm:p-8 rounded-xl bg-surface border border-surface-soft/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-gold mb-6">
                  <Briefcase size={22} />
                  <h3 className="font-display font-bold text-ice text-lg">Supervisão & Atuação Clínica</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'Supervisor de curso de especialização em terapia sistêmica individual casal e familiar',
                    'Supervisor Clínico e de práticas terapêuticas.'
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <Check size={16} className="text-gold shrink-0 mt-1" />
                      <span className="text-muted-light text-sm sm:text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Bloco 3: Especializações e Cursos de Extensão */}
          <div className="p-6 sm:p-8 rounded-xl bg-surface border border-surface-soft/60 space-y-6">
            <div className="flex items-center gap-3 text-gold mb-4">
              <BookOpen size={22} />
              <h3 className="font-display font-bold text-ice text-lg">Cursos de Especialização e Extensão</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Terapia de Casal */}
              <div className="space-y-3">
                <h4 className="font-display font-semibold text-gold text-sm uppercase tracking-wider border-b border-surface-soft pb-2">Terapia de Casal & Relações</h4>
                <ul className="space-y-3">
                  {[
                    'Curso Ser Terapeuta de casal - Ministrado pela Psi. Tatiana Perez.',
                    'Curso genograma na prática - Instituto Logos Drª Marizete Rodrigues',
                    'Curso terapia de casal com problemas sexual - Instituto Logos Drª Marizete Rodrigues'
                  ].map((item, idx) => (
                    <li key={idx} className="text-sm text-muted-light flex gap-2">
                      <span className="text-gold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hipnose Clínica */}
              <div className="space-y-3">
                <h4 className="font-display font-semibold text-gold text-sm uppercase tracking-wider border-b border-surface-soft pb-2">Hipnose Clínica</h4>
                <ul className="space-y-3">
                  {[
                    'Curso de hipnose clínica - com Alberto Deliso\'la',
                    'Cursos de hipnose na prática – com Olimar Teser',
                    'Cursos de hipnose clássica - com Alberto Deliso\'la',
                    'Curso de hipnose como tratar vícios - com Alberto Deliso\'la'
                  ].map((item, idx) => (
                    <li key={idx} className="text-sm text-muted-light flex gap-2">
                      <span className="text-gold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Luto, Apego e Saúde Mental */}
              <div className="space-y-3">
                <h4 className="font-display font-semibold text-gold text-sm uppercase tracking-wider border-b border-surface-soft pb-2">Luto, Apego & Saúde Mental</h4>
                <ul className="space-y-3">
                  {[
                    'Curso de extensão em psicoterapia do luto morte súbita e ou violenta - pelo CIAP educacional, Cacoal - RO - Ministrado pela Psi. Elione Figueredo de Arruda.',
                    'Curso de extensão em apego, luto e separação - pelo CIAP educacional, Cacoal - RO - Ministrado pela Psi. Elione Figueredo de Arruda.',
                    'Curso de psicologia, religião e saúde mental - pelo Instituto de Psicologia e Logoterapia, ministrado pelo Psi.Dr Alberto Nery.'
                  ].map((item, idx) => (
                    <li key={idx} className="text-sm text-muted-light flex gap-2">
                      <span className="text-gold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Habilidades e Prática Geral */}
              <div className="space-y-3">
                <h4 className="font-display font-semibold text-gold text-sm uppercase tracking-wider border-b border-surface-soft pb-2">Habilidades Sociais & Prática</h4>
                <ul className="space-y-3">
                  {[
                    'Curso de capacitação em Treino de habilidades sociais - ministrado por Edlei Tibo Passos.',
                    'Curso básico do teste de personalidade, palográfico - Ministrado pelo Psicólogo Vinicius Santana Soares.',
                    'Workshop sexualidade, diversidade e gênero - pelo CIAP educacional, Cacoal - RO - Ministrado pelo Dr Aneron de Avíla Canais.'
                  ].map((item, idx) => (
                    <li key={idx} className="text-sm text-muted-light flex gap-2">
                      <span className="text-gold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Bloco 4: Conquer */}
          <div className="p-6 sm:p-8 rounded-xl bg-surface border border-surface-soft/60 space-y-4">
            <div className="flex items-center gap-3 text-gold mb-2">
              <Compass size={22} />
              <h3 className="font-display font-bold text-ice text-lg">Desenvolvimento & Alta Performance (Escola Conquer)</h3>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                'Curso produtividade e performasse – conquer',
                'Curso Formação em liderança – conquer',
                'Curso inteligência  emocional 4.0 -conquer'
              ].map((item, idx) => (
                <li key={idx} className="p-4 rounded-lg bg-background/50 border border-surface-soft/40 flex items-start gap-2.5">
                  <Check size={16} className="text-gold shrink-0 mt-0.5" />
                  <span className="text-muted-light text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <GoldenDivider width="100%" alignment="center" animated={false} className="my-16" />

          {/* Compromisso Ético */}
          <div className="p-6 rounded-xl bg-blue-dark/20 border border-surface-soft/60 max-w-4xl mx-auto">
            <h3 className="font-display font-bold text-ice text-lg mb-3 flex items-center gap-2">
              <Award size={20} className="text-gold" />
              Compromisso Ético e Profissional
            </h3>
            <p className="text-muted-light text-sm leading-relaxed">
              Registro profissional ativo sob responsabilidade do Conselho Regional de Psicologia (CRP). Toda a conduta e os atendimentos realizados (individuais, conjugais ou familiares) seguem rigorosamente as determinações éticas do Código de Ética Profissional do Psicólogo (CEPP / CFP), resguardando o sigilo absoluto, a responsabilidade técnica e o rigor científico.
            </p>
          </div>

        </div>
      </section>

      <CTASection
        headline="Formação técnica sólida para entregar resultados reais de dentro para fora."
        primaryCTA={{ label: 'Iniciar Caminho de Resolução', href: '/caminho-de-resolucao' }}
        variant="default"
      />
    </>
  );
}
