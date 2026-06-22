/**
 * Shift — Form de Identidade & Voz (20 perguntas)
 * -----------------------------------------------
 * Form curto e focado: NÃO pergunta o que a Shift faz (serviços, preços, regras).
 * Pergunta QUEM a Shift é e COMO ela fala — é o que deixa o agente respondendo
 * "como a Shift". Inclui um bloco pra Shift se apresentar com exemplos.
 *
 * Como usar:
 *   1. Abra https://script.google.com → Novo projeto
 *   2. Apague o exemplo, cole este arquivo, salve (Cmd/Ctrl + S)
 *   3. Selecione a função `criarFormIdentidadeShift` → Executar
 *   4. Autorize as permissões (Forms, Drive, Sheets) na primeira vez
 *   5. Em "Registro de execução" copie o link do FORM e da PLANILHA
 *
 * Sem áudio (não dá pra criar upload por script) e sem login: qualquer pessoa
 * com o link responde. Se preferir falar, mande o áudio no WhatsApp.
 */

var GRUPOS = [
  {
    titulo: "Quem é a Shift",
    perguntas: [
      "Em uma frase, quem é a Shift?",
      "Se a Shift fosse uma pessoa, como ela seria? (jeito, personalidade, energia)",
      "Por que a Shift existe? Qual é o propósito por trás dela?",
      "Quais são os valores inegociáveis da Shift?",
      "O que torna a Shift diferente de qualquer outra academia?",
      "O que a Shift nunca pode perder, por mais que cresça?",
      "Como você quer que a pessoa se sinta ao conversar com a Shift?",
      "Qual é a promessa da Shift pra quem decide entrar?",
    ],
  },
  {
    titulo: "Como a Shift fala",
    perguntas: [
      "Como a Shift soa no WhatsApp? (direta, consultiva, descontraída, próxima...)",
      "Quais palavras e expressões são a cara da Shift?",
      "Quais palavras ou expressões a Shift nunca usaria?",
      "A Shift usa emojis? Quais combinam com ela e com que frequência?",
      "Como a Shift chama a pessoa? (você, pelo nome, algum apelido...)",
      "As respostas da Shift são curtas e diretas ou mais detalhadas?",
      "Qual é o tom quando alguém chega inseguro, perdido ou com vergonha?",
      "Como a Shift responde quando a pessoa está animada e empolgada?",
      "Como a Shift mostra que se importa de verdade, sem soar robótica?",
    ],
  },
  {
    titulo: "A Shift se apresentando",
    perguntas: [
      "Escreva como a Shift se apresentaria pra quem mandou só um “oi” no WhatsApp.",
      "Dê 3 exemplos de respostas que são 100% a cara da Shift.",
      "Dê 2 ou 3 exemplos de respostas que NÃO são a cara da Shift (o que evitar).",
    ],
  },
];

// ---------------------------------------------------------------------------
// Função principal — é esta que você roda.
// ---------------------------------------------------------------------------
function criarFormIdentidadeShift() {
  var planilha = SpreadsheetApp.create("Shift — Identidade (respostas)");

  var form = FormApp.create("Shift — Quem é a Shift");
  form.setDescription(
    "Estas respostas vão ensinar o agente de WhatsApp a falar e se apresentar como a Shift.\n\n" +
      "• Não tem certo nem errado: responda do seu jeito, como você sente a Shift.\n" +
      "• Nenhuma pergunta é obrigatória — pode pular o que quiser.\n" +
      "• Se preferir falar, grave um áudio no WhatsApp dizendo o número da pergunta.\n" +
      "• Leva uns 10 a 15 minutos."
  );
  form.setProgressBar(true);
  form.setAcceptingResponses(true);

  // Identificação leve (opcional).
  form
    .addTextItem()
    .setTitle("Seu nome (opcional)")
    .setRequired(false);

  // Blocos de perguntas (texto longo).
  for (var g = 0; g < GRUPOS.length; g++) {
    var grupo = GRUPOS[g];
    form.addSectionHeaderItem().setTitle(grupo.titulo);
    for (var p = 0; p < grupo.perguntas.length; p++) {
      form
        .addParagraphTextItem()
        .setTitle(grupo.perguntas[p])
        .setRequired(false);
    }
  }

  form.setConfirmationMessage(
    "Recebido! É assim que a Shift pensa e fala. Obrigado por ensinar o agente. 🧡"
  );

  // Respostas vão pra planilha.
  form.setDestination(FormApp.DestinationType.SPREADSHEET, planilha.getId());

  // Tenta publicar automaticamente (forms novos do Google nascem "não publicados").
  // Se o método não existir nesta conta, o script segue e você publica na mão.
  var publicado = false;
  try {
    if (typeof form.setPublished === "function") {
      form.setPublished(true);
      publicado = true;
    }
  } catch (e) {
    publicado = false;
  }

  Logger.log("==========================================================");
  Logger.log("PRONTO!");
  Logger.log("");
  Logger.log("FORM (enviar pra pessoa):");
  Logger.log("  " + form.getPublishedUrl());
  Logger.log("");
  Logger.log("EDITAR / PUBLICAR o form:");
  Logger.log("  " + form.getEditUrl());
  Logger.log("");
  Logger.log("PLANILHA DE RESPOSTAS (só sua):");
  Logger.log("  " + planilha.getUrl());
  Logger.log("");
  if (!publicado) {
    Logger.log(
      "ATENÇÃO: se o link do form abrir 'arquivo não existe', abra o link de EDITAR " +
        "acima e clique no botão 'Publicar' (canto superior direito). Depois o link funciona."
    );
  }
  Logger.log("==========================================================");
}
