export interface BioProduct {
  badge: string;
  title: string;
  description: string;
  href: string;
  image: string;
  ctaLabel: string;
  highlight: boolean;
  category: string;
}

export const matheusProducts: BioProduct[] = [
  {
    badge: "CASAMENTO",
    title: "O Código da Paz Conjugal",
    description: "Produto para homens que precisam reconstruir presença, comunicação e responsabilidade dentro do casamento.",
    href: "/lp/codigo-da-paz-conjugal",
    image: "/assets/images/f1.jpeg",
    ctaLabel: "Ver página",
    highlight: true,
    category: "casamento"
  },
  {
    badge: "PROGRAMA",
    title: "Programa de Inteligência Emocional para Homens",
    description: "Programa para homens que lideram e precisam transformar pressão interna em governo emocional prático.",
    href: "/lp/programa-de-inteligencia-emocional-para-homens",
    image: "/assets/images/f2.jpeg",
    ctaLabel: "Ver página",
    highlight: true,
    category: "lideranca"
  },
  {
    badge: "MATERIAL",
    title: "Mapa da Ansiedade Masculina",
    description: "Material para identificar como a ansiedade aparece em homens: controle, irritação, aceleração mental e dificuldade de desligar.",
    href: "/lp/mapa-da-ansiedade-masculina",
    image: "/assets/images/f3.jpeg",
    ctaLabel: "Ver página",
    highlight: false,
    category: "ansiedade"
  },
  {
    badge: "MATERIAL",
    title: "A Engrenagem Fantasma",
    description: "Produto sobre os mecanismos invisíveis que mantêm homens presos aos mesmos padrões emocionais.",
    href: "/lp/a-engrenagem-fantasma",
    image: "/assets/images/f4.jpeg",
    ctaLabel: "Ver página",
    highlight: false,
    category: "padroes"
  },
  {
    badge: "CÓDIGO",
    title: "O Código H",
    description: "Produto de entrada para homens que querem entender identidade, responsabilidade e saúde emocional masculina sem autoajuda rasa.",
    href: "/lp/codigo-h",
    image: "/assets/images/f5.jpeg",
    ctaLabel: "Ver página",
    highlight: false,
    category: "identidade"
  },
  {
    badge: "CURSO",
    title: "Mini Curso de Saúde Mental",
    description: "Mini curso introdutório sobre saúde mental masculina, sinais de alerta e caminhos responsáveis de cuidado.",
    href: "/lp/mini-curso-de-saude-mental",
    image: "/assets/images/f6.jpeg",
    ctaLabel: "Ver página",
    highlight: false,
    category: "saude-mental"
  }
];
