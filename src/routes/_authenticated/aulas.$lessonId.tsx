import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, ChevronLeft, Clock, ArrowRight, FileText } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/aulas/$lessonId")({
  head: () => ({ meta: [{ title: "Aula · GL Academy" }] }),
  component: LessonPage,
});

function LessonPage() {
  const { lessonId } = Route.useParams();
  const { user } = Route.useRouteContext();
  const qc = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["lesson", lessonId, user.id],
    queryFn: async () => {
      const { data: lesson } = await supabase
        .from("lessons")
        .select("*, modules(*, courses(*))")
        .eq("id", lessonId)
        .maybeSingle();
      if (!lesson) return null;
      const courseId = (lesson as any).modules?.course_id;
      const [{ data: siblings }, { data: progress }, { data: resources }] = await Promise.all([
        supabase.from("lessons").select("id, title, position, module_id, modules!inner(course_id, position)").eq("modules.course_id", courseId).order("position"),
        supabase.from("lesson_progress").select("*").eq("user_id", user.id).eq("lesson_id", lessonId).maybeSingle(),
        supabase.from("resources").select("*").eq("lesson_id", lessonId),
      ]);
      return { lesson, siblings: siblings ?? [], progress, resources: resources ?? [] };
    },
  });

  // Mark as in_progress on open
  useEffect(() => {
    if (!data?.lesson) return;
    supabase.from("lesson_progress").upsert(
      { user_id: user.id, lesson_id: lessonId, status: data.progress?.status ?? "in_progress", last_seen_at: new Date().toISOString() },
      { onConflict: "user_id,lesson_id" }
    ).then(() => qc.invalidateQueries({ queryKey: ["lesson", lessonId] }));
  }, [data?.lesson?.id]); // eslint-disable-line

  const complete = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("lesson_progress").upsert(
        { user_id: user.id, lesson_id: lessonId, status: "completed", completed_at: new Date().toISOString(), last_seen_at: new Date().toISOString() },
        { onConflict: "user_id,lesson_id" }
      );
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Aula concluída");
      qc.invalidateQueries();
    },
  });

  if (isLoading) return <div className="p-8 space-y-4 max-w-6xl mx-auto"><Skeleton className="h-10 w-64" /><Skeleton className="h-96" /></div>;
  if (!data?.lesson) return <div className="p-8">Aula não encontrada.</div>;

  const { lesson, siblings, progress, resources } = data;
  const course = (lesson as any).modules?.courses;
  const orderedSiblings = [...siblings].sort((a: any, b: any) => {
    if (a.modules.position !== b.modules.position) return a.modules.position - b.modules.position;
    return a.position - b.position;
  });
  const idx = orderedSiblings.findIndex((s) => s.id === lessonId);
  const next = orderedSiblings[idx + 1];
  const isDone = progress?.status === "completed";

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      <Link to="/cursos/$slug" params={{ slug: course.slug }} className="inline-flex items-center text-sm text-ink-3 hover:text-ink mb-4">
        <ChevronLeft className="h-4 w-4" /> {course.title}
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="aspect-video bg-ink flex items-center justify-center overflow-hidden">
            {lesson.video_url ? (
              <iframe src={lesson.video_url} className="w-full h-full" allowFullScreen title={lesson.title} />
            ) : (
              <div className="text-paper/60 text-center p-8">
                <p className="text-sm">Vídeo em breve</p>
              </div>
            )}
          </Card>

          {lesson.summary && (
            <Card className="p-6">
              <h3 className="font-serif text-lg text-ink mb-2">Resumo</h3>
              <p className="text-ink-2 text-sm leading-relaxed">{lesson.summary}</p>
            </Card>
          )}
        </div>

        <aside className="space-y-4">
          <Card className="p-6 space-y-3">
            {isDone && <Badge className="bg-success/10 text-success border-success/20">Concluída</Badge>}
            <h1 className="font-serif text-2xl text-ink">{lesson.title}</h1>
            <p className="text-sm text-ink-2">{lesson.description}</p>
            <div className="flex items-center gap-1 text-xs text-ink-3">
              <Clock className="h-3 w-3" /> {lesson.duration_minutes} min
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <Button onClick={() => complete.mutate()} disabled={complete.isPending || isDone} variant={isDone ? "secondary" : "default"}>
                <CheckCircle2 className="mr-2 h-4 w-4" /> {isDone ? "Já concluída" : "Marcar como concluída"}
              </Button>
              {next && (
                <Button variant="outline" onClick={() => navigate({ to: "/aulas/$lessonId", params: { lessonId: next.id } })}>
                  Próxima aula <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </Card>

          {resources.length > 0 && (
            <Card className="p-6">
              <h3 className="font-serif text-lg text-ink mb-3">Recursos</h3>
              <ul className="space-y-2">
                {resources.map((r) => (
                  <li key={r.id}>
                    <a href={r.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-teal hover:underline">
                      <FileText className="h-4 w-4" /> {r.title}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}
