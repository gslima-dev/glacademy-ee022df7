import { createFileRoute } from "@tanstack/react-router";
import { AlunoHeader, AlunoContainer } from "@/components/aluno/AlunoShell";
import { Card } from "@/components/ui/card";
import { historicoNotas } from "@/lib/aluno-mock";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { TrendingUp } from "lucide-react";

export const Route = createFileRoute("/aluno/progresso")({
  head: () => ({ meta: [{ title: "Progresso · Área do Aluno · GL Academy" }] }),
  component: ProgressoPage,
});

function ProgressoPage() {
  const first = historicoNotas[0];
  const last = historicoNotas[historicoNotas.length - 1];
  const evolucao = [
    { disc: "Física-Química", key: "FQ" as const, from: first.FQ!, to: last.FQ! },
    { disc: "Biologia-Geologia", key: "BG" as const, from: first.BG!, to: last.BG! },
  ];

  return (
    <>
      <AlunoHeader
        eyebrow="Evolução"
        title="O teu progresso"
        saudacao="Uma leitura honesta e serena do teu percurso. O gráfico mostra a nota média por disciplina ao longo dos últimos meses."
      />
      <AlunoContainer>
        <Card className="p-6 lg:p-8">
          <div className="mb-6">
            <div className="text-[10px] uppercase tracking-[0.18em] text-ink-3 font-medium">
              Notas por mês
            </div>
            <h2 className="font-serif text-2xl text-ink mt-1">Evolução ao longo do ano</h2>
          </div>
          <div className="h-72">
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
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="FQ"
                  name="Física-Química"
                  stroke="var(--teal)"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "var(--teal)" }}
                />
                <Line
                  type="monotone"
                  dataKey="BG"
                  name="Biologia-Geologia"
                  stroke="var(--amber)"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "var(--amber)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <section className="grid md:grid-cols-2 gap-5">
          {evolucao.map((e) => {
            const delta = e.to - e.from;
            return (
              <Card key={e.key} className="p-6">
                <div className="text-[10px] uppercase tracking-[0.18em] text-ink-3 font-medium">
                  {e.disc}
                </div>
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="font-serif text-ink-3 text-2xl">{e.from}</span>
                  <span className="text-ink-3" aria-hidden>→</span>
                  <span className="font-serif text-5xl text-ink">{e.to}</span>
                  <span className="text-sm text-ink-3">valores</span>
                </div>
                <div className="mt-3 inline-flex items-center gap-1 text-sm text-success font-medium">
                  <TrendingUp className="h-4 w-4" />
                  +{delta} valores desde o início
                </div>
                <p className="text-sm text-ink-2 mt-4 leading-relaxed">
                  {motivacao(delta, e.disc)}
                </p>
              </Card>
            );
          })}
        </section>
      </AlunoContainer>
    </>
  );
}

function motivacao(delta: number, disc: string) {
  if (delta >= 4) return `Evolução notável em ${disc}. Confia no método e mantém o ritmo.`;
  if (delta >= 2) return `Estás a construir base sólida em ${disc}. Continua a resolver exames.`;
  if (delta >= 0) return `Estás a estabilizar em ${disc}. O próximo passo é ganhar autonomia nos exercícios.`;
  return `Vamos rever em conjunto o que está a bloquear em ${disc}.`;
}
