import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { describeAgendaError, getAgendaAdminClient } from '@/lib/agenda/admin-server';

export const getCrmClient = getAgendaAdminClient;

export async function crmUnauthorized() {
  if (await isAdminAuthenticated()) return null;
  return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
}

export function crmError(error: unknown, status = 500) {
  const detail = describeAgendaError(error);
  console.error('[crm]', detail);
  const message =
    detail === 'missing_supabase_config'
      ? 'Supabase não configurado (SUPABASE_SERVICE_ROLE_KEY ausente).'
      : typeof detail === 'object' && detail.code === '42P01'
        ? 'Tabelas do CRM não encontradas. Rode a migração supabase/migrations/20261007150000_create_crm_schema.sql.'
        : typeof detail === 'string'
          ? detail
          : detail.message ?? 'Erro inesperado no CRM.';
  return NextResponse.json({ error: message }, { status });
}

export async function logActivity(leadId: string, type: string, content: string) {
  try {
    await getCrmClient().from('crm_activities').insert({ lead_id: leadId, type, content });
  } catch (error) {
    console.error('[crm] activity log failed', describeAgendaError(error));
  }
}

export function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

// O Supabase devolve no máximo 1000 linhas por consulta; esta função pagina até trazer tudo.
export async function fetchAllRows<T>(table: string, columns: string, order = 'created_at'): Promise<T[]> {
  const supabase = getCrmClient();
  const pageSize = 1000;
  const rows: T[] = [];
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await supabase
      .from(table)
      .select(columns)
      .order(order, { ascending: false })
      .order('id')
      .range(from, from + pageSize - 1);
    if (error) throw error;
    rows.push(...((data ?? []) as T[]));
    if (!data || data.length < pageSize) break;
  }
  return rows;
}
