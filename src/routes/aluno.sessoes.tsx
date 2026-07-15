import { createFileRoute } from "@tanstack/react-router";
import { AlunoHeader, AlunoContainer } from "@/components/aluno/AlunoShell";
import { Badge } from "@/components/ui/badge";
import { sessoes, disciplinaLabel, formatDate, formatTime, type Sessao } from "@/lib/aluno-mock";
import { CalendarDays, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/aluno/sessoes")({
  head: () => ({ meta: [{ title: "Sessões · Área do Aluno · GL Academy" }] }),
  component: SessoesPage,
});

function SessoesPage() {
  const ordered = [...sessoes].sort((a, b) => +new Date(a.data) - +new Date(b.data));
  const futuras = ordered.filter((s) => s.estado === "futura");
  const passadas = ordered.filter((s) => s.estado === "concluida").reverse();

  return (
    <>
      <AlunoHeader
        eyebrow="Calendário"
        title="Sessões"
        saudacao="Um registo do teu percurso. Cada sessão vem com o tópico trabalhado e uma nota do explicador."
      />
      <AlunoContainer>
        <section>
          <SectionTitle icon={CalendarDays} label="A seguir" count={futuras.length} />
          {futuras.length === 0 ? (
            <EmptyBlock text="Sem sessões agendadas de momento." />
          ) : (
            <Timeline sessoes={futuras} tone="future" />
          )}
        </section>

        <section>
          <SectionTitle icon={CheckCircle2} label="Sessões passadas" count={passadas.length} />
          {passadas.length === 0 ? (
            <EmptyBlock text="Ainda não há sessões concluídas." />
          ) : (
            <Timeline sessoes={passadas} tone="past" />
          )}
        </section>
      </AlunoContainer>
    </>
  );
}

function SectionTitle({
  icon: Icon,
  label,
  count,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  count: number;
}) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon className="h-4 w-4 text-teal" />
      <h2 className="font-serif text-xl text-ink">{label}</h2>
      <span className="text-xs text-ink-3">({count})</span>
    </div>
  );
}

function Timeline({ sessoes, tone }: { sessoes: Sessao[]; tone: "future" | "past" }) {
  return (
    <ol className="relative border-l border-border/70 ml-3 space-y-6 pl-8">
      {sessoes.map((s) => (
        <li key={s.id} className="relative">
          <span
            className={cn(
              "absolute -left-[41px] top-1.5 grid place-items-center h-6 w-6 rounded-full border-2 border-paper",
              tone === "future" ? "bg-teal text-white" : "bg-paper-3 text-ink-3"
            )}
            aria-hidden
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
          </span>
          <SessionCard s={s} tone={tone} />
        </li>
      ))}
    </ol>
  );
}

function SessionCard({ s, tone }: { s: Sessao; tone: "future" | "past" }) {
  const isFuture = tone === "future";
  return (
    <article
      className={cn(
        "rounded-xl border p-5 transition-colors",
        isFuture
          ? "border-teal/30 bg-teal-soft/40 hover:border-teal/50"
          : "border-border/60 bg-card/60 hover:bg-card"
      )}
    >
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <Badge
          variant="outline"
          className={cn(
            "text-[10px] uppercase tracking-widest font-medium",
            isFuture ? "border-teal/40 text-teal" : "border-border text-ink-3"
          )}
        >
          {disciplinaLabel[s.disciplina]}
        </Badge>
        <span className="text-xs text-ink-3 flex items-center gap-1">
          <Clock className="h-3 w-3" /> {s.duracaoMin} min
        </span>
        <span className="text-xs text-ink-3 ml-auto">
          {formatDate(s.data)} · {formatTime(s.data)}
        </span>
      </div>
      <h3 className={cn("font-serif text-lg leading-snug", isFuture ? "text-ink" : "text-ink-2")}>
        {s.topico}
      </h3>
      <p className={cn("text-sm mt-2 leading-relaxed", isFuture ? "text-ink-2" : "text-ink-3")}>
        {s.resumo}
      </p>
    </article>
  );
}

function EmptyBlock({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border/70 bg-paper-2/40 py-10 text-center text-sm text-ink-3">
      {text}
    </div>
  );
}
