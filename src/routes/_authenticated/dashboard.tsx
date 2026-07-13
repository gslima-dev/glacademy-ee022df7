import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, BookOpen, Clock, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · GL Academy" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = Route.useRouteContext();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", user.id],
    queryFn: async () => {
      const [enroll, allLessons, progress] = await Promise.all([
        supabase.from("enrollments").select("course_id, courses(*)").eq("user_id", user.id),
        supabase.from("lessons").select("id, module_id, title, modules(course_id)"),
        supabase.from("lesson_progress").select("*").eq("user_id", user.id).order("last_seen_at", { ascending: false }),
      ]);
      return {
        enrollments: enroll.data ?? [],
        lessons: allLessons.data ?? [],
        progress: progress.data ?? [],
      };
    },
  });

  const firstName = (user.user_metadata?.full_name as string | undefined)?.split(" ")[0] ?? "aluno";

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 max-w-6xl mx-auto">
        <Skeleton className="h-10 w-64" />
        <div className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-32" />)}
        </div>
      </div>
    );
  }

  const enrolled = data!.enrollments;
  const totalLessons = data!.lessons.filter((l: any) =>
    enrolled.some((e: any) => e.course_id === l.modules?.course_id)
  ).length;
  const completed = data!.progress.filter((p) => p.status === "completed").length;
  const overallPct = totalLessons ? Math.round((completed / totalLessons) * 100) : 0;
  const lastProgress = data!.progress[0];
  const lastLesson = lastProgress ? data!.lessons.find((l: any) => l.id === lastProgress.lesson_id) : null;

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto space-y-8">
      <header>
        <p className="text-sm text-ink-3">Bem-vindo de volta</p>
        <h1 className="font-serif text-3xl lg:text-4xl text-ink mt-1">Olá, {firstName} 👋</h1>
        <p className="mt-2 text-ink-2">Continua o teu percurso rumo aos teus objetivos académicos.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-4">
        <StatCard icon={BookOpen} label="Cursos inscritos" value={enrolled.length.toString()} />
        <StatCard icon={Sparkles} label="Aulas concluídas" value={`${completed}/${totalLessons}`} />
        <StatCard icon={Clock} label="Progresso global" value={`${overallPct}%`} extra={<Progress value={overallPct} className="mt-2 h-2" />} />
      </div>

      {lastLesson && (
        <Card className="border-teal/30 bg-teal-soft/40">
          <CardHeader>
            <Badge variant="outline" className="w-fit border-teal/40 text-teal">Última aula</Badge>
            <CardTitle className="font-serif text-xl mt-2">{(lastLesson as any).title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/aulas/$lessonId" params={{ lessonId: lastLesson.id }}>
                Continuar a aprender <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-serif text-2xl text-ink">Os meus cursos</h2>
          <Link to="/cursos" className="text-sm text-teal hover:underline">Ver todos →</Link>
        </div>
        {enrolled.length === 0 ? (
          <EmptyEnroll />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolled.map((e: any) => {
              const courseLessons = data!.lessons.filter((l: any) => l.modules?.course_id === e.course_id);
              const done = data!.progress.filter((p) => p.status === "completed" && courseLessons.some((l: any) => l.id === p.lesson_id)).length;
              const pct = courseLessons.length ? Math.round((done / courseLessons.length) * 100) : 0;
              return <CourseCard key={e.course_id} course={e.courses} pct={pct} />;
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, extra }: { icon: any; label: string; value: string; extra?: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-ink-3">{label}</CardTitle>
        <Icon className="h-4 w-4 text-teal" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-serif text-ink">{value}</div>
        {extra}
      </CardContent>
    </Card>
  );
}

function CourseCard({ course, pct }: { course: any; pct: number }) {
  return (
    <Card className="overflow-hidden group hover:shadow-md transition">
      <div className="aspect-video bg-muted overflow-hidden">
        {course.image_url && <img src={course.image_url} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition" />}
      </div>
      <CardHeader>
        <Badge variant="secondary" className="w-fit">{course.discipline === "FQ" ? "Física-Química" : "Biologia-Geologia"} · {course.level}º</Badge>
        <CardTitle className="font-serif text-lg mt-2">{course.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Progress value={pct} className="h-2" />
        <div className="flex items-center justify-between">
          <span className="text-xs text-ink-3">{pct}% concluído</span>
          <Button asChild size="sm" variant="ghost">
            <Link to="/cursos/$slug" params={{ slug: course.slug }}>Entrar <ArrowRight className="ml-1 h-3 w-3" /></Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyEnroll() {
  return (
    <Card className="p-10 text-center">
      <BookOpen className="h-10 w-10 text-ink-3 mx-auto mb-3" />
      <h3 className="font-serif text-xl text-ink">Ainda não estás inscrito em nenhum curso</h3>
      <p className="text-ink-3 text-sm mt-1 mb-4">Explora o catálogo e começa hoje.</p>
      <Button asChild><Link to="/cursos">Ver cursos</Link></Button>
    </Card>
  );
}
