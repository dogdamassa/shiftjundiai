"use client";

import { Mail } from "lucide-react";
import { useActionState } from "react";
import {
  recoverPassword,
  type RecoverState,
} from "@/app/recuperar-senha/actions";

const initialState: RecoverState = {};

export function RecoverForm() {
  const [state, action, pending] = useActionState(
    recoverPassword,
    initialState,
  );

  return (
    <form className="login-form" action={action}>
      <label>
        E-mail
        <span>
          <Mail />
          <input name="email" type="email" placeholder="voce@email.com" required />
        </span>
      </label>
      {state.error && <p className="form-error">{state.error}</p>}
      {state.success && <p className="form-success">{state.success}</p>}
      <button
        className="button button-primary button-large"
        type="submit"
        disabled={pending}
      >
        {pending ? "Enviando..." : "Enviar link"}
      </button>
    </form>
  );
}
