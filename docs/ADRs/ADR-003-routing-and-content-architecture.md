# ADR-003: Routing and Content Architecture

**Status**: Aceito
**Data**: 2026-07-09
**Decisores**: Time de Engenharia + Produto

---

## Contexto

O ecossistema tem 20+ rotas com diferentes níveis de dinamismo: páginas estáticas, conteúdos dinâmicos (artigos, produtos) e estruturas para futuras LPs/VSLs.

## Decisão

### Estratégia de Renderização

| Tipo de Página | Renderização | Fonte de Dados |
|---------------|-------------|----------------|
| Home, Bio, Sobre, Formação | SSG (Static) | Hardcoded |
| Atendimentos (3 subpáginas) | SSG | Hardcoded |
| Serviços, Dúvidas, Contato | SSG | Hardcoded (FAQs do Supabase com ISR) |
| Caminho de Resolução | SSG | Hardcoded + Server Action (form) |
| Conteúdos Hub | ISR (60s) | Supabase |
| Conteúdos/[slug] | ISR (60s) | Supabase |
| Produtos Hub | ISR (60s) | Supabase |
| Produtos/[slug] | ISR (60s) | Supabase |
| LP/[slug] | ISR (60s) | Supabase ou estático |
| VSL/[slug] | ISR (60s) | Supabase ou estático |
| Obrigado | SSG | Hardcoded |

### Conteúdo Dinâmico via Supabase

**Artigos**: Armazenados na tabela `articles` com conteúdo em Markdown. Renderizados no frontend com `react-markdown` ou similar.

**Produtos**: Armazenados na tabela `products`. Páginas dinâmicas por slug.

**FAQs**: Armazenados na tabela `faqs`. Ordenados por `sort_order`.

### Layouts

```
app/
├── layout.tsx           → Layout raiz (metadata, fontes, analytics)
├── (main)/              → Layout com Header + Footer completo
│   ├── layout.tsx
│   ├── page.tsx         → Home
│   ├── bio/
│   ├── atendimentos/
│   ├── produtos/
│   ├── conteudos/
│   ├── sobre/
│   ├── formacao/
│   ├── servicos/
│   ├── duvidas/
│   ├── contato/
│   ├── caminho-de-resolucao/
│   └── obrigado/
├── (landing)/           → Layout minimal (sem Header/Footer completo)
│   ├── layout.tsx
│   ├── lp/[slug]/
│   └── vsl/[slug]/
└── api/
    └── leads/route.ts
```

**Route Groups** `(main)` e `(landing)` permitem layouts diferentes sem afetar a URL.

### API Routes

```
/api/leads    → POST: Salvar lead no Supabase
```

Server Actions são preferidos para formulários, mas API route é mantida como fallback e para integrações futuras (webhooks).

### Metadata

Cada `page.tsx` exporta `generateMetadata()` com title, description, OG, canonical.

## Consequências

### Positivas
- Páginas estáticas carregam instantaneamente
- ISR permite atualizar conteúdo sem redeploy
- Route groups permitem layouts flexíveis
- SEO otimizado com metadata por rota

### Negativas
- ISR tem delay de revalidação (60s é aceitável)
- Conteúdo dinâmico depende de Supabase estar disponível
