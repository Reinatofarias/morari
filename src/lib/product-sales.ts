import type { ProductSlug } from './products';

// Páginas de venda dos produtos digitais (/lp/[slug]).
//
// COMO LIGAR À HOTMART: preencha `checkoutUrl` com o link do checkout de cada produto
// (ex.: 'https://pay.hotmart.com/XXXXXX'). Enquanto estiver vazio, o botão de compra
// leva ao WhatsApp do Matheus com uma mensagem dizendo qual produto a pessoa quer,
// para nenhum interessado se perder.
// `price` é opcional: ex. '12x de R$ 9,70' ou 'R$ 97'. Vazio = o preço não aparece.

export type SalesPage = {
  checkoutUrl: string;
  price: string;
  accent: string;
  format: string;
  headline: string;
  subheadline: string;
  pains: string[];
  topics: { title: string; text: string }[];
  forWhom: string[];
  notFor: string[];
  closing: string;
};

export const SALES_PAGES: Record<ProductSlug, SalesPage> = {
  'codigo-da-paz-conjugal': {
    checkoutUrl: '',
    price: '',
    accent: '#9A3445',
    format: 'Produto digital · Casamento',
    headline: 'Sua casa não precisa ser o lugar onde você mais se cansa.',
    subheadline:
      'O Código da Paz Conjugal é para o homem que ama a esposa, mas percebe que as conversas viraram disputa, o silêncio virou rotina e a presença ficou no trabalho.',
    pains: [
      'Qualquer conversa sobre a relação termina em briga ou em silêncio.',
      'Você chega em casa e sente que já entra devendo.',
      'Você explode, depois se arrepende, e o ciclo recomeça na semana seguinte.',
      'Vocês dividem a casa, mas não dividem mais a vida.',
    ],
    topics: [
      { title: 'Os ciclos que desgastam o casamento', text: 'Como identificar o padrão que se repete em toda discussão, antes que ele comece.' },
      { title: 'Conversar sem entrar em guerra', text: 'Como falar do que incomoda sem atacar e sem se fechar.' },
      { title: 'Responsabilidade sem se anular', text: 'Assumir a sua parte sem virar refém da culpa nem abrir mão de quem você é.' },
      { title: 'Presença de verdade', text: 'Como estar em casa por inteiro, mesmo quando a cabeça ainda está no trabalho.' },
    ],
    forWhom: [
      'Homens casados que querem reconstruir a relação, e não só sobreviver a ela.',
      'Quem percebe que parte do problema está nas próprias reações.',
      'Quem quer agir antes que a distância vire separação.',
    ],
    notFor: [
      'Quem procura uma fórmula para "ganhar" as discussões.',
      'Situações de violência, que pedem ajuda profissional imediata.',
      'Quem quer que só o outro mude.',
    ],
    closing: 'A paz em casa não volta sozinha. Ela é construída, e começa por você.',
  },
  'programa-de-inteligencia-emocional-para-homens': {
    checkoutUrl: '',
    price: '',
    accent: '#C9A84C',
    format: 'Programa digital · Liderança',
    headline: 'Liderar os outros começa por governar a si mesmo.',
    subheadline:
      'Um programa para o homem que decide, cobra e sustenta muita coisa, e que percebeu que a pressão está decidindo o tom das suas reações.',
    pains: [
      'Sob pressão, você endurece ou explode, e depois paga o preço.',
      'Sua equipe e sua família pisam em ovos perto de você.',
      'Você confunde firmeza com dureza, e controle com segurança.',
      'Por fora tudo funciona. Por dentro, o desgaste só aumenta.',
    ],
    topics: [
      { title: 'Mapa das suas reações', text: 'Entender o que dispara as suas respostas automáticas no dia a dia.' },
      { title: 'Firmeza sem explosão', text: 'Separar autoridade de agressividade, na empresa e em casa.' },
      { title: 'Governo interno sob pressão', text: 'Ferramentas práticas para decidir com clareza quando tudo aperta.' },
      { title: 'Liderança integral', text: 'Integrar trabalho, casa e sanidade sem sacrificar um pelo outro.' },
    ],
    forWhom: [
      'Empresários, gestores e profissionais liberais que lideram pessoas.',
      'Homens que querem autocontrole aplicável à rotina real.',
      'Quem quer ser respeitado, e não temido.',
    ],
    notFor: [
      'Quem procura motivação rápida ou frases de efeito.',
      'Quem não está disposto a olhar para as próprias reações.',
      'Quadros que exigem tratamento clínico individual.',
    ],
    closing: 'Pressão sempre vai existir. O que muda é quem está no comando quando ela chega.',
  },
  'mapa-da-ansiedade-masculina': {
    checkoutUrl: '',
    price: '',
    accent: '#C8553A',
    format: 'Material digital · Ansiedade',
    headline: 'Você não se acha ansioso. Só não consegue desligar.',
    subheadline:
      'A ansiedade no homem raramente parece medo. Ela aparece como irritação, controle, aceleração e cansaço. O Mapa da Ansiedade Masculina mostra onde ela está escondida na sua rotina.',
    pains: [
      'A cabeça continua trabalhando quando você deita para dormir.',
      'Pequenas coisas te tiram do sério, e depois vem a culpa.',
      'Você sente que precisa controlar tudo para nada desmoronar.',
      'Férias, fim de semana, descanso: nada parece suficiente.',
    ],
    topics: [
      { title: 'Os sinais que você ignora', text: 'Como a ansiedade aparece no corpo, no humor e nas decisões de um homem.' },
      { title: 'O ciclo pressão → controle → exaustão', text: 'Entender por que fazer mais não está resolvendo.' },
      { title: 'O impacto em casa e no trabalho', text: 'Onde a ansiedade está cobrando a conta sem você perceber.' },
      { title: 'O primeiro passo', text: 'Como organizar uma resposta prática, e saber quando buscar ajuda.' },
    ],
    forWhom: [
      'Homens que vivem acelerados e chamam isso de "rotina".',
      'Quem quer entender o que está acontecendo antes de piorar.',
      'Quem prefere clareza a promessas.',
    ],
    notFor: [
      'Quem está em crise. Nesse caso, ligue 188 (CVV) ou procure um pronto-socorro.',
      'Quem espera que um material substitua um tratamento.',
      'Quem procura um diagnóstico pela internet.',
    ],
    closing: 'Você não precisa esperar o corpo parar para começar a entender o que ele está avisando.',
  },
  'engrenagem-fantasma': {
    checkoutUrl: '',
    price: '',
    accent: '#B5834F',
    format: 'Material digital · Padrões emocionais',
    headline: 'Você promete que vai ser diferente. E repete tudo de novo.',
    subheadline:
      'Existe um mecanismo invisível que mantém os mesmos padrões rodando, nas relações, nas decisões e nas reações. A Engrenagem Fantasma te ajuda a enxergá-lo.',
    pains: [
      'Você sabe o que deveria fazer, mas na hora faz o contrário.',
      'Os mesmos conflitos voltam, só mudam as pessoas.',
      'Força de vontade funciona por uma semana, e depois some.',
      'Parece que existe alguém no controle que não é você.',
    ],
    topics: [
      { title: 'O mecanismo automático', text: 'Como os padrões se instalam e por que eles se defendem quando você tenta mudar.' },
      { title: 'Onde a engrenagem gira', text: 'Identificar os pontos da sua vida em que o ciclo mais se repete.' },
      { title: 'O custo do piloto automático', text: 'O preço emocional, familiar e profissional de seguir no mesmo ciclo.' },
      { title: 'Como começar a interromper', text: 'Os primeiros movimentos para quebrar a repetição sem força bruta.' },
    ],
    forWhom: [
      'Homens cansados de repetir as mesmas escolhas.',
      'Quem quer entender a origem antes de tentar mudar de novo.',
      'Quem gosta de profundidade, não de dica rápida.',
    ],
    notFor: [
      'Quem procura uma mudança instantânea.',
      'Quem não quer se olhar com honestidade.',
      'Quadros que pedem acompanhamento clínico individual.',
    ],
    closing: 'Não é falta de força de vontade. É uma engrenagem. E o que é visto pode ser desmontado.',
  },
  'codigo-h': {
    checkoutUrl: '',
    price: '',
    accent: '#B8303A',
    format: 'Produto digital · Identidade masculina',
    headline: 'Força de verdade não é a que aparece. É a que sustenta.',
    subheadline:
      'O Código H é o ponto de partida para o homem que quer reconstruir identidade, responsabilidade e direção, sem cair em discurso de força de fachada nem em autoajuda rasa.',
    pains: [
      'Você sustenta uma imagem, mas perdeu a direção por dentro.',
      'Você é firme com todo mundo e duro demais consigo mesmo.',
      'Ser homem virou só cumprir obrigação.',
      'Você não sabe mais o que te move, além da responsabilidade.',
    ],
    topics: [
      { title: 'Identidade masculina', text: 'Reorganizar os princípios que definem o homem que você quer ser.' },
      { title: 'Responsabilidade e propósito', text: 'Responsabilidade como direção, e não como peso.' },
      { title: 'Saúde emocional masculina', text: 'A diferença entre força, fachada e governo interno.' },
      { title: 'Disciplina e evolução', text: 'Como transformar princípio em prática no dia a dia.' },
    ],
    forWhom: [
      'Homens que querem uma visão madura de masculinidade.',
      'Quem quer ser firme sem viver blindado.',
      'Quem está começando a cuidar de si e quer um norte.',
    ],
    notFor: [
      'Quem procura discurso de superioridade ou "alfa".',
      'Quem quer só se sentir motivado por um dia.',
      'Quadros que pedem acompanhamento clínico individual.',
    ],
    closing: 'O homem que sustenta a casa também precisa de algo que o sustente.',
  },
  'mini-curso-de-saude-mental': {
    checkoutUrl: '',
    price: '',
    accent: '#5B8DB8',
    format: 'Mini curso online · Saúde mental',
    headline: 'Cuidar da cabeça também é coisa de homem.',
    subheadline:
      'Um mini curso introdutório, sério e direto, para reconhecer sinais de alerta, entender limites e começar a cuidar da saúde mental sem promessas mágicas.',
    pains: [
      'Você sabe que algo não está bem, mas não consegue dar nome.',
      'Você acha que "aguentar" é a única opção.',
      'Você não sabe quando o cansaço virou sinal de alerta.',
      'Procurar ajuda parece exagero, ou fraqueza.',
    ],
    topics: [
      { title: 'Sinais de alerta', text: 'O que observar em você mesmo antes que vire um problema maior.' },
      { title: 'Quando buscar ajuda', text: 'Critérios claros para saber se é hora de procurar um profissional.' },
      { title: 'Sem atalhos', text: 'Por que fórmulas rápidas não funcionam, e o que funciona.' },
      { title: 'Um primeiro cuidado', text: 'Passos simples para começar a se cuidar com responsabilidade.' },
    ],
    forWhom: [
      'Homens que querem começar a cuidar da saúde mental.',
      'Quem quer entender o assunto sem linguagem infantilizada.',
      'Pais, líderes e maridos que querem estar bem para quem depende deles.',
    ],
    notFor: [
      'Quem está em crise. Nesse caso, ligue 188 (CVV) ou procure um pronto-socorro.',
      'Quem espera que um curso substitua um tratamento.',
      'Quem procura diagnóstico.',
    ],
    closing: 'Começar a cuidar não é sinal de fraqueza. É o que permite continuar de pé.',
  },
};
