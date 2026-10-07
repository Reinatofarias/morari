import { NextResponse } from 'next/server';
import { crmError, crmUnauthorized, getCrmClient } from '@/lib/crm/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const denied = await crmUnauthorized();
  if (denied) return denied;

  try {
    const { data, error } = await getCrmClient().from('crm_stages').select('*').order('position');
    if (error) throw error;
    return NextResponse.json({ stages: data ?? [] });
  } catch (error) {
    return crmError(error);
  }
}

type StagePayload = { id?: string; name?: string; color?: string; kind?: string };

// Salva o funil inteiro de uma vez: ordem, nomes, cores, tipo e etapas removidas.
export async function PUT(request: Request) {
  const denied = await crmUnauthorized();
  if (denied) return denied;

  try {
    const body = (await request.json().catch(() => ({}))) as { stages?: StagePayload[]; deleted?: string[] };
    const stages = Array.isArray(body.stages) ? body.stages : [];
    const deleted = Array.isArray(body.deleted) ? body.deleted.filter((id) => typeof id === 'string') : [];

    if (stages.length === 0) {
      return NextResponse.json({ error: 'O funil precisa de pelo menos uma etapa.' }, { status: 400 });
    }

    const supabase = getCrmClient();

    for (const [position, stage] of stages.entries()) {
      const record = {
        name: String(stage.name ?? '').trim().slice(0, 80) || `Etapa ${position + 1}`,
        color: String(stage.color ?? 'slate').slice(0, 20),
        kind: stage.kind === 'won' || stage.kind === 'lost' ? stage.kind : 'open',
        position,
      };
      const { error } = stage.id
        ? await supabase.from('crm_stages').update(record).eq('id', stage.id)
        : await supabase.from('crm_stages').insert(record);
      if (error) throw error;
    }

    if (deleted.length > 0) {
      // Leads de etapas removidas vão para a primeira etapa do funil.
      const { data: first } = await supabase
        .from('crm_stages')
        .select('id')
        .not('id', 'in', `(${deleted.join(',')})`)
        .order('position')
        .limit(1)
        .maybeSingle();
      if (first) {
        await supabase.from('crm_leads').update({ stage_id: first.id }).in('stage_id', deleted);
      }
      const { error } = await supabase.from('crm_stages').delete().in('id', deleted);
      if (error) throw error;
    }

    const { data, error } = await supabase.from('crm_stages').select('*').order('position');
    if (error) throw error;
    return NextResponse.json({ stages: data ?? [] });
  } catch (error) {
    return crmError(error);
  }
}
