/**
 * Wiki Shift — gerador dos 2 formulários (Dono + Líder)
 * ------------------------------------------------------
 * Cola este arquivo num projeto novo em https://script.google.com,
 * salva e roda a função `criarFormulariosShift`.
 *
 * O que ele faz:
 *   1. Cria uma planilha "Wiki Shift — Respostas".
 *   2. Cria 2 formulários idênticos (um pro Dono, outro pro Líder),
 *      cada pergunta como caixa de texto longo (áudio opcional vai pelo WhatsApp).
 *   3. Liga as respostas dos dois forms à mesma planilha (uma aba por form).
 *   4. Imprime no Log os 3 links (Dono, Líder, Planilha) pra você enviar.
 *
 * Rode quantas vezes quiser: cada execução gera novos formulários/planilha.
 */

// ---------------------------------------------------------------------------
// Perguntas (verbatim). Uma página por seção no formulário.
// ---------------------------------------------------------------------------
var SECOES = [
  {
    titulo: "Identidade da Shift",
    perguntas: [
      "Como você explicaria o que é a Shift para alguém que nunca ouviu falar dela?",
      "Por que a Shift existe?",
      "Por que uma pessoa deveria escolher a Shift em vez de uma academia tradicional?",
      "Quais são os principais diferenciais da Shift?",
      "Quais valores são indispensáveis para a empresa?",
      "O que a Shift nunca deve perder durante seu crescimento?",
    ],
  },
  {
    titulo: "Perfil dos clientes",
    perguntas: [
      "Quem é o cliente ideal da Shift?",
      "Quais objetivos levam as pessoas a procurar a Shift?",
      "Quais problemas, inseguranças ou dificuldades esses clientes costumam apresentar?",
      "Existe algum perfil de cliente que não combina com a proposta da Shift?",
      "O que normalmente faz um interessado decidir fechar?",
      "O que normalmente impede ou atrasa essa decisão?",
    ],
  },
  {
    titulo: "Serviços",
    perguntas: [
      "Quais serviços a Shift oferece?",
      "Como você explicaria o treino personalizado?",
      "Como você explicaria o Shift Flow?",
      "Como você explicaria o Shift Move?",
      "Como você explicaria o Recovery?",
      "Como você explicaria a Fisioterapia?",
      "Como você explicaria a Nutrição?",
      "Para quem cada serviço é indicado?",
      "Quais são as dúvidas mais comuns sobre cada serviço?",
      "Quais resultados podem ser apresentados ao cliente?",
      "Quais resultados ou promessas nunca devem ser feitos?",
    ],
  },
  {
    titulo: "Atendimento comercial",
    perguntas: [
      "Como deve começar o atendimento de uma nova pessoa interessada?",
      "Quais informações devem ser coletadas antes de recomendar um serviço?",
      "Quando alguém pergunta somente “qual é o preço?”, como devemos responder?",
      "Como responder quando alguém diz que a Shift está cara?",
      "Quais são as principais objeções apresentadas pelos interessados?",
      "Qual é a resposta ideal para cada objeção?",
      "Quais condições comerciais podem ser oferecidas?",
      "Quais descontos ou condições nunca devem ser oferecidos?",
      "Quando devemos convidar a pessoa para uma visita ou aula experimental?",
      "Como funciona o agendamento de uma visita?",
      "Como funciona a aula experimental?",
      "Como fazer acompanhamento quando o interessado não responde?",
      "Quando devemos parar de insistir no contato?",
    ],
  },
  {
    titulo: "Regras operacionais",
    perguntas: [
      "Quais são os horários de funcionamento e atendimento?",
      "Como funcionam os agendamentos?",
      "Como funcionam atrasos?",
      "Como funcionam cancelamentos e reagendamentos?",
      "Existem prazos ou limites que o cliente precisa conhecer?",
      "Quais situações possuem exceções às regras?",
      "Como a equipe decide o que fazer nessas exceções?",
      "Quais informações mudam frequentemente e precisam ser atualizadas?",
    ],
  },
  {
    titulo: "Voz da Shift",
    perguntas: [
      "Como a Shift deve soar no WhatsApp?",
      "O atendimento deve ser mais direto, consultivo, formal ou descontraído?",
      "Quais palavras e expressões representam a Shift?",
      "Quais palavras ou expressões devem ser evitadas?",
      "O bot pode usar emojis? Quais e com que frequência?",
      "Como deve chamar o cliente?",
      "As respostas devem ser curtas ou detalhadas?",
      "Escreva três exemplos de respostas que representam bem a Shift.",
      "Escreva três exemplos de respostas que não representam a Shift.",
    ],
  },
  {
    titulo: "Alunos atuais e problemas",
    perguntas: [
      "Quais dúvidas os alunos atuais apresentam com frequência?",
      "Quais reclamações aparecem com mais frequência?",
      "Como cada reclamação deve ser tratada?",
      "Como responder a um aluno insatisfeito?",
      "Como responder a alguém que deseja cancelar?",
      "Quais situações devem receber prioridade?",
      "Quais assuntos são sensíveis e exigem cuidado especial?",
    ],
  },
  {
    titulo: "Limites do bot",
    perguntas: [
      "Quais perguntas o bot pode responder sozinho?",
      "Quais perguntas o bot nunca deve responder sozinho?",
      "Em quais situações o bot deve chamar uma pessoa?",
      "Para quem cada tipo de conversa deve ser transferido?",
      "Quais decisões somente o dono pode tomar?",
      "Quais decisões a liderança pode tomar?",
      "Como o bot deve responder quando não souber algo?",
      "O bot pode informar preços diretamente?",
      "O bot pode verificar ou prometer disponibilidade?",
      "Quais informações pessoais o bot pode solicitar?",
      "Quais informações pessoais nunca deve solicitar?",
    ],
  },
  {
    titulo: "Cenários práticos",
    perguntas: [
      "Como responder: “Só quero saber o preço”?",
      "Como responder: “Achei caro”?",
      "Como responder: “Quero emagrecer rápido”?",
      "Como responder: “Tenho uma lesão. Qual treino devo fazer?”?",
      "Como responder: “Quero fazer uma aula experimental”?",
      "Como responder: “Quero cancelar meu plano”?",
      "Como responder: “Tive uma experiência ruim”?",
      "Como responder: “Qual é a diferença entre vocês e uma academia comum?”?",
      "Como responder quando a pessoa envia uma mensagem incompleta?",
      "Como responder quando a pessoa manda somente um áudio?",
      "Escreva ou grave as dez perguntas mais comuns e as respostas ideais.",
    ],
  },
  {
    titulo: "Encerramento",
    perguntas: [
      "Existe alguma informação importante que não foi perguntada?",
      "O que faria você perder a confiança em uma resposta do agente?",
      "Como saberemos que o agente está representando bem a Shift?",
      "Em quais assuntos sua resposta deve ser considerada definitiva?",
      "Existe alguma resposta que precisa ser validada pelo dono?",
      // A última pergunta da seção (consentimento) é adicionada à parte,
      // como múltipla escolha obrigatória — ver `montarForm`.
    ],
  },
];

var PERGUNTA_CONSENTIMENTO =
  "Autoriza o uso interno destas respostas e gravações para criar e melhorar o agente da Shift?";

var PAPEIS = ["Dono", "Líder"];

// ---------------------------------------------------------------------------
// Função principal — é esta que você roda.
// ---------------------------------------------------------------------------
function criarFormulariosShift() {
  var planilha = SpreadsheetApp.create("Wiki Shift — Respostas");
  var planilhaId = planilha.getId();

  var links = [];
  for (var i = 0; i < PAPEIS.length; i++) {
    var papel = PAPEIS[i];
    var form = montarForm(papel, planilhaId);
    links.push({
      papel: papel,
      publico: form.getPublishedUrl(),
      edicao: form.getEditUrl(),
    });
  }

  // Resumo final nos logs.
  Logger.log("==========================================================");
  Logger.log("PRONTO! Copie os links abaixo.");
  Logger.log("");
  for (var j = 0; j < links.length; j++) {
    Logger.log("FORM " + links[j].papel + " (enviar pra pessoa):");
    Logger.log("  " + links[j].publico);
    Logger.log("  (editar: " + links[j].edicao + ")");
    Logger.log("");
  }
  Logger.log("PLANILHA DE RESPOSTAS (acompanhe aqui — uma aba por form):");
  Logger.log("  " + planilha.getUrl());
  Logger.log("==========================================================");
}

// ---------------------------------------------------------------------------
// Monta um formulário pra um papel ("Dono" ou "Líder").
// ---------------------------------------------------------------------------
function montarForm(papel, planilhaId) {
  var form = FormApp.create("Wiki Shift — " + papel);

  form.setDescription(
    "Estas respostas vão treinar o agente de WhatsApp da Shift.\n\n" +
      "• Responda do jeito que você explicaria pra alguém da equipe.\n" +
      "• Em cada pergunta você pode escrever no campo de texto OU, se preferir falar, " +
      "gravar um áudio no WhatsApp e mandar pra equipe Shift.\n" +
      "• Nenhuma pergunta é obrigatória, menos a autorização no final. " +
      "Pode pular o que não souber.\n" +
      "• Tempo estimado: 30 a 45 minutos. Dá pra responder em partes.\n\n" +
      "Dica para áudio: diga o título da pergunta antes de responder, " +
      "pra gente saber a qual pergunta o áudio se refere."
  );

  form.setCollectEmail(true);
  form.setProgressBar(true);
  form.setLimitOneResponsePerUser(false);
  form.setAllowResponseEdits(true);

  // Identificação no topo.
  form.addTextItem().setTitle("Seu nome").setRequired(true);
  form
    .addTextItem()
    .setTitle("Seu cargo / função na Shift")
    .setHelpText("Ex.: Sócio fundador, Gerente, Líder de atendimento.")
    .setRequired(false);

  // Seções (uma página cada).
  for (var s = 0; s < SECOES.length; s++) {
    var secao = SECOES[s];
    form
      .addPageBreakItem()
      .setTitle(secao.titulo)
      .setGoToPage(FormApp.PageNavigationType.CONTINUE);

    for (var p = 0; p < secao.perguntas.length; p++) {
      form
        .addParagraphTextItem()
        .setTitle(secao.perguntas[p])
        .setRequired(false);
    }

    // Lembrete de áudio ao fim de cada seção.
    // (O Google Forms criado por script NÃO suporta campo de upload de arquivo —
    //  addFileUploadItem não existe na API. Por isso o áudio vai pelo WhatsApp.)
    form
      .addSectionHeaderItem()
      .setTitle("🎙️ Prefere responder por áudio?")
      .setHelpText(
        "Pode gravar no WhatsApp e mandar pra equipe Shift. " +
          "Diga o título da pergunta antes de cada áudio. Os campos de texto acima continuam opcionais."
      );
  }

  // Consentimento (última pergunta, obrigatória) — fica na página de Encerramento.
  form
    .addMultipleChoiceItem()
    .setTitle(PERGUNTA_CONSENTIMENTO)
    .setChoiceValues(["Sim, autorizo", "Não autorizo"])
    .setRequired(true);

  // Mensagem de confirmação.
  form.setConfirmationMessage(
    "Recebido! Obrigado por ensinar como a Shift pensa. " +
      "As respostas serão revisadas antes de entrarem na base do agente."
  );

  // Liga as respostas à planilha compartilhada (cria uma aba por formulário).
  form.setDestination(FormApp.DestinationType.SPREADSHEET, planilhaId);

  return form;
}
