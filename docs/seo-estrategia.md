# Estratégia de SEO — Shift Jundiaí

> Base: metodologia "Claude Code SEO / Local SEO" (vídeo de referência) + skill open-source
> [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) + playbook programático 2026.
> Adaptada à realidade da Shift: **um estúdio físico em Jundiaí, conversão via WhatsApp.**
> Última atualização: 2026-06-22.

---

## 1. O que a metodologia ensina (resumo do que aprendi)

O método "50k cliques/mês com Claude Code" combina quatro frentes. Nem todas se aplicam
do mesmo jeito a um negócio local de **uma unidade** — a tabela abaixo já filtra o que faz
sentido pra Shift.

| Frente | O que é | Aplica à Shift? |
|---|---|---|
| **Local SEO** | Google Business Profile (GBP), consistência NAP, schema `LocalBusiness`, reviews, geo-grid no Maps | **Sim — é o pilar nº 1.** Maior ROI pra academia. |
| **SEO programático** | Gerar muitas páginas "[serviço] em [cidade]" automaticamente | **Versão enxuta.** Pra 1 unidade, um punhado de páginas de intenção — NÃO milhares (vira *doorway page* e penaliza). O próprio skill alerta: 30 páginas = warning, 50 = parada dura. |
| **GEO/AEO** | Ser citado por IA (ChatGPT, Perplexity, Google AI Overviews) com blocos de resposta "citáveis" (134–167 palavras), headings em forma de pergunta, FAQ | **Sim.** Conteúdo que responde perguntas reais e ganha snippet/citação. |
| **Technical / E-E-A-T** | Core Web Vitals, schema válido, indexação, autoridade (autores reais, fotos próprias, contato transparente) | **Sim.** Polir o que já existe. |

**Princípios que o método deixa claro (e que vamos seguir):**
- Conteúdo de IA *pode* ranquear — vira spam só quando escala páginas de baixo valor. Cada página precisa de valor próprio (foto real, dado local, opinião).
- "AEO/GEO" não é mágica nova: é SEO bem feito. Sem `llms.txt`, sem "keyword stuffing pra IA".
- FAQ rich result do Google foi **descontinuado (07/05/2026)** — FAQ continua útil pra usuário e pra IA, mas não conte com a estrelinha no resultado.
- Toda recomendação tem que ter um "como eu saberia que falhou?" → medir no Search Console.

---

## 2. Diagnóstico do site hoje

**Já implementado ✅** (commits da branch `feat/seo-foundation`)
- `app/robots.ts` — bloqueia áreas internas (admin, login, professor, api, wiki, chat-teste).
- `app/sitemap.ts` — porém só com 2 URLs (home + `/professores`).
- `components/local-business-jsonld.tsx` — schema `["HealthClub","ExerciseGym"]` com endereço, telefone, horário, `areaServed`.
- `app/layout.tsx` — title template, description, keywords, OpenGraph, Twitter card, `metadataBase` canônico.
- `public/images/og-shift.jpg` existe (1200×630).
- Domínio canônico `studioshift.com.br` (deploy Vercel).

**Lacunas 🔴**
1. Schema `LocalBusiness` **sem `geo` (lat/long)** — sinal forte pro Maps.
2. Schema **sem `aggregateRating`/`review`** — estrelas e prova social no resultado.
3. `sameAs` só tem Instagram — falta GBP, e o que mais existir.
4. Sitemap com só 2 páginas — nenhuma página de intenção local.
5. **Zero páginas de serviço/intenção** ("personal trainer em Jundiaí", "musculação", "recovery").
6. **Sem blog / conteúdo** → sem captura de cauda longa, sem E-E-A-T, sem matéria pra IA citar.
7. **Sem FAQ citável** na home (blocos de resposta pra GEO/AEO).
8. Página `/professores` existe mas (provável) sem schema `Person` por professor (E-E-A-T).
9. Falta confirmar **Google Search Console + GA4** ligados ao domínio.
10. **Google Business Profile** (off-site) — a alavanca local mais importante e independente do código.

---

## 3. A estratégia em 4 pilares

### Pilar 1 — Dominar o SEO Local (prioridade máxima)
O objetivo é aparecer no **pack do Maps** e no topo de "academia em Jundiaí" e variações.
Off-site (você/equipe faz no painel do Google) + on-site (eu faço no código).

**Google Business Profile (off-site — maior impacto):**
- Categoria primária: **Personal trainer** ou **Academia**; secundárias: Estúdio de Pilates/Fitness, Recovery.
- NAP idêntico ao do site: `Av. 9 de Julho, 3290 - Loja 4 - Centro, Jundiaí - SP, 13201-019` + telefone `+55 11 99013-0543`.
- Horário igual ao `site.ts` (Seg–Sex 6h–22h, Sáb 8h–12h, Dom fechado).
- Fotos reais (as `shift-*.jpeg` já servem), atualizadas no GBP.
- **Reviews:** meta de pedir avaliação a cada aluno novo/satisfeito. Responder 100% delas. É o sinal local que mais move o ponteiro.
- Posts semanais no GBP (mesma pegada do conteúdo do site).

**On-site (código):**
- Adicionar `geo` (lat/long da Loja 4) ao schema.
- Adicionar `aggregateRating` ao schema quando houver volume de reviews.
- Incluir o link do GBP em `sameAs`.

### Pilar 2 — Páginas de intenção local (versão enxuta do programático)
Criar **um conjunto controlado** de landing pages, uma por intenção de busca real. Cada uma
com conteúdo próprio (não template clonado), CTA de WhatsApp e schema do serviço.

Candidatas (ordem de prioridade por volume/intenção):
1. `/personal-trainer-jundiai` — "personal trainer em Jundiaí"
2. `/musculacao-jundiai` — "musculação em Jundiaí" / "academia de musculação"
3. `/treino-personalizado-jundiai` — "estúdio de treino personalizado"
4. `/recovery-jundiai` — "recovery / recuperação muscular Jundiaí"
5. `/academia-centro-jundiai` — "academia no centro de Jundiaí"

> **Teto:** ficar bem abaixo de 30 páginas. Pra 1 unidade, 4–6 páginas fortes > 50 fracas.
> Sem combinar bairro × serviço em massa (vira doorway page).

### Pilar 3 — Conteúdo + GEO/AEO (autoridade e citação por IA)
- **FAQ na home** com blocos de resposta auto-contidos (≈130–160 palavras), headings em pergunta:
  "Quanto custa treinar na Shift?", "Onde fica a Shift em Jundiaí?", "A Shift atende iniciantes?",
  "Tem estacionamento?", "Como funciona a aula experimental?". (Reaproveita a wiki do agente — já temos esse conteúdo curado em `lib/wiki-seed.ts`.)
- **Blog/guias** (cauda longa + E-E-A-T): poucos artigos, mas bons. Ex.: "Como escolher um personal em Jundiaí", "Musculação x treino funcional: o que faz sentido pra você", "O que é treino com acompanhamento 2:1".
- Cada peça com autor real (professor), foto própria, e responde perguntas que pessoas de fato fazem.

### Pilar 4 — Technical SEO + medição
- Expandir `sitemap.ts` conforme novas páginas entram.
- Confirmar **Search Console** (propriedade do domínio) + **GA4**, e submeter o sitemap.
- Core Web Vitals: imagens já usam `next/image`; revisar LCP do hero e peso das `.jpeg` (algumas têm ~600KB — converter pra WebP/AVIF).
- Schema `Person` para cada professor em `/professores` (E-E-A-T).
- `BreadcrumbList` quando houver hierarquia de páginas.

---

## 4. Roadmap por fases

### Fase 0 — Quick wins no código (1 sessão, eu faço)
- [ ] Adicionar `geo` (lat/long) ao `LocalBusinessJsonLd`.
- [ ] Adicionar GBP em `sameAs` (assim que tivermos o link público do perfil).
- [ ] Reforçar `keywords`/description com termos de intenção local.
- [ ] Estrutura de `aggregateRating` pronta (ativar quando houver reviews).

### Fase 1 — Local SEO (você + eu)
- [ ] **Você:** reivindicar/otimizar o Google Business Profile (categoria, NAP, horário, fotos, primeiro lote de reviews).
- [ ] **Eu:** página `/academia-centro-jundiai` (a mais "local") + schema.
- [ ] **Eu/você:** ligar Search Console + GA4, submeter sitemap.

### Fase 2 — Páginas de intenção (eu faço, você revisa)
- [ ] `/personal-trainer-jundiai`, `/musculacao-jundiai`, `/recovery-jundiai`, `/treino-personalizado-jundiai`.
- [ ] Componente reutilizável de landing de serviço (conteúdo único por página, sem clone).
- [ ] Schema `Service` + atualização do sitemap + interlinks a partir da home.

### Fase 3 — Conteúdo / GEO-AEO
- [ ] Bloco de **FAQ** na home (reaproveitando a wiki do agente).
- [ ] Schema `Person` por professor em `/professores`.
- [ ] 2–3 artigos de blog com autor real.

### Fase 4 — Medir e iterar
- [ ] Revisar Search Console mensalmente (impressões, cliques, posição, queries).
- [ ] Acompanhar ranking no Maps (geo-grid) e nº/nota de reviews.
- [ ] Dobrar no que funciona; cortar o que não move.

---

## 5. Pesquisa de palavras-chave (sementes)

**Alta intenção / conversão**
- academia em Jundiaí · academia no centro de Jundiaí · melhor academia Jundiaí
- personal trainer Jundiaí · personal trainer em Jundiaí
- musculação Jundiaí · estúdio de treino Jundiaí · treino personalizado Jundiaí
- recovery Jundiaí · recuperação muscular Jundiaí · avaliação física Jundiaí

**Cauda longa / informacional (blog + GEO)**
- quanto custa personal trainer em Jundiaí
- academia com acompanhamento individual Jundiaí
- vale a pena treino personalizado · musculação x funcional

**Geo (Maps / "perto de mim")**
- academia perto de mim · personal perto de mim · academia Av. 9 de Julho

> Validar volume real com Search Console (após dados) e/ou DataForSEO/Ahrefs se quiser
> precisão. Sem ferramenta paga, o GSC + sugestões do Google já guiam bem.

---

## 6. O que NÃO fazer (armadilhas do método)
- ❌ Gerar dezenas de páginas bairro×serviço clonadas → *doorway pages*, penalização.
- ❌ Texto de IA genérico sem foto/dado/opinião local → "helpful content" reprova.
- ❌ Prometer resultado físico/prazo (já é regra do agente; vale pro site também).
- ❌ NAP divergente entre site, GBP e diretórios → confunde o Google e derruba o local.
- ❌ Depender de FAQ rich result (descontinuado) — usar FAQ pelo valor de UX/IA, não pela estrela.
