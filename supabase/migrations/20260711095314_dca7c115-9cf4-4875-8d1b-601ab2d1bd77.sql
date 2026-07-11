DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.inscricoes;
REVOKE INSERT ON public.inscricoes FROM anon;
REVOKE SELECT ON public.inscricoes FROM anon;

-- Keep only service_role with full access (bypasses RLS by role attribute)
GRANT ALL ON public.inscricoes TO service_role;
