import { Metadata } from 'next';
import { CTASection } from '@/components/sections/CTASection';
import { VisualPageIntro } from '@/components/sections/VisualPageIntro';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { portraitAssets } from '@/lib/visual-assets';

export const metadata: Metadata = {
  title: 'Serviços',
  description: 'Todos os serviços do Dr. Matheus Morari: atendimento psicológico, psicologia sistêmica, hipnoterapia, cursos e acompanhamento para líderes.',
};

const allServices = [
  { title: 'Atendimento Individual', description: 'Psicoterapia individual para homens que precisam de espaço, técnica e direção para lidar com o peso que carregam.', href: '/atendimentos/psicologia-para-homens', icon: 'User', tags: ['Individual', 'Online'] },
  { title: 'Acompanhamento para Líderes', description: 'Acompanhamento contínuo para empresários e gestores que precisam integrar performance profissional com saúde emocional.', href: '/atendimentos/psicologia-para-homens', icon: 'Crown', tags: ['Liderança', 'Contínuo'] },
  { title: 'Psicologia Sistêmica', description: 'Trabalho com padrões familiares, herança emocional e dinâmicas sistêmicas que afetam sua vida atual.', href: '/atendimentos/psicologia-sistemica', icon: 'Network', tags: ['Família', 'Padrões'] },
  { title: 'Hipnoterapia', description: 'Recurso técnico complementar para acessar padrões emocionais profundos com segurança e responsabilidade.', href: '/atendimentos/hipnoterapia', icon: 'Sparkles', tags: ['Complementar', 'Profundo'] },
  { title: 'Cursos e Produtos Digitais', description: 'Materiais de entrada para quem quer começar a entender o que está vivendo antes de um atendimento individual.', href: '/produtos', icon: 'BookOpen', tags: ['Digital', 'Autoestudo'] },
  { title: 'Palestras e Empresas', description: 'Palestras sobre saúde emocional masculina, liderança integral e prevenção de burnout para empresas. Em breve.', href: '/contato', icon: 'Presentation', tags: ['Empresarial', 'Em breve'] },
];

export default function ServicosPage() {
  return (
    <>
      <VisualPageIntro
        label="Serviços"
        title="Cada serviço é um caminho. Cada caminho resolve algo diferente."
        highlightWord="algo diferente"
        description="Conheça as possibilidades e encontre o que faz mais sentido para o momento que você está vivendo."
        asset={portraitAssets.library}
      />

      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>
      <CTASection headline="Não sabe por onde começar? O Caminho de Resolução direciona você." primaryCTA={{ label: 'Iniciar Caminho de Resolução', href: '/caminho-de-resolucao' }} variant="dark" />
    </>
  );
}
