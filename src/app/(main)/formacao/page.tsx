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
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* 1. Formação Acadêmica & Pós-Graduações */}
            <div className="p-6 rounded-xl bg-surface border border-surface-soft/60 space-y-4">
              <div className="flex items-center gap-3 text-gold">
                <GraduationCap size={24} />
                <h3 className="font-display font-bold text-ice text-lg">Formação Acadêmica & Pós-Graduações</h3>
              </div>
              <ul className="space-y-4 mt-4">
                <li className="flex gap-3">
                  <Check size={16} className="text-gold shrink-0 mt-1" />
                  <div>
                    <strong className="text-ice text-sm sm:text-base">Bacharel em Psicologia e Psicólogo Clínico</strong>
                    <p className="text-muted text-xs sm:text-sm">Faculdade FAROL de Rolim de Moura – RO.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Check size={16} className="text-gold shrink-0 mt-1" />
                  <div>
                    <strong className="text-ice text-sm sm:text-base">Pós-Graduação em Terapia Sistêmica Familiar</strong>
                    <p className="text-muted text-xs sm:text-sm">Abordagem individual, casal e família. Instituto Logos, ministrado pela Drª Marizete Rodrigues.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Check size={16} className="text-gold shrink-0 mt-1" />
                  <div>
                    <strong className="text-ice text-sm sm:text-base">Pós-Graduação em Neuropsicologia com Ênfase em Avaliações</strong>
                    <p className="text-muted text-xs sm:text-sm">FAMEESP — Faculdade Metropolitana do Estado de São Paulo.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* 2. Atuação & Supervisão */}
            <div className="p-6 rounded-xl bg-surface border border-surface-soft/60 space-y-4">
              <div className="flex items-center gap-3 text-gold">
                <Briefcase size={22} />
                <h3 className="font-display font-bold text-ice text-lg">Supervisão & Atuação Técnica</h3>
              </div>
              <ul className="space-y-4 mt-4">
                <li className="flex gap-3">
                  <Check size={16} className="text-gold shrink-0 mt-1" />
                  <div>
                    <strong className="text-ice text-sm sm:text-base">Supervisor de Especialização</strong>
                    <p className="text-muted text-xs sm:text-sm">Supervisor de curso de especialização em terapia sistêmica individual, casal e familiar.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Check size={16} className="text-gold shrink-0 mt-1" />
                  <div>
                    <strong className="text-ice text-sm sm:text-base">Supervisor Clínico</strong>
                    <p className="text-muted text-xs sm:text-sm">Orientador e supervisor clínico de práticas terapêuticas sistêmicas de outros profissionais.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* 3. Cursos de Especialização e Extensão */}
            <div className="p-6 rounded-xl bg-surface border border-surface-soft/60 space-y-4 lg:col-span-2">
              <div className="flex items-center gap-3 text-gold">
                <BookOpen size={22} />
                <h3 className="font-display font-bold text-ice text-lg">Cursos de Extensão e Especializações Clínicas</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Terapia de Casal */}
                <div className="space-y-3">
                  <h4 className="font-display font-semibold text-gold text-sm uppercase tracking-wider">Terapia de Casal & Relações</h4>
                  <ul className="space-y-3">
                    <li className="text-sm text-muted-light flex gap-2">
                      <span className="text-gold">•</span>
                      <span>Curso Ser Terapeuta de Casal (Psi. Tatiana Perez)</span>
                    </li>
                    <li className="text-sm text-muted-light flex gap-2">
                      <span className="text-gold">•</span>
                      <span>Curso Genograma na Prática (Inst. Logos — Drª Marizete Rodrigues)</span>
                    </li>
                    <li className="text-sm text-muted-light flex gap-2">
                      <span className="text-gold">•</span>
                      <span>Terapia de Casal com Problema Sexual (Inst. Logos — Drª Marizete Rodrigues)</span>
                    </li>
                  </ul>
                </div>

                {/* Hipnose Clínica */}
                <div className="space-y-3">
                  <h4 className="font-display font-semibold text-gold text-sm uppercase tracking-wider">Hipnose Clínica</h4>
                  <ul className="space-y-3">
                    <li className="text-sm text-muted-light flex gap-2">
                      <span className="text-gold">•</span>
                      <span>Curso de Hipnose Clínica e Clássica (Alberto Dell'Isola)</span>
                    </li>
                    <li className="text-sm text-muted-light flex gap-2">
                      <span className="text-gold">•</span>
                      <span>Cursos de Hipnose na Prática (Olimar Teser)</span>
                    </li>
                    <li className="text-sm text-muted-light flex gap-2">
                      <span className="text-gold">•</span>
                      <span>Curso Hipnose: Como Tratar Vícios (Alberto Dell'Isola)</span>
                    </li>
                  </ul>
                </div>

                {/* Luto e Apego */}
                <div className="space-y-3">
                  <h4 className="font-display font-semibold text-gold text-sm uppercase tracking-wider">Luto, Apego & Saúde Mental</h4>
                  <ul className="space-y-3">
                    <li className="text-sm text-muted-light flex gap-2">
                      <span className="text-gold">•</span>
                      <span>Extensão em Psicoterapia do Luto (CIAP / Psi. Elione F. Arruda)</span>
                    </li>
                    <li className="text-sm text-muted-light flex gap-2">
                      <span className="text-gold">•</span>
                      <span>Extensão em Apego, Luto e Separação (CIAP / Psi. Elione F. Arruda)</span>
                    </li>
                    <li className="text-sm text-muted-light flex gap-2">
                      <span className="text-gold">•</span>
                      <span>Psicologia, Religião e Saúde Mental (Inst. de Psicologia e Logoterapia)</span>
                    </li>
                  </ul>
                </div>

                {/* Prática Geral */}
                <div className="space-y-3">
                  <h4 className="font-display font-semibold text-gold text-sm uppercase tracking-wider">Habilidades Sociais & Avaliação</h4>
                  <ul className="space-y-3">
                    <li className="text-sm text-muted-light flex gap-2">
                      <span className="text-gold">•</span>
                      <span>Capacitação em Treino de Habilidades Sociais (Edlei Tibo Passos)</span>
                    </li>
                    <li className="text-sm text-muted-light flex gap-2">
                      <span className="text-gold">•</span>
                      <span>Curso Básico do Teste de Personalidade Palográfico (Psi. Vinicius S. Soares)</span>
                    </li>
                    <li className="text-sm text-muted-light flex gap-2">
                      <span className="text-gold">•</span>
                      <span>Workshop Sexualidade, Diversidade e Gênero (CIAP / Dr. Aneron A. Canais)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 4. Desenvolvimento & Liderança (Escola Conquer) */}
            <div className="p-6 rounded-xl bg-surface border border-surface-soft/60 space-y-4 lg:col-span-2">
              <div className="flex items-center gap-3 text-gold">
                <Compass size={22} />
                <h3 className="font-display font-bold text-ice text-lg">Desenvolvimento Profissional & Liderança (Escola Conquer)</h3>
              </div>
              <p className="text-muted text-sm max-w-2xl">
                Cursos executivos focados nas habilidades cruciais para o ecossistema empresarial e gestão de pessoas:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="p-4 rounded-lg bg-background/50 border border-surface-soft/40">
                  <span className="text-gold text-xs font-semibold uppercase tracking-wider">Liderança</span>
                  <h4 className="font-display font-bold text-ice mt-1">Formação em Liderança</h4>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-surface-soft/40">
                  <span className="text-gold text-xs font-semibold uppercase tracking-wider">Inteligência</span>
                  <h4 className="font-display font-bold text-ice mt-1">Inteligência Emocional 4.0</h4>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-surface-soft/40">
                  <span className="text-gold text-xs font-semibold uppercase tracking-wider">Eficiência</span>
                  <h4 className="font-display font-bold text-ice mt-1">Produtividade & Performance</h4>
                </div>
              </div>
            </div>

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
