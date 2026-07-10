# Spec-Driven Components — Dr. Matheus Morari

**Versão**: 1.0
**Data**: 2026-07-09

---

## Convenções

Cada componente é documentado com:
- **Propósito**: O que faz e por quê
- **Props**: Interface TypeScript
- **Variantes**: Se aplicável
- **Comportamento**: Interações e animações
- **Onde é usado**: Páginas que o utilizam

---

## 1. Layout Components

### 1.1 Header

**Propósito**: Navegação principal do site. Persistente em todas as páginas (exceto LP e VSL).

```typescript
interface HeaderProps {
  transparent?: boolean; // Se true, fundo transparente sobre hero
}
```

**Comportamento**:
- Desktop: Logo à esquerda, links ao centro, CTA à direita
- Mobile: Logo à esquerda, hamburger à direita
- Scroll: Background transiciona de transparente para `surface` com blur
- CTA: Botão dourado "Caminho de Resolução"
- Animação: Fade in on mount

**Onde**: Todas as páginas (exceto `/lp/[slug]` e `/vsl/[slug]`)

---

### 1.2 Footer

**Propósito**: Informações institucionais, links secundários, aviso legal.

```typescript
interface FooterProps {
  minimal?: boolean; // Versão reduzida para LP/VSL
}
```

**Estrutura (4 colunas)**:
1. Logo + frase-mãe + redes sociais
2. Atendimentos (links)
3. Institucional (Sobre, Formação, Dúvidas, Contato)
4. Legal (Privacidade, CRP, disclaimer)

**Onde**: Todas as páginas

---

### 1.3 MobileMenu

**Propósito**: Menu overlay para mobile.

```typescript
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
```

**Comportamento**:
- Overlay full-screen com background `#0A0A0A` opacity 98%
- Items entram com stagger animation (delay incremental)
- CTA fixo no bottom
- Close no X ou swipe
- Body scroll lock quando aberto

**Animação**: Framer Motion — slide from right + stagger items

---

### 1.4 Breadcrumb

**Propósito**: Navegação hierárquica em páginas internas.

```typescript
interface BreadcrumbProps {
  items: {
    label: string;
    href?: string; // Se undefined, é o item atual (não clicável)
  }[];
}
```

**Visual**: Texto small, cor muted, separador `/`, item atual em branco gelo

**Onde**: Todas as páginas internas (exceto Home, Bio)

---

## 2. Section Components

### 2.1 HeroSection

**Propósito**: Seção principal de impacto. Primeiro bloco visível da página.

```typescript
interface HeroSectionProps {
  headline: string;
  highlightWord?: string; // Palavra em dourado dentro da headline
  subheadline: string;
  primaryCTA?: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
  backgroundImage?: string;
  variant?: 'home' | 'page' | 'minimal';
  overlay?: boolean; // Overlay escuro sobre imagem
}
```

**Variantes**:
- `home`: Full height (100vh), imagem de fundo, 2 CTAs
- `page`: Altura parcial (60vh), fundo escuro, 1 CTA
- `minimal`: Compact, apenas texto

**Animação**: 
- Headline: Fade in + subida (delay 0.2s)
- Subheadline: Fade in + subida (delay 0.4s)
- CTAs: Fade in (delay 0.6s)
- Divider dourado: Width expand (delay 0.8s)

**Onde**: `/`, `/caminho-de-resolucao`, `/atendimentos/*`, `/sobre`

---

### 2.2 SectionHeader

**Propósito**: Cabeçalho reutilizável para seções internas da página.

```typescript
interface SectionHeaderProps {
  label?: string;       // Texto small uppercase (ex: "DIAGNÓSTICO")
  title: string;
  highlightWord?: string;
  description?: string;
  alignment?: 'left' | 'center';
}
```

**Visual**:
- Label em dourado, uppercase, letter-spacing
- Title em Playfair Display, branco gelo
- highlightWord renderizado em dourado
- Description em cinza claro
- Divider dourado abaixo (GoldenDivider)

**Onde**: Todas as páginas (múltiplas instâncias)

---

### 2.3 CTASection

**Propósito**: Bloco de conversão com headline forte e botão.

```typescript
interface CTASectionProps {
  headline: string;
  description?: string;
  primaryCTA: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
  variant?: 'default' | 'dark' | 'gold';
}
```

**Variantes**:
- `default`: Fundo surface, texto claro
- `dark`: Fundo azul noite, mais dramático
- `gold`: Borda dourada, destaque especial

**Onde**: Final de todas as páginas

---

### 2.4 HouseNavigation

**Propósito**: Seção da Home que mostra os "cômodos" do ecossistema digital.

```typescript
interface HouseNavigationProps {
  rooms: {
    icon: string;      // Lucide icon name
    title: string;
    description: string;
    href: string;
  }[];
}
```

**Visual**: Grid de cards com ícone, título e descrição. Hover com brilho dourado.

**Onde**: `/` (Home)

---

## 3. Card Components

### 3.1 PainCard

**Propósito**: Representar uma dor/sinal de alerta do público-alvo.

```typescript
interface PainCardProps {
  icon: string;        // Lucide icon name
  title: string;       // Ex: "Ansiedade constante"
  description?: string;
}
```

**Visual**: Card escuro, ícone dourado, título em branco, borda sutil
**Hover**: Borda transiciona para dourado alpha
**Animação**: Fade in + subida no scroll

**Onde**: `/`, `/caminho-de-resolucao`

---

### 3.2 PathCard

**Propósito**: Representar uma etapa do método/caminho (Perceber, Governar, Resolver, Reconstruir).

```typescript
interface PathCardProps {
  step: number;        // 1-4
  title: string;       // Ex: "Perceber"
  description: string;
  icon: string;
}
```

**Visual**: Card com número dourado grande, título em branco, descrição em cinza
**Layout**: Grid 2×2 desktop, stack mobile

**Onde**: `/`

---

### 3.3 ServiceCard

**Propósito**: Card de serviço/atendimento.

```typescript
interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon?: string;
  tags?: string[];     // Ex: ["Ansiedade", "Esgotamento"]
}
```

**Visual**: Card médio, título em branco, descrição em cinza, tags em dourado small
**Hover**: Translate up + borda dourada
**Animação**: Stagger no scroll

**Onde**: `/atendimentos`, `/servicos`

---

### 3.4 ProductCard

**Propósito**: Card de produto/curso.

```typescript
interface ProductCardProps {
  title: string;
  description: string;
  type: 'curso' | 'material' | 'formacao';
  status: 'active' | 'coming_soon' | 'draft';
  price?: string;
  href: string;
  coverImage?: string;
}
```

**Visual**: Card com imagem de capa, título, tipo, preço, CTA
**Status**: "coming_soon" mostra badge "Em breve" em dourado

**Onde**: `/produtos`

---

### 3.5 ArticleCard

**Propósito**: Card de artigo/conteúdo.

```typescript
interface ArticleCardProps {
  title: string;
  description: string;
  category: string;
  slug: string;
  coverImage?: string;
  publishedAt?: string;
}
```

**Visual**: Card com imagem, categoria em dourado (small uppercase), título, excerpt
**Hover**: Scale sutil na imagem

**Onde**: `/conteudos`, `/` (últimos artigos)

---

### 3.6 TestimonialCard

**Propósito**: Depoimento de cliente/paciente (futuro).

```typescript
interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;       // Ex: "Empresário, 42 anos"
  anonymous?: boolean; // Se true, mostra iniciais
}
```

**Visual**: Card com aspas grandes douradas, texto em itálico, autor em small

**Onde**: Futuro — `/`, `/atendimentos`

---

## 4. UI Components

### 4.1 ConversionButton

**Propósito**: Botão principal de conversão com tracking de evento.

```typescript
interface ConversionButtonProps {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  eventName?: string;  // Nome do evento de conversão
  fullWidth?: boolean;
}
```

**Variantes**:
- `primary`: Background dourado, texto preto, bold
- `secondary`: Border dourado, background transparente, texto dourado
- `tertiary`: Texto com underline dourado

**Hover**: Luminosidade +10% no primário, fill dourado no secundário

---

### 4.2 DarkContainer

**Propósito**: Container escuro para seções que precisam de destaque visual.

```typescript
interface DarkContainerProps {
  children: React.ReactNode;
  variant?: 'surface' | 'blue' | 'gradient';
  padding?: 'sm' | 'md' | 'lg';
}
```

---

### 4.3 GoldenDivider

**Propósito**: Linha divisória elegante com gradiente dourado.

```typescript
interface GoldenDividerProps {
  width?: string;      // CSS width (default: "120px")
  alignment?: 'left' | 'center' | 'right';
  animated?: boolean;  // Se true, anima width no scroll
}
```

**Visual**: Linha 2px com gradiente de transparente → dourado → transparente

---

### 4.4 EditorialQuote

**Propósito**: Citação editorial com impacto visual.

```typescript
interface EditorialQuoteProps {
  quote: string;
  author?: string;
  variant?: 'large' | 'inline';
}
```

**Visual**: 
- `large`: Texto grande em Playfair Display, aspas douradas decorativas, fundo azul noite
- `inline`: Texto com borda esquerda dourada

---

### 4.5 FAQAccordion

**Propósito**: Acordeão para perguntas frequentes.

```typescript
interface FAQAccordionProps {
  items: {
    question: string;
    answer: string;
  }[];
}
```

**Comportamento**: Um item aberto por vez. Toggle com animação suave.
**Visual**: Fundo surface, borda sutil, ícone + dourado no aberto
**Animação**: Height animate com Framer Motion

**Onde**: `/duvidas`, `/produtos/[slug]`

---

### 4.6 FloatingWhatsAppButton

**Propósito**: Botão flutuante de WhatsApp no canto inferior direito.

```typescript
interface FloatingWhatsAppButtonProps {
  phoneNumber: string;
  message?: string;    // Mensagem pré-preenchida
}
```

**Visual**: Ícone WhatsApp em circle, cor verde WhatsApp, sombra
**Comportamento**: Fixo no bottom-right, aparece após scroll de 300px
**Animação**: Pulse sutil a cada 5 segundos

**Onde**: Todas as páginas

---

## 5. Form Components

### 5.1 LeadForm

**Propósito**: Formulário de captura de leads do Caminho de Resolução.

```typescript
interface LeadFormProps {
  onSuccess?: () => void;
  redirectTo?: string;  // Default: '/obrigado'
  origem?: string;      // Para tracking no Supabase
}
```

**Campos**:
| Campo | Name | Type | Validation |
|-------|------|------|-----------|
| Nome | `nome` | text | Required, min 2 chars |
| WhatsApp | `whatsapp` | tel | Required, padrão brasileiro |
| E-mail | `email` | email | Required, valid email |
| Dor principal | `dor_principal` | textarea | Optional, max 500 chars |
| Identificação | `identificacao` | select | Optional |
| Melhor horário | `melhor_horario` | select | Optional |

**Opções Identificação**: Ansiedade, Esgotamento, Família, Liderança, Padrões Repetitivos, Outro

**Opções Horário**: Manhã (8h-12h), Tarde (13h-17h), Noite (18h-21h)

**Implementação**: React Hook Form + Zod validation
**Submit**: POST para `/api/leads` → Supabase → redirect `/obrigado`

**Visual**: Fundo surface, inputs escuros, border sutil, focus com border dourado
**Estados**: Default, Focus (border dourado), Error (border vermelho escuro + msg), Submitting (loading), Success (redirect)

**Onde**: `/caminho-de-resolucao`

---

## 6. Animações (Framer Motion)

### 6.1 Presets

```typescript
// Fade in + subida
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

// Fade in simples
export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

// Stagger container
export const staggerContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.1 }
  }
};

// Stagger item
export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

// Golden line reveal
export const goldenReveal = {
  initial: { width: 0 },
  whileInView: { width: "100%" },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeInOut", delay: 0.3 }
};
```

### 6.2 Regras de Animação
- Máximo 2 animações simultâneas por viewport
- Sempre `viewport: { once: true }` (não re-animar)
- Duration entre 0.4s e 0.8s
- Sem animações em mobile que afetem performance
- Stagger delay: 0.1s entre items
