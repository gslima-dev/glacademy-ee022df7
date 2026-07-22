import { ScrollReveal } from "@/components/ScrollReveal";

export function Problema() {
  const pains = [
    { icon: "📉", title: "Nota estagnada", text: "Estuda-se mais, mas os resultados não melhoram de forma consistente." },
    { icon: "🧩", title: "Bloqueios escondidos", text: "Lacunas na base que parecem pequenas afetam tudo o que vem a seguir." },
    { icon: "📝", title: "Respostas sem critérios", text: "A matéria é conhecida, mas a nota não reflete o esforço." },
    { icon: "⏳", title: "Gestão do tempo", text: "Em teste, o aluno sabe mas não consegue mostrar o que sabe." },
  ];

  return (
    <section className="py-16 bg-paper-2 border-y border-border" id="problema">
      <div className="max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <span className="text-[0.62rem] font-bold uppercase tracking-[0.15em] text-teal block mb-2">
            O problema real
          </span>
          <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.15] text-ink tracking-tight mb-3">
            A nota estagnada não é um problema de esforço.
            <br />
            <em className="text-teal not-italic">É um problema de diagnóstico.</em>
          </h2>
          <p className="text-[0.92rem] text-ink-2 leading-[1.78] max-w-xl">
            Quando o obstáculo real é identificado com precisão, o caminho até à solução torna-se claro — muitas vezes em dias, não em meses. É exatamente isso que acontece na primeira sessão: gratuita, sem qualquer compromisso de continuidade.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-xl overflow-hidden mt-8">
          {pains.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 100}>
              <div className="bg-card p-5 h-full transition-all hover:bg-teal-soft/40 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] hover:z-10 relative hover:scale-[1.02]">
                <div className="text-[1.2rem] mb-2.5">{p.icon}</div>
                <h3 className="text-[0.88rem] font-semibold text-ink mb-1 leading-snug">{p.title}</h3>
                <p className="text-[0.77rem] text-ink-2 leading-relaxed">{p.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <div className="mt-6 bg-red-50/80 border-l-[3px] border-destructive rounded-r-xl p-4">
            <p className="text-[0.87rem] text-destructive/80 leading-relaxed">
              <strong>Sem diagnóstico, mais esforço produz os mesmos erros.</strong> Cada ciclo de estudo reforça padrões que não funcionam — e o aluno começa a acreditar que não é capaz, quando na verdade nunca lhe mostraram exactamente onde falhar.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
