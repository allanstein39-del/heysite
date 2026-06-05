-- ============================================================
-- SETUP — Recebimento de Mercadoria
-- Rodar uma vez no Supabase SQL Editor
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

-- RLS habilitado (acesso controlado pela URL secreta)
alter table fornecedores enable row level security;
alter table recebimentos enable row level security;

create policy "acesso_anon_fornecedores"
  on fornecedores for all to anon
  using (true) with check (true);

create policy "acesso_anon_recebimentos"
  on recebimentos for all to anon
  using (true) with check (true);

-- Storage bucket para fotos
insert into storage.buckets (id, name, public)
  values ('recebimentos-fotos', 'recebimentos-fotos', true)
  on conflict do nothing;

create policy "upload_anon_fotos"
  on storage.objects for insert to anon
  with check (bucket_id = 'recebimentos-fotos');

create policy "leitura_anon_fotos"
  on storage.objects for select to anon
  using (bucket_id = 'recebimentos-fotos');
