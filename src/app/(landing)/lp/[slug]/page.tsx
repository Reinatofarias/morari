import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { ConversionButton } from '@/components/ui/ConversionButton';
import { getProduct, PRODUCTS, type ProductSlug } from '@/lib/products';

type Props = {
  params: Promise<{ slug: string }>;
};

type LandingCopy = {
  lead: string;
  promise: string;
  forWhom: string[];
  outcomes: string[];
  nextStep: string;
};

const PRODUCT_LANDING_COPY: Record<ProductSlug, LandingCopy> = {
  'codigo-da-paz-conjugal': {
    lead: 'Para homens que querem parar de transformar a própria casa em campo de tensão.',
    promise:
      'Um caminho direto para reconhecer padrões conjugais, recuperar presença e voltar a conversar sem guerra silenciosa.',
    forWhom: [
      'Você percebe que o casamento está funcionando no limite.',
      'Você evita conversas difíceis porque sabe que tudo vira disputa.',
      'Você quer assumir responsabilidade sem se apagar dentro da relação.',
    ],
    outcomes: [
      'Leitura clara dos ciclos que desgastam a relação.',
      'Direção prática para reconstruir comunicação e presença.',
      'Critérios para agir com firmeza sem repetir explosões.',
    ],
    nextStep:
      'Use este produto como ponto de partida e, se precisar de direcionamento individual, avance para o Caminho de Resolução.',
  },
  'programa-de-inteligencia-emocional-para-homens': {
    lead: 'Para homens que lideram sob pressão e não podem mais depender de explosão, silêncio ou controle.',
    promise:
      'Um programa para transformar reação automática em governo emocional prático, sem discurso raso de motivação.',
    forWhom: [
      'Você sente que a pressão muda seu tom, suas decisões e sua presença.',
      'Você confunde firmeza com endurecimento emocional.',
      'Você quer liderar casa e trabalho com mais clareza interna.',
    ],
    outcomes: [
      'Mapeamento das reações emocionais mais recorrentes.',
      'Ferramentas para separar força, controle e agressividade.',
      'Construção de autocontrole aplicável à rotina real.',
    ],
    nextStep:
      'Comece pelo programa para organizar sua base emocional e use o Caminho de Resolução se precisar de acompanhamento.',
  },
  'mapa-da-ansiedade-masculina': {
    lead: 'Para homens que não se chamam de ansiosos, mas vivem acelerados, irritados e sempre em alerta.',
    promise:
      'Um mapa para identificar como a ansiedade aparece no corpo, no trabalho, na família e na necessidade de controlar tudo.',
    forWhom: [
      'Você tem dificuldade de desligar mesmo quando o expediente acaba.',
      'Você se irrita com pequenas coisas e depois se culpa.',
      'Você sente que precisa controlar tudo para nada desmoronar.',
    ],
    outcomes: [
      'Clareza sobre sinais de ansiedade que muitos homens ignoram.',
      'Entendimento do ciclo entre pressão, controle e exaustão.',
      'Primeiros passos para interromper a aceleração mental.',
    ],
    nextStep:
      'Depois de enxergar o mapa, o próximo passo é decidir se basta autoestudo ou se você precisa de direcionamento clínico.',
  },
  'engrenagem-fantasma': {
    lead: 'Para homens que sabem que repetem padrões, mas ainda não enxergaram a engrenagem que os mantém presos.',
    promise:
      'Um material para revelar mecanismos invisíveis que sustentam ciclos emocionais, decisões automáticas e relações desgastadas.',
    forWhom: [
      'Você promete mudar, mas volta para as mesmas respostas.',
      'Você percebe sabotagens silenciosas nas relações e nas decisões.',
      'Você quer nomear o mecanismo antes de tentar força bruta outra vez.',
    ],
    outcomes: [
      'Identificação dos padrões automáticos mais custosos.',
      'Leitura do preço emocional do piloto automático.',
      'Direção para começar a interromper ciclos repetitivos.',
    ],
    nextStep:
      'Este produto abre consciência. Para trabalhar a origem dos padrões, o Caminho de Resolução ajuda a escolher o próximo nível.',
  },
  'codigo-h': {
    lead: 'Para homens que querem reconstruir identidade, responsabilidade e direção sem cair em performance de força.',
    promise:
      'Um código de entrada para organizar masculinidade responsável, liderança real e saúde emocional com profundidade.',
    forWhom: [
      'Você sente que sustenta uma imagem, mas perdeu direção por dentro.',
      'Você quer ser firme sem viver emocionalmente blindado.',
      'Você busca uma visão madura de responsabilidade masculina.',
    ],
    outcomes: [
      'Reorganização dos princípios de liderança pessoal.',
      'Diferença clara entre força, fachada e governo interno.',
      'Direção para agir com mais presença e responsabilidade.',
    ],
    nextStep:
      'Use o Código H como porta de entrada e avance para uma avaliação individual se a dor já estiver afetando casa, trabalho ou saúde.',
  },
  'mini-curso-de-saude-mental': {
    lead: 'Para homens que precisam começar a cuidar da saúde mental sem promessas mágicas e sem linguagem infantilizada.',
    promise:
      'Um mini curso introdutório para reconhecer sinais de alerta, entender limites e iniciar um cuidado responsável.',
    forWhom: [
      'Você sabe que algo não está bem, mas ainda não sabe nomear.',
      'Você quer entender quando a pressão virou sinal de alerta.',
      'Você precisa de um começo simples, sério e direto.',
    ],
    outcomes: [
      'Reconhecimento de sinais emocionais que exigem atenção.',
      'Critérios para saber quando buscar ajuda profissional.',
      'Primeiro passo organizado para cuidado e prevenção.',
    ],
    nextStep:
      'Comece pelo mini curso e use o Caminho de Resolução caso perceba que precisa de uma avaliação mais precisa.',
  },
};

export const dynamicParams = false;

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
    title: `${product.title} | Dr. Matheus Morari`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.coverImage],
      type: 'website',
    },
  };
}

export default async function ProductLandingPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const copy = PRODUCT_LANDING_COPY[product.slug];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative min-h-[88vh] overflow-hidden px-6 py-24">
        <Image
          src={product.coverAsset.src}
          alt={product.coverAsset.alt}
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-cover opacity-[0.34]"
          style={{ objectPosition: product.coverAsset.position ?? 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

        <div className="relative mx-auto flex min-h-[calc(88vh-12rem)] max-w-6xl items-center">
          <div className="max-w-3xl">
            <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-ice sm:text-5xl md:text-6xl">
              {product.title}
            </h1>
            <p className="mb-5 max-w-2xl text-xl leading-relaxed text-ice/90">
              {copy.lead}
            </p>
            <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted-light sm:text-lg">
              {copy.promise}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ConversionButton
                label="Iniciar Caminho de Resolução"
                href="/caminho-de-resolucao"
                size="lg"
                eventName={`lp_${product.slug}_primary`}
              />
              <ConversionButton
                label="Ver catálogo"
                href="/produtos"
                variant="secondary"
                size="lg"
                eventName={`lp_${product.slug}_catalogo`}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-surface-soft bg-surface/40 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-3xl font-bold leading-tight text-ice">
              Este produto foi criado para um momento específico.
            </h2>
          </div>
          <div className="grid gap-4 lg:col-span-8">
            {copy.forWhom.map((item) => (
              <div key={item} className="rounded-lg border border-surface-soft bg-background/70 p-5">
                <CheckCircle2 className="mb-3 text-gold" size={22} />
                <p className="leading-relaxed text-muted-light">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-lg border border-gold/20 bg-surface p-6">
              <p className="mb-6 text-lg leading-relaxed text-ice">
                {copy.nextStep}
              </p>
              <ConversionButton
                label="Entender meu próximo passo"
                href="/caminho-de-resolucao"
                fullWidth
                eventName={`lp_${product.slug}_next_step`}
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="mb-8 font-display text-3xl font-bold leading-tight text-ice">
              A proposta não é acumular informação. É ganhar clareza para agir.
            </h2>
            <div className="space-y-4">
              {copy.outcomes.map((outcome, index) => (
                <div key={outcome} className="grid grid-cols-[3rem_1fr] gap-4 rounded-lg border border-surface-soft bg-surface/60 p-5">
                  <span className="font-display text-xl font-bold text-gold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="leading-relaxed text-muted-light">{outcome}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-lg border border-surface-soft bg-background/70 p-6">
              <p className="mb-2 text-sm font-medium text-gold">Resumo do produto</p>
              <p className="leading-relaxed text-muted-light">{product.description}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
