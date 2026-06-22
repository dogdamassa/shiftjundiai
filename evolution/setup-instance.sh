#!/usr/bin/env bash
# Cria a instância da Shift na Evolution e aponta o webhook pro Next app.
# Rode DEPOIS de "docker compose up -d" e com o Next app no ar (porta 3000).
# Uso:  ./setup-instance.sh
set -euo pipefail

cd "$(dirname "$0")"

API_URL="http://localhost:8080"
INSTANCE="shift"
# Pega a apikey do .env
API_KEY="$(grep '^AUTHENTICATION_API_KEY=' .env | cut -d= -f2)"
# host.docker.internal = a sua máquina, vista de dentro do container.
WEBHOOK_URL="http://host.docker.internal:3000/api/webhooks/whatsapp"

echo "→ Criando instância '$INSTANCE'..."
curl -s -X POST "$API_URL/instance/create" \
  -H "Content-Type: application/json" \
  -H "apikey: $API_KEY" \
  -d "{\"instanceName\":\"$INSTANCE\",\"integration\":\"WHATSAPP-BAILEYS\",\"qrcode\":true}" \
  | sed 's/.\{200\}/&\n/g'
echo

echo "→ Configurando webhook (somente MESSAGES_UPSERT)..."
curl -s -X POST "$API_URL/webhook/set/$INSTANCE" \
  -H "Content-Type: application/json" \
  -H "apikey: $API_KEY" \
  -d "{\"webhook\":{\"enabled\":true,\"url\":\"$WEBHOOK_URL\",\"webhookByEvents\":false,\"webhookBase64\":false,\"events\":[\"MESSAGES_UPSERT\"]}}"
echo
echo
echo "✓ Pronto. Agora abra http://localhost:8080/manager , logue com a apikey"
echo "  e escaneie o QR code da instância '$INSTANCE' com o WhatsApp do número da demo."
