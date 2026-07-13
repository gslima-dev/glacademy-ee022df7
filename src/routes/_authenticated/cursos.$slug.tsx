import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, PlayCircle, Circle, Clock, ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/_authenticated/cursos/$slug")({
  head: () => ({ meta: [{ title: "Curso · GL Academy" }] }),
  component: CoursePage,
});

function CoursePage() {
  const { slug } = Route.useParams();
  const { user } = Route.useRouteContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ["course", slug, user.id],
    queryFn: async () => {
      const { data: course } = await supabase.from("courses").select("*").eq("slug", slug).maybeSingle();
      if (!course) throw notFound();
      const [{ data: modules }, { data: progress }] = await Promise.all([
        supabase.from("modules").select("*, lessons(*)").eq("course_id", course.id).order("position"),
        supabase.from("lesson_progress").select("*").eq("user_id", user.id),
      ]);
      return { course, modules: modules ?? [], progress: progress ?? [] };
    },
  });

  if (isLoading) return <div className="p-8 max-w-4xl mx-auto space-y-4"><Skeleton className="h-40" /><Skeleton className="h-96" /></div>;
  if (error || !data) return <div className="p-8">Curso não encontrado.</div>;

  const { course, modules, progress } = data;
  const allLessons = modules.flatMap((m: any) => (m.lessons ?? []).sort((a: any, b: any) => a.position - b.position));
  const doneIds = new Set(progress.filter((p) => p.status === "completed").map((p) => p.lesson_id));
  const pct = allLessons.length ? Math.round((allLessons.filter((l: any) => doneIds.has(l.id)).length / allLessons.length) * 100) : 0;

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto space-y-8">
      <Link to="/cursos" className="inline-flex items-center text-sm text-ink-3 hover:text-ink">
        <ChevronLeft className="h-4 w-4" /> Voltar aos cursos
      </Link>

      <Card className="p-6 lg:p-8 space-y-4">
        <Badge variant="secondary" className="w-fit">
          {course.discipline === "FQ" ? "Física-Química" : "Biologia-Geologia"} · {course.level}º ano
        </Badge>
        <h1 className="font-serif text-3xl lg:text-4xl text-ink">{course.title}</h1>
        <p className="text-ink-2">{course.description}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-ink-3">
            <span>Progresso</span><span>{pct}%</span>
          </div>
          <Progress value={pct} className="h-2" />
        </div>
      </Card>

      <div>
        <h2 className="font-serif text-2xl text-ink mb-4">Módulos</h2>
        <Accordion type="multiple" defaultValue={modules.map((m: any) => m.id)} className="space-y-2">
          {modules.sort((a: any, b: any) => a.position - b.position).map((m: any) => {
            const lessons = (m.lessons ?? []).sort((a: any, b: any) => a.position - b.position);
            return (
              <AccordionItem key={m.id} value={m.id} className="border rounded-lg px-4 bg-card">
                <AccordionTrigger className="hover:no-underline">
                  <div className="text-left">
                    <div className="font-serif text-lg text-ink">{m.title}</div>
                    <div className="text-xs text-ink-3">{lessons.length} aulas</div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="divide-y">
                    {lessons.map((l: any) => {
                      const p = progress.find((x) => x.lesson_id === l.id);
                      const status = p?.status === "completed" ? "done" : p ? "progress" : "todo";
                      return (
                        <li key={l.id}>
                          <Link
                            to="/aulas/$lessonId"
                            params={{ lessonId: l.id }}
                            className="flex items-center justify-between py-3 gap-3 hover:bg-muted/50 -mx-4 px-4 rounded transition"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {status === "done" ? <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                                : status === "progress" ? <PlayCircle className="h-5 w-5 text-teal shrink-0" />
                                : <Circle className="h-5 w-5 text-ink-3 shrink-0" />}
                              <div className="min-w-0">
                                <div className="text-ink truncate">{l.title}</div>
                                <div className="text-xs text-ink-3 flex items-center gap-1">
                                  <Clock className="h-3 w-3" /> {l.duration_minutes} min
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">Abrir</Button>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
