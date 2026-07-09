# ADR-005: SEO and Performance

**Status**: Aceito
**Data**: 2026-07-09
**Decisores**: Time de SEO + Engenharia

---

## Contexto

O projeto precisa rankear organicamente para keywords de saúde mental masculina enquanto mantém performance premium (< 2.5s LCP).

## Decisão

### SEO On-Page

1. **Metadata por rota**: Cada `page.tsx` exporta `generateMetadata()` com title, description, OG tags e canonical URL.

2. **Schema.org**: JSON-LD injetado via `<script type="application/ld+json">` no layout e em páginas específicas:
   - Global: `ProfessionalService`, `WebSite`
   - `/sobre`: `Person`
   - `/duvidas`: `FAQPage`
   - `/conteudos/[slug]`: `Article`
   - Todas internas: `BreadcrumbList`

3. **Heading hierarchy**: Estritamente H1 → H2 → H3 em cada página. Um único H1.

4. **Internal linking**: Mínimo 2 links internos por página (um para conversão, um contextual).

### Performance

1. **Fontes**: `next/font/google` com `display: 'swap'` e `subsets: ['latin']`. Preload das fontes críticas.

2. **Imagens**: `next/image` com `priority` no hero, `loading="lazy"` nas demais. Formatos WebP/AVIF automáticos.

3. **JavaScript**: Server Components por padrão. `'use client'` apenas quando necessário (animações, formulários, menu mobile).

4. **CSS**: Tailwind com purge automático. CSS mínimo em produção.

5. **Prefetch**: Links com `<Link>` do Next.js para prefetch automático em viewport.

### Sitemap e Robots

```typescript
// app/sitemap.ts
export default async function sitemap() {
  const staticRoutes = ['/', '/bio', '/sobre', ...];
  const articles = await getArticles();
  const products = await getProducts();
  // Gerar entries para todas as páginas
}
```

```
// public/robots.txt
User-agent: *
Allow: /
Disallow: /obrigado
Disallow: /api/
Sitemap: https://site.com/sitemap.xml
```

### Core Web Vitals — Metas

| Métrica | Meta | Estratégia |
|---------|------|-----------|
| LCP | < 2.5s | Hero image optimized, font preload |
| FID/INP | < 100ms | Server Components, minimal JS |
| CLS | < 0.1 | Fixed dimensions, font display swap |
| TTFB | < 600ms | Edge runtime (Vercel), static pages |

## Consequências

### Positivas
- SEO robusto com metadata e schema por rota
- Performance otimizada nativamente pelo Next.js
- Sitemap automático com conteúdo dinâmico

### Negativas
- Schema.org requer manutenção ao adicionar novos tipos de página
- Fontes Google podem ter impacto se não pré-carregadas corretamente
