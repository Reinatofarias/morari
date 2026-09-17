import { createServerFn } from "@tanstack/react-start";
import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Acesso do painel por senha única.
 * A senha e as credenciais internas ficam apenas no servidor.
 */

function matches(input: string, expected: string): boolean {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export const unlockAdmin = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => ({ password: String(data?.password ?? "") }))
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_PANEL_PASSWORD"];
    if (!expected) throw new Error("ADMIN_PANEL_PASSWORD não configurada.");
    if (!matches(data.password, expected)) return { ok: false as const };

    const email = process.env["ADMIN_PANEL_EMAIL"] ?? "painel@matheusmorari.app";
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Garante que a conta interna existe.
    const { data: list } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
    let user = list?.users?.find((u) => u.email?.toLowerCase() === email.toLowerCase()) ?? null;
    if (!user) {
      const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password: crypto.randomUUID() + crypto.randomUUID(),
        email_confirm: true,
      });
      if (error) throw new Error(error.message);
      user = created.user;
    }
    if (!user) throw new Error("Não foi possível preparar o acesso.");

    // Garante o papel de administrador.
    await supabaseAdmin.from("user_roles").upsert(
      { user_id: user.id, role: "admin" as const },
      { onConflict: "user_id,role", ignoreDuplicates: true },
    );

    const { data: link, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: "magiclink",
      email,
    });
    if (linkError) throw new Error(linkError.message);

    const tokenHash = link?.properties?.hashed_token;
    if (!tokenHash) throw new Error("Não foi possível preparar o acesso.");

    return { ok: true as const, email, tokenHash };
  });
