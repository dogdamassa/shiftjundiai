import Image from "next/image";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  Brain,
  Gauge,
  HeartPulse,
  MapPin,
  Play,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { FaqSection } from "@/components/faq-section";
import { LocalBusinessJsonLd } from "@/components/local-business-jsonld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { siteConfig, whatsappUrl } from "@/lib/site";

const methodSteps = [
  {
    number: "01",
    icon: Target,
    title: "Avaliação precisa",
    text: "Entendemos seu momento, seus objetivos e como seu corpo responde antes de prescrever qualquer movimento.",
  },
  {
    number: "02",
    icon: Brain,
    title: "Treino inteligente",
    text: "Mobilidade, estímulo metabólico e força organizados em uma metodologia que faz sentido para você.",
  },
  {
    number: "03",
    icon: Gauge,
    title: "Evolução mensurável",
    text: "Dados, frequência, cargas e avaliações transformam percepção em progresso visível.",
  },
];

const experienceItems = [
  {
    icon: Users,
    title: "Acompanhamento real",
    text: "Até 2 alunos por professor. Atenção suficiente para corrigir, ajustar e fazer você avançar.",
  },
  {
    icon: HeartPulse,
    title: "Recovery integrado",
    text: "Recursos de recuperação conectados à sua rotina de treino e ao seu histórico de evolução.",
  },
  {
    icon: ShieldCheck,
    title: "Estrutura premium",
    text: "Tecnologia, conforto e detalhes pensados para você estar presente por inteiro.",
  },
  {
    icon: Activity,
    title: "Time multidisciplinar",
    text: "Treino, fisioterapia e nutrição trabalhando a partir do mesmo objetivo: seu resultado.",
  },
];

const gallery = [
  {
    src: "/images/shift-coaching.jpeg",
    alt: "Professor da Shift acompanhando uma aluna durante o treino",
    className: "gallery-tall",
  },
  {
    src: "/images/shift-space.jpeg",
    alt: "Espaço de musculação personalizado da Shift",
    className: "gallery-wide",
  },
  {
    src: "/images/shift-detail.jpeg",
    alt: "Treino acompanhado em equipamento de musculação",
    className: "",
  },
  {
    src: "/images/shift-performance.jpeg",
    alt: "Sessão individual de treinamento na Shift",
    className: "",
  },
];

const homeFaq = [
  {
    question: "Onde fica a Shift e qual o horário?",
    answer:
      "A Shift fica na Av. 9 de Julho, 3290 – Loja 4 – Centro, Jundiaí – SP. O horário é de segunda a sexta das 6h às 22h e aos sábados das 8h às 12h; aos domingos, fechado. Em feriados o funcionamento pode variar — confirme com a equipe pelo WhatsApp.",
  },
  {
    question: "A Shift atende quem nunca treinou?",
    answer:
      "Sim. O treino é adaptado ao seu nível, objetivo e experiência, então iniciantes são bem-vindos. Com acompanhamento próximo, de no máximo 2 alunos por professor, você aprende a execução correta desde a primeira sessão.",
  },
  {
    question: "Quanto custa treinar na Shift?",
    answer:
      "Os valores dependem do plano, da frequência e do tipo de acompanhamento. O melhor caminho é chamar no WhatsApp: a equipe entende o seu momento e o seu objetivo antes de indicar o plano que faz sentido para você.",
  },
  {
    question: "Como funciona a aula experimental?",
    answer:
      "A visita e a aula experimental acontecem mediante agendamento e disponibilidade. É só chamar no WhatsApp com o seu nome, se você tem alguma lesão ou restrição e o melhor horário, que a equipe combina com você.",
  },
  {
    question: "Tem estacionamento?",
    answer:
      "Sim. O prédio oferece estacionamento coberto com manobrista (valet) incluso por até 2 horas. Você chega, deixa o carro e foca no treino.",
  },
  {
    question: "Tenho uma lesão, posso treinar?",
    answer:
      "A equipe precisa entender a sua condição antes de começar, e em alguns casos pode ser pedida uma liberação médica. O treino é então adaptado com segurança ao seu momento. Fale com a gente pelo WhatsApp para te orientarmos.",
  },
];

export default function HomePage() {
  return (
    <main className="marketing-page">
      <LocalBusinessJsonLd />
      <SiteHeader />

      <section className="hero">
        <Image
          className="hero-image"
          src="/images/shift-training-wide.jpeg"
          alt="Treinamento personalizado na Shift Jundiaí"
          fill
          sizes="100vw"
          priority
        />
        <div className="hero-overlay" />
        <div className="hero-grid-lines" />
        <div className="hero-content">
          <div className="eyebrow">
            <span />
            Performance & resultados
          </div>
          <h1>
            NÃO É
            <br />
            ACADEMIA.
            <br />
            <em>É SHIFT.</em>
          </h1>
          <p>
            Um método de treino construído ao redor de você. Acompanhamento
            próximo, estrutura premium e evolução que você consegue enxergar.
          </p>
          <div className="hero-actions">
            <a
              className="button button-primary button-large"
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
            >
              Agende uma visita <ArrowDownRight />
            </a>
            <a className="button button-ghost button-large" href="#metodo">
              <Play size={17} fill="currentColor" /> Conheça a Shift
            </a>
          </div>
        </div>
        <div className="hero-aside">
          <span>Av. 9 de Julho</span>
          <strong>Jundiaí · SP</strong>
        </div>
        <a className="hero-scroll" href="#manifesto">
          <span>Scroll</span>
          <ArrowDownRight />
        </a>
      </section>

      <section className="manifesto section" id="manifesto">
        <div className="section-index">SHIFT / 01</div>
        <div className="manifesto-copy">
          <span className="eyebrow orange">Onde mudar é só o começo</span>
          <h2>
            TREINAR MAIS NÃO É A RESPOSTA.
            <br />
            <span>TREINAR CERTO É.</span>
          </h2>
          <p>
            Na Shift, cada sessão tem intenção. Você não recebe uma ficha
            genérica: recebe direção, correção e um time que conhece o seu
            processo.
          </p>
        </div>
        <div className="manifesto-stat">
          <strong>2:1</strong>
          <span>Máximo de alunos por professor</span>
        </div>
      </section>

      <section className="method section" id="metodo">
        <div className="section-heading">
          <div>
            <span className="eyebrow orange">Método Shift</span>
            <h2>O SEU TREINO TEM UM PORQUÊ.</h2>
          </div>
          <p>
            Uma jornada contínua entre avaliação, execução e evolução. Sem
            improviso. Sem piloto automático.
          </p>
        </div>
        <div className="method-grid">
          {methodSteps.map((item) => (
            <article className="method-card" key={item.number}>
              <div className="method-card-top">
                <span>{item.number}</span>
                <item.icon />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="method-line" />
            </article>
          ))}
        </div>
      </section>

      <section className="experience" id="experiencia">
        <div className="experience-image">
          <Image
            src="/images/shift-experience.jpeg"
            alt="Acompanhamento profissional durante treino na Shift"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
          />
          <div className="image-label">
            <Sparkles />
            <span>
              Mais presença.
              <br />
              Mais resultado.
            </span>
          </div>
        </div>
        <div className="experience-content">
          <span className="eyebrow orange">Padrão de experiência</span>
          <h2>TUDO O QUE VOCÊ PRECISA PARA IR ALÉM.</h2>
          <div className="experience-list">
            {experienceItems.map((item) => (
              <article key={item.title}>
                <item.icon />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="structure section" id="estrutura">
        <div className="section-heading">
          <div>
            <span className="eyebrow orange">Conheça por dentro</span>
            <h2>ESTRUTURA QUE MUDA O RITMO.</h2>
          </div>
          <p>
            Ambientes desenhados para performance, recuperação e uma rotina
            que cabe na sua vida.
          </p>
        </div>
        <div className="gallery-grid">
          {gallery.map((image) => (
            <figure className={image.className} key={image.src}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 720px) 100vw, 50vw"
              />
            </figure>
          ))}
        </div>
      </section>

      <section className="location section" id="localizacao">
        <div className="location-card">
          <div className="location-map">
            <div className="map-grid" />
            <div className="map-road road-a" />
            <div className="map-road road-b" />
            <div className="map-pin">
              <MapPin />
            </div>
            <span>AV. 9 DE JULHO</span>
          </div>
          <div className="location-copy">
            <span className="eyebrow orange">No centro do seu caminho</span>
            <h2>SHIFT JUNDIAÍ</h2>
            <p>
              Estúdio de treino personalizado, musculação e recovery com
              acompanhamento de personal trainer no centro de Jundiaí.
            </p>
            <p>{siteConfig.address}</p>
            <div className="location-details">
              <span>Estacionamento no local</span>
              <span>Fácil acesso pela 9 de Julho</span>
            </div>
            <a
              className="button button-primary"
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Como chegar <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      <FaqSection items={homeFaq} title="ANTES DE VISITAR, TIRE SUAS DÚVIDAS." />

      <section className="final-cta">
        <div>
          <Image
            className="final-cta-mark"
            src="/brand/shift-wordmark-light.png"
            alt=""
            width={134}
            height={40}
          />
          <span className="eyebrow">Sua mudança começa aqui</span>
          <h2>PRONTO PARA FAZER O TREINO TRABALHAR POR VOCÊ?</h2>
        </div>
        <a
          className="button button-light button-large"
          href={whatsappUrl()}
          target="_blank"
          rel="noreferrer"
        >
          Agende sua visita <ArrowDownRight />
        </a>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
