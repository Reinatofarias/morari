import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { CTASection } from '@/components/sections/CTASection';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { GoldenDivider } from '@/components/ui/GoldenDivider';
import { Check, Network, HelpCircle, GraduationCap, RefreshCw, Zap, Users, ShieldAlert } from 'lucide-react';
import { portraitAssets } from '@/lib/visual-assets';

export const metadata: Metadata = {
  title: 'Psicologia Sistêmica',
  description: 'Entenda como padrões familiares afetam sua liderança, casamento e saúde emocional. Psicologia sistêmica para homens que lideram.',
};

export default function PsicologiaSistemicaPage() {
  return (
    <>
      <HeroSection
        headline="O que você repete sem perceber pode estar destruindo o que você mais quer proteger."
        highlightWord="repete sem perceber"
        subheadline="Psicologia sistêmica para entender os padrões familiares que você carrega — e como eles afetam sua liderança, seu casamento e sua saúde emocional."
        variant="page"
        image={portraitAssets.library.src}
        imageAlt={portraitAssets.library.alt}
        imagePosition={portraitAssets.library.position}
        imagePresentation="editorial"
      />

      <div className="py-4 max-w-6xl mx-auto px-6">
        <Breadcrumb items={[{ label: 'Atendimentos', href: '/atendimentos' }, { label: 'Psicologia Sistêmica' }]} />
      </div>

      {/* 1. O que é a Psicoterapia Sistêmica */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader
            label="Abordagem Científica"
            title="O que é Psicoterapia Sistêmica"
          />
          <p className="text-muted-light leading-relaxed text-base sm:text-lg mb-6">
            A psicoterapia sistêmica é uma abordagem científica que compreende o indivíduo não como uma entidade isolada, mas como parte de um sistema relacional complexo — que engloba a família de origem, a família atual, contextos profissionais, redes sociais e hierarquias emocionais interconectadas.
          </p>
          <p className="text-muted-light leading-relaxed text-base sm:text-lg">
            Fundamentada em teorias de cibernética, comunicação pragmática e dinâmicas relacionais, ela reconhece que comportamentos, crenças, sintomas e padrões emocionais aparentemente individuais são, na verdade, expressões de processos sistêmicos, lealdades transgeracionais, padrões comunicacionais repetitivos e mecanismos de homeostase familiar.
          </p>

          <div className="mt-12 p-6 rounded-xl bg-surface/50 border border-surface-soft/60">
            <h3 className="font-display font-bold text-gold text-lg mb-3 flex items-center gap-2">
              <GraduationCap size={20} />
              Fundamentos Teóricos e Autores Principais
            </h3>
            <p className="text-muted-light text-sm leading-relaxed">
              A abordagem sistêmica integra contribuições de pesquisadores como **Gregory Bateson** (cibernética e comunicação), **Don Jackson e Jay Haley** (dinâmicas familiares), **Paul Watzlawick** (pragmática da comunicação), **Virginia Satir** (comunicação congruente), **Mara Selvini Palazzoli** (paradoxo e prescrição), **Murray Bowen** (diferenciação do self e transgeracionalidade), **Monica McGoldrick** (ciclo de vida familiar), e seus sucessores que expandiram e refinaram esses conceitos de forma clínica e ética.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Como Funciona a Visão Sistêmica */}
      <section className="py-16 md:py-24 bg-surface/30">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            label="Funcionamento"
            title="Como Funciona a Visão Sistêmica"
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: 'Circularidade',
                desc: 'Eventos e comportamentos não têm uma causa única ou linear. Eles resultam de padrões circulares de interação onde as reações se alimentam mutuamente.',
                icon: RefreshCw,
              },
              {
                title: 'Retroalimentação',
                desc: 'Todo comportamento funciona como feedback. As ações de um membro do sistema afetam e são afetadas continuamente pelas reações de todos os demais.',
                icon: Zap,
              },
              {
                title: 'Homeostase',
                desc: 'Sistemas relacionais tendem a buscar e manter o equilíbrio (homeostase), mesmo que esse equilíbrio seja disfuncional ou doloroso para os membros.',
                icon: HelpCircle,
              },
              {
                title: 'Diferenciação',
                desc: 'A capacidade crucial do indivíduo de manter sua identidade, valores e autonomia pessoal mesmo estando intimamente conectado ao seu sistema familiar.',
                icon: Users,
              },
              {
                title: 'Lealdade Transgeracional',
                desc: 'Padrões invisíveis, expectativas, segredos e conflitos não resolvidos que se transmitem e são reproduzidos inconscientemente através de gerações.',
                icon: Network,
              },
              {
                title: 'Comunicação Pragmática',
                desc: 'O entendimento de que toda comunicação possui um nível de conteúdo e um nível de relação. O "como" é dito define o significado do que é comunicado.',
                icon: Check,
              },
            ].map((principle) => {
              const Icon = principle.icon;
              return (
                <div key={principle.title} className="p-6 rounded-xl bg-surface border border-surface-soft/60 flex flex-col justify-between group hover:border-gold/30 transition-all duration-300">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mb-4 text-gold group-hover:bg-gold/20 transition-colors">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-display font-semibold text-ice text-lg mb-2">{principle.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{principle.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Sinais de Alerta */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader
            label="Autoavaliação"
            title="Sinais de que Você Pode Estar Preso em Padrões Sistêmicos"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {[
              'Repete escolhas profissionais ou de relacionamento que jurou não repetir.',
              'Vivencia conflitos familiares cíclicos que retornam sob as mesmas dinâmicas.',
              'Sente que "carrega" um peso, responsabilidades ou lealdades que não lhe pertencem originalmente.',
              'Tem extrema dificuldade em separar papéis (como pai/filho, marido/profissional, cuidador/indivíduo).',
              'Percebe que suas reações emocionais e explosões são desproporcionais ao estímulo presente.',
              'Sente um peso emocional constante, ansiedade ou tristeza cuja origem não consegue localizar no presente.',
              'Mantém relacionamentos marcados por duplos vínculos (mensagens contraditórias que geram paralisia).',
              'Observa que toda tentativa de mudança pessoal gera resistência ou "sabotagem" do sistema ao redor.',
            ].map((sinal, idx) => (
              <div key={idx} className="flex items-start gap-3.5 p-4 rounded-lg bg-surface/40 border border-surface-soft/40">
                <ShieldAlert size={18} className="text-gold shrink-0 mt-0.5" />
                <span className="text-muted-light text-sm leading-relaxed">{sinal}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Campo de Atuação e Transformações */}
      <section className="py-16 md:py-24 bg-surface/20 border-t border-surface-soft/40">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader
            label="Resolução"
            title="Campo de Atuação e Transformações Clínicas"
          />
          <p className="text-muted-light leading-relaxed text-sm sm:text-base mb-8">
            A psicoterapia sistêmica intervém diretamente em dinâmicas familiares disfuncionais, conflitos conjugais e parentais, sintomas em crianças e adolescentes (que costumam expressar a tensão do sistema), padrões de traumas familiares ou lealdades invisíveis, crises de transição do ciclo de vida e processos de separação ou sucessão familiar nos negócios.
          </p>

          <div className="space-y-6">
            {[
              {
                title: 'Ressignificação Circular',
                desc: 'Compreender como cada membro contribui ativamente para a manutenção do padrão atual, retirando o peso da culpa individualizada.'
              },
              {
                title: 'Interrupção de Ciclos',
                desc: 'Introdução de quebras de padrão e novas formas de comunicação e interação para cessar a repetição do sintoma.'
              },
              {
                title: 'Diferenciação Fortalecida',
                desc: 'Desenvolver a autonomia e a voz individual do homem dentro das amarras de lealdade familiar, permitindo que ele lidere sem repetir.'
              },
              {
                title: 'Ressignificação Geracional',
                desc: 'Integrar a história familiar e honrar as origens, mas sem o compromisso inconsciente de reviver suas dores e falhas.'
              }
            ].map((transformation, index) => (
              <div key={index} className="flex gap-4">
                <span className="font-display text-xl font-bold text-gold shrink-0">
                  {String(index + 1).padStart(2, '0')}.
                </span>
                <div>
                  <h4 className="font-display font-bold text-ice text-base sm:text-lg mb-1">{transformation.title}</h4>
                  <p className="text-muted text-sm leading-relaxed">{transformation.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Entender o padrão é o primeiro passo para governar suas decisões."
        primaryCTA={{ label: 'Iniciar Caminho de Resolução', href: '/caminho-de-resolucao' }}
        variant="dark"
      />
    </>
  );
}
