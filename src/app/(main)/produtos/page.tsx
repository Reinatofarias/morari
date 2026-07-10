import { Metadata } from 'next';
import { CTASection } from '@/components/sections/CTASection';
import { VisualPageIntro } from '@/components/sections/VisualPageIntro';
import { ProductCard } from '@/components/cards/ProductCard';
import { PRODUCTS } from '@/lib/products';
import { portraitAssets } from '@/lib/visual-assets';

export const metadata: Metadata = {
  title: 'Produtos e Cursos',
  description: 'Cursos e materiais sobre ansiedade, esgotamento e autodomínio para homens que lideram.',
};

export default function ProdutosPage() {
  return (
    <>
      <VisualPageIntro
        label="Produtos"
        title="Nem todo homem precisa começar por um atendimento individual."
        highlightWord="atendimento individual"
        description="Mas todo homem precisa começar encarando a verdade certa. Estes materiais são pontos de entrada para sua jornada."
        asset={portraitAssets.heroConcept}
      />

      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.slug}
                title={product.title}
                description={product.description}
                type={product.type}
                status={product.status}
                href={`/produtos/${product.slug}`}
                coverImage={product.coverImage}
              />
            ))}
          </div>
        </div>
      </section>
      <CTASection headline="Quer começar por uma conversa? O Caminho de Resolução é gratuito." primaryCTA={{ label: 'Iniciar Caminho de Resolução', href: '/caminho-de-resolucao' }} variant="dark" />
    </>
  );
}
