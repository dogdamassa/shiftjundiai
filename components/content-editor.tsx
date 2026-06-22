"use client";

import { Check, Eye, Save } from "lucide-react";
import { useState } from "react";

export function ContentEditor() {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>();

  async function saveContent(formData: FormData) {
    setSaving(true);
    setError(undefined);
    const response = await fetch("/api/site-content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    const result = (await response.json()) as { error?: string };
    setSaving(false);

    if (!response.ok) {
      setError(result.error ?? "Não foi possível salvar.");
      return;
    }

    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="content-editor">
      <form className="dashboard-panel" action={saveContent}>
        <div className="editor-fields">
          <label>
            Chamada principal
            <input name="headline" defaultValue="Não é academia. É Shift." />
          </label>
          <label>
            Texto de apoio
            <textarea name="description" defaultValue="Um método de treino construído ao redor de você. Acompanhamento próximo, estrutura premium e evolução que você consegue enxergar." />
          </label>
          <label>
            WhatsApp comercial
            <input name="whatsapp" defaultValue="+55 (11) 97377-1914" />
          </label>
          <label>
            Endereço
            <input name="address" defaultValue="Av. 9 de Julho, 3290 - Loja 4 - Centro, Jundiaí - SP, 13201-019" />
          </label>
        </div>
        {error && <p className="form-error">{error}</p>}
        <div className="editor-actions">
          <button className="dash-button secondary" type="button">
            <Eye /> Visualizar
          </button>
          <button
            className="dash-button primary"
            type="submit"
            disabled={saving}
          >
            {saved ? <Check /> : <Save />}
            {saved
              ? "Alterações salvas"
              : saving
                ? "Salvando..."
                : "Salvar alterações"}
          </button>
        </div>
      </form>
      <aside className="editor-preview">
        <span>Prévia da chamada</span>
        <div>
          <small>PERFORMANCE & RESULTADOS</small>
          <h2>
            NÃO É
            <br />
            ACADEMIA.
            <br />
            <em>É SHIFT.</em>
          </h2>
          <button>AGENDAR UMA VISITA</button>
        </div>
      </aside>
    </div>
  );
}
