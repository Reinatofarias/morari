# ADR-004: Conversion Funnel

**Status**: Aceito
**Data**: 2026-07-09
**Decisores**: Time de Produto + Conversão

---

## Contexto

O projeto precisa converter visitantes em leads qualificados para atendimento psicológico. A conversão não pode ser agressiva (ética profissional), mas precisa ser efetiva.

## Decisão

### Modelo: Diagnóstico Antes de Oferta

Em vez de "vender" diretamente, o funil segue a lógica:
1. **Identificação** → "Isso parece comigo"
2. **Diagnóstico** → "O que está acontecendo comigo?"
3. **Custo** → "O que eu perco se não agir?"
4. **Caminho** → "Existe um próximo passo"
5. **Ação** → "Vou dar o primeiro passo"

### Ponto Principal de Conversão: Caminho de Resolução

O `/caminho-de-resolucao` é a página central do funil. Não é uma "página de vendas" — é um "diagnóstico emocional" que conduz para formulário.

**Formulário simplificado**:
- 3 campos obrigatórios (nome, WhatsApp, email)
- 3 campos opcionais (dor, identificação, horário)
- Motivo: Reduzir fricção mantendo dados qualificados

### Hierarquia de CTAs

1. **Primário**: "Iniciar Caminho de Resolução" (dourado, visível)
2. **Secundário**: "Conhecer atendimentos" / "Falar no WhatsApp"
3. **Terciário**: "Ver conteúdos" / "Saber mais"

Nunca mais de 2 CTAs visíveis simultâneos por viewport.

### WhatsApp como Canal de Apoio

- Botão flutuante sempre visível
- Mensagem pré-preenchida
- Tracking de cliques
- Não é CTA primário (exceto em `/contato`)

### Eventos de Conversão

Todos os eventos são disparados via `lib/analytics.ts` com wrapper que envia para GA4 e Meta Pixel simultaneamente.

## Consequências

### Positivas
- Funil ético e alinhado com psicologia
- Dados qualificados (campos opcionais dão contexto)
- Tracking completo para otimização
- WhatsApp como canal de confiança

### Negativas
- Conversão pode ser mais lenta que funis agressivos
- Depende de follow-up manual (sem automação no MVP)
