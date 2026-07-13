import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Search, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/cursos/")({
  head: () => ({ meta: [{ title: "Cursos · GL Academy" }] }),
  component: CursosPage,
});

function CursosPage() {
  const { user } = Route.useRouteContext();
  const qc = useQueryClient();
  const [q, setQ] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["courses-list", user.id],
    queryFn: async () => {
      const [courses, enroll] = await Promise.all([
        supabase.from("courses").select("*").order("discipline"),
        supabase.from("enrollments").select("course_id").eq("user_id", user.id),
      ]);
      return {
        courses: courses.data ?? [],
        enrolledIds: new Set((enroll.data ?? []).map((e) => e.course_id)),
      };
    },
  });

  const enroll = useMutation({
    mutationFn: async (course_id: string) => {
      const { error } = await supabase.from("enrollments").insert({ user_id: user.id, course_id });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Inscrição efetuada");
      qc.invalidateQueries({ queryKey: ["courses-list"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const filtered = (data?.courses ?? []).filter((c) =>
    (c.title + " " + (c.subtitle ?? "")).toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto space-y-6">
      <header>
        <h1 className="font-serif text-3xl text-ink">Catálogo de cursos</h1>
        <p className="text-ink-3 mt-1">Escolhe o teu percurso e inscreve-te.</p>
      </header>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-3" />
        <Input placeholder="Pesquisar curso..." value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-72" />)}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-ink-3 text-center py-16">Sem resultados.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => {
            const isEnrolled = data!.enrolledIds.has(c.id);
            return (
              <Card key={c.id} className="overflow-hidden flex flex-col">
                <div className="aspect-video bg-muted overflow-hidden">
                  {c.image_url && <img src={c.image_url} alt={c.title} className="w-full h-full object-cover" />}
                </div>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">{c.discipline === "FQ" ? "Física-Química" : "Biologia-Geologia"} · {c.level}º ano</Badge>
                  <CardTitle className="font-serif text-lg mt-2">{c.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between gap-3">
                  <p className="text-sm text-ink-2 line-clamp-3">{c.description}</p>
                  {isEnrolled ? (
                    <Button asChild variant="secondary">
                      <Link to="/cursos/$slug" params={{ slug: c.slug }}>
                        <CheckCircle2 className="mr-1 h-4 w-4 text-success" /> Entrar
                      </Link>
                    </Button>
                  ) : (
                    <Button onClick={() => enroll.mutate(c.id)} disabled={enroll.isPending}>
                      Inscrever-me <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
