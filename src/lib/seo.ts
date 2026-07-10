import { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from './constants';

interface SEOConfig {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noindex?: boolean;
  ogType?: 'website' | 'article' | 'profile';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
  };
}

export function generatePageMetadata(config: SEOConfig): Metadata {
  const fullTitle = config.title.includes(SITE_NAME)
    ? config.title
    : `${config.title} — ${SITE_NAME}`;

  return {
    title: fullTitle,
    description: config.description,
    openGraph: {
      title: config.title,
      description: config.description,
      url: `${SITE_URL}${config.path}`,
      siteName: SITE_NAME,
      locale: 'pt_BR',
      type: config.ogType || 'website',
      images: [
        {
          url: config.ogImage || `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
      ...(config.article && {
        publishedTime: config.article.publishedTime,
        modifiedTime: config.article.modifiedTime,
        authors: config.article.author ? [config.article.author] : undefined,
        section: config.article.section,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
    },
    alternates: {
      canonical: `${SITE_URL}${config.path}`,
    },
    robots: config.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

// Schema.org helpers
export function professionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    description: 'Psicólogo para homens que lideram. Atendimento em psicologia clínica, psicologia sistêmica e hipnoterapia.',
    url: SITE_URL,
    priceRange: '$$$',
    areaServed: 'BR',
    serviceType: ['Psicologia Clínica', 'Psicologia Sistêmica', 'Hipnoterapia'],
    founder: personSchema(),
  };
}

export function personSchema() {
  return {
    '@type': 'Person',
    name: 'Dr. Matheus Morari',
    jobTitle: 'Psicólogo Clínico',
    url: `${SITE_URL}/sobre`,
    description: 'Psicólogo especializado em saúde emocional masculina, liderança e autodomínio.',
  };
}

export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function articleSchema(article: {
  title: string;
  description: string;
  slug: string;
  publishedAt?: string;
  updatedAt?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: `${SITE_URL}/conteudos/${article.slug}`,
    author: personSchema(),
    publisher: {
      '@type': 'Person',
      name: 'Dr. Matheus Morari',
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
