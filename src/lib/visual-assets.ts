export type VisualAsset = {
  src: string;
  alt: string;
  position?: string;
};

export const portraitAssets = {
  heroConcept: {
    src: '/assets/images/f8.jpeg',
    alt: 'Retrato de Matheus Morari em ambiente editorial, representando liderança e presença',
    position: 'center',
  },
  heroCutout: {
    src: '/assets/images/hero-cutout.png',
    alt: 'Retrato de Matheus Morari sobre fundo escuro',
    position: 'center bottom',
  },
  library: {
    src: '/assets/images/f8.jpeg',
    alt: 'Dr. Matheus Morari em seu consultório / biblioteca',
    position: 'center',
  },
  profileSide: {
    src: '/assets/images/f7.jpeg',
    alt: 'Dr. Matheus Morari atendendo em consultório premium',
    position: 'center',
  },
  profileDesk: {
    src: '/assets/images/f8.jpeg',
    alt: 'Dr. Matheus Morari em retrato profissional',
    position: 'center top',
  },
} satisfies Record<string, VisualAsset>;

export const articleCovers: Record<string, VisualAsset> = {
  ansiedade: {
    src: '/assets/images/f3.jpeg',
    alt: 'Composição editorial sobre ansiedade silenciosa em homens que lideram',
    position: 'center',
  },
  esgotamento: {
    src: '/assets/images/f4.jpeg',
    alt: 'Retrato sóbrio representando esgotamento e pressão acumulada',
    position: 'center',
  },
  lideranca: {
    src: '/assets/images/f2.jpeg',
    alt: 'Ambiente de biblioteca representando liderança, responsabilidade e decisão',
    position: 'center',
  },
  padroes: {
    src: '/assets/images/f1.jpeg',
    alt: 'Representação de padrões familiares e autopercepção',
    position: 'center',
  },
  mentalidade: {
    src: '/assets/images/f5.jpeg',
    alt: 'Retrato contemplativo representando mentalidade masculina',
    position: 'center',
  },
  autodominio: {
    src: '/assets/images/f6.jpeg',
    alt: 'Retrato sóbrio representando autodomínio emocional e governo interno',
    position: 'center top',
  },
};

export const productCovers: Record<string, VisualAsset> = {
  'codigo-da-paz-conjugal': {
    src: '/assets/images/f1.jpeg',
    alt: 'Capa de O Código da Paz Conjugal',
    position: 'center',
  },
  'programa-de-inteligencia-emocional-para-homens': {
    src: '/assets/images/f2.jpeg',
    alt: 'Capa do Programa de Inteligência Emocional para Homens',
    position: 'center',
  },
  'mapa-da-ansiedade-masculina': {
    src: '/assets/images/f3.jpeg',
    alt: 'Capa do Mapa da Ansiedade Masculina',
    position: 'center',
  },
  'engrenagem-fantasma': {
    src: '/assets/images/f4.jpeg',
    alt: 'Capa de A Engrenagem Fantasma',
    position: 'center',
  },
  'codigo-h': {
    src: '/assets/images/f5.jpeg',
    alt: 'Capa de O Código H',
    position: 'center',
  },
  'mini-curso-de-saude-mental': {
    src: '/assets/images/f6.jpeg',
    alt: 'Capa do Mini Curso de Saúde Mental',
    position: 'center',
  },
};

export const roomVisuals: Record<string, VisualAsset> = {
  '/atendimentos': {
    src: '/assets/images/f7.jpeg',
    alt: 'Consultório para atendimentos psicológicos especializados',
    position: 'center',
  },
  '/conteudos': {
    src: '/assets/images/f8.jpeg',
    alt: 'Biblioteca editorial para conteúdos sobre saúde emocional masculina',
    position: 'center',
  },
  '/produtos': {
    src: '/assets/images/f3.jpeg',
    alt: 'Galeria de produtos digitais sobre ansiedade, liderança e autodomínio',
    position: 'center',
  },
  '/formacao': {
    src: '/assets/images/f8.jpeg',
    alt: 'Escritório de credenciais e formação profissional do Dr. Matheus Morari',
    position: 'center top',
  },
  '/duvidas': {
    src: '/assets/images/f7.jpeg',
    alt: 'Ambiente sóbrio para perguntas frequentes sobre atendimento',
    position: 'center',
  },
  '/caminho-de-resolucao': {
    src: '/assets/images/f8.jpeg',
    alt: 'Caminho simbólico para resolução emocional e primeiro passo',
    position: 'center',
  },
};

