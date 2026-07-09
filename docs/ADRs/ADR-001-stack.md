# ADR-001: Stack Tecnológica

**Status**: Aceito
**Data**: 2026-07-09
**Decisores**: Time de Engenharia

---

## Contexto

O projeto é a casa digital do Dr. Matheus Morari — um ecossistema premium de saúde mental masculina. Precisa de performance, SEO, conversão e visual cinematográfico.

## Decisão

### Framework: Next.js 15 (App Router)

**Razão**: SSR/SSG nativo para SEO, App Router com Server Components para performance, sistema de metadata integrado, deploy nativo na Vercel, ecossistema React maduro.

**Alternativas consideradas**:
- Astro: Mais leve, mas menos ecosistema para formulários e interatividade
- Remix: Bom SSR, mas menos adoção e tooling que Next.js
- Gatsby: Obsoleto para novos projetos

### Linguagem: TypeScript

**Razão**: Type safety para componentes, props e dados do Supabase. Reduz bugs e melhora DX.

### Estilização: Tailwind CSS

**Razão**: Velocidade de desenvolvimento, consistência via design tokens, eliminação de CSS morto, boa integração com shadcn/ui.

### UI: shadcn/ui (seletivo)

**Razão**: Componentes acessíveis e customizáveis (Accordion, Dialog). Não usar como sistema inteiro — apenas componentes que façam sentido.

### Animações: Framer Motion

**Razão**: API declarativa, animações de scroll, variantes, performance otimizada para React.

### Formulários: React Hook Form + Zod

**Razão**: Performance (uncontrolled), validação type-safe com Zod, integração com Server Actions.

### Database: Supabase (PostgreSQL)

**Razão**: PostgreSQL gerenciado, auth se necessário no futuro, real-time, API REST automática, dashboard para gestão de dados, tier gratuito generoso.

### Deploy: Vercel

**Razão**: Deploy nativo de Next.js, edge functions, preview deployments, analytics, bom CDN global.

### Analytics: GA4 + Meta Pixel

**Razão**: GA4 para análise de comportamento, Meta Pixel para remarketing e otimização de campanhas.

## Consequências

### Positivas
- Stack moderna com ecossistema maduro
- Performance e SEO nativos
- Type safety end-to-end
- Deploy simplificado

### Negativas
- Lock-in parcial com Vercel (mitigável com Docker)
- Supabase tem limites no tier gratuito (suficiente para MVP)
- Tailwind pode gerar classes longas em componentes complexos

## Dependências

```json
{
  "next": "^15",
  "react": "^19",
  "typescript": "^5",
  "tailwindcss": "^4",
  "framer-motion": "^12",
  "react-hook-form": "^7",
  "zod": "^3",
  "@hookform/resolvers": "^3",
  "@supabase/supabase-js": "^2",
  "@supabase/ssr": "^0",
  "lucide-react": "^0"
}
```
