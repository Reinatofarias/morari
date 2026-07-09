# ADR-006: Privacy, LGPD and Ethics

**Status**: Aceito
**Data**: 2026-07-09
**Decisores**: Time Jurídico + Produto

---

## Contexto

O projeto lida com saúde mental, dados pessoais sensíveis e comunicação profissional regulada pelo CFP (Conselho Federal de Psicologia). Requer atenção especial a privacidade, ética e compliance.

## Decisão

### LGPD (Lei Geral de Proteção de Dados)

#### Dados Coletados

| Dado | Base Legal | Finalidade | Retenção |
|------|-----------|-----------|----------|
| Nome | Consentimento | Identificação para contato | Até exclusão solicitada |
| WhatsApp | Consentimento | Canal de contato | Até exclusão solicitada |
| Email | Consentimento | Canal de contato e comunicação | Até exclusão solicitada |
| Dor principal | Consentimento | Qualificação do atendimento | Até exclusão solicitada |
| Identificação (tipo) | Consentimento | Direcionamento do atendimento | Até exclusão solicitada |
| Horário preferido | Consentimento | Agendamento | Até exclusão solicitada |
| Cookies analytics | Consentimento | Análise de comportamento | Conforme ferramenta |

#### Implementação

1. **Consentimento no formulário**: Checkbox obrigatório com texto claro sobre uso dos dados.
2. **Banner de cookies**: Implementar banner com opção de aceitar/recusar cookies não-essenciais.
3. **Política de privacidade**: Página `/privacidade` com detalhamento completo.
4. **Direito de exclusão**: Processo manual via Supabase dashboard (automatizar no futuro).
5. **Dados mínimos**: Coletar apenas o necessário para a finalidade declarada.

#### Texto de Consentimento (Formulário)

```
☐ Concordo com o tratamento dos meus dados pessoais conforme a Política de 
Privacidade. Entendo que meus dados serão usados exclusivamente para contato 
profissional e poderei solicitar exclusão a qualquer momento.
```

### Ética Profissional (CFP)

#### Regras para Publicidade em Psicologia

**Resolução CFP nº 010/2024** (e anteriores):

1. **Identificação obrigatória**: Nome, CRP e especialidade em todos os materiais.
2. **Proibido**:
   - Garantir resultados
   - Fazer diagnósticos públicos
   - Usar depoimentos de pacientes (com exceções regulamentadas)
   - Sensacionalismo ou autopromoção exagerada
   - Prometer cura
3. **Permitido**:
   - Informar sobre serviços
   - Educar sobre saúde mental
   - Divulgar formação e abordagem
   - Informar modalidades de atendimento

#### Implementação no Site

| Requisito | Implementação |
|-----------|--------------|
| CRP visível | Footer de todas as páginas |
| Sem promessa de cura | Copy guide + revisão |
| Aviso de emergência | Páginas de atendimento e conteúdo sensível |
| Sem diagnóstico público | Linguagem de possibilidade ("pode estar vivendo...") |
| Sem depoimentos falsificados | Seção de depoimentos desativada até ter reais |
| Informação educativa | Artigos com base em evidências |

#### Aviso de Emergência (Obrigatório)

Incluir em páginas sensíveis (`/atendimentos/*`, `/caminho-de-resolucao`, artigos sobre crise):

```
⚠️ Se você está em situação de crise ou risco imediato:
• CVV (Centro de Valorização da Vida) — Ligue 188 (24h) ou acesse cvv.org.br
• SAMU — Ligue 192
• Busque o pronto-socorro ou UPA mais próxima
Este site não substitui atendimento de emergência.
```

### Cookies

#### Categorias

| Categoria | Cookies | Obrigatório |
|-----------|---------|-------------|
| Essenciais | Sessão, preferências | Sim (sem consentimento) |
| Analytics | Google Analytics 4 | Não (requer consentimento) |
| Marketing | Meta Pixel | Não (requer consentimento) |

#### Implementação

1. Banner no primeiro acesso
2. Cookies não-essenciais bloqueados até consentimento
3. Opção de gerenciar preferências
4. Armazenar preferência em localStorage

### Segurança de Dados

1. **HTTPS**: Forçado pela Vercel
2. **Inputs sanitizados**: Zod validation no formulário
3. **RLS (Row Level Security)**: Configurar no Supabase
4. **API rate limiting**: Implementar no API route de leads
5. **Variáveis sensíveis**: Apenas em environment variables (nunca no código)

### Acessibilidade

Embora não seja estritamente LGPD/ética, acessibilidade é ética:

1. **WCAG 2.1 AA**: Contraste, navegação por teclado, semântica
2. **Skip to content**: Link de atalho
3. **ARIA labels**: Em todos os elementos interativos
4. **Alt text**: Em todas as imagens
5. **Focus visible**: Outline dourado nos elementos focados

## Consequências

### Positivas
- Compliance com LGPD desde o lançamento
- Respeito às normas do CFP
- Confiança do público-alvo (profissionais sérios)
- Proteção legal

### Negativas
- Banner de cookies pode afetar UX
- Processo de exclusão de dados é manual no MVP
- Algumas limitações na copy por regulamentação do CFP
- Necessidade de revisão jurídica dos textos finais
