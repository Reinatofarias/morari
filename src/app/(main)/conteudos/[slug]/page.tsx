import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CTASection } from '@/components/sections/CTASection';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { articles, type ArticleSlug } from '@/lib/articles';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug as ArticleSlug];

  if (!article) {
    return { title: 'Conteúdo não encontrado', robots: { index: false } };
  }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: [article.cover.src],
      type: 'article',
    },
  };
}

export default async function ConteudoSlugPage({ params }: Props) {
  const { slug } = await params;
  const article = articles[slug as ArticleSlug];

  if (!article) {
    notFound();
  }

  return (
    <>
      <article className="pt-32 pb-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <EditorialImage
              asset={article.cover}
              aspect="aspect-[4/5]"
              priority
              sizes="(max-width: 1024px) 100vw, 420px"
            />
          </div>
          <div className="lg:col-span-7">
            <h1 className="mb-6 font-display text-3xl font-bold leading-tight text-ice sm:text-4xl md:text-5xl">
              {article.title}
            </h1>
            <p className="mb-10 text-lg leading-relaxed text-muted-light">
              {article.description}
            </p>
            <div className="space-y-6 border-l border-gold/30 pl-6">
              {article.sections.map((section) => (
                <p key={section} className="text-base leading-relaxed text-muted-light">
                  {section}
                </p>
              ))}
            </div>
          </div>
        </div>
      </article>

      <CTASection
        headline="Se esse texto tocou em algo real, o próximo passo é entender o que está acontecendo."
        primaryCTA={{ label: 'Iniciar Caminho de Resolução', href: '/caminho-de-resolucao' }}
        secondaryCTA={{ label: 'Conhecer atendimentos', href: '/atendimentos' }}
        variant="dark"
      />
    </>
  );
}
