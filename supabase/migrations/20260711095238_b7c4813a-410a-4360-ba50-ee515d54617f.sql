CREATE TABLE public.inscricoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  nome_aluno text NOT NULL,
  ano_escolaridade text NOT NULL,
  disciplinas text[] NOT NULL,
  nome_encarregado text,
  email text NOT NULL,
  telefone text,
  mensagem text,
  respondido boolean DEFAULT false
);

GRANT SELECT, INSERT ON public.inscricoes TO anon;
GRANT ALL ON public.inscricoes TO service_role;

ALTER TABLE public.inscricoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON public.inscricoes
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Service role full access" ON public.inscricoes
  FOR ALL TO service_role USING (true) WITH CHECK (true);
