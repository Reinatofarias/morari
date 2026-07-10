# Spec-Driven Routes — Dr. Matheus Morari

**Versão**: 1.0
**Data**: 2026-07-09

---

## Convenções

Cada rota é documentada com:
- **Intenção estratégica**: Por que essa página existe
- **Headline / Subheadline**: Copy principal
- **Seções**: Blocos de conteúdo com ordem e intenção
- **CTAs**: Chamadas para ação com destino
- **SEO**: Title, description, keywords
- **Schema**: Structured data aplicável

---

## 1. `/` — Home

### Intenção
Porta de entrada principal. Fazer o visitante parar, se identificar e escolher um caminho.

### Headline
**"Homem, seu sucesso não pode custar sua casa."**

### Subheadline
"Psicologia para homens que lideram, carregam pressão em silêncio e precisam recuperar autodomínio, sanidade e presença antes que o preço fique alto demais."

### Seções

| # | Seção | Componente | Intenção |
|---|-------|-----------|----------|
| 1 | Hero de impacto | `HeroSection` | Parar o scroll, identificar |
| 2 | Diagnóstico da dor | `SectionHeader` + texto | Validar a dor |
| 3 | Sinais de alerta | `PainCard` ×6 | Especificar sintomas |
| 4 | A falsa vitória | `EditorialQuote` + texto | Confrontar |
| 5 | O método/caminho | `PathCard` ×4 | Apresentar o framework |
| 6 | A casa digital | `HouseNavigation` | Mostrar ecossistema |
| 7 | Sobre Matheus | `SectionHeader` + breve bio | Autoridade |
| 8 | CTA final | `CTASection` | Converter |

### CTAs
- **Primário**: "Iniciar Caminho de Resolução" → `/caminho-de-resolucao`
- **Secundário**: "Conhecer os atendimentos" → `/atendimentos`
- **Final**: "Começar agora" → `/caminho-de-resolucao`

### SEO
- **Title**: "Dr. Matheus Morari — Psicólogo para Homens que Lideram"
- **Description**: "Psicologia para homens que carregam pressão, vivem ansiedade silenciosa e precisam recuperar autodomínio, sanidade e presença familiar. Atendimento online."
- **Schema**: `ProfessionalService`, `Person`

---

## 2. `/bio` — Link Tree Premium

### Intenção
Converter tráfego do Instagram. Curta, bonita, objetiva.

### Headline
**"Homens fortes também quebram em silêncio."**

### Subheadline
"Se você lidera, carrega pressão e sente que está perdendo presença, sanidade ou direção, comece por aqui."

### Seções

| # | Seção | Componente | Intenção |
|---|-------|-----------|----------|
| 1 | Avatar/Foto | Imagem circular + nome | Identificação |
| 2 | Frase forte | Headline + sub | Gancho |
| 3 | Botões | 5 `ConversionButton` | Ação |

### Botões (ordem)
1. "Iniciar Caminho de Resolução" → `/caminho-de-resolucao`
2. "Conhecer atendimentos" → `/atendimentos`
3. "Mapa da Ansiedade Masculina" → `/lp/mapa-da-ansiedade-masculina`
4. "Conteúdos para homens que lideram" → `/conteudos`
5. "Falar no WhatsApp" → link WhatsApp

### SEO
- **Title**: "Dr. Matheus Morari — Links"
- **Description**: "Psicólogo para homens que lideram. Acesse atendimentos, conteúdos e o Caminho de Resolução."
- **Noindex**: Considerar (página de suporte, não de SEO)

---

## 3. `/caminho-de-resolucao` — Conversão Principal

### Intenção
Principal página de conversão. Diagnosticar a dor e conduzir para formulário.

### Headline
**"Antes de resolver, você precisa enxergar o que está te quebrando."**

### Subheadline
"O Caminho de Resolução é o primeiro passo para homens que carregam pressão demais, se sentem emocionalmente no limite e precisam entender o que está acontecendo antes que o colapso cobre a conta."

### Seções

| # | Seção | Componente | Intenção |
|---|-------|-----------|----------|
| 1 | Hero | `HeroSection` variant | Impacto + ancoragem |
| 2 | O que é | Texto + `SectionHeader` | Explicar |
| 3 | Para quem é | Lista com ícones | Qualificar |
| 4 | Sinais de que precisa | `PainCard` ×6 | Identificar |
| 5 | O que será avaliado | Lista | Tangibilizar |
| 6 | O que você recebe | Lista | Valor |
| 7 | Formulário | `LeadForm` | Converter |

### Formulário (campos)
| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| Nome | text | Sim |
| WhatsApp | tel | Sim |
| E-mail | email | Sim |
| Qual sua principal dor hoje? | textarea | Não |
| Identificação | select (ansiedade, esgotamento, família, liderança, padrões repetitivos, outro) | Não |
| Melhor horário para contato | select (manhã, tarde, noite) | Não |

### Após envio
Redirect → `/obrigado`

### SEO
- **Title**: "Caminho de Resolução — Dr. Matheus Morari"
- **Description**: "O primeiro passo para homens que carregam pressão demais e precisam entender o que está acontecendo. Diagnóstico emocional e direcionamento profissional."

---

## 4. `/atendimentos` — Hub de Atendimentos

### Intenção
Explicar as possibilidades de acompanhamento. Funcionar como hub para subpáginas.

### Headline
**"Atendimento para homens que não podem mais liderar no automático."**

### Subheadline
"Um espaço técnico, profundo e direto para trabalhar ansiedade, esgotamento, padrões emocionais, conflitos internos e reconstrução de autodomínio."

### Seções

| # | Seção | Componente | Intenção |
|---|-------|-----------|----------|
| 1 | Hero | `SectionHeader` | Contextualizar |
| 2 | Cards de atendimento | `ServiceCard` ×3 | Apresentar opções |
| 3 | Para quem é | Texto | Qualificar |
| 4 | Formato | Como funciona | Tangibilizar |
| 5 | CTA | `CTASection` | Converter |

### CTA
"Entender qual atendimento faz sentido para mim" → `/caminho-de-resolucao`

### SEO
- **Title**: "Atendimentos — Dr. Matheus Morari | Psicologia para Homens"
- **Description**: "Atendimento psicológico para homens que lideram. Psicologia sistêmica, hipnoterapia e acompanhamento para líderes e empresários."
- **Schema**: `ProfessionalService`

---

## 5. `/atendimentos/psicologia-para-homens`

### Intenção
Página específica sobre atendimento psicológico para homens que lideram.

### Headline
**"Psicologia para quem não pode mais aguentar no automático."**

### Seções

| # | Seção | Intenção |
|---|-------|----------|
| 1 | Hero | Impacto |
| 2 | O que é | Explicar a abordagem |
| 3 | Para quem é | Qualificar (empresários, líderes, gestores) |
| 4 | Dores tratadas | Lista de dores específicas |
| 5 | Como funciona | Formato, frequência, modalidade |
| 6 | O que não é | Desmistificar (não é coaching, não é autoajuda) |
| 7 | CTA | Converter |

### SEO
- **Title**: "Psicólogo para Homens — Dr. Matheus Morari"
- **Description**: "Atendimento psicológico especializado para homens que lideram. Trabalho com ansiedade, esgotamento, presença familiar e autodomínio emocional."
- **Keywords**: psicólogo para homens, psicologia masculina, terapia para empresários

---

## 6. `/atendimentos/psicologia-sistemica`

### Intenção
Página sobre psicologia sistêmica, padrões familiares e bloqueios emocionais.

### Headline
**"O que você repete sem perceber pode estar destruindo o que você mais quer proteger."**

### Seções

| # | Seção | Intenção |
|---|-------|----------|
| 1 | Hero | Impacto |
| 2 | O que é psicologia sistêmica | Educar |
| 3 | Padrões familiares | Exemplificar |
| 4 | Sinais de padrões | Identificar |
| 5 | Como funciona | Tangibilizar |
| 6 | CTA | Converter |

### SEO
- **Title**: "Psicologia Sistêmica — Dr. Matheus Morari"
- **Description**: "Entenda como padrões familiares afetam sua liderança, casamento e saúde emocional. Psicologia sistêmica para homens que lideram."

---

## 7. `/atendimentos/hipnoterapia`

### Intenção
Página sobre hipnoterapia aplicada com responsabilidade.

### Headline
**"Hipnoterapia não é magia. É acesso direto ao que seu racional insiste em esconder."**

### Seções

| # | Seção | Intenção |
|---|-------|----------|
| 1 | Hero | Impacto + desmistificação |
| 2 | O que é | Educar com responsabilidade |
| 3 | O que não é | Combater mitos |
| 4 | Para que serve | Aplicações reais |
| 5 | Como funciona | Formato |
| 6 | CTA | Converter |

### SEO
- **Title**: "Hipnoterapia — Dr. Matheus Morari"
- **Description**: "Hipnoterapia clínica aplicada com responsabilidade. Sem promessas mágicas. Um recurso técnico para acessar padrões emocionais profundos."

---

## 8. `/produtos` — Hub de Produtos

### Intenção
Organizar produtos digitais e direcionar para as LPs de cada oferta.

### Headline
**"Nem todo homem precisa começar por um atendimento individual."**

### Subheadline
"Mas todo homem precisa começar encarando a verdade certa."

### Seções

| # | Seção | Componente | Intenção |
|---|-------|-----------|----------|
| 1 | Hero | `SectionHeader` | Contextualizar |
| 2 | Produtos disponíveis | `ProductCard` | Apresentar |
| 3 | Em breve | Cards com status "coming_soon" | Gerar expectativa |
| 4 | CTA | `CTASection` | Alternativa de conversão |

### SEO
- **Title**: "Produtos e Cursos — Dr. Matheus Morari"
- **Description**: "Cursos e materiais sobre ansiedade, esgotamento e autodomínio para homens que lideram. Comece seu caminho de resolução."

---

## 9. `/produtos/[slug]` — Produtos oficiais

### Intenção
Páginas de produto para as ofertas oficiais do Dr. Matheus Morari.

### Produtos e slugs
1. O Código da Paz Conjugal → `/produtos/codigo-da-paz-conjugal`
2. Programa de Inteligência Emocional para Homens → `/produtos/programa-de-inteligencia-emocional-para-homens`
3. Mapa da Ansiedade Masculina → `/produtos/mapa-da-ansiedade-masculina`
4. A Engrenagem Fantasma → `/produtos/engrenagem-fantasma`
5. O Código H → `/produtos/codigo-h`
6. Mini Curso de Saúde Mental → `/produtos/mini-curso-de-saude-mental`

### Seções
1. Breadcrumb
2. Visual editorial do produto
3. Headline/título
4. Descrição
5. Destaques do produto
6. CTA para LP do produto e Caminho de Resolução

---

## 10. `/produtos/[slug]` — Produto Dinâmico

### Intenção
Estrutura dinâmica para futuros produtos. Dados vêm do Supabase.

### Implementação
- Query Supabase por slug
- Renderização do conteúdo dinâmico
- Fallback para 404 se slug não encontrado

---

## 11. `/conteudos` — Hub de Conteúdos

### Intenção
SEO + autoridade + aquecimento de público.

### Headline
**"Conteúdos para homens que lideram e precisam de clareza."**

### Seções
1. Hero
2. Grid de artigos com filtro por categoria
3. CTA contextual

### SEO
- **Title**: "Conteúdos — Dr. Matheus Morari | Psicologia para Homens"
- **Description**: "Artigos sobre ansiedade, esgotamento, liderança, família e autodomínio. Conteúdo profundo para homens que lideram."

---

## 12. `/conteudos/[slug]` — Artigo Dinâmico

### Intenção
Artigo individual com SEO forte.

### Seções
1. Header com título, data, categoria
2. Cover image
3. Conteúdo renderizado (markdown)
4. CTA contextual (Caminho de Resolução / Atendimento)
5. Artigos relacionados

### SEO
- **Title**: `{article.title} — Dr. Matheus Morari`
- **Description**: `{article.description}`
- **Schema**: `Article`

---

## 13. `/sobre` — Sobre

### Intenção
Construir confiança sem virar currículo frio.

### Headline
**"Eu não ajudo homens a parecerem fortes. Eu os ajudo a voltarem a ter governo."**

### Seções

| # | Seção | Intenção |
|---|-------|----------|
| 1 | Hero com foto | Presença |
| 2 | Quem é Matheus | Humanizar |
| 3 | O que ele acredita | Posicionar |
| 4 | Por que trabalha com homens | Diferenciação |
| 5 | Abordagem | Método |
| 6 | Formação resumida | Autoridade |
| 7 | CTA | Converter |

### SEO
- **Title**: "Sobre — Dr. Matheus Morari | Psicólogo para Homens"
- **Description**: "Conheça o Dr. Matheus Morari. Psicólogo especializado em saúde emocional masculina, liderança e autodomínio."
- **Schema**: `Person`

---

## 14. `/formacao` — Formação e Credenciais

### Intenção
Prova de autoridade. Credenciais técnicas.

### Headline
**"Formação, experiência e compromisso com a verdade clínica."**

### Seções
1. Formação acadêmica
2. Certificações
3. Experiência clínica
4. Abordagens utilizadas
5. Aviso de responsabilidade ética
6. CTA

### SEO
- **Title**: "Formação — Dr. Matheus Morari"
- **Description**: "Formação acadêmica, certificações e experiência clínica do Dr. Matheus Morari. Psicólogo CRP, especialista em psicologia sistêmica e hipnoterapia."

---

## 15. `/servicos` — Serviços

### Intenção
Organizar de forma clara tudo que o Matheus oferece.

### Headline
**"Cada serviço é um caminho. Cada caminho resolve algo diferente."**

### Seções
Cada serviço com:
- Para quem é
- Qual dor resolve
- Como funciona
- Próximo passo

### Serviços
1. Atendimento individual
2. Acompanhamento para homens que lideram
3. Psicologia sistêmica
4. Hipnoterapia
5. Cursos e produtos digitais
6. Palestras/empresas (futuro)

### SEO
- **Title**: "Serviços — Dr. Matheus Morari"
- **Description**: "Todos os serviços do Dr. Matheus Morari: atendimento psicológico, psicologia sistêmica, hipnoterapia, cursos e acompanhamento para líderes."

---

## 16. `/duvidas` — FAQ

### Intenção
Reduzir objeções. Antecipar perguntas.

### Headline
**"Perguntas que homens sérios fazem antes de começar."**

### Perguntas
1. Para quem é o atendimento?
2. O atendimento é online?
3. Como funciona a primeira conversa?
4. Psicologia sistêmica é para mim?
5. Hipnoterapia é segura?
6. Em quanto tempo vejo resultados?
7. Isso substitui acompanhamento médico?
8. Como saber se estou ansioso ou esgotado?
9. Qual o valor?
10. Como agendar?

### SEO
- **Title**: "Dúvidas Frequentes — Dr. Matheus Morari"
- **Description**: "Perguntas frequentes sobre atendimento psicológico para homens. Entenda como funciona, valores, formato e próximos passos."
- **Schema**: `FAQPage`

---

## 17. `/contato` — Contato

### Intenção
Conversão direta. WhatsApp + formulário.

### Headline
**"Se chegou até aqui, seu próximo passo é conversar."**

### Seções
1. Headline + contexto
2. WhatsApp (link direto com mensagem pré-preenchida)
3. Formulário simplificado (nome, email, mensagem)
4. Redes sociais
5. Horários de atendimento

### SEO
- **Title**: "Contato — Dr. Matheus Morari"
- **Description**: "Entre em contato com o Dr. Matheus Morari. Agendamento, dúvidas e primeiros passos para seu atendimento."

---

## 18. `/obrigado` — Página de Obrigado

### Intenção
Confirmar conversão. Definir expectativa. Oferecer próximo passo.

### Headline
**"Recebemos suas informações. O próximo passo é nosso."**

### Seções
1. Confirmação
2. O que acontece agora (expectativa)
3. Enquanto espera (conteúdos sugeridos)
4. Redes sociais

### SEO
- **Noindex**: Sim (página pós-conversão)

---

## 19. `/lp/[slug]` — Landing Pages de Produto

### Intenção
Criar uma LP própria para cada produto oficial, com layout limpo de campanha e foco em identificação, clareza da oferta e conversão para o Caminho de Resolução.

### Produtos e slugs
1. O Código da Paz Conjugal → `/lp/codigo-da-paz-conjugal`
2. Programa de Inteligência Emocional para Homens → `/lp/programa-de-inteligencia-emocional-para-homens`
3. Mapa da Ansiedade Masculina → `/lp/mapa-da-ansiedade-masculina`
4. A Engrenagem Fantasma → `/lp/engrenagem-fantasma`
5. O Código H → `/lp/codigo-h`
6. Mini Curso de Saúde Mental → `/lp/mini-curso-de-saude-mental`

### Implementação
- Layout limpo sem header/footer completo
- Slug dinâmico gerado a partir do catálogo oficial em `src/lib/products.ts`
- Conteúdo específico por produto
- Template com hero editorial, seção "Para quem é", outcomes, resumo e CTAs
- CTA primário para `/caminho-de-resolucao`

---

## 20. `/vsl/[slug]` — Video Sales Letter

### Intenção
Estrutura para futuras páginas de vídeo de vendas.

### Implementação
- Layout minimalista
- Player de vídeo centralizado
- Headline + CTA abaixo do vídeo
- Sem distrações (header/footer minimais)
