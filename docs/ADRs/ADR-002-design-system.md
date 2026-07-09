# ADR-002: Design System

**Status**: Aceito
**Data**: 2026-07-09
**Decisores**: Time de Design + Engenharia

---

## Contexto

O projeto exige visual premium, cinematográfico e masculino. O design system precisa garantir consistência visual enquanto permite expressividade editorial.

## Decisão

### Abordagem: Tailwind CSS com Custom Theme

Tokens de design definidos no `tailwind.config.ts`, não em CSS variables separadas. Isso garante que o design system esteja integrado ao workflow de desenvolvimento.

### Paleta de Cores

```typescript
colors: {
  background: '#0A0A0A',    // Preto profundo
  surface: '#1A1A1A',       // Grafite
  'surface-soft': '#2A2A2A', // Cinza escuro
  gold: '#C9A84C',          // Dourado queimado
  'gold-soft': '#A67C52',   // Bronze
  'blue-dark': '#1A2332',   // Azul noite
  ice: '#F5F0EB',           // Branco gelo
  muted: '#6B6B6B',         // Cinza texto
  'muted-light': '#999999', // Cinza claro
  'red-accent': '#8B2500',  // Vermelho escuro (uso pontual)
}
```

### Tipografia

```typescript
fontFamily: {
  display: ['Playfair Display', 'Georgia', 'serif'],
  body: ['Inter', 'system-ui', 'sans-serif'],
}
```

**Razão para Playfair Display**: Serifada com personalidade editorial forte. Transmite peso, seriedade e sofisticação. Funciona bem em tamanhos grandes (headlines).

**Razão para Inter**: Sans-serif moderna, altamente legível, com suporte amplo a pesos. Ideal para corpo de texto e UI.

### Escala Tipográfica

Definida no Tailwind com classes customizadas para manter consistência:

```typescript
fontSize: {
  'display-xl': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
  'display-lg': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
  'display-md': ['2.5rem', { lineHeight: '1.2' }],
  'display-sm': ['2rem', { lineHeight: '1.25' }],
  'heading-lg': ['1.5rem', { lineHeight: '1.3' }],
  'heading-md': ['1.25rem', { lineHeight: '1.4' }],
  'body-lg': ['1.125rem', { lineHeight: '1.7' }],
  'body-md': ['1rem', { lineHeight: '1.7' }],
  'body-sm': ['0.875rem', { lineHeight: '1.6' }],
  'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.1em' }],
}
```

### Componentes Base

**Botões**:
- Primário: `bg-gold text-background font-semibold`
- Secundário: `border-gold text-gold bg-transparent`
- Terciário: `text-gold underline`

**Cards**:
- `bg-surface border border-surface-soft rounded-xl`
- Hover: `hover:border-gold/25`

**Inputs**:
- `bg-surface border-surface-soft focus:border-gold`
- Error: `border-red-accent`

### Animações

Animações definidas como presets reutilizáveis no Framer Motion (não no CSS):

- `fadeInUp`: opacity + translateY
- `fadeIn`: opacity only
- `stagger`: Container + items com delay
- `goldenReveal`: Width expansion
- `slideIn`: translateX

### Spacing

Sistema de 4px base via Tailwind padrão. Seções usam `py-20` a `py-32` para respiro generoso.

## Consequências

### Positivas
- Tokens centralizados no Tailwind config
- Consistência automática via classes utilitárias
- Fácil de manter e escalar
- Performance (CSS mínimo em produção)

### Negativas
- Classes podem ficar longas (mitigado com @apply em componentes críticos)
- Customizações fora do Tailwind requerem CSS adicional
