import { NextResponse } from 'next/server';
import { crmError, crmUnauthorized, getCrmClient } from '@/lib/crm/server';

export const dynamic = 'force-dynamic';

export async function PATCH(request: Request, ctx: RouteContext<'/api/admin/crm/activities/[id]'>) {
  const denied = await crmUnauthorized();
  if (denied) return denied;

  try {
    const { id } = await ctx.params;
    const body = (await request.json().catch(() => ({}))) as { done?: unknown };
    const { data, error } = await getCrmClient()
      .from('crm_activities')
      .update({ done: body.done === true })
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    return NextResponse.json({ activity: data });
  } catch (error) {
    return crmError(error);
  }
}

export async function DELETE(_request: Request, ctx: RouteContext<'/api/admin/crm/activities/[id]'>) {
  const denied = await crmUnauthorized();
  if (denied) return denied;

  try {
    const { id } = await ctx.params;
    const { error } = await getCrmClient().from('crm_activities').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    return crmError(error);
  }
}
