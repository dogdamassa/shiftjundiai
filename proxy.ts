import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtected = ["/aluno", "/professor", "/admin"].some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  if (user && isProtected) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const pathname = request.nextUrl.pathname;
    const allowed =
      (profile?.role === "admin" && pathname.startsWith("/admin")) ||
      (profile?.role === "trainer" && pathname.startsWith("/professor")) ||
      (profile?.role === "student" && pathname.startsWith("/aluno"));

    if (!allowed) {
      const roleUrl = request.nextUrl.clone();
      roleUrl.pathname =
        profile?.role === "admin"
          ? "/admin"
          : profile?.role === "trainer"
            ? "/professor"
            : "/aluno";
      return NextResponse.redirect(roleUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ["/aluno/:path*", "/professor/:path*", "/admin/:path*"],
};
