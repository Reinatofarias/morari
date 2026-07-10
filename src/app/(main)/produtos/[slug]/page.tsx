import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CTASection } from '@/components/sections/CTASection';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { getProduct, PRODUCTS } from '@/lib/products';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {
      title: 'Produto não encontrado',
      robots: { index: false },
    };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.coverImage],
      type: 'website',
    },
  };
}

export default async function ProductSlugPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <section className="pt-32 pb-8">
        <div className="mx-auto max-w-6xl px-6">
          <Breadcrumb items={[{ label: 'Produtos', href: '/produtos' }, { label: product.title }]} />
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <EditorialImage
              asset={product.coverAsset}
              aspect="aspect-[4/5]"
              priority
              sizes="(max-width: 1024px) 100vw, 420px"
            />
          </div>
          <div className="lg:col-span-7">
            <h1 className="mb-6 font-display text-3xl font-bold leading-tight text-ice sm:text-4xl md:text-5xl">
              {product.title}
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-light">
              {product.description}
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {product.highlights.map((highlight, index) => (
                <div key={highlight} className="rounded-lg border border-surface-soft bg-surface p-4">
                  <span className="mb-3 block font-display text-lg font-bold text-gold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-light">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Quer entender se este produto faz sentido para o seu momento?"
        description="O Caminho de Resolução ajuda a identificar o próximo passo mais adequado."
        primaryCTA={{ label: 'Ver página do produto', href: `/lp/${product.slug}` }}
        secondaryCTA={{ label: 'Iniciar Caminho de Resolução', href: '/caminho-de-resolucao' }}
        variant="dark"
      />
    </>
  );
}
