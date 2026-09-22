'use client';

import { useEffect, useState } from 'react';

export function useAdminSession() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const response = await fetch('/api/agenda/admin/session', { cache: 'no-store' });
        const data = (await response.json()) as { isAdmin?: boolean };
        if (active) setIsAdmin(response.ok && data.isAdmin === true);
      } catch {
        if (active) setIsAdmin(false);
      } finally {
        if (active) setLoading(false);
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, []);

  return { loading, isAdmin };
}

export async function signOut() {
  await fetch('/api/agenda/admin/session', { method: 'DELETE' });
}
