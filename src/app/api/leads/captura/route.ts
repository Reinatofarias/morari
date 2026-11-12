import { NextResponse } from 'next/server';
import { normalizePhone } from '@/lib/crm/normalize';
import { getCrmClient } from '@/lib/crm/server';

export const dynamic = 'force-dynamic';

// Cópia do lead do /captura para o CRM (/admin/crm).
// O envio principal continua sendo o do Make → Google Sheets, feito direto pela página.
// Esta rota nunca bloqueia nem atrasa o lead: qualquer falha aqui só fica no log.

function text(value: unknown, max = 500) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 });
  }

  const nome = text(body.nome, 120);
  const phone = normalizePhone(text(body.whatsapp, 40));
  const perfil = text(body.perfil, 120);
  const desafio = text(body.desafio, 1000);

  if (!nome || !phone || phone.length < 12 || phone.length > 15) {
    return NextResponse.json({ error: 'Nome e WhatsApp são obrigatórios.' }, { status: 400 });
  }

  const notes = [perfil && `Profissão: ${perfil}`, desafio && `Maior dor: ${desafio}`].filter(Boolean).join('\n');

  try {
    const supabase = getCrmClient();

    // Se o telefone já existe no CRM, registra a nova entrada no histórico em vez de duplicar.
    const { data: existing } = await supabase
      .from('crm_leads')
      .select('id')
      .eq('phone', phone)
      .limit(1)
      .maybeSingle();

    if (existing?.id) {
      await supabase.from('crm_activities').insert({
        lead_id: existing.id,
        type: 'sistema',
        content: `Preencheu de novo o formulário do /captura.${notes ? `\n${notes}` : ''}`,
      });
      return NextResponse.json({ ok: true, duplicate: true });
    }

    const { data: first } = await supabase.from('crm_stages').select('id').order('position').limit(1).maybeSingle();

    const { data: created, error } = await supabase
      .from('crm_leads')
      .insert({
        name: nome,
        phone,
        job_title: perfil || null,
        source: 'Anúncio · /captura',
        stage_id: first?.id ?? null,
        tags: ['site', 'captura'],
        notes: notes || null,
      })
      .select('id')
      .single();
    if (error) throw error;

    await supabase.from('crm_activities').insert({
      lead_id: created.id,
      type: 'sistema',
      content: 'Lead recebido pela página /captura (anúncios).',
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error('[captura → crm]', error);
    return NextResponse.json({ error: 'Não foi possível salvar no CRM.' }, { status: 500 });
  }
}
