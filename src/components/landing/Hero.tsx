import gabrielPhoto from "@/assets/gabriel-portrait.webp";

export function Hero() {
  return (
    <section className="relative pt-16 pb-16 bg-background border-b border-border overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-teal/5 rounded-full blur-3xl" />
      </div>
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-[1fr_360px] gap-12 items-center">
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-700">
            <div className="inline-flex items-center gap-2 bg-amber-soft border border-amber-muted rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-amber mb-5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber" />
              </span>
              Acompanhamento académico · FQ · BioGeo
            </div>
            <h1 className="font-serif text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[1.12] font-bold text-ink tracking-tight mb-5">
              O vosso filho esforça-se.
              <br />
              A nota não acompanha.
              <br />
              <em className="text-teal not-italic">Há uma razão para isso — e tem nome.</em>
            </h1>
            <p className="text-base text-ink-2 leading-relaxed mb-4">
              Quando o esforço está presente mas os resultados não mudam, o problema raramente é falta de empenho. É que{" "}
              <strong className="text-ink">o obstáculo real nunca foi identificado</strong> — e sem esse diagnóstico, trabalhar mais produz os mesmos resultados.
            </p>
            <div className="bg-teal-soft border-l-2 border-teal rounded-r-lg p-4 text-[0.87rem] text-ink-2 leading-relaxed mb-6">
              A maioria dos alunos que chega à GL Academy já tentou estudar mais, reler a matéria, fazer os exercícios do livro.{" "}
              <strong className="text-ink">O bloqueio não estava no esforço. Estava na ausência de um diagnóstico preciso.</strong>{" "}
              É isso que fazemos na primeira sessão — antes de qualquer compromisso.
            </div>
            <a
              href="#inscricao"
              className="group inline-flex items-center justify-center gap-2 bg-teal text-white rounded-lg px-7 py-3.5 font-semibold text-[0.97rem] min-h-12 shadow-[0_4px_20px_oklch(0.43_0.09_185/0.24)] hover:bg-teal-dark hover:-translate-y-0.5 hover:shadow-[0_8px_30px_oklch(0.43_0.09_185/0.3)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Marcar diagnóstico gratuito
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <div className="mt-3 flex items-center gap-5 flex-wrap text-[0.73rem] text-ink-3">
              <span className="flex items-center gap-1.5">
                <span className="text-teal">✓</span> Gratuito · 30 minutos
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-teal">✓</span> Online
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-teal">✓</span> Sem compromisso
              </span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 shadow-[var(--shadow-lg)] animate-in fade-in slide-in-from-bottom-3 duration-700 delay-150 hover:shadow-[0_12px_40px_oklch(0.2_0.02_240/0.12)] hover:-translate-y-1 transition-all">
            <div className="w-[72px] h-[72px] rounded-full overflow-hidden border-2 border-teal-muted mb-4">
              <img
                src={gabrielPhoto}
                alt="Gabriel L., fundador da GL Academy e explicador de Física e Química A e Biologia e Geologia"
                className="w-full h-full object-cover object-top"
                width={72}
                height={72}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
            <div className="font-serif text-base font-bold text-ink leading-tight">Gabriel L.</div>
            <div className="text-[0.7rem] text-ink-3 mt-1 mb-4 leading-snug">
              Acompanhamento académico em FQ e BioGeo
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-paper-2 rounded-lg p-2.5 text-center transition-colors hover:bg-teal-soft">
                <div className="font-serif text-[1.25rem] font-bold text-teal">+100</div>
                <div className="text-[0.6rem] text-ink-3 mt-0.5 leading-tight">alunos acompanhados</div>
              </div>
              <div className="bg-paper-2 rounded-lg p-2.5 text-center transition-colors hover:bg-teal-soft">
                <div className="font-serif text-[1.25rem] font-bold text-teal">NOVA</div>
                <div className="text-[0.6rem] text-ink-3 mt-0.5 leading-tight">FCT · Biologia</div>
              </div>
            </div>
            <div className="bg-paper-2 rounded-lg p-3 text-[0.78rem] text-ink-2 leading-relaxed italic border-l-2 border-teal">
              "A nota só muda quando o bloqueio é identificado com precisão."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
