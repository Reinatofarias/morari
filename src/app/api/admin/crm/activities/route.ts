import { NextResponse } from 'next/server';
import { crmError, crmUnauthorized, getCrmClient } from '@/lib/crm/server';
import { CRM_ACTIVITY_TYPES } from '@/lib/crm/types';

export const dynamic = 'force-dynamic';

const CONTACT_TYPES = new Set(['ligacao', 'whatsapp', 'email', 'reuniao']);

export async function POST(request: Request) {
  const denied = await crmUnauthorized();
  if (denied) return denied;

  try {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const leadId = typeof body.lead_id === 'string' ? body.lead_id : '';
    const type = CRM_ACTIVITY_TYPES.some((item) => item.value === body.type) ? String(body.type) : 'nota';
    const content = typeof body.content === 'string' ? body.content.trim().slice(0, 5000) : '';
    const dueAt = typeof body.due_at === 'string' && body.due_at ? new Date(body.due_at) : null;

    if (!leadId) return NextResponse.json({ error: 'Lead não informado.' }, { status: 400 });
    if (!content) return NextResponse.json({ error: 'Escreva o conteúdo da atividade.' }, { status: 400 });

    const supabase = getCrmClient();
    const { data, error } = await supabase
      .from('crm_activities')
      .insert({
        lead_id: leadId,
        type,
        content,
        due_at: dueAt && !Number.isNaN(dueAt.getTime()) ? dueAt.toISOString() : null,
        done: type !== 'tarefa',
      })
      .select('*')
      .single();
    if (error) throw error;

    if (CONTACT_TYPES.has(type)) {
      await supabase.from('crm_leads').update({ last_contact_at: new Date().toISOString() }).eq('id', leadId);
    }

    return NextResponse.json({ activity: data });
  } catch (error) {
    return crmError(error);
  }
}
