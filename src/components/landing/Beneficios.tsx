export function Beneficios() {
  const benefits = [
    { icon: "🎯", title: "Foco no exame nacional", text: "Os exercícios e a forma de resposta são treinados no formato exacto do IAVE, não no formato do manual." },
    { icon: "🔍", title: "Diagnóstico constante", text: "Cada erro é uma pista. Em vez de apenas corrigir, percebemos o padrão por trás dele." },
    { icon: "📍", title: "Chegada ao 12.º com base sólida", text: "Quem resolve os bloqueios no 10.º e 11.º chega ao 12.º com vantagem real. A diferença entre preparação e recuperação é o momento em que se age." },
  ];

  return (
    <section className="py-16 bg-paper-2 border-y border-border">
      <div className="max-w-4xl mx-auto px-6">
        <span className="text-[0.62rem] font-bold uppercase tracking-[0.15em] text-teal block mb-2">
          O que ganham
        </span>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.15] text-ink tracking-tight mb-3">
          Mais do que explicações.
          <br />
          <em className="text-teal not-italic">Clareza e confiança.</em>
        </h2>
        <p className="text-[0.92rem] text-ink-2 leading-[1.78] max-w-xl mb-8">
          O objectivo não é apenas aprovar. É que o aluno perceba a matéria de uma forma que lhe dê autonomia e resultados mensuráveis.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {benefits.map((b) => (
            <div key={b.title} className="bg-card border border-border rounded-xl p-5 hover:shadow-[0_6px_26px_oklch(0.43_0.09_185/0.09)] hover:-translate-y-0.5 transition-all">
              <div className="text-[1.3rem] mb-2">{b.icon}</div>
              <h3 className="text-[0.88rem] font-semibold text-ink mb-1 leading-tight">{b.title}</h3>
              <p className="text-[0.77rem] text-ink-2 leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
