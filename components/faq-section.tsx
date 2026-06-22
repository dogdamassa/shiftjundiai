export type FaqItem = { question: string; answer: string };

/**
 * Seção de Perguntas Frequentes reutilizável. Renderiza o acordeão (nativo,
 * via <details>, sem JS) e o dado estruturado FAQPage. O conteúdo deve ser
 * texto real e revisado (ex.: reaproveitado da base do agente).
 */
export function FaqSection({
  items,
  title,
  eyebrow = "Perguntas frequentes",
  id = "faq",
}: {
  items: FaqItem[];
  title: string;
  eyebrow?: string;
  id?: string;
}) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((qa) => ({
      "@type": "Question",
      name: qa.question,
      acceptedAnswer: { "@type": "Answer", text: qa.answer },
    })),
  };

  return (
    <section className="service-faq section" id={id}>
      <script
        type="application/ld+json"
        // Conteúdo estático vindo do nosso próprio dado (sem input do usuário).
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="section-heading">
        <div>
          <span className="eyebrow orange">{eyebrow}</span>
          <h2>{title}</h2>
        </div>
      </div>
      <div className="service-faq-list">
        {items.map((qa) => (
          <details key={qa.question}>
            <summary>{qa.question}</summary>
            <p>{qa.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
