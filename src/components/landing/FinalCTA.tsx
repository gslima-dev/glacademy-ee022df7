export function FinalCTA() {
  return (
    <section className="py-16 bg-ink text-center">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-serif text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold text-white leading-tight tracking-tight mb-4">
          A primeira sessão é gratuita.
          <br />
          <em className="text-white/50 not-italic">A clareza que o vosso filho precisa pode começar hoje.</em>
        </h2>
        <p className="text-[0.85rem] text-white/60 leading-relaxed mb-6 max-w-lg mx-auto">
          30 minutos. Online. Sem compromisso. Vou explicar o que está a travar o progresso e o plano exacto para o resolver.
        </p>
        <a
          href="#inscricao"
          className="inline-flex items-center justify-center gap-2 bg-teal text-white rounded-lg px-8 py-4 text-[1rem] font-semibold hover:bg-teal-dark hover:-translate-y-0.5 transition-all"
        >
          Reservar diagnóstico gratuito
        </a>
      </div>
    </section>
  );
}
