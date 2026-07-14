export function Resultados() {
  const cases = [
    {
      before: "8 val. FQ",
      after: "14 valores",
      time: "ao longo de 6 semanas",
      quote: "Tinha tirado 8 em dois testes seguidos. Na primeira sessão o Gabriel percebeu em poucos minutos que eu nunca tinha compreendido os fundamentos de estequiometria — e que todos os exercícios dependiam disso. Quando esse conceito ficou claro, tudo o resto mudou.",
      name: "Mariana A.",
      detail: "10.º ano · Física e Química A · Setúbal",
      initials: "MA",
    },
    {
      before: "11 val. BioGeo",
      after: "16 no exame nacional",
      time: "ao longo de 3 meses",
      quote: "Sabia a matéria, mas continuava a não ter a nota que esperava. O problema era a forma como respondia — não o conteúdo. O Gabriel mostrou-me exactamente o que os critérios IAVE exigem e trabalhámos isso de forma sistemática.",
      name: "Rodrigo F.",
      detail: "11.º ano · Biologia e Geologia · Lisboa",
      initials: "RF",
    },
    {
      before: "10 valores",
      after: "15 no exame",
      time: "preparação de 3 semanas",
      quote: "Começámos três semanas antes do exame. Em vez de rever tudo, o Gabriel construiu um plano focado nos tópicos com maior peso e treinámos no formato exacto do exame. O resultado surpreendeu-nos a todos.",
      name: "Inês S.",
      detail: "11.º ano · FQ · Preparação intensiva de exame",
      initials: "IS",
    },
  ];

  return (
    <section className="py-16 bg-background" id="resultados">
      <div className="max-w-4xl mx-auto px-6">
        <span className="text-[0.62rem] font-bold uppercase tracking-[0.15em] text-teal block mb-2">
          Resultados documentados
        </span>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.15] text-ink tracking-tight mb-3">
          O que aconteceu
          <br />
          <em className="text-teal not-italic">com alunos reais.</em>
        </h2>
        <p className="text-[0.92rem] text-ink-2 leading-[1.78] max-w-xl mb-8">
          Os testemunhos abaixo são reais. Os nomes e detalhes foram partilhados com autorização. Não seleccionámos apenas os melhores casos — são representativos do tipo de progressão que ocorre quando o bloqueio é correctamente identificado.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {cases.map((c) => (
            <div key={c.initials} className="bg-card border border-border rounded-xl p-5 shadow-[var(--shadow-sm)]">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="bg-red-50 border border-red-100 rounded px-2 py-1 text-[0.7rem] text-destructive font-semibold">{c.before}</span>
                <span className="text-[0.72rem] text-ink-3">→</span>
                <span className="bg-success-soft border border-success/20 rounded px-2 py-1 text-[0.7rem] text-success font-semibold">{c.after}</span>
                <span className="text-[0.67rem] text-ink-3 italic">{c.time}</span>
              </div>
              <p className="text-[0.82rem] text-ink-2 leading-[1.7] mb-4">"{c.quote}"</p>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center text-[0.65rem] font-bold text-white shrink-0">
                  {c.initials}
                </div>
                <div>
                  <div className="text-[0.78rem] font-semibold text-ink">{c.name}</div>
                  <div className="text-[0.67rem] text-ink-3">{c.detail}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-paper-2 border border-border rounded-xl p-6 text-center">
          <p className="text-[0.88rem] text-ink-2 mb-4 leading-relaxed">
            Se o vosso filho enfrenta um bloqueio semelhante, o diagnóstico identifica-o com precisão — de forma gratuita, online, sem qualquer compromisso de continuidade.
          </p>
          <a
            href="#inscricao"
            className="inline-flex items-center justify-center gap-2 bg-teal text-white rounded-lg px-6 py-3 text-[0.9rem] font-semibold min-h-11 hover:bg-teal-dark hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Marcar sessão de diagnóstico →
          </a>
          <p className="text-[0.7rem] text-ink-3 mt-2">30 minutos · online · sem pagamento · sem compromisso</p>
        </div>
      </div>
    </section>
  );
}
