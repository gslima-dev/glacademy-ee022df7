import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, BookOpen } from "lucide-react";

export const Route = createFileRoute("/_authenticated/progresso")({
  head: () => ({ meta: [{ title: "Progresso · GL Academy" }] }),
  component: ProgressoPage,
});

function ProgressoPage() {
  const { user } = Route.useRouteContext();

  const { data } = useQuery({
    queryKey: ["progress-page", user.id],
    queryFn: async () => {
      const [enroll, lessons, progress] = await Promise.all([
        supabase.from("enrollments").select("course_id, courses(*)").eq("user_id", user.id),
        supabase.from("lessons").select("id, duration_minutes, modules(course_id)"),
        supabase.from("lesson_progress").select("*").eq("user_id", user.id),
      ]);
      return { enroll: enroll.data ?? [], lessons: lessons.data ?? [], progress: progress.data ?? [] };
    },
  });

  const doneIds = new Set((data?.progress ?? []).filter((p) => p.status === "completed").map((p) => p.lesson_id));
  const courseLessons = (courseId: string) => (data?.lessons ?? []).filter((l: any) => l.modules?.course_id === courseId);
  const totalDone = (data?.progress ?? []).filter((p) => p.status === "completed").length;
  const totalMinutes = (data?.lessons ?? []).filter((l: any) => doneIds.has(l.id)).reduce((sum: number, l: any) => sum + (l.duration_minutes || 0), 0);
  const enrolled = data?.enroll ?? [];
  const enrolledLessons = (data?.lessons ?? []).filter((l: any) => enrolled.some((e: any) => e.course_id === l.modules?.course_id));
  const overall = enrolledLessons.length ? Math.round((enrolledLessons.filter((l: any) => doneIds.has(l.id)).length / enrolledLessons.length) * 100) : 0;

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-8">
      <header>
        <h1 className="font-serif text-3xl text-ink">O teu progresso</h1>
      </header>

      <Card>
        <CardHeader><CardTitle>Progresso global</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Progress value={overall} className="h-3" />
          <div className="grid grid-cols-3 gap-4 pt-2">
            <Stat icon={CheckCircle2} label="Aulas concluídas" value={totalDone.toString()} />
            <Stat icon={Clock} label="Minutos estudados" value={totalMinutes.toString()} />
            <Stat icon={BookOpen} label="Cursos inscritos" value={enrolled.length.toString()} />
          </div>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h2 className="font-serif text-xl text-ink">Por curso</h2>
        {enrolled.map((e: any) => {
          const cl = courseLessons(e.course_id);
          const done = cl.filter((l: any) => doneIds.has(l.id)).length;
          const pct = cl.length ? Math.round((done / cl.length) * 100) : 0;
          return (
            <Card key={e.course_id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-serif text-ink">{e.courses.title}</div>
                  <Badge variant="secondary" className="mt-1">{done}/{cl.length} aulas</Badge>
                </div>
                <span className="text-sm text-ink-3">{pct}%</span>
              </div>
              <Progress value={pct} className="h-2" />
            </Card>
          );
        })}
      </section>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1 text-xs text-ink-3"><Icon className="h-3 w-3" /> {label}</div>
      <div className="font-serif text-2xl text-ink mt-1">{value}</div>
    </div>
  );
}
