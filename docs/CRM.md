# CRM de leads (/admin/crm)

Área do painel admin para gestão comercial de leads, no estilo Pipedrive.

## Telas

| Rota | O que faz |
|------|-----------|
| `/admin/crm` | Funil em colunas (kanban). Arraste os cards entre as etapas; números de leads em aberto, valor no funil, ganhos do mês e follow-ups atrasados. |
| `/admin/crm/prospeccao` | Fila de contatos: atrasados, hoje, próximos 7 dias, nunca contatados e sem próxima ação. Botão de WhatsApp com mensagem padrão (`{nome}`, `{empresa}`) e registro rápido do contato. |
| `/admin/crm/leads` | Lista com busca, filtros por etapa/origem/etiqueta, ações em massa (mover, etiquetar, excluir) e exportação CSV. |
| `/admin/crm/leads/[id]` | Ficha do lead: dados, barra de etapas clicável, notas, ligações, WhatsApp, e-mails, reuniões, tarefas com prazo e histórico. |
| `/admin/crm/importar` | Importa planilhas `.xlsx` ou `.csv`, com detecção automática das colunas, etapa inicial, origem, etiqueta da lista e tratamento de duplicados (mesmo e-mail ou telefone). |
| `/admin/crm/etapas` | Edita nomes, cores, ordem e tipo (em aberto, ganho, perdido) das etapas. |

Leads que chegam pelo formulário do site (tabela `leads`) entram sozinhos no funil, na primeira etapa, sempre que o CRM é aberto.

## Configuração

1. Rodar a migração `supabase/migrations/20261007150000_create_crm_schema.sql` no Supabase (SQL Editor ou `supabase db push`). Ela cria `crm_stages`, `crm_leads` e `crm_activities` com RLS ligada e as etapas iniciais.
2. Variáveis de ambiente na Vercel:
   - `SUPABASE_SERVICE_ROLE_KEY` (já usada pela agenda): o CRM só acessa o banco pelo servidor.
   - `ADMIN_PASSWORD`: senha do `/admin`. Se não existir, usa `ADMIN_PANEL_PASSWORD`.
   - `ADMIN_EMAIL` (opcional): e-mail de login, padrão `admin@matheusmorari.com.br`.
   - `ADMIN_SESSION_SECRET` (recomendado): texto longo e aleatório para assinar a sessão.
