import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { AlunoShell } from "@/components/aluno/AlunoShell";

export const Route = createFileRoute("/aluno")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      throw redirect({ to: "/auth" });
    }
    return { user: data.user };
  },
  head: () => ({ meta: [{ title: "Área do Aluno · GL Academy" }, { name: "robots", content: "noindex" }] }),
  component: AlunoLayout,
});

function AlunoLayout() {
  const { user } = Route.useRouteContext();
  const { data: profile } = useQuery({
    queryKey: ["aluno-profile", user.id],
    queryFn: async () => (await supabase.from("profiles").select("full_name, avatar_url").eq("id", user.id).maybeSingle()).data,
  });

  const nome =
    (profile?.full_name as string | undefined) ||
    (user.user_metadata?.full_name as string | undefined) ||
    user.email?.split("@")[0] ||
    "Aluno";

  return (
    <AlunoShell aluno={{ nome, email: user.email ?? "", avatarUrl: profile?.avatar_url }}>
      <Outlet />
    </AlunoShell>
  );
}
