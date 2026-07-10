import { productCovers } from './visual-assets';

export const PRODUCTS = [
  {
    slug: 'codigo-da-paz-conjugal',
    title: 'O Código da Paz Conjugal',
    description:
      'Produto para homens que precisam reconstruir presença, comunicação e responsabilidade dentro do casamento.',
    type: 'codigo',
    status: 'active' as const,
    coverImage: productCovers['codigo-da-paz-conjugal'].src,
    coverAsset: productCovers['codigo-da-paz-conjugal'],
    highlights: [
      'Reconhecer padrões que desgastam a relação',
      'Voltar a conversar sem entrar em guerra',
      'Assumir responsabilidade sem se anular',
      'Reconstruir presença dentro de casa',
    ],
  },
  {
    slug: 'programa-de-inteligencia-emocional-para-homens',
    title: 'Programa de Inteligência Emocional para Homens',
    description:
      'Programa para homens que lideram e precisam transformar pressão interna em governo emocional prático.',
    type: 'programa',
    status: 'active' as const,
    coverImage: productCovers['programa-de-inteligencia-emocional-para-homens'].src,
    coverAsset: productCovers['programa-de-inteligencia-emocional-para-homens'],
    highlights: [
      'Entender reações emocionais no dia a dia',
      'Separar firmeza de explosão',
      'Desenvolver governo interno sob pressão',
      'Integrar liderança, casa e sanidade',
    ],
  },
  {
    slug: 'mapa-da-ansiedade-masculina',
    title: 'Mapa da Ansiedade Masculina',
    description:
      'Material para identificar como a ansiedade aparece em homens: controle, irritação, aceleração mental e dificuldade de desligar.',
    type: 'mapa',
    status: 'active' as const,
    coverImage: productCovers['mapa-da-ansiedade-masculina'].src,
    coverAsset: productCovers['mapa-da-ansiedade-masculina'],
    highlights: [
      'Nomear sinais que costumam ser ignorados',
      'Entender o ciclo entre pressão e controle',
      'Perceber impactos na família e no trabalho',
      'Organizar o primeiro passo de resolução',
    ],
  },
  {
    slug: 'engrenagem-fantasma',
    title: 'A Engrenagem Fantasma',
    description:
      'Produto sobre os mecanismos invisíveis que mantêm homens presos aos mesmos padrões emocionais.',
    type: 'material',
    status: 'active' as const,
    coverImage: productCovers['engrenagem-fantasma'].src,
    coverAsset: productCovers['engrenagem-fantasma'],
    highlights: [
      'Identificar mecanismos automáticos',
      'Perceber padrões que se repetem',
      'Entender o custo do piloto automático',
      'Começar a interromper ciclos internos',
    ],
  },
  {
    slug: 'codigo-h',
    title: 'O Código H',
    description:
      'Produto de entrada para homens que querem entender identidade, responsabilidade e saúde emocional masculina sem autoajuda rasa.',
    type: 'codigo',
    status: 'active' as const,
    coverImage: productCovers['codigo-h'].src,
    coverAsset: productCovers['codigo-h'],
    highlights: [
      'Reorganizar princípios de masculinidade responsável',
      'Diferenciar força de fachada',
      'Entender o peso silencioso da liderança',
      'Criar direção para o próximo passo',
    ],
  },
  {
    slug: 'mini-curso-de-saude-mental',
    title: 'Mini Curso de Saúde Mental',
    description:
      'Mini curso introdutório sobre saúde mental masculina, sinais de alerta e caminhos responsáveis de cuidado.',
    type: 'curso',
    status: 'active' as const,
    coverImage: productCovers['mini-curso-de-saude-mental'].src,
    coverAsset: productCovers['mini-curso-de-saude-mental'],
    highlights: [
      'Reconhecer sinais de alerta',
      'Entender quando buscar ajuda',
      'Evitar promessas mágicas e atalhos',
      'Começar um cuidado responsável',
    ],
  },
] as const;

export type ProductSlug = (typeof PRODUCTS)[number]['slug'];

export function getProduct(slug: string) {
  return PRODUCTS.find((product) => product.slug === slug);
}

