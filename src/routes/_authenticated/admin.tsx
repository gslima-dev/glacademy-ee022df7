import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin · GL Academy" }] }),
  component: AdminPage,
});

function AdminPage() {
  const queryClient = useQueryClient();

  const { data: inscricoes, isLoading, error } = useQuery({
    queryKey: ["admin-inscricoes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("inscricoes")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const marcarRespondido = useMutation({
    mutationFn: async ({ id, respondido }: { id: string; respondido: boolean }) => {
      const { error } = await supabase.from("inscricoes").update({ respondido }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-inscricoes"] });
      toast.success("Atualizado.");
    },
    onError: () => toast.error("Não foi possível atualizar."),
  });

  if (isLoading) {
    return (
      <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-4">
        <Skeleton className="h-10 w-64" />
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24" />)}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 lg:p-10 max-w-5xl mx-auto">
        <p className="text-destructive">
          Não tens permissão de admin, ou ocorreu um erro. Confirma que o teu utilizador está na tabela `admins`.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-6">
      <header>
        <h1 className="font-serif text-3xl text-ink">Inscrições</h1>
        <p className="text-ink-3 mt-1">{inscricoes?.length ?? 0} pedidos recebidos</p>
      </header>

      <div className="space-y-3">
        {inscricoes?.map((i: any) => (
          <Card key={i.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="text-lg font-serif">{i.nome_aluno}</CardTitle>
                <p className="text-sm text-ink-3 mt-1">
                  {i.ano_escolaridade}.º ano · {i.disciplinas?.join(", ")}
                </p>
              </div>
              <Badge variant={i.respondido ? "secondary" : "default"}>
                {i.respondido ? "Respondido" : "Por responder"}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>Encarregado:</strong> {i.nome_encarregado}</p>
              <p><strong>Email:</strong> {i.email}</p>
              <p><strong>Telefone:</strong> {i.telefone}</p>
              {i.mensagem && <p><strong>Mensagem:</strong> {i.mensagem}</p>}
              <p className="text-ink-3 text-xs">
                Recebido em {new Date(i.created_at).toLocaleString("pt-PT")}
              </p>
              <Button
                size="sm"
                variant="outline"
                className="mt-2"
                onClick={() => marcarRespondido.mutate({ id: i.id, respondido: !i.respondido })}
              >
                Marcar como {i.respondido ? "por responder" : "respondido"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
