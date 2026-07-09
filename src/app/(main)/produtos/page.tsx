import { Metadata } from 'next';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { CTASection } from '@/components/sections/CTASection';
import { ProductCard } from '@/components/cards/ProductCard';

export const metadata: Metadata = {
  title: 'Produtos e Cursos',
  description: 'Cursos e materiais sobre ansiedade, esgotamento e autodomínio para homens que lideram.',
};

const products = [
  { title: 'Curso: Ansiedade em Homens', description: 'Entenda o que está por trás da sua ansiedade e recupere o governo emocional. Curso completo em vídeo.', type: 'curso', status: 'coming_soon' as const, href: '/produtos/curso-ansiedade' },
  { title: 'Guia: Sinais de Esgotamento', description: 'Um guia prático para reconhecer os sinais de esgotamento antes que eles virem colapso.', type: 'material', status: 'coming_soon' as const, href: '/produtos' },
  { title: 'Programa: Liderança Integral', description: 'Programa aprofundado para líderes que querem integrar performance, família e sanidade.', type: 'formacao', status: 'coming_soon' as const, href: '/produtos' },
];

export default function ProdutosPage() {
  return (
    <>
      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            label="Produtos"
            title="Nem todo homem precisa começar por um atendimento individual."
            highlightWord="atendimento individual"
            description="Mas todo homem precisa começar encarando a verdade certa. Estes materiais são pontos de entrada para sua jornada."
            alignment="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {products.map((product) => (
              <ProductCard key={product.title} {...product} />
            ))}
          </div>
        </div>
      </section>
      <CTASection headline="Quer começar por uma conversa? O Caminho de Resolução é gratuito." primaryCTA={{ label: 'Iniciar Caminho de Resolução', href: '/caminho-de-resolucao' }} variant="dark" />
    </>
  );
}
