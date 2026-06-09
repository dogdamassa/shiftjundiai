"use server";

import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export type RecoverState = {
  success?: string;
  error?: string;
};

export async function recoverPassword(
  _previousState: RecoverState,
  formData: FormData,
): Promise<RecoverState> {
  const email = String(formData.get("email") ?? "");
  if (!email) return { error: "Informe seu e-mail." };

  if (!hasSupabaseEnv()) {
    return { success: "Modo demonstração: solicitação registrada." };
  }

  const supabase = await createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/login`,
  });

  if (error) return { error: error.message };
  return { success: "Enviamos o link de recuperação para o seu e-mail." };
}
