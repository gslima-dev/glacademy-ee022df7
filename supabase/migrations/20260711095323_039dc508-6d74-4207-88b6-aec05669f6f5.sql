CREATE POLICY "Deny all to application roles" ON public.inscricoes
  FOR ALL TO authenticated, anon USING (false) WITH CHECK (false);
