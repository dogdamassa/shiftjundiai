import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Acesse sua conta Shift.",
};

export default function LoginPage() {
  return (
    <main className="login-page">
      <div className="login-image">
        <Image
          src="/images/shift-coaching.jpeg"
          alt="Treino acompanhado na Shift"
          fill
          sizes="50vw"
          priority
        />
        <div className="login-image-overlay" />
        <div className="login-quote">
          <span>SHIFT / ÁREA EXCLUSIVA</span>
          <blockquote>
            “Seu resultado começa na presença. E continua nos detalhes.”
          </blockquote>
        </div>
      </div>
      <section className="login-panel">
        <div className="login-panel-inner">
          <BrandLogo />
          <Link className="login-back" href="/">
            <ArrowLeft /> Voltar ao site
          </Link>
          <div className="login-heading">
            <span className="dashboard-eyebrow">Bem-vindo de volta</span>
            <h1>ACESSAR A SHIFT</h1>
            <p>Entre para acompanhar seu próximo passo.</p>
          </div>
          <LoginForm />
          <div className="demo-access">
            <span>Visualizar demonstração</span>
            <div>
              <Link href="/professor">Professor</Link>
              <Link href="/admin">Admin</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
