export type WikiRespondentRole = "owner" | "leader";

export type WikiAnswer = {
  questionId: string;
  question: string;
  category: string;
  text: string;
  audioUrl?: string;
};

export type WikiInterview = {
  id: string;
  respondentName: string;
  respondentRole: WikiRespondentRole;
  respondentTitle: string;
  answers: WikiAnswer[];
  status: "submitted" | "reviewed" | "approved";
  submittedAt: string;
};

export type WikiEntry = {
  id: string;
  category: string;
  title: string;
  content: string;
  sourceRole: WikiRespondentRole;
  sourceInterviewId?: string;
  status: "draft" | "approved" | "archived";
  approvedAt?: string;
  updatedAt: string;
};

export type WikiQuestion = {
  id: string;
  category: string;
  prompt: string;
  help?: string;
  audioSuggested?: boolean;
  options?: string[];
};

export const ownerQuestions: WikiQuestion[] = [
  { id: "owner-definition", category: "Identidade e posicionamento", prompt: "Como você define a Shift em poucas palavras?", audioSuggested: true },
  { id: "owner-why", category: "Identidade e posicionamento", prompt: "Por que alguém deveria escolher a Shift em vez de uma academia comum?" },
  { id: "owner-client", category: "Processo comercial", prompt: "Quem é o cliente ideal da Shift? Quem não combina com a proposta?" },
  {
    id: "owner-goal",
    category: "Processo comercial",
    prompt: "O que o bot deve tentar conseguir em cada conversa?",
    help: "Marque os objetivos em ordem de importância e explique no texto quando cada um se aplica.",
    options: [
      "Agendar aula experimental",
      "Agendar visita à academia",
      "Coletar nome e contato para a equipe",
      "Fechar o plano direto no WhatsApp",
      "Tirar dúvidas e fortalecer a marca",
    ],
  },
  { id: "owner-services", category: "Serviços e diferenciais", prompt: "Como você apresenta cada serviço e o valor que ele entrega?", audioSuggested: true },
  { id: "owner-expensive", category: "Objeções e respostas", prompt: "Como você responde quando alguém diz que a Shift está cara?", audioSuggested: true },
  {
    id: "owner-objections",
    category: "Objeções e respostas",
    prompt: "Quais outras objeções aparecem com frequência e como responder a cada uma?",
    options: [
      "“Vou pensar e te falo”",
      "“A academia X é mais barata”",
      "“Não tenho tempo”",
      "“Moro/trabalho longe”",
      "“Já tentei e desisti antes”",
      "“Tem fidelidade? Não quero me prender”",
    ],
  },
  { id: "owner-pricing", category: "Preços e condições aprovadas", prompt: "Como preço, condições e pedidos de desconto devem ser tratados?" },
  { id: "owner-promo", category: "Preços e condições aprovadas", prompt: "Como promoções, parcerias e campanhas devem ser comunicadas pelo bot?" },
  { id: "owner-promises", category: "Limites do agente", prompt: "Que promessas ou afirmações jamais devem ser feitas ao cliente?" },
  { id: "owner-voice", category: "Tom de voz", prompt: "Como a Shift deve soar no WhatsApp? Inclua palavras que usa e palavras que evita.", audioSuggested: true },
  { id: "owner-handoff", category: "Transferência para humanos", prompt: "Em quais situações o bot deve parar e chamar uma pessoa?" },
  { id: "owner-faq", category: "Perguntas frequentes", prompt: "Responda, como responderia no WhatsApp, às dez perguntas mais comuns que recebe.", audioSuggested: true },
];

export const leaderQuestions: WikiQuestion[] = [
  { id: "leader-hours", category: "Horários e regras operacionais", prompt: "Quais são os horários de funcionamento? Inclua dias úteis, sábado, domingo e feriados." },
  { id: "leader-location", category: "Horários e regras operacionais", prompt: "Qual é o endereço completo da Shift e como orientar quem pergunta onde fica? Inclua pontos de referência e estacionamento." },
  {
    id: "leader-services",
    category: "Serviços e diferenciais",
    prompt: "Quais serviços e modalidades a Shift oferece hoje?",
    help: "Marque tudo que existe e detalhe no texto como cada um funciona.",
    options: [
      "Musculação",
      "Cross / treino funcional",
      "Aulas coletivas",
      "Personal trainer",
      "Avaliação física",
      "Acompanhamento nutricional",
      "Pilates",
      "Lutas",
    ],
  },
  {
    id: "leader-structure",
    category: "Serviços e diferenciais",
    prompt: "O que a estrutura da academia oferece?",
    options: [
      "Estacionamento",
      "Vestiário com chuveiro",
      "Armários",
      "Ar-condicionado",
      "Área de cross / funcional",
      "Loja ou suplementos",
      "Bebedouro",
      "Wi-Fi para alunos",
    ],
  },
  { id: "leader-plans", category: "Preços e condições aprovadas", prompt: "Liste os planos com valores atuais e o que cada um inclui.", help: "Esses valores serão a referência oficial do bot. Inclua matrícula, taxa de adesão e validade." },
  {
    id: "leader-payment",
    category: "Preços e condições aprovadas",
    prompt: "Quais formas de pagamento são aceitas?",
    options: [
      "Pix",
      "Cartão de crédito",
      "Crédito recorrente (assinatura)",
      "Cartão de débito",
      "Dinheiro",
      "Boleto",
    ],
  },
  { id: "leader-cancel", category: "Horários e regras operacionais", prompt: "Como funcionam cancelamento, trancamento e transferência de plano? Existe multa ou fidelidade?" },
  { id: "leader-audience", category: "Horários e regras operacionais", prompt: "Existe idade mínima? Como funciona para adolescentes, crianças e alunos com restrição médica?" },
  { id: "leader-visits", category: "Horários e regras operacionais", prompt: "Como funcionam visitas e aulas experimentais? Precisa agendar, o que levar, quanto custa?" },
  { id: "leader-booking", category: "Horários e regras operacionais", prompt: "Quais são as regras de agendamento, atraso e cancelamento de horário?" },
  {
    id: "leader-qualification",
    category: "Processo comercial",
    prompt: "Quais informações devem ser coletadas de um novo interessado?",
    options: [
      "Nome completo",
      "Telefone / WhatsApp",
      "Objetivo (emagrecer, ganhar massa...)",
      "Experiência com treino",
      "Horário em que pretende treinar",
      "Bairro onde mora ou trabalha",
      "Como conheceu a Shift",
    ],
  },
  { id: "leader-daily", category: "Perguntas frequentes", prompt: "Quais perguntas chegam diariamente para a equipe?" },
  { id: "leader-answers", category: "Perguntas frequentes", prompt: "Qual é a resposta correta e completa para cada uma delas?", audioSuggested: true },
  { id: "leader-exceptions", category: "Exceções operacionais", prompt: "Quais situações possuem exceções e como a equipe decide o que fazer?" },
  { id: "leader-forbidden", category: "Limites do agente", prompt: "Quais perguntas não podem ser respondidas pelo bot?" },
  { id: "leader-handoff", category: "Transferência para humanos", prompt: "Quando o atendimento deve ser transferido e para quem?" },
  { id: "leader-examples", category: "Tom de voz", prompt: "Grave ou escreva exemplos de atendimentos muito bem conduzidos.", audioSuggested: true },
];

export const wikiCategories = [
  "Identidade e posicionamento",
  "Tom de voz",
  "Serviços e diferenciais",
  "Processo comercial",
  "Preços e condições aprovadas",
  "Horários e regras operacionais",
  "Perguntas frequentes",
  "Objeções e respostas",
  "Limites do agente",
  "Transferência para humanos",
  "Exceções operacionais",
];

export function questionsForRole(role: WikiRespondentRole) {
  return role === "owner" ? ownerQuestions : leaderQuestions;
}

export function buildAgentContext(entries: WikiEntry[]) {
  return entries
    .filter((entry) => entry.status === "approved")
    .map((entry) => `## ${entry.category}: ${entry.title}\n${entry.content}`)
    .join("\n\n");
}

