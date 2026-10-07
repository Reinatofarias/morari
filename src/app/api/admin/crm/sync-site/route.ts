import { NextResponse } from 'next/server';
import { normalizeEmail, normalizePhone } from '@/lib/crm/normalize';
import { crmError, crmUnauthorized, fetchAllRows, getCrmClient } from '@/lib/crm/server';

export const dynamic = 'force-dynamic';

type SiteLead = {
  id: string;
  nome: string | null;
  whatsapp: string | null;
  email: string | null;
  dor_principal: string | null;
  identificacao: string | null;
  melhor_horario: string | null;
  origem: string | null;
  created_at: string;
};

type ExistingLead = { site_lead_id: string | null; email: string | null; phone: string | null };

// Traz para o CRM os leads que chegaram pelos formulários do site (tabela public.leads).
export async function POST() {
  const denied = await crmUnauthorized();
  if (denied) return denied;

  try {
    const supabase = getCrmClient();
    const { data: siteLeads, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1000);
    if (error) {
      // Sem tabela de leads do site: nada a sincronizar.
      if (error.code === '42P01') return NextResponse.json({ imported: 0 });
      throw error;
    }

    const existing = await fetchAllRows<ExistingLead>('crm_leads', 'site_lead_id, email, phone');
    const knownSiteIds = new Set(existing.map((lead) => lead.site_lead_id).filter(Boolean));
    const knownEmails = new Set(existing.map((lead) => lead.email).filter(Boolean));
    const knownPhones = new Set(existing.map((lead) => lead.phone).filter(Boolean));

    const { data: first } = await supabase.from('crm_stages').select('id').order('position').limit(1).maybeSingle();

    const records = ((siteLeads ?? []) as SiteLead[])
      .filter((lead) => !knownSiteIds.has(lead.id))
      .filter((lead) => {
        const email = normalizeEmail(lead.email);
        const phone = normalizePhone(lead.whatsapp);
        return !(email && knownEmails.has(email)) && !(phone && knownPhones.has(phone));
      })
      .map((lead) => ({
        name: lead.nome?.trim() || lead.email || 'Lead do site',
        email: normalizeEmail(lead.email),
        phone: normalizePhone(lead.whatsapp),
        source: `Site${lead.origem ? ` · ${lead.origem}` : ''}`,
        stage_id: first?.id ?? null,
        tags: ['site'],
        notes: [
          lead.dor_principal && `Dor principal: ${lead.dor_principal}`,
          lead.identificacao && `Identificação: ${lead.identificacao}`,
          lead.melhor_horario && `Melhor horário: ${lead.melhor_horario}`,
        ]
          .filter(Boolean)
          .join('\n') || null,
        site_lead_id: lead.id,
        created_at: lead.created_at,
      }));

    if (records.length === 0) return NextResponse.json({ imported: 0 });

    const { data, error: insertError } = await supabase.from('crm_leads').insert(records).select('id');
    if (insertError) throw insertError;
    if (data?.length) {
      await supabase.from('crm_activities').insert(
        data.map((row) => ({ lead_id: row.id, type: 'sistema', content: 'Lead recebido pelo formulário do site.' }))
      );
    }
    return NextResponse.json({ imported: data?.length ?? 0 });
  } catch (error) {
    return crmError(error);
  }
}
