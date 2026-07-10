import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CTASection } from '@/components/sections/CTASection';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { articleCovers } from '@/lib/visual-assets';

const articles = {
  'ansiedade-em-homens': {
    title: 'Ansiedade em homens: os sinais que você ignora',
    description: 'A ansiedade masculina tem rosto diferente. Ela se disfarça de produtividade, controle e irritabilidade.',
    category: 'Ansiedade',
    cover: articleCovers.ansiedade,
    sections: [
      'Homens que lideram raramente chamam ansiedade pelo nome. Chamam de excesso de responsabilidade, agenda cheia, urgência, pressão ou padrão de exigência.',
      'O problema é que o corpo não negocia indefinidamente. A mente acelera, o sono perde profundidade, a irritação aparece em casa e a presença começa a falhar.',
      'Reconhecer os sinais não é fraqueza. É responsabilidade. O próximo passo não é se diagnosticar sozinho, mas entender com clareza o que está acontecendo.',
    ],
  },
  'esgotamento-emocional': {
    title: 'Esgotamento emocional: quando o corpo avisa e você não ouve',
    description: 'O esgotamento não é preguiça. É o resultado de carregar mais do que qualquer homem deveria carregar sozinho.',
    category: 'Esgotamento',
    cover: articleCovers.esgotamento,
    sections: [
      'O esgotamento costuma chegar antes do colapso. Ele aparece como cinismo, impaciência, ausência emocional e uma fadiga que descanso comum não resolve.',
      'Para muitos homens, parar parece irresponsabilidade. Mas continuar no automático pode custar mais caro: casamento, filhos, saúde e clareza de decisão.',
      'O trabalho começa quando você para de tratar o cansaço como normal e passa a investigar o que ele está tentando mostrar.',
    ],
  },
  'burnout-em-lideres': {
    title: 'Burnout em líderes: o preço silencioso do sucesso',
    description: 'O burnout não escolhe hora. Ele cobra quando você menos espera — e sempre na área que mais importa.',
    category: 'Liderança',
    cover: articleCovers.lideranca,
    sections: [
      'Liderar sob pressão constante exige mais que estratégia. Exige capacidade de perceber limites antes que eles virem ruptura.',
      'Quando o líder sustenta tudo sozinho, a empresa pode até continuar funcionando. Mas a casa começa a sentir a conta.',
      'Prevenir burnout não é diminuir ambição. É construir governo interno suficiente para sustentar o que você está construindo.',
    ],
  },
  'padroes-familiares': {
    title: 'Padrões familiares: você está repetindo o que jurou não repetir?',
    description: 'Muitos homens descobrem, no auge da carreira, que estão vivendo a mesma história que juraram nunca viver.',
    category: 'Padrões',
    cover: articleCovers.padroes,
    sections: [
      'Há comportamentos que parecem escolhas individuais, mas nascem de sistemas familiares antigos: controle, distância emocional, explosões, silêncio e exigência.',
      'A psicologia sistêmica ajuda a olhar para esses padrões sem culpabilizar a família e sem tirar sua responsabilidade no presente.',
      'Perceber o padrão é o primeiro passo para deixar de repeti-lo com sua esposa, seus filhos e sua própria história.',
    ],
  },
  'homens-evitam-terapia': {
    title: 'Por que homens evitam terapia (e o preço que isso cobra)',
    description: 'A resistência à terapia não é força. É um padrão que custa caro — no casamento, na saúde e na sanidade.',
    category: 'Mentalidade',
    cover: articleCovers.mentalidade,
    sections: [
      'Muitos homens só procuram ajuda quando a vida já está cobrando alto. Antes disso, tentam racionalizar, controlar e suportar.',
      'A resistência costuma nascer da ideia de que pedir ajuda diminui autoridade. Na prática, ignorar sinais é o que enfraquece decisões importantes.',
      'Um espaço técnico não existe para infantilizar o homem. Existe para ajudá-lo a enxergar o que sozinho ele já não consegue organizar.',
    ],
  },
  'autodominio-emocional': {
    title: 'Autodomínio emocional: o que separa líderes de controladores',
    description: 'Controlar tudo não é liderança. É sobrevivência. Autodomínio é outra coisa — e começa por dentro.',
    category: 'Autodomínio',
    cover: articleCovers.autodominio,
    sections: [
      'Controle excessivo nasce do medo de que tudo desmorone se você relaxar. Autodomínio nasce da capacidade de responder sem ser dominado pelo impulso.',
      'O homem que governa a si mesmo não perde firmeza. Ele ganha clareza, presença e capacidade de decisão.',
      'Esse trabalho não é sobre parecer calmo. É sobre construir estrutura interna para sustentar pressão sem destruir vínculos.',
    ],
  },
};

type ArticleSlug = keyof typeof articles;

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
