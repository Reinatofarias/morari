import { NextResponse } from 'next/server';
import { formatPhone, parseTags, sanitizeLeadInput } from '@/lib/crm/normalize';
import { chunk, crmError, crmUnauthorized, fetchAllRows, getCrmClient } from '@/lib/crm/server';
import type { CrmLeadInput } from '@/lib/crm/types';

export const dynamic = 'force-dynamic';

const MAX_ROWS = 10000;

type ImportBody = {
  rows?: unknown;
  stage_id?: unknown;
  source?: unknown;
  tag?: unknown;
  duplicates?: unknown;
};

type ExistingLead = { id: string; email: string | null; phone: string | null; tags: string[] | null };

export async function POST(request: Request) {
  const denied = await crmUnauthorized();
  if (denied) return denied;

  try {
    const body = (await request.json().catch(() => ({}))) as ImportBody;
    const rawRows = Array.isArray(body.rows) ? body.rows.slice(0, MAX_ROWS) : [];
    const stageId = typeof body.stage_id === 'string' && body.stage_id ? body.stage_id : null;
    const defaultSource = typeof body.source === 'string' ? body.source.trim().slice(0, 120) : '';
    const batchTags = parseTags(body.tag);
    const updateDuplicates = body.duplicates === 'update';
    const batchName = `import-${new Date().toISOString().slice(0, 16)}`;

    if (rawRows.length === 0) {
      return NextResponse.json({ error: 'Nenhuma linha para importar.' }, { status: 400 });
    }

    const existing = await fetchAllRows<ExistingLead>('crm_leads', 'id, email, phone, tags');
    const byEmail = new Map<string, ExistingLead>();
    const byPhone = new Map<string, ExistingLead>();
    for (const lead of existing) {
      if (lead.email) byEmail.set(lead.email, lead);
      if (lead.phone) byPhone.set(lead.phone, lead);
    }

    const toInsert: CrmLeadInput[] = [];
    const toUpdate: { id: string; input: CrmLeadInput }[] = [];
    let skipped = 0;
    let invalid = 0;
    const seenInFile = new Set<string>();

    for (const raw of rawRows) {
      if (!raw || typeof raw !== 'object') {
        invalid += 1;
        continue;
      }
      const input = sanitizeLeadInput(raw as Record<string, unknown>);
      delete input.stage_id;
      if (!input.name) {
        input.name = input.email ?? (input.phone ? formatPhone(input.phone) : undefined);
      }
      if (!input.name) {
        invalid += 1;
        continue;
      }

      const fileKey = input.email ?? input.phone;
      if (fileKey) {
        if (seenInFile.has(fileKey)) {
          skipped += 1;
          continue;
        }
        seenInFile.add(fileKey);
      }

      input.tags = Array.from(new Set([...(input.tags ?? []), ...batchTags]));
      if (!input.source && defaultSource) input.source = defaultSource;

      const match = (input.email && byEmail.get(input.email)) || (input.phone && byPhone.get(input.phone)) || null;
      if (match) {
        if (updateDuplicates) {
          const update: CrmLeadInput = {};
          for (const [key, value] of Object.entries(input)) {
            if (value === null || value === undefined || value === '') continue;
            if (key === 'tags') {
              update.tags = Array.from(new Set([...(match.tags ?? []), ...(value as string[])]));
            } else {
              (update as Record<string, unknown>)[key] = value;
            }
          }
          toUpdate.push({ id: match.id, input: update });
        } else {
          skipped += 1;
        }
        continue;
      }

      toInsert.push({ ...input, stage_id: stageId });
    }

    const supabase = getCrmClient();

    if (!stageId && toInsert.length > 0) {
      const { data: first } = await supabase.from('crm_stages').select('id').order('position').limit(1).maybeSingle();
      for (const lead of toInsert) lead.stage_id = first?.id ?? null;
    }

    let inserted = 0;
    for (const batch of chunk(toInsert, 500)) {
      const records = batch.map((lead) => ({ ...lead, import_batch: batchName }));
      const { data, error } = await supabase.from('crm_leads').insert(records).select('id');
      if (error) throw error;
      inserted += data?.length ?? 0;
      if (data?.length) {
        await supabase.from('crm_activities').insert(
          data.map((row) => ({ lead_id: row.id, type: 'sistema', content: 'Lead importado de planilha.' }))
        );
      }
    }

    let updated = 0;
    for (const { id, input } of toUpdate) {
      const { error } = await supabase.from('crm_leads').update(input).eq('id', id);
      if (error) throw error;
      updated += 1;
    }

    return NextResponse.json({ inserted, updated, skipped, invalid, batch: batchName });
  } catch (error) {
    return crmError(error);
  }
}
