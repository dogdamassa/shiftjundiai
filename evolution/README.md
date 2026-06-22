# WhatsApp da Shift via Evolution API — passo a passo (demo local)

Objetivo: subir a Evolution API na sua máquina, conectar um número de WhatsApp
e ver o bot da Shift respondendo sozinho. Tudo local, sem deploy nem túnel.

Arquitetura da demo:

```
WhatsApp do cliente
      │ (mensagem)
      ▼
Evolution API (Docker, localhost:8080)
      │ webhook MESSAGES_UPSERT → host.docker.internal:3000
      ▼
Next app (localhost:3000) /api/webhooks/whatsapp → /api/wiki/agent
      │ resposta do agente
      ▼
Evolution API → manda de volta no WhatsApp do cliente
```

---

## Passo 0 — Instalar o Docker (só na primeira vez)

Sua máquina ainda não tem Docker. Baixe o **Docker Desktop para Mac**:
https://www.docker.com/products/docker-desktop/

Escolha o chip certo (Apple Silicon / M1+ ou Intel). Instale, abra o Docker
Desktop e espere a baleia ficar verde. Confirme no terminal:

```bash
docker --version
docker compose version
```

## Passo 1 — Subir a Evolution API

```bash
cd "evolution"
docker compose up -d
```

A primeira vez baixa as imagens (~1–2 min). Confira que subiu:

```bash
docker compose ps
```

A API fica em **http://localhost:8080** e o painel em
**http://localhost:8080/manager**.

> A `apikey` da demo já está no arquivo `.env` (variável
> `AUTHENTICATION_API_KEY`). É ela que você usa pra logar no manager.

## Passo 2 — Apontar o Next app pra Evolution

No **`.env.local`** da raiz do projeto (não no `.env` da pasta evolution),
adicione:

```
EVOLUTION_API_URL=http://localhost:8080
EVOLUTION_API_KEY=0894798a-6142-4d7d-bcbe-6ebaccd44f0d
EVOLUTION_INSTANCE=shift
```

Deixe `WHATSAPP_WEBHOOK_SECRET` **vazio** pra demo (assim o webhook não exige
`?secret=`). Garanta também que o agente da wiki esteja configurado
(`WIKI_LLM_API_URL`, `WIKI_LLM_API_KEY`, `WIKI_LLM_MODEL`) — é ele que gera as
respostas.

## Passo 3 — Rodar o Next app

Em outro terminal, na raiz do projeto (lembrando do nvm):

```bash
source ~/.nvm/nvm.sh
npm run dev
```

Deve abrir em http://localhost:3000.

## Passo 4 — Criar a instância e ligar o webhook

Com o app no ar, rode o script (cria a instância `shift` e configura o
webhook só com `MESSAGES_UPSERT`):

```bash
cd "evolution"
./setup-instance.sh
```

## Passo 5 — Conectar o WhatsApp (QR code)

1. Abra **http://localhost:8080/manager**.
2. Logue com a apikey do `.env`.
3. Abra a instância **shift** → clique em conectar/QR code.
4. No celular do número da demo: WhatsApp → Aparelhos conectados →
   Conectar um aparelho → escaneie o QR.

Quando ficar "open/conectado", está pronto.

## Passo 6 — Testar

De **outro** celular, mande uma mensagem pro número conectado. O agente da
Shift deve responder em alguns segundos.

---

## Dicas e troubleshooting

- **Webhook não chega no app**: o webhook usa `host.docker.internal:3000`
  (a sua máquina vista de dentro do container). No Docker Desktop pra Mac isso
  funciona; confira que o Next app está rodando na porta 3000.
- **QR code não aparece / "versão do WhatsApp"**: descomente
  `CONFIG_SESSION_PHONE_VERSION` no `.env` com uma versão atual do WhatsApp Web
  e rode `docker compose restart evolution-api`. Versões atuais saem em
  https://wppconnect.io/whatsapp-versions/ .
- **Ver os logs da Evolution**: `docker compose logs -f evolution-api`.
- **Resetar tudo**: `docker compose down -v` (apaga a sessão; precisa reescanear
  o QR depois).
- **Só conversas 1:1**: o webhook ignora grupos, status e mensagens enviadas
  pela própria Shift (ver [lib/whatsapp.ts](../lib/whatsapp.ts)).
- **Áudio/imagem**: ignorados por enquanto — nesses casos o cliente segue com
  atendimento humano.
```
