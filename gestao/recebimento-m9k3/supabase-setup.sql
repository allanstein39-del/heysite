-- ============================================================
-- SETUP — Recebimento de Mercadoria (versão revisada — segurança)
-- Rodar no Supabase SQL Editor.
--
-- O QUE MUDOU E POR QUÊ:
-- A versão anterior liberava leitura/escrita das tabelas e do bucket
-- de fotos para o papel "anon" (usuário não logado) do Supabase. Como
-- a chave "anon" fica exposta no HTML/JS público do site (isso é
-- normal e esperado no Supabase — a chave em si não é secreta), essa
-- policy na prática deixava fornecedores, notas fiscais, valores,
-- fotos e assinaturas de recebimento visíveis e editáveis por
-- qualquer pessoa na internet que descobrisse a URL do painel — sem
-- precisar de nenhum login. Também permitia inserir/alterar/apagar
-- registros à vontade.
--
-- A correção troca "anon" por "authenticated": só funciona depois que
-- alguém faz login pelo Supabase Auth. Passos para ativar:
--   1. No painel do Supabase: Authentication → Providers → confirme
--      que "Email" está habilitado.
--   2. Authentication → Users → Add user → crie um login para a
--      equipe da cozinha/gestor (pode ser um único login
--      compartilhado, ex: cozinha@heyburgers.com.br, ou um por
--      pessoa).
--   3. Rode este script inteiro no SQL Editor (ele remove as
--      policies antigas e cria as novas).
--   4. index.html já foi atualizado para pedir login antes de
--      mostrar o painel — nenhuma mudança extra é necessária aí.
-- ============================================================

-- Tabela de fornecedores
create table if not exists fornecedores (
  id        uuid primary key default gen_random_uuid(),
  nome      text not null,
  criado_em timestamptz default now()
);

-- Tabela de recebimentos
create table if not exists recebimentos (
  id              uuid primary key default gen_random_uuid(),
  fornecedor_id   uuid references fornecedores(id),
  fornecedor_nome text not null,
  nota            text,
  valor           text,
  ocorrencia      text check (ocorrencia in ('ok','faltou','avaria')) default 'ok',
  observacao      text,
  foto_url        text,
  recebido_por    text,
  assinatura      text,
  criado_em       timestamptz default now()
);

alter table fornecedores enable row level security;
alter table recebimentos enable row level security;

-- Remove as policies antigas (liberadas para "anon"), se existirem.
drop policy if exists "acesso_anon_fornecedores" on fornecedores;
drop policy if exists "acesso_anon_recebimentos" on recebimentos;
drop policy if exists "upload_anon_fotos" on storage.objects;
drop policy if exists "leitura_anon_fotos" on storage.objects;

-- Novas policies: exigem usuário autenticado (login feito no app).
create policy "acesso_autenticado_fornecedores"
  on fornecedores for all to authenticated
  using (true) with check (true);

create policy "acesso_autenticado_recebimentos"
  on recebimentos for all to authenticated
  using (true) with check (true);

-- Storage bucket para fotos.
-- OBS: o bucket continua "public" para leitura (as fotos abrem por
-- URL direta, sem exigir login) porque o app usa getPublicUrl() para
-- exibir as miniaturas. As URLs têm nomes aleatórios (timestamp) e não
-- ficam listadas publicamente, mas não são secretas — não são um bom
-- lugar para nada sensível. Se quiser fotos realmente privadas
-- (exigindo login para ver), me avise: isso exige trocar o bucket
-- para privado e o app para usar createSignedUrl() em vez de
-- getPublicUrl(), o que é uma mudança um pouco maior no código.
insert into storage.buckets (id, name, public)
  values ('recebimentos-fotos', 'recebimentos-fotos', true)
  on conflict do nothing;

-- Upload de fotos agora exige login (evita que qualquer pessoa use o
-- bucket para hospedar arquivos arbitrários às custas do seu projeto).
create policy "upload_autenticado_fotos"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'recebimentos-fotos');

create policy "leitura_autenticada_fotos"
  on storage.objects for select to authenticated
  using (bucket_id = 'recebimentos-fotos');
