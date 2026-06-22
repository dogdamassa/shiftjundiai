import type { Metadata } from "next";
import type { ServiceLandingContent } from "@/lib/service-pages";

/**
 * Conteúdo das landing pages de intenção local (Pilar 2 do SEO), gerado e
 * revisado pelo workflow de SEO (marca + SEO). Uma entrada por slug.
 * Editar aqui é o caminho para ajustar a copy de uma página.
 */
export const landingContent: Record<string, ServiceLandingContent> = {
  "personal-trainer-jundiai": {
    slug: "personal-trainer-jundiai",
    keyword: "personal trainer em Jundiaí",
    metaTitle: "Personal Trainer em Jundiaí",
    metaDescription:
      "Personal trainer em Jundiaí com acompanhamento individual de verdade: no máximo 2 alunos por professor e treino feito pro seu objetivo. Agende sua visita.",
    h1: "PERSONAL TRAINER EM JUNDIAÍ COM ACOMPANHAMENTO DE VERDADE",
    heroEyebrow: "Treino individual",
    heroSubcopy:
      "Não é contar repetição. É direção. Cada movimento corrigido, cada treino prescrito pro seu objetivo.",
    introBlock:
      "Procurando um personal trainer em Jundiaí que realmente acompanhe? Na Shift, estúdio de treino personalizado no Centro de Jundiaí, cada professor atende no máximo 2 alunos ao mesmo tempo (2:1). Isso muda tudo: a execução é corrigida em tempo real, a carga é ajustada na hora e o treino é prescrito para o seu objetivo, seu nível e sua experiência. Nada de ficha genérica colada na parede nem de alguém só contando repetição enquanto olha o celular. Aqui você tem direção. O time é multidisciplinar, reunindo treino, fisioterapia e nutrição, com recovery integrado à própria sessão. Atendemos desde quem está começando até quem já treina e quer evoluir com método. A estrutura é premium e o estacionamento coberto com manobrista está incluso por até 2 horas. Agende uma visita ou uma aula experimental pelo WhatsApp, conforme disponibilidade.",
    sections: [
      {
        title: "O QUE É ACOMPANHAMENTO DE VERDADE",
        body: "A diferença entre um personal de verdade e a academia comum não está no equipamento. Está no olhar. Com no máximo 2 alunos por professor, alguém vê cada repetição: o ângulo do joelho, a postura da coluna, o ritmo da respiração. Quando a execução escapa, a correção acontece na hora, antes de virar dor ou compensação. Quando o estímulo precisa subir ou recuar, a carga muda na mesma série. Isso é direção, não vigilância. Você não treina sozinho num salão cheio nem segue um papel que não foi feito pra você. Cada decisão do treino tem um motivo, e esse motivo é o seu objetivo.",
      },
      {
        title: "TREINO PRESCRITO PARA O SEU OBJETIVO",
        body: "Ficha genérica trata todo mundo igual. Aqui, o treino parte de quem você é: seu nível, sua experiência, o que seu corpo aguenta hoje e onde você quer chegar. Por isso o trabalho começa entendendo seu momento antes de prescrever qualquer movimento. Se você está começando, a progressão respeita esse início sem pular etapas. Se já treina, o estímulo sobe com método. O recovery entra integrado à sessão, parte do treino e não um extra. E como o time é multidisciplinar, treino, fisioterapia e nutrição conversam entre si, o plano enxerga você por inteiro, não em pedaços soltos.",
      },
    ],
    whoForTitle: "PARA QUEM É",
    whoForItems: [
      "Quem cansou de ficha genérica e quer treino feito para o próprio objetivo",
      "Iniciantes que precisam aprender a execução certa desde o começo",
      "Quem já treina e quer evoluir com correção e método, não sozinho",
      "Quem busca um personal que dá direção, não só conta repetição",
      "Quem valoriza atenção individual e estrutura premium no Centro de Jundiaí",
    ],
    faq: [
      {
        question: "Quanto custa um personal trainer em Jundiaí na Shift?",
        answer:
          "Os valores variam conforme a frequência e o formato do acompanhamento. O melhor caminho é agendar uma visita ou uma aula experimental pelo WhatsApp, conforme disponibilidade. Assim a gente entende seu momento e seu objetivo antes de falar de plano, e você conhece a estrutura e como funciona o atendimento de no máximo 2 alunos por professor.",
      },
      {
        question: "Qual a diferença entre a Shift e uma academia comum?",
        answer:
          "Na academia comum você segue uma ficha sozinho num salão cheio. Na Shift, cada professor atende no máximo 2 alunos por vez, corrige a execução em tempo real e prescreve o treino para o seu objetivo. Some a isso recovery integrado e um time de treino, fisioterapia e nutrição. É acompanhamento de verdade, com direção, não vigilância à distância.",
      },
      {
        question: "Atende quem nunca treinou antes?",
        answer:
          "Sim. O treino é adaptado ao seu nível, objetivo e experiência, então iniciantes são bem-vindos. Com no máximo 2 alunos por professor, você aprende a execução correta desde a primeira sessão, com correção em tempo real e progressão que respeita o seu começo. Agende uma aula experimental pelo WhatsApp, conforme disponibilidade, para conhecer.",
      },
      {
        question: "Como faço para agendar uma aula experimental?",
        answer:
          "É só falar com a gente pelo WhatsApp. A aula experimental e as visitas acontecem mediante agendamento e disponibilidade. Estamos na Av. 9 de Julho, 3290, Loja 4, Centro, Jundiaí, com atendimento de segunda a sexta das 6h às 22h e sábado das 8h às 12h. O estacionamento coberto com manobrista está incluso por até 2 horas.",
      },
    ],
    serviceName: "Personal Trainer em Jundiaí",
    serviceDescription:
      "Acompanhamento de treino personalizado em Jundiaí com no máximo 2 alunos por professor, execução corrigida em tempo real e treino prescrito para o objetivo de cada aluno.",
    ctaHeading: "CHEGA DE FICHA GENÉRICA. AGENDE SUA AULA EXPERIMENTAL PELO WHATSAPP.",
  },

  "musculacao-jundiai": {
    slug: "musculacao-jundiai",
    keyword: "musculação em Jundiaí",
    metaTitle: "Musculação em Jundiaí com Técnica",
    metaDescription:
      "Musculação em Jundiaí com técnica e acompanhamento próximo (2:1), sem ficha genérica. Agende sua visita pelo WhatsApp e treine com segurança.",
    h1: "MUSCULAÇÃO EM JUNDIAÍ, SEM FICHA GENÉRICA",
    heroEyebrow: "Treino com técnica",
    heroSubcopy:
      "Cada série acompanhada de perto. Progressão de carga com critério e execução segura, do iniciante ao avançado.",
    introBlock:
      "A Shift é um estúdio de treino personalizado premium em Jundiaí, onde a musculação acontece com técnica e acompanhamento próximo, sem ficha genérica copiada para todo mundo. Aqui o professor cuida de no máximo 2 alunos por vez (2:1), o que permite corrigir a execução em tempo real, ajustar a progressão de carga com critério e treinar com segurança. O programa é adaptado ao seu nível, objetivo e experiência, então iniciantes começam no ritmo certo e quem já treina avança sem repetir os mesmos erros. Você ainda conta com recovery integrado ao treino e um time multidisciplinar de treino, fisioterapia e nutrição. Fica na Av. 9 de Julho, 3290 - Loja 4 - Centro, com estacionamento coberto e manobrista incluso por até 2 horas. Para conhecer a estrutura ou fazer uma aula experimental, é só agendar pelo WhatsApp.",
    sections: [
      {
        title: "Carga que evolui com critério, não no chute",
        body: "Treinar pesado sem método trava o progresso e aumenta o risco. Na Shift, a progressão de carga é acompanhada série a série pelo professor, que observa sua execução e ajusta o estímulo conforme você responde. Como o atendimento é de no máximo 2 alunos por professor (2:1), ninguém fica perdido entre aparelhos com uma ficha na mão. Cada exercício é escolhido para o seu objetivo individual e revisado quando faz sentido mudar. Você entende o porquê de cada movimento, melhora o padrão de execução e treina com consistência. É musculação pensada para o seu corpo e o seu momento, não um modelo padrão aplicado a todos.",
      },
      {
        title: "Segurança na execução, do primeiro dia ao avançado",
        body: "Boa parte das lesões na musculação vem de técnica ruim e progressão apressada. Por isso, a execução é o centro do trabalho na Shift. O professor está ao seu lado para alinhar postura, amplitude e ritmo em cada repetição, o que dá confiança a quem está começando e refina o gesto de quem já tem experiência. Se aparece um incômodo, o recovery integrado e o time multidisciplinar de fisioterapia ajudam a entender e respeitar os limites do corpo. Tudo em ambiente premium, com estrutura cuidada e estacionamento coberto com manobrista incluso por até 2 horas, para o seu treino caber na rotina sem fricção.",
      },
    ],
    whoForTitle: "Para quem é a musculação na Shift",
    whoForItems: [
      "Quem está começando e quer aprender a técnica certa desde o início",
      "Quem já treina e cansou de ficha genérica sem acompanhamento",
      "Quem quer progredir na carga com segurança e critério",
      "Quem busca atenção real do professor, com no máximo 2 alunos por vez",
      "Quem valoriza um ambiente premium e prático no centro de Jundiaí",
    ],
    faq: [
      {
        question: "Como funciona a musculação na Shift em Jundiaí?",
        answer:
          "A musculação na Shift é personalizada e acompanhada de perto, com no máximo 2 alunos por professor (2:1). Não usamos ficha genérica: o treino é adaptado ao seu nível, objetivo e experiência, com progressão de carga acompanhada e foco na execução segura. Para conhecer, agende uma visita ou aula experimental pelo WhatsApp.",
      },
      {
        question: "Atende iniciantes em musculação?",
        answer:
          "Sim. A Shift atende iniciantes, e o acompanhamento próximo (2:1) ajuda justamente quem está começando a aprender a técnica correta desde o primeiro dia. O professor orienta postura, amplitude e ritmo de cada exercício, ajustando a carga no ritmo certo. A aula experimental é mediante agendamento e disponibilidade.",
      },
      {
        question: "Onde fica e qual o horário da Shift?",
        answer:
          "A Shift fica na Av. 9 de Julho, 3290 - Loja 4 - Centro, Jundiaí - SP. O horário é de segunda a sexta das 6h às 22h e sábado das 8h às 12h; domingo fechado. Há estacionamento coberto com manobrista incluso por até 2 horas. Agende sua visita pelo WhatsApp.",
      },
      {
        question: "Preciso agendar para fazer a aula experimental?",
        answer:
          "Sim. A aula experimental acontece mediante agendamento e disponibilidade, para garantir o acompanhamento próximo que é a marca da Shift. Basta chamar no WhatsApp para combinar o melhor horário e conhecer a estrutura, o método de treino e como funciona a progressão acompanhada.",
      },
    ],
    serviceName: "Musculação personalizada em Jundiaí",
    serviceDescription:
      "Musculação com técnica e acompanhamento próximo (2:1) em estúdio premium em Jundiaí, com progressão de carga acompanhada e execução segura.",
    ctaHeading: "CHAME NO WHATSAPP E AGENDE SUA AULA EXPERIMENTAL DE MUSCULAÇÃO",
  },

  "recovery-jundiai": {
    slug: "recovery-jundiai",
    keyword: "recovery em Jundiaí",
    metaTitle: "Recovery em Jundiaí | Recuperação Muscular",
    metaDescription:
      "Recovery em Jundiaí integrado ao seu treino e à sua evolução. Recuperação muscular com acompanhamento próximo na Shift. Agende sua visita pelo WhatsApp.",
    h1: "RECOVERY EM JUNDIAÍ: RECUPERAÇÃO QUE FAZ PARTE DO SEU TREINO",
    heroEyebrow: "Recovery integrado",
    heroSubcopy:
      "Recuperação muscular pensada junto com o seu treino. Foco em performance e bem-estar, no seu ritmo.",
    introBlock:
      "Recovery em Jundiaí é a recuperação muscular tratada como parte do seu acompanhamento, conectada ao treino e ao seu histórico de evolução. Na Shift, estúdio premium no Centro de Jundiaí, cada plano inclui uma sessão de recovery por mês, e você pode contratar sessões adicionais quando quiser cuidar ainda mais do corpo. Os recursos de recovery consideram o que você treinou, como o corpo respondeu e o que vem a seguir, com acompanhamento próximo de no máximo dois alunos por professor. O time é multidisciplinar, reunindo treino, fisioterapia e nutrição em um mesmo lugar. O foco é performance e bem-estar no dia a dia, com mais consistência entre os treinos. Recovery não é tratamento médico nem promessa de cura: é cuidar do corpo para treinar melhor. Agende uma visita pelo WhatsApp.",
    sections: [
      {
        title: "Recuperação conectada à sua evolução",
        body: "Na Shift, o recovery não é genérico. Ele lê o seu histórico: o que você treinou, a carga da semana e como o corpo vem respondendo. Com no máximo dois alunos por professor, o acompanhamento é próximo o suficiente para ajustar a recuperação a cada fase. Assim, os recursos de recovery entram na hora certa, integrados ao treino e à sua rotina. O objetivo é simples e honesto: manter você consistente e bem entre as sessões, com foco em performance e bem-estar. Sem fórmula pronta, sem promessa de resultado. Cada decisão parte de quem você é, do seu nível e do seu objetivo dentro do estúdio.",
      },
      {
        title: "Treino e recovery no mesmo lugar",
        body: "Recuperar bem é parte de treinar bem. Por isso, na Shift, treino e recovery andam juntos, dentro de uma estrutura premium no Centro de Jundiaí. O time multidisciplinar reúne treino, fisioterapia e nutrição, então as decisões conversam entre si em vez de seguir caminhos separados. Você não precisa montar um quebra-cabeça por conta própria: a recuperação já está pensada dentro do seu plano, com uma sessão por mês inclusa e a opção de contratar mais quando quiser. Para o iniciante, isso traz segurança para começar com o corpo bem cuidado. Para quem já treina, ajuda a sustentar o ritmo. E o estacionamento coberto com manobrista, incluso por até duas horas, deixa a logística do dia mais leve.",
      },
    ],
    whoForTitle: "Para quem é o recovery da Shift",
    whoForItems: [
      "Quem treina e sente que precisa recuperar melhor entre as sessões",
      "Iniciantes que querem começar cuidando do corpo desde o primeiro dia",
      "Quem busca mais consistência e bem-estar na rotina de treino",
      "Quem quer treino, fisioterapia e nutrição conversando no mesmo lugar",
      "Quem valoriza acompanhamento próximo, de até dois alunos por professor",
    ],
    faq: [
      {
        question: "O que é recovery na Shift?",
        answer:
          "Recovery na Shift é a recuperação muscular integrada ao seu treino e ao seu histórico de evolução. Os recursos são conectados à sua rotina e ajustados ao seu nível e objetivo, com acompanhamento próximo. O foco é performance e bem-estar, ajudando você a manter consistência entre as sessões. Não é tratamento médico nem promessa de cura.",
      },
      {
        question: "Onde fica o recovery em Jundiaí?",
        answer:
          "A Shift fica na Av. 9 de Julho, 3290 - Loja 4, Centro, Jundiaí - SP. O estúdio tem estrutura premium e estacionamento coberto com manobrista incluso por até duas horas. O horário é de segunda a sexta, das 6h às 22h, e aos sábados das 8h às 12h. Para conhecer, agende uma visita pelo WhatsApp.",
      },
      {
        question: "O recovery está incluído no plano ou é à parte?",
        answer:
          "Os dois. Cada plano inclui uma sessão de recovery por mês, integrada ao seu acompanhamento na Shift. Se quiser cuidar mais da recuperação, dá pra contratar sessões adicionais. Tudo é ajustado ao que você treinou e à sua fase, com acompanhamento próximo de até dois alunos por professor.",
      },
      {
        question: "Preciso já treinar para fazer recovery?",
        answer:
          "Não. A Shift atende iniciantes, e o recovery ajuda quem está começando a cuidar do corpo desde o primeiro dia. Para quem já treina, apoia a manutenção do ritmo e do bem-estar. Tudo é adaptado ao seu nível, objetivo e experiência. Agende uma visita ou aula experimental pelo WhatsApp, conforme disponibilidade.",
      },
    ],
    serviceName: "Recovery e recuperação muscular em Jundiaí",
    serviceDescription:
      "Recuperação muscular integrada ao acompanhamento na Shift, em Jundiaí — uma sessão por mês inclusa, com possibilidade de contratar sessões adicionais.",
    ctaHeading: "SEU CORPO TREINA MELHOR QUANDO RECUPERA BEM. AGENDE SUA VISITA PELO WHATSAPP.",
  },

  "academia-centro-jundiai": {
    slug: "academia-centro-jundiai",
    keyword: "academia no centro de Jundiaí",
    metaTitle: "Academia no Centro de Jundiaí | Estúdio Premium",
    metaDescription:
      "Academia no centro de Jundiaí na Av. 9 de Julho: estúdio premium e acompanhado, com valet incluso por até 2h. Agende sua visita pelo WhatsApp.",
    h1: "ACADEMIA NO CENTRO DE JUNDIAÍ COM ACOMPANHAMENTO DE VERDADE",
    heroEyebrow: "Centro de Jundiaí",
    heroSubcopy:
      "Na Av. 9 de Julho, fácil de chegar. Estacionamento coberto com valet incluso por até 2 horas.",
    introBlock:
      "Procurando uma academia no centro de Jundiaí? A Shift fica na Av. 9 de Julho, 3290 – Loja 4, no Centro, com acesso fácil e estacionamento coberto com manobrista (valet) incluso por até 2 horas. Mas a Shift não é uma academia de esteira lotada: é um estúdio de treino personalizado premium, onde cada professor acompanha no máximo 2 alunos por vez. Aqui o treino é adaptado ao seu nível, objetivo e experiência, com um time multidisciplinar de treino, fisioterapia e nutrição, além de recovery integrado à rotina. Atendemos desde quem está começando até quem já treina há tempo. Funcionamos de segunda a sexta, das 6h às 22h, e aos sábados das 8h às 12h. Se você quer treinar perto do centro com estrutura premium e atenção próxima, agende uma visita ou aula experimental pelo WhatsApp (sujeita a disponibilidade).",
    sections: [
      {
        title: "FÁCIL DE CHEGAR, FÁCIL DE ESTACIONAR",
        body: "Estar no centro de Jundiaí precisa ser prático. A Shift fica na Av. 9 de Julho, 3290 – Loja 4, um endereço central e fácil de localizar, perto de quem mora, trabalha ou passa pela região. Para o seu treino fluir sem dor de cabeça, oferecemos estacionamento coberto com manobrista (valet) incluso por até 2 horas. Você chega, deixa o carro e foca no que importa. Nosso horário também acompanha a rotina do centro: de segunda a sexta das 6h às 22h e aos sábados das 8h às 12h, com tempo de sobra antes ou depois do trabalho. Localização central, sem o transtorno de procurar vaga.",
      },
      {
        title: "ESTÚDIO PREMIUM, NÃO ACADEMIA LOTADA",
        body: "A diferença não está só no endereço. Em muitas academias do centro você divide o espaço com dezenas de pessoas e treina sozinho, esperando equipamento livre. Na Shift é o oposto: cada professor acompanha no máximo 2 alunos por vez, então a atenção é real e o treino é seu. A estrutura é premium e pensada para você se concentrar, com recovery integrado à rotina e um time multidisciplinar de treino, fisioterapia e nutrição olhando para o conjunto. Cada treino é adaptado ao seu nível, objetivo e experiência, seja você iniciante ou já avançado. É o cuidado de um estúdio, no coração de Jundiaí.",
      },
    ],
    whoForTitle: "Para quem é a Shift no centro",
    whoForItems: [
      "Quem mora ou trabalha no centro de Jundiaí e quer treinar perto",
      "Quem cansou de academia cheia e quer atenção de verdade",
      "Iniciantes que precisam de acompanhamento próximo para começar",
      "Quem valoriza praticidade: chega de carro e usa o valet incluso",
      "Quem busca estrutura premium com treino, fisioterapia e nutrição juntos",
    ],
    faq: [
      {
        question: "Onde fica a academia no centro de Jundiaí?",
        answer:
          "A Shift fica na Av. 9 de Julho, 3290 – Loja 4 – Centro, Jundiaí – SP, CEP 13201-019. É um endereço central, de fácil acesso, com estacionamento coberto e manobrista (valet) incluso por até 2 horas. Para conhecer o espaço, agende uma visita pelo WhatsApp.",
      },
      {
        question: "Qual o horário de funcionamento?",
        answer:
          "A Shift funciona de segunda a sexta, das 6h às 22h, e aos sábados, das 8h às 12h. Aos domingos permanecemos fechados. Esse horário ajuda quem treina antes ou depois do trabalho no centro. Para agendar sua visita ou aula experimental, fale com a gente pelo WhatsApp.",
      },
      {
        question: "A Shift é uma academia comum?",
        answer:
          "Não. A Shift é um estúdio de treino personalizado premium, não uma academia de esteira lotada. Cada professor acompanha no máximo 2 alunos por vez, e o treino é adaptado ao seu nível, objetivo e experiência. Há recovery integrado e um time de treino, fisioterapia e nutrição.",
      },
      {
        question: "Tem estacionamento?",
        answer:
          "Sim. Oferecemos estacionamento coberto com manobrista (valet) incluso por até 2 horas, uma comodidade importante para quem treina no centro de Jundiaí e não quer perder tempo procurando vaga. Você chega, deixa o carro com a equipe e foca no seu treino.",
      },
    ],
    serviceName: "Academia e estúdio de treino no centro de Jundiaí",
    serviceDescription:
      "Estúdio de treino personalizado premium no centro de Jundiaí, com acompanhamento de até 2 alunos por professor, recovery integrado e valet incluso.",
    ctaHeading: "Treine no centro de Jundiaí com atenção de verdade. Agende sua visita pelo WhatsApp.",
  },
};

/** Monta o metadata (title, description, canonical, OG) de uma landing page. */
export function serviceMetadata(content: ServiceLandingContent): Metadata {
  const path = `/${content.slug}`;
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: `${content.metaTitle} | Shift Jundiaí`,
      description: content.metaDescription,
      url: path,
      siteName: "Shift Jundiaí",
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: "/images/og-shift.jpg",
          width: 1200,
          height: 630,
          alt: "Shift Jundiaí — Onde mudar é só o começo",
        },
      ],
    },
  };
}
