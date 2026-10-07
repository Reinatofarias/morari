import { NextResponse } from 'next/server';
import { parseTags } from '@/lib/crm/normalize';
import { chunk, crmError, crmUnauthorized, getCrmClient } from '@/lib/crm/server';

export const dynamic = 'force-dynamic';

type BulkBody = { ids?: unknown; action?: unknown; stage_id?: unknown; tag?: unknown };

export async function POST(request: Request) {
  const denied = await crmUnauthorized();
  if (denied) return denied;

  try {
    const body = (await request.json().catch(() => ({}))) as BulkBody;
    const ids = Array.isArray(body.ids) ? body.ids.filter((id): id is string => typeof id === 'string') : [];
    if (ids.length === 0) return NextResponse.json({ error: 'Nenhum lead selecionado.' }, { status: 400 });

    const supabase = getCrmClient();

    const batches = chunk(ids, 200);

    if (body.action === 'delete') {
      for (const batch of batches) {
        const { error } = await supabase.from('crm_leads').delete().in('id', batch);
        if (error) throw error;
      }
    } else if (body.action === 'move' && typeof body.stage_id === 'string') {
      const stageId = body.stage_id;
      const { data: stage } = await supabase.from('crm_stages').select('name').eq('id', stageId).maybeSingle();
      for (const batch of batches) {
        const { error } = await supabase.from('crm_leads').update({ stage_id: stageId }).in('id', batch);
        if (error) throw error;
        await supabase.from('crm_activities').insert(
          batch.map((leadId) => ({
            lead_id: leadId,
            type: 'etapa',
            content: `Movido em massa para: ${stage?.name ?? 'outra etapa'}`,
          }))
        );
      }
    } else if (body.action === 'tag') {
      const [tag] = parseTags(body.tag);
      if (!tag) return NextResponse.json({ error: 'Informe a etiqueta.' }, { status: 400 });
      const leads: { id: string; tags: string[] | null }[] = [];
      for (const batch of batches) {
        const { data, error } = await supabase.from('crm_leads').select('id, tags').in('id', batch);
        if (error) throw error;
        leads.push(...(data ?? []));
      }
      for (const lead of leads) {
        const tags: string[] = Array.isArray(lead.tags) ? lead.tags : [];
        if (tags.includes(tag)) continue;
        const { error: updateError } = await supabase
          .from('crm_leads')
          .update({ tags: [...tags, tag] })
          .eq('id', lead.id);
        if (updateError) throw updateError;
      }
    } else {
      return NextResponse.json({ error: 'Ação inválida.' }, { status: 400 });
    }

    return NextResponse.json({ ok: true, count: ids.length });
  } catch (error) {
    return crmError(error);
  }
}
