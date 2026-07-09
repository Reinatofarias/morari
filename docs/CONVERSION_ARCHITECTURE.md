# Conversion Architecture — Dr. Matheus Morari

**Versão**: 1.0
**Data**: 2026-07-09

---

## 1. Visão Geral do Funil

### 1.1 Modelo de Funil

```
┌─────────────────────────────────────────────────────────────┐
│  TOPO (Consciência)                                         │
│  Instagram │ Google │ Tráfego Pago │ Indicação              │
├─────────────────────────────────────────────────────────────┤
│  MEIO (Identificação + Consideração)                        │
│  /bio │ / │ /conteudos │ /atendimentos │ /sobre             │
├─────────────────────────────────────────────────────────────┤
│  FUNDO (Decisão + Conversão)                                │
│  /caminho-de-resolucao │ /produtos │ WhatsApp               │
├─────────────────────────────────────────────────────────────┤
│  PÓS-CONVERSÃO                                              │
│  /obrigado │ Email │ Atendimento │ Upsell                   │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Jornada Emocional do Visitante

```
1. NEGAÇÃO      → "Estou bem, só cansado"
2. IDENTIFICAÇÃO → "Isso parece comigo" (Home, Conteúdos)
3. DESCONFORTO  → "Talvez eu precise de ajuda" (Dores, Sinais)
4. CUSTO        → "O que estou perdendo?" (Custo da inação)
5. ESPERANÇA    → "Existe um caminho" (Método, Atendimentos)
6. AÇÃO         → "Vou dar o primeiro passo" (CTA, Formulário)
```

---

## 2. Canais de Entrada

### 2.1 Instagram (Primário)

**Fluxo**:
```
Post/Story/Reels → Bio → /bio → Ação
```

**Estratégia**:
- Conteúdo que gera identificação (frases-dor, micro-conteúdos)
- Stories com enquetes que direcionam para link na bio
- Reels com ganchos de dor → CTA para bio
- Link na bio: `site.com/bio`

**KPIs**:
- Cliques no link da bio
- Distribuição de cliques por botão
- Conversão bio → formulário

---

### 2.2 Google Orgânico (Secundário)

**Fluxo**:
```
Busca → Artigo/Página → CTA contextual → Conversão
```

**Estratégia**:
- Artigos otimizados para keywords informacionais
- Páginas de atendimento otimizadas para keywords transacionais
- Internal linking forte para páginas de conversão

**KPIs**:
- Tráfego orgânico
- Posições de keywords
- Conversão orgânico → lead

---

### 2.3 Tráfego Pago (Futuro)

**Fluxo**:
```
Anúncio Meta/Google → /caminho-de-resolucao (ou LP específica) → Formulário
```

**Estratégia**:
- Anúncios com copy de identificação de dor
- Landing pages dedicadas (`/lp/[campanha]`)
- Retargeting para visitantes que não converteram

**KPIs**:
- CPA (Custo por Aquisição)
- ROAS
- Taxa de conversão por anúncio

---

## 3. Pontos de Conversão

### 3.1 Conversões Primárias

| Conversão | Localização | Destino |
|-----------|------------|---------|
| Formulário Caminho de Resolução | `/caminho-de-resolucao` | Supabase → `/obrigado` |
| Clique WhatsApp | Botão flutuante, CTAs | Link WhatsApp |
| Formulário Contato | `/contato` | Supabase → `/obrigado` |

### 3.2 Conversões Secundárias (Micro-conversões)

| Conversão | Indicador |
|-----------|----------|
| Scroll 75% em página de conversão | Alto interesse |
| Visualização de página de atendimento | Consideração |
| Visualização de produto | Interesse em compra |
| Clique em CTA da bio | Tráfego qualificado |
| Leitura de artigo completo | Engajamento |
| Clique em links internos | Navegação ativa |

---

## 4. CTAs por Página

### 4.1 Mapeamento de CTAs

| Página | CTA Primário | CTA Secundário |
|--------|-------------|----------------|
| `/` | "Iniciar Caminho de Resolução" | "Conhecer os atendimentos" |
| `/bio` | "Iniciar Caminho de Resolução" | "Conhecer atendimentos" |
| `/caminho-de-resolucao` | "Começar meu caminho" (formulário) | — |
| `/atendimentos` | "Entender qual atendimento faz sentido" | "Falar no WhatsApp" |
| `/atendimentos/*` | "Iniciar Caminho de Resolução" | "Falar no WhatsApp" |
| `/produtos` | "Ver produto" (por card) | "Iniciar Caminho" |
| `/produtos/*` | CTA de compra (link externo) | "Falar no WhatsApp" |
| `/conteudos` | "Ler artigo" (por card) | "Caminho de Resolução" |
| `/conteudos/*` | "Iniciar Caminho de Resolução" | "Conhecer atendimentos" |
| `/sobre` | "Conhecer atendimentos" | "Caminho de Resolução" |
| `/formacao` | "Conhecer atendimentos" | — |
| `/servicos` | "Iniciar Caminho de Resolução" | "Falar no WhatsApp" |
| `/duvidas` | "Iniciar Caminho de Resolução" | "Falar no WhatsApp" |
| `/contato` | "Enviar mensagem" (formulário) | "Falar no WhatsApp" |
| `/obrigado` | "Ver conteúdos" | "Seguir no Instagram" |

---

## 5. Eventos de Conversão

### 5.1 Google Analytics 4

```typescript
// Eventos customizados para GA4
const conversionEvents = {
  // Formulários
  'form_start': 'Início de preenchimento do formulário',
  'form_submit': 'Envio do formulário',
  'form_success': 'Formulário salvo com sucesso',
  'form_error': 'Erro no envio do formulário',

  // WhatsApp
  'whatsapp_click': 'Clique no botão de WhatsApp',
  'whatsapp_floating_click': 'Clique no WhatsApp flutuante',

  // Navegação
  'bio_button_click': 'Clique em botão da página bio',
  'cta_click': 'Clique em CTA',
  'service_view': 'Visualização de página de atendimento',
  'product_view': 'Visualização de página de produto',
  'article_read': 'Leitura de artigo (scroll 75%)',

  // Scroll
  'scroll_25': 'Scroll 25%',
  'scroll_50': 'Scroll 50%',
  'scroll_75': 'Scroll 75%',
  'scroll_100': 'Scroll 100%',

  // Engajamento
  'faq_open': 'Abertura de FAQ',
  'menu_open': 'Abertura do menu mobile',
};
```

### 5.2 Meta Pixel

```typescript
// Eventos para Meta Pixel
const metaEvents = {
  'Lead': 'Envio de formulário (Caminho de Resolução)',
  'Contact': 'Clique WhatsApp',
  'ViewContent': 'Visualização de atendimento/produto',
  'InitiateCheckout': 'Clique em CTA de produto',
  'PageView': 'Visualização de página (automático)',
};
```

### 5.3 Implementação

```typescript
// lib/analytics.ts
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }

  // Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
}
```

---

## 6. Lead Scoring (Futuro)

### 6.1 Modelo de Pontuação

| Ação | Pontos |
|------|--------|
| Visita à Home | +5 |
| Visita a atendimento | +10 |
| Visita a Caminho de Resolução | +15 |
| Scroll 75% em página de conversão | +10 |
| Leitura de artigo | +5 |
| Clique em WhatsApp | +20 |
| Envio de formulário | +50 |
| Visita recorrente (2+ sessões) | +15 |

### 6.2 Classificação

| Pontuação | Classificação | Ação |
|-----------|--------------|------|
| 0-10 | Frio | Nutrir com conteúdo |
| 11-30 | Morno | Remarketing |
| 31-50 | Quente | Contato ativo |
| 50+ | Muito Quente | Prioridade máxima |

---

## 7. Pós-Conversão

### 7.1 Página /obrigado

**Elementos**:
1. Confirmação: "Recebemos suas informações"
2. Expectativa: "Em até 24h, nossa equipe entrará em contato"
3. Enquanto espera: Links para conteúdos relevantes
4. Social proof: Seguir no Instagram
5. Tracking: Evento `conversion` disparado

### 7.2 Follow-up (Manual/Futuro)

```
1. Lead recebido (Supabase)
2. Equipe analisa dor_principal e identificacao
3. Contato via WhatsApp no horário indicado
4. Agendamento de primeira conversa
5. Atendimento
```

---

## 8. Otimização de Conversão

### 8.1 Princípios

1. **Diagnóstico antes de oferta** — Não venda direto. Primeiro identifique.
2. **Uma ação por contexto** — Cada seção tem um CTA claro.
3. **Redução de fricção** — Formulário curto (3 obrigatórios + 3 opcionais).
4. **Social proof** — Depoimentos quando disponíveis.
5. **Urgência responsável** — "O custo de não agir" sem manipulação.
6. **Consistência visual** — CTA sempre dourado, sempre visível.

### 8.2 Testes Futuros (A/B)

| Teste | Variável | Métrica |
|-------|----------|---------|
| Headline Home | Versão A vs B | Scroll depth |
| CTA text | "Começar agora" vs "Iniciar Caminho" | CTR |
| Form fields | Com/sem campos opcionais | Completion rate |
| Hero image | Com foto vs sem foto | Bounce rate |
| WhatsApp position | Bottom-right vs bottom-left | Click rate |

---

## 9. Compliance

### 9.1 LGPD
- Consentimento explícito no formulário
- Política de privacidade acessível
- Dados mínimos necessários
- Direito de exclusão (implementar via Supabase)

### 9.2 CFP (Conselho Federal de Psicologia)
- Não prometer resultados
- Não usar termos proibidos
- Incluir CRP em materiais
- Respeitar código de ética em publicidade

### 9.3 Cookies
- Banner de cookies (GA, Meta Pixel)
- Opção de recusar cookies não-essenciais
- Documentar cookies utilizados
