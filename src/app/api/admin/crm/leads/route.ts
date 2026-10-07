import { NextResponse } from 'next/server';
import { sanitizeLeadInput } from '@/lib/crm/normalize';
import { crmError, crmUnauthorized, fetchAllRows, getCrmClient, logActivity } from '@/lib/crm/server';
import type { CrmLead } from '@/lib/crm/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  const denied = await crmUnauthorized();
  if (denied) return denied;

  try {
    const supabase = getCrmClient();
    const [leads, stages] = await Promise.all([
      fetchAllRows<CrmLead>('crm_leads', '*'),
      supabase.from('crm_stages').select('*').order('position'),
    ]);
    if (stages.error) throw stages.error;
    return NextResponse.json({ leads, stages: stages.data ?? [] });
  } catch (error) {
    return crmError(error);
  }
}

export async function POST(request: Request) {
  const denied = await crmUnauthorized();
  if (denied) return denied;

  try {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const input = sanitizeLeadInput(body);
    if (!input.name) {
      return NextResponse.json({ error: 'Informe o nome do lead.' }, { status: 400 });
    }

    const supabase = getCrmClient();
    if (!input.stage_id) {
      const { data: first } = await supabase.from('crm_stages').select('id').order('position').limit(1).maybeSingle();
      input.stage_id = first?.id ?? null;
    }

    const { data, error } = await supabase.from('crm_leads').insert(input).select('*').single();
    if (error) throw error;
    await logActivity(data.id, 'sistema', 'Lead criado manualmente no CRM.');
    return NextResponse.json({ lead: data });
  } catch (error) {
    return crmError(error);
  }
}
