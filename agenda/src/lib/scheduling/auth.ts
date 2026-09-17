import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";

/** Autenticação real do painel (Lovable Cloud). */

export interface AdminSession {
  loading: boolean;
  email: string | null;
  isAdmin: boolean;
}

async function readSession(): Promise<AdminSession> {
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) return { loading: false, email: null, isAdmin: false };
  const { data: isAdmin } = await supabase.rpc("has_role", {
    _user_id: user.id,
    _role: "admin",
  });
  return { loading: false, email: user.email ?? null, isAdmin: isAdmin === true };
}

export function useAdminSession(): AdminSession {
  const [session, setSession] = useState<AdminSession>({ loading: true, email: null, isAdmin: false });

  useEffect(() => {
    let alive = true;
    void readSession().then((s) => alive && setSession(s));
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      void readSession().then((s) => alive && setSession(s));
    });
    return () => {
      alive = false;
      data.subscription.unsubscribe();
    };
  }, []);

  return session;
}

export async function signInWithPassword(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  await supabase.rpc("claim_admin");
}

export async function signUpWithPassword(email: string, password: string) {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${window.location.origin}/agenda/login` },
  });
  if (error) throw new Error(error.message);
  const { data } = await supabase.auth.getSession();
  if (data.session) await supabase.rpc("claim_admin");
}

export async function signOut() {
  await supabase.auth.signOut();
}
