import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { PRODUCTS } from '@/lib/products';
import { portraitAssets } from '@/lib/visual-assets';

const staticRoutes = [
  { path: '/', priority: 1, changeFrequency: 'weekly' as const, image: portraitAssets.heroConcept.src },
  { path: '/bio', priority: 0.4, changeFrequency: 'monthly' as const, image: portraitAssets.profileDesk.src },
  { path: '/caminho-de-resolucao', priority: 0.95, changeFrequency: 'monthly' as const, image: portraitAssets.heroConcept.src },
  { path: '/atendimentos', priority: 0.9, changeFrequency: 'monthly' as const, image: portraitAssets.profileSide.src },
  { path: '/atendimentos/psicologia-para-homens', priority: 0.9, changeFrequency: 'monthly' as const, image: portraitAssets.profileDesk.src },
  { path: '/atendimentos/psicologia-sistemica', priority: 0.85, changeFrequency: 'monthly' as const, image: portraitAssets.library.src },
  { path: '/atendimentos/hipnoterapia', priority: 0.8, changeFrequency: 'monthly' as const, image: portraitAssets.profileSide.src },
  { path: '/servicos', priority: 0.8, changeFrequency: 'monthly' as const, image: portraitAssets.library.src },
  { path: '/produtos', priority: 0.75, changeFrequency: 'monthly' as const, image: portraitAssets.heroConcept.src },
  { path: '/conteudos', priority: 0.85, changeFrequency: 'weekly' as const, image: portraitAssets.library.src },
  { path: '/sobre', priority: 0.8, changeFrequency: 'monthly' as const, image: portraitAssets.profileDesk.src },
  { path: '/formacao', priority: 0.7, changeFrequency: 'monthly' as const, image: portraitAssets.profileDesk.src },
  { path: '/duvidas', priority: 0.65, changeFrequency: 'monthly' as const, image: portraitAssets.profileSide.src },
  { path: '/contato', priority: 0.75, changeFrequency: 'monthly' as const, image: portraitAssets.profileDesk.src },
  { path: '/privacidade', priority: 0.25, changeFrequency: 'yearly' as const },
  { path: '/termos', priority: 0.25, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const productRoutes = PRODUCTS.map((product) => ({
    path: `/produtos/${product.slug}`,
    priority: 0.75,
    changeFrequency: 'monthly' as const,
    image: product.coverImage,
  }));

  const productLandingRoutes = PRODUCTS.map((product) => ({
    path: `/lp/${product.slug}`,
    priority: 0.9,
    changeFrequency: 'monthly' as const,
    image: product.coverImage,
  }));

  return [...staticRoutes, ...productRoutes, ...productLandingRoutes].map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    images: route.image ? [`${SITE_URL}${route.image}`] : undefined,
  }));
}
