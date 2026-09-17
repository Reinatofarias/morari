'use client';

import { createClient } from '@supabase/supabase-js';

let client: ReturnType<typeof createClient<any>> | undefined;

export function getAgendaSupabase() {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error('Supabase não configurado.');
    client = createClient<any>(url, key);
  }
  return client!;
}
