import { NextResponse } from 'next/server';
import { sanitizeLeadInput } from '@/lib/crm/normalize';
import { crmError, crmUnauthorized, getCrmClient, logActivity } from '@/lib/crm/server';

export const dynamic = 'force-dynamic';

export async function GET(_request: Request, ctx: RouteContext<'/api/admin/crm/leads/[id]'>) {
  const denied = await crmUnauthorized();
  if (denied) return denied;

  try {
    const { id } = await ctx.params;
    const supabase = getCrmClient();
    const [lead, activities, stages] = await Promise.all([
      supabase.from('crm_leads').select('*').eq('id', id).maybeSingle(),
      supabase.from('crm_activities').select('*').eq('lead_id', id).order('created_at', { ascending: false }),
      supabase.from('crm_stages').select('*').order('position'),
    ]);
    if (lead.error) throw lead.error;
    if (!lead.data) return NextResponse.json({ error: 'Lead não encontrado.' }, { status: 404 });
    if (activities.error) throw activities.error;
    if (stages.error) throw stages.error;
    return NextResponse.json({ lead: lead.data, activities: activities.data ?? [], stages: stages.data ?? [] });
  } catch (error) {
    return crmError(error);
  }
}

export async function PATCH(request: Request, ctx: RouteContext<'/api/admin/crm/leads/[id]'>) {
  const denied = await crmUnauthorized();
  if (denied) return denied;

  try {
    const { id } = await ctx.params;
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const input = sanitizeLeadInput(body);
    if ('name' in input && !input.name) {
      return NextResponse.json({ error: 'O nome não pode ficar vazio.' }, { status: 400 });
    }

    const supabase = getCrmClient();
    const { data: before, error: beforeError } = await supabase
      .from('crm_leads')
      .select('stage_id')
      .eq('id', id)
      .maybeSingle();
    if (beforeError) throw beforeError;
    if (!before) return NextResponse.json({ error: 'Lead não encontrado.' }, { status: 404 });

    const { data, error } = await supabase.from('crm_leads').update(input).eq('id', id).select('*').single();
    if (error) throw error;

    if ('stage_id' in input && input.stage_id !== before.stage_id) {
      const ids = [before.stage_id, input.stage_id].filter(Boolean) as string[];
      const { data: stages } = await supabase.from('crm_stages').select('id, name').in('id', ids);
      const nameOf = (stageId: string | null | undefined) =>
        stages?.find((stage) => stage.id === stageId)?.name ?? 'sem etapa';
      await logActivity(id, 'etapa', `Etapa alterada: ${nameOf(before.stage_id)} → ${nameOf(input.stage_id)}`);
    }

    return NextResponse.json({ lead: data });
  } catch (error) {
    return crmError(error);
  }
}

export async function DELETE(_request: Request, ctx: RouteContext<'/api/admin/crm/leads/[id]'>) {
  const denied = await crmUnauthorized();
  if (denied) return denied;

  try {
    const { id } = await ctx.params;
    const { error } = await getCrmClient().from('crm_leads').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    return crmError(error);
  }
}
