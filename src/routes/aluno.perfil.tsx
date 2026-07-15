import { createFileRoute } from "@tanstack/react-router";
import { AlunoHeader, AlunoContainer } from "@/components/aluno/AlunoShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { perfilAluno, formatDate } from "@/lib/aluno-mock";
import { Mail, Phone, User, GraduationCap, CalendarClock } from "lucide-react";

export const Route = createFileRoute("/aluno/perfil")({
  head: () => ({ meta: [{ title: "Perfil · Área do Aluno · GL Academy" }] }),
  component: PerfilAlunoPage,
});

function PerfilAlunoPage() {
  const { user } = Route.useRouteContext();
  const nome =
    (user.user_metadata?.full_name as string | undefined) ||
    user.email?.split("@")[0] ||
    "Aluno";

  return (
    <>
      <AlunoHeader
        eyebrow="A tua conta"
        title="Perfil"
        saudacao="Os teus dados de aluno e a modalidade em que estás inscrito."
      />
      <AlunoContainer>
        <Card className="p-6 lg:p-8">
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
            <Field icon={User} label="Nome" value={nome} />
            <Field icon={Mail} label="Email" value={user.email ?? "—"} />
            <Field icon={GraduationCap} label="Ano" value={perfilAluno.ano} />
            <Field
              icon={GraduationCap}
              label="Disciplinas"
              value={
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {perfilAluno.disciplinas.map((d) => (
                    <Badge key={d} variant="secondary" className="font-normal">
                      {d}
                    </Badge>
                  ))}
                </div>
              }
            />
          </div>
        </Card>

        <Card className="p-6 lg:p-8">
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink-3 font-medium">Encarregado de educação</div>
          <div className="grid md:grid-cols-3 gap-x-10 gap-y-4 mt-4">
            <Field icon={User} label="Nome" value={perfilAluno.encarregado.nome} />
            <Field icon={Mail} label="Email" value={perfilAluno.encarregado.email} />
            <Field icon={Phone} label="Telefone" value={perfilAluno.encarregado.telefone} />
          </div>
        </Card>

        <Card className="p-6 lg:p-8 bg-gradient-to-br from-teal-soft/60 to-transparent border-teal/25">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-[0.18em] text-teal font-medium">
                Modalidade atual
              </div>
              <div className="font-serif text-2xl text-ink mt-1">
                Explicações {perfilAluno.modalidade}
              </div>
              <div className="text-sm text-ink-2 mt-1 flex items-center gap-1.5">
                <CalendarClock className="h-4 w-4 text-teal" />
                Próxima renovação: <span className="text-ink font-medium">{formatDate(perfilAluno.proximaRenovacao)}</span>
              </div>
            </div>
            <Button asChild size="lg" className="bg-teal hover:bg-teal-dark text-white">
              <a href="mailto:gabriel@glacademy.pt?subject=Explicações%20GL%20Academy">
                <Mail className="mr-2 h-4 w-4" />
                Falar com o Gabriel
              </a>
            </Button>
          </div>
        </Card>
      </AlunoContainer>
    </>
  );
}

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="h-4 w-4 text-ink-3 mt-1 shrink-0" />
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-[0.18em] text-ink-3 font-medium">{label}</div>
        {typeof value === "string" || typeof value === "number" ? (
          <div className="font-serif text-ink mt-0.5">{value}</div>
        ) : (
          value
        )}
      </div>
    </div>
  );
}
