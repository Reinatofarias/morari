// Site-wide constants
export const SITE_NAME = 'Dr. Matheus Morari';
export const SITE_DESCRIPTION = 'Psicólogo para homens que lideram';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://matheusmorari.com.br';

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5569984024809';
export const WHATSAPP_MESSAGE = 'Olá, vim pelo site e gostaria de saber mais sobre o atendimento.';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const INSTAGRAM_URL = 'https://instagram.com/dr.matheusmorari';
export const CRP = 'CRP XX/XXXXX';

// Navigation sublinks for dropdowns
export const ATENDIMENTOS_SUB_LINKS = [
  { label: 'Visão Geral', href: '/atendimentos' },
  { label: 'Psicologia para Homens', href: '/atendimentos/psicologia-para-homens' },
  { label: 'Psicologia Sistêmica', href: '/atendimentos/psicologia-sistemica' },
  { label: 'Hipnoterapia', href: '/atendimentos/hipnoterapia' },
] as const;

// Navigation links
export const NAV_LINKS = [
  { label: 'Atendimentos', href: '/atendimentos', hasDropdown: true },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Conteúdos', href: '/conteudos' },
  { label: 'Produtos', href: '/produtos' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Formação', href: '/formacao' },
  { label: 'Dúvidas', href: '/duvidas' },
] as const;

// Pain points for cards
export const PAIN_POINTS = [
  { icon: 'Brain', title: 'Ansiedade constante', description: 'Uma pressão que não para, mesmo quando tudo parece sob controle.' },
  { icon: 'Flame', title: 'Irritabilidade em casa', description: 'Explosões emocionais com quem mais importa, seguidas de culpa.' },
  { icon: 'Battery', title: 'Cansaço que não passa', description: 'Dormir não resolve. Férias não resolvem. O peso continua.' },
  { icon: 'Heart', title: 'Culpa com a família', description: 'Saber que deveria estar mais presente, mas não conseguir.' },
  { icon: 'PowerOff', title: 'Dificuldade de desligar', description: 'Trabalho invade a casa, a mente, o sono e os relacionamentos.' },
  { icon: 'Shield', title: 'Necessidade de controlar tudo', description: 'Se você não resolver, ninguém resolve. Mas isso está te destruindo.' },
] as const;

// Method steps
export const METHOD_STEPS = [
  { step: 1, title: 'Perceber', description: 'Enxergar o que está acontecendo de verdade, além da fachada que você construiu.', icon: 'Eye' },
  { step: 2, title: 'Governar', description: 'Recuperar o controle emocional sem sufocar o que sente.', icon: 'Crown' },
  { step: 3, title: 'Resolver', description: 'Trabalhar os padrões, bloqueios e feridas que alimentam o ciclo.', icon: 'Wrench' },
  { step: 4, title: 'Reconstruir', description: 'Construir uma liderança integral: empresa, família e sanidade.', icon: 'Building' },
] as const;

// House navigation rooms
export const HOUSE_ROOMS = [
  { icon: 'Stethoscope', title: 'Atendimentos', description: 'Psicologia, sistêmica e hipnoterapia.', href: '/atendimentos' },
  { icon: 'BookOpen', title: 'Conteúdos', description: 'Artigos sobre ansiedade, liderança e família.', href: '/conteudos' },
  { icon: 'Package', title: 'Produtos', description: 'Cursos e materiais para seu caminho.', href: '/produtos' },
  { icon: 'GraduationCap', title: 'Formação', description: 'Credenciais e experiência clínica.', href: '/formacao' },
  { icon: 'HelpCircle', title: 'Dúvidas', description: 'Perguntas que homens sérios fazem.', href: '/duvidas' },
  { icon: 'Route', title: 'Caminho de Resolução', description: 'Seu primeiro passo começa aqui.', href: '/caminho-de-resolucao' },
] as const;

// FAQ items
export const FAQ_ITEMS = [
  {
    question: 'Para quem é o atendimento?',
    answer: 'Para homens em posição de liderança — empresários, gestores, executivos, profissionais de alta responsabilidade — que vivem pressão emocional, ansiedade, esgotamento, conflitos familiares ou padrões que se repetem. O atendimento é individual e personalizado.'
  },
  {
    question: 'O atendimento é online?',
    answer: 'Sim. O atendimento é realizado online, por videochamada, com a mesma profundidade e sigilo do presencial. Isso permite flexibilidade para homens com agendas exigentes.'
  },
  {
    question: 'Como funciona a primeira conversa?',
    answer: 'O primeiro passo é preencher o formulário no Caminho de Resolução. A equipe entra em contato para entender sua situação e agendar a primeira sessão. Não há compromisso de continuidade — é uma conversa inicial para avaliar se faz sentido para ambos.'
  },
  {
    question: 'Psicologia sistêmica é para mim?',
    answer: 'Se você percebe padrões que se repetem na sua vida — nos relacionamentos, nas reações emocionais, na forma como lida com autoridade ou com a família — a abordagem sistêmica pode trazer clareza. Ela olha para o sistema familiar e os padrões que você carrega, muitas vezes sem perceber.'
  },
  {
    question: 'Hipnoterapia é segura?',
    answer: 'Sim. A hipnoterapia clínica é uma técnica reconhecida e regulamentada. Não tem nada a ver com shows de palco ou perda de controle. É um estado de atenção focada que permite acessar padrões emocionais mais profundos com segurança e ética.'
  },
  {
    question: 'Em quanto tempo vejo resultados?',
    answer: 'Cada pessoa tem seu processo. Alguns percebem mudanças nas primeiras sessões — na forma como reagem, no que percebem, no que conseguem nomear. O trabalho profundo exige tempo, mas o caminho começa na primeira conversa.'
  },
  {
    question: 'Isso substitui acompanhamento médico?',
    answer: 'Não. O atendimento psicológico é complementar ao acompanhamento médico ou psiquiátrico, quando necessário. Se houver necessidade de avaliação medicamentosa, o encaminhamento será feito com responsabilidade.'
  },
  {
    question: 'Como saber se estou ansioso ou esgotado?',
    answer: 'Se você vive com pensamentos acelerados, dificuldade de relaxar, irritabilidade desproporcional, cansaço que não melhora com descanso, dificuldade de estar presente ou sensação de que algo vai desmoronar — esses são sinais que merecem atenção profissional.'
  },
  {
    question: 'Qual o valor do atendimento?',
    answer: 'Os valores são informados após o contato inicial, pois dependem da modalidade e do formato de acompanhamento. Preencha o formulário do Caminho de Resolução para iniciar a conversa.'
  },
  {
    question: 'Como agendar?',
    answer: 'Preencha o formulário no Caminho de Resolução ou fale diretamente pelo WhatsApp. A equipe responde em até 24 horas úteis.'
  },
] as const;

// Services list
export const SERVICES = [
  {
    title: 'Psicologia para Homens',
    description: 'Atendimento psicológico especializado para homens que lideram. Trabalho com ansiedade, esgotamento, presença familiar e autodomínio emocional.',
    href: '/atendimentos/psicologia-para-homens',
    icon: 'User',
    tags: ['Ansiedade', 'Esgotamento', 'Autodomínio'],
  },
  {
    title: 'Psicologia Sistêmica',
    description: 'Entenda como padrões familiares afetam sua liderança, casamento e saúde emocional. Trabalho com herança emocional e ciclos repetitivos.',
    href: '/atendimentos/psicologia-sistemica',
    icon: 'Network',
    tags: ['Padrões Familiares', 'Relacionamentos', 'Herança Emocional'],
  },
  {
    title: 'Hipnoterapia',
    description: 'Hipnoterapia clínica aplicada com responsabilidade. Um recurso técnico para acessar padrões emocionais profundos que o racional insiste em esconder.',
    href: '/atendimentos/hipnoterapia',
    icon: 'Sparkles',
    tags: ['Padrões Profundos', 'Bloqueios', 'Acesso Emocional'],
  },
] as const;
