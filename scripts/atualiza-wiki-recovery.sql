-- =============================================================================
-- Recovery na base de atendimento do agente (wiki_entries) — 2026-06-22
-- =============================================================================
-- Cole este bloco no SQL Editor do Supabase e clique em "Run".
-- Alinha o agente ao site: recovery é integrado ao treino, com UMA sessão por
-- mês inclusa no plano e a opção de contratar sessões adicionais.
-- Mesmo conteúdo já refletido em lib/wiki-seed.ts e scripts/seed-wiki-atendimento.sql.
--
-- Idempotente: o insert só cria a entrada se ela ainda não existir (casa por
-- categoria + título), então pode rodar mais de uma vez sem duplicar.
--
-- ⚠️ Não cita valores em reais — política de preços do agente (a equipe fecha).
-- =============================================================================

insert into public.wiki_entries (category, title, content, source_role, status, approved_at)
select
  v.category,
  v.title,
  v.content,
  v.source_role::public.wiki_respondent_role,
  'approved'::public.wiki_entry_status,
  now()
from (values
  ('Serviços e diferenciais',
   'Recovery (recuperação muscular)',
   'A Shift tem recovery (recuperação muscular) integrado ao treino e ao acompanhamento do aluno. Cada plano inclui uma sessão de recovery por mês, e o aluno pode contratar sessões adicionais quando quiser. O recovery é ajustado ao que a pessoa treinou e à sua fase. Não é tratamento médico nem promessa de cura. Não cite valores das sessões adicionais — a equipe confirma condições e preços.',
   'leader')
) as v(category, title, content, source_role)
where not exists (
  select 1 from public.wiki_entries e
  where e.title = v.title and e.category = v.category
);
