# Wiki LLM e agente da Shift

## Fluxo

1. Compartilhe `/wiki-shift?token=SEU_TOKEN` com o dono e o líder.
2. As entrevistas aparecem em `/admin/wiki`.
3. Transforme cada entrevista em rascunhos.
4. Revise conflitos. A orientação do dono prevalece.
5. Aprove somente o conteúdo oficial.
6. O endpoint `POST /api/wiki/agent` passa a usar esses itens.

## Supabase

Execute `supabase/migrations/004_shift_wiki_agent.sql` depois das três
migrations existentes. Configure `SUPABASE_SERVICE_ROLE_KEY` somente no
servidor.

## Jotform

O formulário nativo já está pronto, mas o mesmo fluxo aceita Jotform.

Crie campos com estes nomes únicos:

- `respondentName`
- `respondentTitle`
- `respondentRole`, com valores `owner` e `leader`
- os IDs definidos em `lib/wiki.ts`, por exemplo `owner-definition`

Use lógica condicional para mostrar perguntas `owner-*` ao dono e `leader-*`
ao líder. Ative Voice Recorder e Save and Continue Later.

Cadastre este webhook no Jotform:

```text
https://SEU_DOMINIO/api/webhooks/jotform?secret=SEU_SEGREDO
```

## Modelo e transcrição

O agente aceita um endpoint compatível com chat completions:

- `WIKI_LLM_API_URL`
- `WIKI_LLM_API_KEY`
- `WIKI_LLM_MODEL`

Para transcrever respostas enviadas somente em áudio:

- `WIKI_TRANSCRIPTION_API_URL`
- `WIKI_TRANSCRIPTION_MODEL`

Sem modelo configurado, o agente usa busca simples na Wiki e transfere quando
não encontra informação aprovada.

## WhatsApp

Configure o provedor para enviar mensagens recebidas para:

```text
https://SEU_DOMINIO/api/webhooks/whatsapp?secret=SEU_SEGREDO
```

Defina o mesmo segredo em `WHATSAPP_WEBHOOK_SECRET`.

### Evolution API (recomendado para começar)

1. Suba uma instância da Evolution API (Docker ou um provedor gerenciado).
2. Crie a instância da Shift e conecte lendo o QR code com o número oficial.
3. Em Webhooks, ative somente o evento `MESSAGES_UPSERT` apontando para a
   URL acima.
4. Configure no servidor:
   - `EVOLUTION_API_URL` — endereço da instância, por exemplo
     `https://evolution.seudominio.com`
   - `EVOLUTION_API_KEY` — a apikey da instância
   - `EVOLUTION_INSTANCE` — o nome da instância

O webhook ignora grupos, status e mensagens enviadas pela própria Shift.
Mensagens de áudio e imagem são ignoradas por enquanto; o cliente segue
sendo atendido por uma pessoa nesses casos.

### Outros provedores

O webhook também aceita o formato de mensagens da Meta Cloud API e o
formato direto:

```json
{
  "contactId": "5511999999999",
  "message": "Qual é a diferença da Shift?"
}
```

Para envio nesses casos, configure `WHATSAPP_SEND_URL` e, quando
necessário, `WHATSAPP_ACCESS_TOKEN`. O adaptador envia
`{ "to": "...", "text": "..." }`.
