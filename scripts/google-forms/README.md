# Wiki Shift — 2 Google Forms (Dono + Líder)

Gera **dois formulários no Google Forms** — um pro **Dono**, outro pro **Líder** — com as ~88 perguntas
que vão treinar o agente de WhatsApp da Shift. Cada pergunta tem uma **caixa de texto longo** e cada seção
tem um **campo de áudio opcional**. As respostas caem automaticamente numa **planilha do Google** (uma aba
por formulário) — ou seja, "a pessoa acessa, escreve e já fica registrado lá".

Os dois formulários têm o **mesmo conteúdo completo** (os dois respondem tudo). São dois links separados só
pra você mandar o certo pra cada pessoa e separar as respostas na planilha.

> Isto roda **fora do site/app** — não precisa publicar nada nem configurar Supabase. É a forma mais rápida.

---

## Como rodar (uma vez, ~3 minutos)

1. Abra **https://script.google.com** (logado na conta Google da Shift) → **Novo projeto**.
2. Apague o código de exemplo que aparece e **cole todo o conteúdo** de
   [`criar-forms-shift.gs`](./criar-forms-shift.gs).
3. Clique em **Salvar** (ícone de disquete).
4. No topo, selecione a função **`criarFormulariosShift`** e clique em **Executar** (▶).
5. Na primeira vez o Google pede autorização: **Revisar permissões** → escolha a conta → "Avançado" →
   "Acessar projeto (não seguro)" → **Permitir**. (É normal: o script precisa criar Forms/Planilha na sua conta.)
6. Quando terminar, abra os **Registros de execução** (menu **Ver → Registros** ou `Ctrl/Cmd + Enter`).
   Lá vão estar **3 links**:
   - **Form Dono** → envie pro dono no WhatsApp
   - **Form Líder** → envie pro líder no WhatsApp
   - **Planilha de respostas** → onde você acompanha tudo

Pronto. Cada resposta enviada aparece na aba correspondente da planilha em tempo real.

---

## Detalhes úteis

- **Editar perguntas depois:** use o "link de edição" que também aparece nos logs (ou abra o form no seu
  Google Forms). Pra mudar o texto de uma pergunta antes de criar, edite a lista `SECOES` no `.gs` e rode de novo.
- **Rodar de novo:** cada execução cria **novos** formulários e uma **nova** planilha. Rode só uma vez por
  rodada de coleta (ou apague os anteriores se rodar sem querer).
- **Responder em partes:** os formulários permitem editar a resposta depois de enviar, então dá pra responder
  aos poucos. Nenhuma pergunta é obrigatória, exceto a autorização (consentimento) no final.

### Sobre o áudio
O Google Forms **não permite criar campo de upload de arquivo por script** (é uma limitação do Google).
Então o áudio é **opcional e vai pelo WhatsApp**: cada seção tem um lembrete dizendo que, se a pessoa
preferir falar em vez de digitar, é só gravar um áudio no WhatsApp e mandar pra equipe — dizendo o título
da pergunta antes de responder. Vantagem: ninguém precisa estar logado numa conta Google pra isso.

---

## Depois da coleta (opcional, mais pra frente)

As respostas ficam na planilha. Quando quiserem levar pro agente, dá pra transformar cada linha em conteúdo
da base de conhecimento — o app já tem a tela `/admin/wiki`, que converte respostas em entradas aprováveis
pelo time. Esse passo de importação fica pra depois.
