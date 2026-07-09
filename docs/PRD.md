# PRD — Product Requirements Document
## Dr. Matheus Morari — Casa Digital

**Versão**: 1.0
**Data**: 2026-07-09
**Autor**: Time de Produto

---

## 1. Visão do Produto

### 1.1 Declaração de Visão
Construir o ecossistema digital central do Dr. Matheus Morari — a "casa digital" de um psicólogo premium especializado em homens que lideram. O produto é uma plataforma web que funciona como ponto de convergência entre autoridade, conteúdo, atendimento e conversão.

### 1.2 Problema
Homens em posição de liderança (empresários, gestores, executivos) vivem uma crise silenciosa: carregam pressão emocional extrema, distanciamento familiar, ansiedade crônica e esgotamento — mas não encontram um espaço digital que fale diretamente com eles, sem linguagem clínica genérica, sem tom de autoajuda e sem promessas vazias.

### 1.3 Solução
Um site premium que funciona como "casa digital" — com ambientes distintos que guiam o visitante por uma jornada de identificação da dor, reconhecimento do problema, compreensão do custo da inação e direcionamento para o caminho adequado (atendimento, produto ou conteúdo).

---

## 2. Personas

### 2.1 Persona Primária — "Ricardo"
- **Idade**: 42 anos
- **Perfil**: Empresário, casado, 2 filhos, faturamento acima de R$ 100k/mês
- **Contexto**: Trabalha 12-14h por dia. Sente que está perdendo conexão com a esposa e os filhos. Tem ansiedade que não reconhece como ansiedade. Nunca fez terapia. Não quer parecer fraco.
- **Dores**: Irritabilidade em casa, dificuldade de desligar, culpa constante, explosões emocionais seguidas de arrependimento, sensação de solidão apesar de ser cercado de pessoas.
- **Motivadores**: Medo de perder a família. Perceber que o sucesso profissional não está trazendo paz. Um momento de crise (briga séria, problema de saúde, feedback duro de alguém próximo).
- **Objeções**: "Terapia é para quem está mal" / "Não tenho tempo" / "Já tentei e não funcionou" / "Isso é coisa de mulher"
- **Jornada digital**: Instagram → Bio → Caminho de Resolução → WhatsApp → Atendimento

### 2.2 Persona Secundária — "Marcos"
- **Idade**: 38 anos
- **Perfil**: Gestor de área em empresa de médio porte, casado recentemente
- **Contexto**: Percebeu padrões familiares se repetindo. O pai era ausente, e ele se vê seguindo o mesmo caminho. Busca entender antes de chegar no ponto de ruptura.
- **Dores**: Padrões repetitivos, necessidade de controle, dificuldade em demonstrar vulnerabilidade, medo de se tornar o pai.
- **Jornada digital**: Google (busca "psicólogo para homens") → Conteúdo → Atendimentos → Formulário

### 2.3 Persona Terciária — "Carolina" (esposa/companheira)
- **Idade**: 36 anos
- **Perfil**: Esposa de um líder/empresário
- **Contexto**: Ela percebe o marido se afastando, irritado, ausente. Busca ajuda para ele. Pesquisa profissionais que entendam homens.
- **Jornada digital**: Google → Sobre → Atendimentos → Compartilha com o marido via WhatsApp

---

## 3. Objetivos do Produto

### 3.1 Objetivos de Negócio
| Objetivo | Métrica | Meta |
|----------|---------|------|
| Gerar leads qualificados | Formulários enviados/mês | 50+ |
| Converter tráfego Instagram | Cliques Bio → Ação | Taxa > 25% |
| Construir autoridade orgânica | Tráfego orgânico/mês | 2.000+ visitas em 6 meses |
| Vender produtos digitais | Vendas/mês | Estrutura pronta para lançamento |
| Posicionar como referência | Ranking Google para keywords-alvo | Top 10 em 6 meses |

### 3.2 Objetivos de Experiência
- Tempo de carregamento < 2.5s (LCP)
- Taxa de rejeição < 40% na home
- Scroll depth médio > 60% nas páginas de conversão
- Mobile-first com experiência impecável
- Sensação visual de cinema/editorial premium

---

## 4. Escopo do MVP

### 4.1 Incluído
- 20 rotas/páginas com copy completa
- Design system premium com visual cinematográfico
- 20+ componentes reutilizáveis
- Formulário funcional com Supabase
- SEO otimizado por rota
- Responsividade completa
- Estrutura para analytics e pixel
- Blog/conteúdos dinâmicos via Supabase
- Deploy-ready para Vercel

### 4.2 Excluído (Futuro)
- Área de membros
- Checkout integrado (usará links externos)
- Painel administrativo completo (gestão via Supabase dashboard)
- Integração com CRM
- Chat ao vivo
- Sistema de agendamento integrado (usará link externo)

---

## 5. Requisitos Funcionais

### 5.1 Navegação e Estrutura
- **RF-01**: Header com navegação principal responsiva
- **RF-02**: Menu mobile com animação
- **RF-03**: Footer com links, redes sociais e informações legais
- **RF-04**: Breadcrumb em páginas internas
- **RF-05**: Botão flutuante de WhatsApp

### 5.2 Conversão
- **RF-06**: Formulário de lead no Caminho de Resolução
- **RF-07**: Armazenamento de leads no Supabase
- **RF-08**: Redirecionamento para /obrigado após conversão
- **RF-09**: CTAs estratégicos em todas as páginas
- **RF-10**: Tracking de eventos de conversão

### 5.3 Conteúdo
- **RF-11**: Hub de conteúdos com categorias
- **RF-12**: Artigos dinâmicos via Supabase
- **RF-13**: Produtos dinâmicos via Supabase
- **RF-14**: FAQ com acordeão

### 5.4 SEO
- **RF-15**: Metadata por rota (title, description, OG)
- **RF-16**: Schema.org (Person, ProfessionalService, FAQPage, Article)
- **RF-17**: Sitemap automático
- **RF-18**: URLs canônicas

---

## 6. Requisitos Não-Funcionais

- **RNF-01**: Performance — LCP < 2.5s, FID < 100ms, CLS < 0.1
- **RNF-02**: Acessibilidade — WCAG 2.1 AA
- **RNF-03**: SEO — Score > 90 no Lighthouse
- **RNF-04**: Segurança — HTTPS, sanitização de inputs, LGPD
- **RNF-05**: Manutenibilidade — Código tipado, componentizado, documentado
- **RNF-06**: Escalabilidade — Estrutura preparada para crescimento de rotas e conteúdos

---

## 7. Requisitos Éticos

- **RE-01**: Não prometer cura ou resultados garantidos
- **RE-02**: Não usar linguagem de diagnóstico irresponsável
- **RE-03**: Incluir aviso de emergência em páginas sensíveis (CVV 188, SAMU 192)
- **RE-04**: Não substituir acompanhamento médico/psiquiátrico
- **RE-05**: Tratar dados pessoais com responsabilidade (LGPD)
- **RE-06**: Adequar comunicação às normas do CFP (Conselho Federal de Psicologia)
- **RE-07**: Política de privacidade e termos de uso acessíveis

---

## 8. Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 15 (App Router) |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS |
| Componentes UI | shadcn/ui (seletivo) |
| Animações | Framer Motion |
| Formulários | React Hook Form + Zod |
| Banco de dados | Supabase (PostgreSQL) |
| Deploy | Vercel |
| Analytics | Google Analytics 4 + Meta Pixel |
| SEO | next/metadata + Schema.org |

---

## 9. Métricas de Sucesso

### Lançamento (30 dias)
- Site 100% funcional e online
- 0 erros em produção
- Score Lighthouse > 90 em todas as categorias
- Formulário salvando leads no Supabase

### Crescimento (90 dias)
- 50+ leads via Caminho de Resolução
- 1.000+ visitas orgânicas
- 5+ artigos publicados
- Tráfego de Instagram convertendo > 20%

### Maturidade (180 dias)
- 2.000+ visitas orgânicas/mês
- Top 10 Google para "psicólogo para homens"
- 1+ produto digital lançado
- Funil de conversão otimizado com dados reais
