import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { CTASection } from '@/components/sections/CTASection';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { Check } from 'lucide-react';
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
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader label="Abordagem" title="O que é Psicologia Sistêmica" description="A psicologia sistêmica olha para o indivíduo dentro do seu sistema — família de origem, família atual, relações de trabalho, hierarquias emocionais. Ela entende que muitos comportamentos, crenças e reações que parecem individuais são, na verdade, padrões herdados ou construídos dentro de um sistema." />
          <div className="mt-12">
            <SectionHeader label="Sinais" title="Você pode estar vivendo um padrão se:" />
            <ul className="space-y-3 mt-6">
              {['Repete comportamentos que jurou não repetir', 'Vive conflitos familiares que parecem cíclicos', 'Sente que "carrega" emoções que não são suas', 'Tem dificuldade de separar papel de pai/filho/marido/profissional', 'Percebe que suas reações são desproporcionais ao estímulo', 'Sente um peso que não sabe de onde vem'].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check size={18} className="text-gold shrink-0 mt-0.5" />
                  <span className="text-muted-light text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <CTASection headline="Entender o padrão é o primeiro passo para quebrá-lo." primaryCTA={{ label: 'Iniciar Caminho de Resolução', href: '/caminho-de-resolucao' }} variant="dark" />
    </>
  );
}
