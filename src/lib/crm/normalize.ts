import { CRM_LEAD_EDITABLE_FIELDS, type CrmLeadInput } from './types';

export function onlyDigits(value: string | null | undefined) {
  return (value ?? '').replace(/\D/g, '');
}

// Guarda telefones só com dígitos e com DDI 55 quando vier no formato nacional (DDD + número).
export function normalizePhone(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  let digits = onlyDigits(String(value));
  if (!digits) return null;
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (digits.length === 10 || digits.length === 11) digits = `55${digits}`;
  return digits;
}

export function formatPhone(value: string | null | undefined) {
  const digits = onlyDigits(value);
  if (!digits) return '';
  const local = digits.startsWith('55') && digits.length >= 12 ? digits.slice(2) : digits;
  if (local.length === 11) return `(${local.slice(0, 2)}) ${local.slice(2, 7)}-${local.slice(7)}`;
  if (local.length === 10) return `(${local.slice(0, 2)}) ${local.slice(2, 6)}-${local.slice(6)}`;
  return `+${digits}`;
}

export function whatsappLink(phone: string | null | undefined, message?: string) {
  const digits = normalizePhone(phone);
  if (!digits) return null;
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}

export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const email = value.trim().toLowerCase();
  return email || null;
}

function cleanText(value: unknown, max = 2000): string | null {
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  return text ? text.slice(0, max) : null;
}

export function parseMoney(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  let text = String(value).replace(/[^\d,.-]/g, '');
  if (!text) return null;
  // "1.234,56" (BR) -> 1234.56 ; "1234.56" -> 1234.56
  if (text.includes(',')) text = text.replace(/\./g, '').replace(',', '.');
  const parsed = Number(text);
  return Number.isFinite(parsed) ? parsed : null;
}

export function parseTags(value: unknown): string[] {
  const list = Array.isArray(value) ? value : typeof value === 'string' ? value.split(/[,;|]/) : [];
  return Array.from(new Set(list.map((tag) => String(tag).trim()).filter(Boolean))).slice(0, 20);
}

function parseDate(value: unknown): string | null {
  if (value === null || value === undefined || value === '') return null;
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

// Converte o corpo recebido do painel num registro seguro para o banco.
export function sanitizeLeadInput(body: Record<string, unknown>): CrmLeadInput {
  const out: Record<string, unknown> = {};
  for (const field of CRM_LEAD_EDITABLE_FIELDS) {
    if (!(field in body)) continue;
    const value = body[field];
    switch (field) {
      case 'name':
        out.name = cleanText(value, 200);
        break;
      case 'email':
        out.email = normalizeEmail(value);
        break;
      case 'phone':
        out.phone = normalizePhone(value);
        break;
      case 'value':
        out.value = parseMoney(value);
        break;
      case 'tags':
        out.tags = parseTags(value);
        break;
      case 'stage_id':
        out.stage_id = typeof value === 'string' && value ? value : null;
        break;
      case 'next_action_at':
      case 'last_contact_at':
        out[field] = parseDate(value);
        break;
      case 'notes':
        out.notes = cleanText(value, 10000);
        break;
      default:
        out[field] = cleanText(value, 500);
    }
  }
  return out as CrmLeadInput;
}
