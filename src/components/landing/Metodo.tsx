export function Metodo() {
  const steps = [
    {
      num: "1",
      title: "Diagnóstico preciso",
      text: "Na sessão inicial identifico com precisão onde está o obstáculo — na base conceptual, num tópico específico, na forma de resposta, ou na gestão do tempo em contexto de teste. Sem este mapeamento, qualquer intervenção é arbitrária.",
      tag: "Sessão inicial gratuita",
    },
    {
      num: "2",
      title: "Explicação na medida do aluno",
      text: "Parto do nível real do aluno e explico até o conceito fazer sentido. Não avanço enquanto a base não estiver consolidada. Não se trata de cobrir matéria: trata-se de transformar incerteza em compreensão.",
      tag: null,
    },
    {
      num: "3",
      title: "Prática no formato do exame",
      text: "Cada sessão inclui prática com exercícios no formato exato do exame nacional e feedback direto nos erros — com explicação do porquê. Dominar o conteúdo não chega; é necessário responder como os critérios exigem.",
      tag: "Exercícios no formato real do exame",
    },
  ];

  return (
    <section className="py-16 bg-paper-2 border-y border-border" id="metodo">
      <div className="max-w-4xl mx-auto px-6">
        <span className="text-[0.62rem] font-bold uppercase tracking-[0.15em] text-teal block mb-2">
          O método
        </span>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.15] text-ink tracking-tight mb-3">
          Três pilares.
          <br />
          <em className="text-teal not-italic">Um único foco: a nota.</em>
        </h2>
        <p className="text-[0.92rem] text-ink-2 leading-[1.78] max-w-xl mb-8">
          O método não é sobre fazer mais. É sobre fazer o que realmente move o resultado — e fazer isso de forma consistente.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {steps.map((s) => (
            <div
              key={s.num}
              className="group bg-card border border-border rounded-xl p-5 border-t-[3px] border-t-teal transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
            >
              <div className="font-serif text-[1.7rem] font-bold text-teal leading-none mb-2 transition-transform group-hover:scale-110 origin-left">{s.num}</div>
              <h3 className="text-[0.88rem] font-semibold text-ink mb-1 leading-snug">{s.title}</h3>
              <p className="text-[0.77rem] text-ink-2 leading-relaxed mb-3">{s.text}</p>
              {s.tag && (
                <span className="inline-block text-[0.65rem] font-bold uppercase tracking-wide bg-teal-soft border border-teal-muted text-teal rounded px-2 py-0.5">
                  ✓ {s.tag}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
