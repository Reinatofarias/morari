export type VisualAsset = {
  src: string;
  alt: string;
  position?: string;
};

export const portraitAssets = {
  heroConcept: {
    src: '/assets/images/hero-editorial.jpeg',
    alt: 'Retrato conceitual de um homem em perfil, representando pressao interna e crise silenciosa',
    position: 'center',
  },
  heroCutout: {
    src: '/assets/images/hero-cutout.png',
    alt: 'Retrato conceitual de um homem em perfil sobre fundo escuro',
    position: 'center bottom',
  },
  library: {
    src: '/assets/images/matheus-library.jpeg',
    alt: 'Dr. Matheus Morari sentado em ambiente de biblioteca com atmosfera editorial',
    position: 'center',
  },
  profileSide: {
    src: '/assets/images/matheus-side.jpeg',
    alt: 'Dr. Matheus Morari em retrato lateral, sentado em poltrona de couro',
    position: 'center',
  },
  profileDesk: {
    src: '/assets/images/matheus-desk.jpeg',
    alt: 'Dr. Matheus Morari em retrato profissional com fundo escuro',
    position: 'center top',
  },
} satisfies Record<string, VisualAsset>;

export const articleCovers: Record<string, VisualAsset> = {
  ansiedade: {
    src: portraitAssets.heroConcept.src,
    alt: 'Composicao editorial sobre ansiedade silenciosa em homens que lideram',
    position: 'center',
  },
  esgotamento: {
    src: portraitAssets.profileSide.src,
    alt: 'Retrato sobrio representando esgotamento e pressao acumulada',
    position: 'center',
  },
  lideranca: {
    src: portraitAssets.library.src,
    alt: 'Ambiente de biblioteca representando lideranca, responsabilidade e decisao',
    position: 'center',
  },
  padroes: {
    src: portraitAssets.profileDesk.src,
    alt: 'Retrato profissional representando padroes familiares e autopercepcao',
    position: 'center top',
  },
  mentalidade: {
    src: portraitAssets.profileSide.src,
    alt: 'Retrato contemplativo representando resistencia masculina ao acompanhamento psicologico',
    position: 'center',
  },
  autodominio: {
    src: portraitAssets.profileDesk.src,
    alt: 'Retrato sobrio representando autodominio emocional e governo interno',
    position: 'center top',
  },
};

export const productCovers: Record<string, VisualAsset> = {
  ansiedade: {
    src: portraitAssets.heroConcept.src,
    alt: 'Capa editorial do curso sobre ansiedade em homens que lideram',
    position: 'center',
  },
  esgotamento: {
    src: portraitAssets.profileSide.src,
    alt: 'Capa editorial do guia sobre sinais de esgotamento',
    position: 'center',
  },
  lideranca: {
    src: portraitAssets.library.src,
    alt: 'Capa editorial do programa Lideranca Integral',
    position: 'center',
  },
};

export const roomVisuals: Record<string, VisualAsset> = {
  '/atendimentos': {
    src: portraitAssets.profileSide.src,
    alt: 'Consultorio simbolico para atendimentos psicologicos',
    position: 'center',
  },
  '/conteudos': {
    src: portraitAssets.library.src,
    alt: 'Biblioteca editorial para conteudos sobre saude emocional masculina',
    position: 'center',
  },
  '/produtos': {
    src: portraitAssets.heroConcept.src,
    alt: 'Galeria de produtos digitais sobre ansiedade, lideranca e autodominio',
    position: 'center',
  },
  '/formacao': {
    src: portraitAssets.profileDesk.src,
    alt: 'Escritorio de credenciais e formacao profissional',
    position: 'center top',
  },
  '/duvidas': {
    src: portraitAssets.profileSide.src,
    alt: 'Ambiente sobrio para perguntas frequentes sobre atendimento',
    position: 'center',
  },
  '/caminho-de-resolucao': {
    src: portraitAssets.heroConcept.src,
    alt: 'Caminho simbolico para resolucao emocional e primeiro passo',
    position: 'center',
  },
};
