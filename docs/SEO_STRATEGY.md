# SEO Strategy — Dr. Matheus Morari

**Versão**: 1.0
**Data**: 2026-07-09

---

## 1. Objetivos SEO

### 1.1 Objetivos Primários
- Rankear no top 10 para "psicólogo para homens" em 6 meses
- Gerar 2.000+ visitas orgânicas/mês em 6 meses
- Construir autoridade tópica em saúde mental masculina
- Converter tráfego orgânico em leads qualificados

### 1.2 Métricas
| Métrica | Meta 3 meses | Meta 6 meses |
|---------|-------------|-------------|
| Tráfego orgânico/mês | 500 | 2.000 |
| Keywords no top 10 | 5 | 15 |
| Keywords no top 3 | 1 | 5 |
| Domain Authority | 10 | 20 |
| Páginas indexadas | 15 | 30+ |

---

## 2. Keyword Research

### 2.1 Keywords Primárias (Transacionais)

| Keyword | Volume Est. | Dificuldade | Página Alvo |
|---------|-------------|-------------|-------------|
| psicólogo para homens | Alta | Média | `/atendimentos/psicologia-para-homens` |
| psicólogo para empresários | Média | Baixa | `/atendimentos/psicologia-para-homens` |
| psicólogo para líderes | Baixa | Baixa | `/atendimentos/psicologia-para-homens` |
| psicologia sistêmica | Média | Média | `/atendimentos/psicologia-sistemica` |
| hipnoterapia | Alta | Alta | `/atendimentos/hipnoterapia` |
| psicólogo online homens | Média | Baixa | `/atendimentos` |

### 2.2 Keywords Informacionais (Blog)

| Keyword | Volume Est. | Página Alvo |
|---------|-------------|-------------|
| ansiedade em homens | Alta | `/conteudos/ansiedade-em-homens` |
| esgotamento emocional masculino | Média | `/conteudos/esgotamento-emocional-masculino` |
| burnout em líderes | Média | `/conteudos/burnout-em-lideres` |
| autodomínio emocional | Baixa | `/conteudos/autodominio-emocional` |
| saúde mental masculina | Alta | `/conteudos/saude-mental-masculina` |
| como lidar com pressão no trabalho | Alta | `/conteudos/como-lidar-com-pressao` |
| psicólogo para casamento | Média | `/conteudos/terapia-casamento-homens` |
| padrões familiares repetitivos | Baixa | `/conteudos/padroes-familiares` |
| homem ansioso | Média | `/conteudos/ansiedade-em-homens` |
| cansaço emocional | Alta | `/conteudos/esgotamento-emocional-masculino` |

### 2.3 Keywords de Marca

| Keyword | Página |
|---------|--------|
| dr matheus morari | `/` |
| matheus morari psicólogo | `/sobre` |
| matheus morari hipnoterapia | `/atendimentos/hipnoterapia` |

---

## 3. On-Page SEO por Rota

### 3.1 Metadata Template

```typescript
// Template base para cada rota
export function generateMetadata(page: PageConfig): Metadata {
  return {
    title: `${page.title} — Dr. Matheus Morari`,
    description: page.description,
    keywords: page.keywords,
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${SITE_URL}${page.path}`,
      siteName: 'Dr. Matheus Morari',
      locale: 'pt_BR',
      type: page.ogType || 'website',
      images: [{
        url: page.ogImage || `${SITE_URL}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: page.title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
    },
    alternates: {
      canonical: `${SITE_URL}${page.path}`,
    },
    robots: page.noindex ? { index: false } : undefined,
  };
}
```

### 3.2 Metadata por Rota

| Rota | Title | Description (≤160 chars) |
|------|-------|--------------------------|
| `/` | Dr. Matheus Morari — Psicólogo para Homens que Lideram | Psicologia para homens que carregam pressão, vivem ansiedade silenciosa e precisam recuperar autodomínio, sanidade e presença familiar. |
| `/bio` | Dr. Matheus Morari — Links | Psicólogo para homens que lideram. Acesse atendimentos, conteúdos e o Caminho de Resolução. |
| `/caminho-de-resolucao` | Caminho de Resolução — Dr. Matheus Morari | O primeiro passo para homens que carregam pressão demais. Diagnóstico emocional e direcionamento profissional. |
| `/atendimentos` | Atendimentos — Dr. Matheus Morari | Atendimento psicológico para homens que lideram. Psicologia sistêmica, hipnoterapia e acompanhamento. |
| `/atendimentos/psicologia-para-homens` | Psicólogo para Homens — Dr. Matheus Morari | Atendimento psicológico especializado para homens que lideram. Ansiedade, esgotamento e autodomínio. |
| `/atendimentos/psicologia-sistemica` | Psicologia Sistêmica — Dr. Matheus Morari | Entenda como padrões familiares afetam sua liderança, casamento e saúde emocional. |
| `/atendimentos/hipnoterapia` | Hipnoterapia — Dr. Matheus Morari | Hipnoterapia clínica aplicada com responsabilidade. Recurso técnico para padrões emocionais profundos. |
| `/produtos` | Produtos e Cursos — Dr. Matheus Morari | Cursos e materiais sobre ansiedade, esgotamento e autodomínio para homens que lideram. |
| `/sobre` | Sobre — Dr. Matheus Morari | Conheça o Dr. Matheus Morari. Psicólogo especializado em saúde emocional masculina e autodomínio. |
| `/formacao` | Formação — Dr. Matheus Morari | Formação acadêmica, certificações e experiência clínica do Dr. Matheus Morari. |
| `/servicos` | Serviços — Dr. Matheus Morari | Todos os serviços: atendimento psicológico, psicologia sistêmica, hipnoterapia e cursos. |
| `/duvidas` | Dúvidas Frequentes — Dr. Matheus Morari | Perguntas frequentes sobre atendimento psicológico para homens. Formato, valores e próximos passos. |
| `/contato` | Contato — Dr. Matheus Morari | Entre em contato. Agendamento, dúvidas e primeiros passos para atendimento. |
| `/conteudos` | Conteúdos — Dr. Matheus Morari | Artigos sobre ansiedade, esgotamento, liderança, família e autodomínio. |

---

## 4. Schema.org (Structured Data)

### 4.1 Schema Global (Layout)

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Dr. Matheus Morari",
  "description": "Psicólogo para homens que lideram",
  "url": "https://...",
  "telephone": "+55...",
  "priceRange": "$$$",
  "areaServed": "BR",
  "serviceType": ["Psicologia Clínica", "Psicologia Sistêmica", "Hipnoterapia"],
  "founder": {
    "@type": "Person",
    "name": "Dr. Matheus Morari",
    "jobTitle": "Psicólogo Clínico",
    "url": "https://.../sobre"
  }
}
```

### 4.2 Schema por Tipo de Página

| Tipo | Schema | Páginas |
|------|--------|---------|
| Person | `@type: Person` com credentials | `/sobre`, `/formacao` |
| ProfessionalService | `@type: ProfessionalService` | `/`, `/atendimentos` |
| FAQPage | `@type: FAQPage` com Q&A | `/duvidas` |
| Article | `@type: Article` | `/conteudos/[slug]` |
| Product | `@type: Product` | `/produtos/[slug]` |
| BreadcrumbList | `@type: BreadcrumbList` | Todas as internas |
| WebSite | `@type: WebSite` | `/` |

---

## 5. Estratégia Técnica

### 5.1 Performance
- **Next.js SSG/ISR**: Páginas estáticas com revalidação para conteúdo dinâmico
- **Image Optimization**: `next/image` com lazy loading
- **Font Loading**: `next/font/google` com display swap
- **Bundle Size**: Code splitting automático por rota
- **Caching**: Headers de cache adequados

### 5.2 Indexação
- **Sitemap**: Gerado automaticamente via `next-sitemap` ou App Router
- **Robots.txt**: Configurado para permitir indexação (exceto `/obrigado`, `/lp/*`, `/vsl/*`)
- **Canonical URLs**: Definidas em todas as páginas
- **Hreflang**: Não necessário (site em PT-BR apenas)

### 5.3 Core Web Vitals
| Métrica | Meta |
|---------|------|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| INP (Interaction to Next Paint) | < 200ms |
| TTFB (Time to First Byte) | < 600ms |

### 5.4 Acessibilidade (impacta SEO)
- Semântica HTML5 (header, main, section, article, aside, footer)
- Um único `<h1>` por página
- Hierarquia de headings (h1 → h2 → h3)
- Alt text em todas as imagens
- ARIA labels em elementos interativos
- Contraste de cores WCAG AA
- Skip navigation link

---

## 6. Content Strategy (Blog)

### 6.1 Plano de Conteúdo Inicial

| # | Título Sugerido | Keyword Alvo | Categoria |
|---|----------------|-------------|-----------|
| 1 | Ansiedade em homens: os sinais que você ignora | ansiedade em homens | Ansiedade |
| 2 | Esgotamento emocional: quando o corpo avisa e você não ouve | esgotamento emocional masculino | Esgotamento |
| 3 | Burnout em líderes: o preço silencioso do sucesso | burnout em líderes | Liderança |
| 4 | Por que homens evitam terapia (e por que isso está custando caro) | homens terapia | Mentalidade |
| 5 | Padrões familiares: você está repetindo o que jurou não repetir? | padrões familiares | Padrões |
| 6 | Autodomínio emocional: o que separa líderes de controladores | autodomínio emocional | Autodomínio |
| 7 | Casamento em desgaste: quando o sucesso profissional ameaça a vida pessoal | casamento desgaste empresário | Família |
| 8 | Saúde mental masculina: por que esse assunto importa agora | saúde mental masculina | Homens |

### 6.2 Estrutura de Artigo Padrão
```
1. Headline com keyword (H1)
2. Introdução com gancho emocional (primeiro parágrafo)
3. Desenvolvimento com H2s contendo keywords secundárias
4. Exemplos práticos e identificação
5. Conclusão com direcionamento
6. CTA contextual (Caminho de Resolução ou Atendimento)
7. Artigos relacionados
```

### 6.3 Frequência
- Meta: 2 artigos/mês nos primeiros 3 meses
- Meta: 4 artigos/mês após 3 meses
- Tamanho: 1.200-2.000 palavras por artigo

---

## 7. Local SEO

### 7.1 Google Business Profile
- Criar perfil com categoria "Psicólogo"
- Adicionar fotos profissionais
- Solicitar avaliações de pacientes (com permissão)
- Manter informações atualizadas

### 7.2 Citations
- Doctoralia
- Psicólogos.com.br
- LinkedIn
- Instagram (link na bio)

---

## 8. Monitoring

### 8.1 Ferramentas
- Google Search Console (indexação, queries, CTR)
- Google Analytics 4 (tráfego, comportamento, conversões)
- Lighthouse (performance, acessibilidade, SEO score)

### 8.2 Relatório Mensal
- Posições de keywords
- Tráfego orgânico
- Páginas mais acessadas
- Queries de busca
- Conversões orgânicas
- Core Web Vitals
