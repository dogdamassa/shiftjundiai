"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export type LoginState = {
  error?: string;
};

export async function login(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  if (!hasSupabaseEnv()) {
    redirect("/professor");
  }

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { error: "E-mail ou senha inválidos." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  const destination =
    profile?.role === "admin"
      ? "/admin"
      : profile?.role === "trainer"
        ? "/professor"
        : "/";

  redirect(destination);
}
