"use client";

import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { useActionState } from "react";
import { login, type LoginState } from "@/app/login/actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, action, pending] = useActionState(login, initialState);

  return (
    <form className="login-form" action={action}>
      <label>
        E-mail
        <span>
          <Mail />
          <input
            type="email"
            name="email"
            placeholder="voce@email.com"
            autoComplete="email"
            required
          />
        </span>
      </label>
      <label>
        Senha
        <span>
          <LockKeyhole />
          <input
            type="password"
            name="password"
            placeholder="Sua senha"
            autoComplete="current-password"
            required
          />
        </span>
      </label>
      <div className="login-options">
        <label className="remember-check">
          <input type="checkbox" /> Lembrar de mim
        </label>
        <a href="/recuperar-senha">Esqueci minha senha</a>
      </div>
      {state.error && <p className="form-error">{state.error}</p>}
      <button
        className="button button-primary button-large"
        type="submit"
        disabled={pending}
      >
        {pending ? "Entrando..." : "Entrar"} <ArrowRight />
      </button>
    </form>
  );
}
