# Shift Jundiaí

Plataforma institucional e operacional da Shift: site público, área do aluno,
painel do professor e administração.

## Rodar localmente

1. Instale as dependências com `npm install`.
2. Copie `.env.example` para `.env.local`.
3. Rode `npm run dev`.
4. Acesse `http://localhost:3000`.

Sem credenciais do Supabase, a aplicação funciona em modo demonstrativo. Os
atalhos na tela de login abrem os três perfis.

## Supabase

1. Crie um projeto Supabase.
2. Execute `supabase/migrations/001_initial_schema.sql` no SQL Editor.
3. Configure as variáveis `NEXT_PUBLIC_SUPABASE_URL` e
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Crie usuários no Auth e associe-os conforme `supabase/seed.sql`.

O schema inclui:

- RLS por aluno, professor e administrador.
- Reserva transacional com bloqueio de horário e controle de capacidade.
- Abertura de agenda no D+7 e encerramento dez minutos antes.
- Check-in pelo aluno, correção pela equipe e ausência após a janela.
- Débito e devolução de créditos em livro-razão.
- Frequência configurável para fisioterapia e nutrição.
- Aulas recorrentes Shift Flow e Shift Move com capacidade configurável.
- Planos, assinaturas, mensalidades e pagamentos confirmados manualmente.
- Recados com prioridade, validade, fixação e registro de leitura.
- Bucket privado para fotos de evolução.

Execute as migrations na ordem:

1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/002_platform_expansion.sql`
3. `supabase/migrations/003_shift_league.sql`

## Verificações

```bash
npm run lint
npm test
npm run build
```
