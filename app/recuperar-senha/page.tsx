import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { RecoverForm } from "@/components/recover-form";

export default function RecoverPasswordPage() {
  return (
    <main className="simple-auth-page">
      <div className="simple-auth-card">
        <BrandLogo />
        <span className="dashboard-eyebrow">Recuperar acesso</span>
        <h1>REDEFINIR SENHA</h1>
        <p>
          Informe seu e-mail. Enviaremos um link seguro para criar uma nova
          senha.
        </p>
        <RecoverForm />
        <Link className="login-back" href="/login">
          <ArrowLeft /> Voltar ao login
        </Link>
      </div>
    </main>
  );
}
