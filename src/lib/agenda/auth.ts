'use client';

import { useEffect, useState } from 'react';

import { getAgendaSupabase } from '@/lib/agenda/supabase-client';

export function useAdminSession() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const supabase = getAgendaSupabase();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          if (active) setIsAdmin(false);
          return;
        }
        const { data, error } = await supabase.rpc('has_role', { _user_id: user.id, _role: 'admin' });
        if (active) setIsAdmin(!error && data === true);
      } finally {
        if (active) setLoading(false);
      }
    }

    void load();
    const { data } = getAgendaSupabase().auth.onAuthStateChange(() => void load());

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  return { loading, isAdmin };
}

export async function signOut() {
  await getAgendaSupabase().auth.signOut();
}
