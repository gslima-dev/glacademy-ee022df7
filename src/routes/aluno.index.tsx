import { createFileRoute, Link } from "@tanstack/react-router";
import { AlunoHeader, AlunoContainer } from "@/components/aluno/AlunoShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  focoDaSemana,
  sessoes,
  historicoNotas,
  streak,
  disciplinaLabel,
  formatDayShort,
  formatTime,
} from "@/lib/aluno-mock";
import { ArrowRight, CalendarClock, Flame, Sparkles, Video } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts";

export const Route = createFileRoute("/aluno/")({
  head: () => ({ meta: [{ title: "Início · Área do Aluno · GL Academy" }] }),
  component: InicioPage,
});

function InicioPage() {
  const { user } = Route.useRouteContext();
  const nome =
    (user.user_metadata?.full_name as string | undefined)?.split(" ")[0] ||
    user.email?.split("@")[0] ||
    "aluno";

  const proxima = sessoes
    .filter((s) => s.estado === "futura")
    .sort((a, b) => +new Date(a.data) - +new Date(b.data))[0];

  return (
    <>
      <AlunoHeader
        eyebrow="Sala de estudo"
        title={`Bom trabalho, ${nome}.`}
        saudacao="Vamos continuar de onde ficámos. Aqui está o que vem a seguir e como estás a evoluir."
      />

      <AlunoContainer>
        {/* Próxima sessão */}
        {proxima && (
          <section>
            <SectionLabel>Próxima sessão</SectionLabel>
            <Card className="border-teal/25 bg-gradient-to-br from-teal-soft/60 to-transparent p-6 lg:p-8 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
                <div className="flex items-center gap-5">
                  <div className="grid place-items-center h-16 w-16 rounded-xl bg-card border border-border/70 shrink-0">
                    <CalendarClock className="h-7 w-7 text-teal" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-teal font-medium">
                      {formatDayShort(proxima.data)} · {formatTime(proxima.data)}
                    </div>
                    <div className="font-serif text-xl lg:text-2xl text-ink mt-1 leading-snug">
                      {proxima.topico}
                    </div>
                    <div className="text-sm text-ink-3 mt-1">
                      {disciplinaLabel[proxima.disciplina]} · {proxima.duracaoMin} min
                    </div>
                  </div>
                </div>
                <div className="lg:ml-auto flex flex-col sm:flex-row gap-2">
                  {proxima.link ? (
                    <Button asChild size="lg" className="bg-teal hover:bg-teal-dark text-white">
                      <a href={proxima.link} target="_blank" rel="noreferrer">
                        <Video className="mr-2 h-4 w-4" /> Entrar na sessão
                      </a>
                    </Button>
                  ) : null}
                  <Button asChild variant="outline" size="lg">
                    <Link to="/aluno/sessoes">Ver detalhes</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Grid: Progresso + Foco / Streak */}
        <section className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <SectionLabel className="mb-1">Evolução</SectionLabel>
                <h2 className="font-serif text-lg text-ink">Notas dos últimos 6 meses</h2>
              </div>
              <Link to="/aluno/progresso" className="text-xs text-teal hover:underline">
                Ver detalhe →
              </Link>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicoNotas} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="mes" stroke="var(--ink-3)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="var(--ink-3)"
                    fontSize={12}
                    domain={[0, 20]}
                    ticks={[0, 5, 10, 15, 20]}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="FQ"
                    name="Física-Química"
                    stroke="var(--teal)"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "var(--teal)" }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="BG"
                    name="Biologia-Geologia"
                    stroke="var(--amber)"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "var(--amber)" }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-5 mt-2 text-xs text-ink-3">
              <LegendDot color="var(--teal)" label="Física-Química" />
              <LegendDot color="var(--amber)" label="Biologia-Geologia" />
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <SectionLabel className="mb-3">
                <Flame className="h-3 w-3 inline mr-1 -mt-0.5 text-amber" /> Consistência
              </SectionLabel>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-4xl text-ink">{streak.sessoesConsecutivas}</span>
                <span className="text-sm text-ink-3">sessões seguidas</span>
              </div>
              <div className="mt-4 grid grid-cols-12 gap-1">
                {streak.ultimoMes.map((v, i) => (
                  <div
                    key={i}
                    className={`h-6 rounded-sm ${v ? "bg-teal/70" : "bg-paper-3/70"}`}
                    aria-hidden
                  />
                ))}
              </div>
              <div className="mt-3 text-xs text-ink-3">
                Assiduidade nos últimos 3 meses: <span className="text-ink font-medium">{streak.assiduidade}%</span>
              </div>
            </Card>

            <Card className="p-6 bg-ink text-paper border-ink">
              <SectionLabel className="mb-3 text-paper-3">
                <Sparkles className="h-3 w-3 inline mr-1 -mt-0.5" /> Foco da semana
              </SectionLabel>
              <p className="text-sm leading-relaxed text-paper/90">
                <span className="text-paper-3 uppercase tracking-wider text-[10px] block mb-1">Última sessão</span>
                {focoDaSemana.ultima}
              </p>
              <p className="text-sm leading-relaxed text-paper/90 mt-4">
                <span className="text-paper-3 uppercase tracking-wider text-[10px] block mb-1">A seguir</span>
                {focoDaSemana.proxima}
              </p>
            </Card>
          </div>
        </section>

        {/* Atalhos */}
        <section className="grid sm:grid-cols-3 gap-4">
          <QuickLink to="/aluno/materiais" title="Materiais" desc="PDFs, resumos, fichas" />
          <QuickLink to="/aluno/sessoes" title="Sessões" desc="Passadas e futuras" />
          <QuickLink to="/aluno/progresso" title="Progresso" desc="Notas e evolução" />
        </section>
      </AlunoContainer>
    </>
  );
}

function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`text-[10px] uppercase tracking-[0.18em] text-ink-3 font-medium ${className}`}>
      {children}
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="inline-block h-2 w-2 rounded-full" style={{ background: color }} />
      {label}
    </div>
  );
}

function QuickLink({ to, title, desc }: { to: string; title: string; desc: string }) {
  return (
    <Link
      to={to}
      className="group rounded-xl border border-border/60 bg-card px-5 py-4 flex items-center justify-between hover:border-teal/40 hover:shadow-sm transition-all"
    >
      <div>
        <div className="font-serif text-ink">{title}</div>
        <div className="text-xs text-ink-3 mt-0.5">{desc}</div>
      </div>
      <ArrowRight className="h-4 w-4 text-ink-3 group-hover:text-teal group-hover:translate-x-0.5 transition-all" />
    </Link>
  );
}
