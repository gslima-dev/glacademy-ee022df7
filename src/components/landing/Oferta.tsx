export function Oferta() {
  const includes = [
    "Uma sessão por semana · 1h30 · 100% online",
    "Revisão do trabalho da semana anterior",
    "Explicação do tópico em foco — sem saltar etapas",
    "Prática no formato IAVE com feedback direto",
    "Plano de trabalho para a semana seguinte",
  ];

  const always = [
    "Horário acordado entre o aluno e o Gabriel",
    "Materiais de apoio enviados após cada sessão",
    "Suporte por mensagem entre sessões",
    "Ajuste do plano nas semanas de avaliação",
    "Resposta no próprio dia — sempre",
  ];

  const chips = [
    "Diagnóstico inicial gratuito",
    "Sem contrato de permanência",
    "100% online",
    "Sessões de 1h30",
    "Horário flexível",
  ];

  return (
    <section className="py-16 bg-paper-2 border-y border-border" id="marcar">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-card border border-border rounded-[18px] overflow-hidden shadow-[var(--shadow-lg)]">
          <div className="bg-teal p-7 md:p-8">
            <div className="inline-block bg-white/13 border border-white/16 rounded-full px-3 py-1 text-[0.67rem] font-semibold uppercase tracking-wider text-white/85 mb-3">
              Sem risco · Sem compromisso · Gratuito
            </div>
            <h2 className="font-serif text-[1.5rem] md:text-[1.7rem] font-bold text-white leading-tight mb-3">
              Como funciona o processo.
              <br />
              <em className="text-white/70 not-italic">Do primeiro contacto ao primeiro resultado.</em>
            </h2>
            <p className="text-[0.82rem] text-white/70 leading-relaxed">
              <strong className="text-white">1.</strong> Preenchem o formulário com os dados do aluno, ano e disciplina.
              <br />
              <strong className="text-white">2.</strong> Sessão de diagnóstico: 30 minutos, 100% online. Identifico o bloqueio com precisão e explico o que está a causar.
              <br />
              <strong className="text-white">3.</strong> Saem com clareza sobre o problema real — e um plano concreto para o resolver. Ou não há qualquer custo, e a sessão foi útil à mesma.
            </p>
          </div>

          <div className="p-7 md:p-8">
            {/* Estrutura */}
            <div className="mb-8">
              <h3 className="font-serif text-[1.05rem] font-bold text-ink mb-4">Estrutura do acompanhamento</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-paper-2 border border-border rounded-xl p-4">
                  <div className="text-[0.62rem] font-bold uppercase tracking-[0.1em] text-ink-3 mb-3">Cada sessão inclui</div>
                  <ul className="flex flex-col gap-2">
                    {includes.map((item) => (
                      <li key={item} className="flex gap-2 text-[0.81rem] text-ink-2">
                        <span className="text-teal shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-paper-2 border border-border rounded-xl p-4">
                  <div className="text-[0.62rem] font-bold uppercase tracking-[0.1em] text-ink-3 mb-3">O que está sempre incluído</div>
                  <ul className="flex flex-col gap-2">
                    {always.map((item) => (
                      <li key={item} className="flex gap-2 text-[0.81rem] text-ink-2">
                        <span className="text-teal shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Modalidades */}
            <div className="mb-8">
              <h3 className="font-serif text-[1.05rem] font-bold text-ink mb-4">Modalidades de acompanhamento</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-ink border border-ink rounded-xl p-5 flex flex-col gap-3 relative transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_oklch(0.2_0.02_240/0.35)]">
                  <div className="absolute -top-2.5 left-5 bg-teal text-white text-[0.62rem] font-bold uppercase tracking-wider rounded-full px-2 py-1">
                    Mais procurado
                  </div>
                  <div className="text-[0.62rem] font-bold uppercase tracking-[0.1em] text-white/40">Grupo reduzido</div>
                  <div className="font-serif text-[1.8rem] font-bold text-white leading-none">
                    100€<span className="font-sans text-[0.82rem] font-normal text-white/40">/mês</span>
                  </div>
                  <ul className="flex flex-col gap-2 flex-1">
                    {["3 a 4 alunos por turma", "1 sessão por semana · 1h30", "Turmas com perfil de dificuldade semelhante", "Materiais e suporte incluídos"].map((item) => (
                      <li key={item} className="flex gap-2 text-[0.8rem] text-white/70">
                        <span className="text-teal shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="text-[0.72rem] text-white/30 pt-3 border-t border-white/10">
                    Adequado para alunos que beneficiam da dinâmica de grupo e partilham dificuldades semelhantes.
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] hover:border-teal-muted">
                  <div className="text-[0.62rem] font-bold uppercase tracking-[0.1em] text-ink-3">Individual</div>
                  <div className="font-serif text-[1.8rem] font-bold text-ink leading-none">
                    150€<span className="font-sans text-[0.82rem] font-normal text-ink-3">/mês</span>
                  </div>
                  <ul className="flex flex-col gap-2 flex-1">
                    {[
                      "Acompanhamento 1:1 — foco exclusivo num aluno",
                      "1 sessão por semana · 1h30",
                      "Horário totalmente flexível",
                      "Plano ajustado sessão a sessão",
                      "Materiais e suporte incluídos",
                    ].map((item) => (
                      <li key={item} className="flex gap-2 text-[0.8rem] text-ink-2">
                        <span className="text-teal shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="text-[0.72rem] text-ink-3 pt-3 border-t border-border">
                    Adequado para alunos com bloqueios específicos que requerem atenção dedicada e um plano inteiramente personalizado.
                  </div>
                </div>
              </div>
              <p className="text-[0.73rem] text-ink-3 mt-3 text-center">
                A modalidade é definida em conjunto após o diagnóstico gratuito, com base nas necessidades específicas do aluno.
              </p>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {chips.map((chip) => (
                <div key={chip} className="flex items-center gap-1.5 bg-paper-2 border border-border rounded-full px-3 py-1.5 text-[0.73rem] text-ink-2">
                  <span className="text-teal text-[0.66rem]">✓</span>
                  {chip}
                </div>
              ))}
            </div>

            {/* Garantia */}
            <div className="grid grid-cols-[auto_1fr] gap-3 items-start p-4 bg-paper-2 border border-border rounded-xl mb-6">
              <div className="text-[1.8rem] leading-none pt-0.5">🛡️</div>
              <div>
                <div className="text-[0.8rem] font-bold text-ink mb-1">O diagnóstico é sem risco</div>
                <p className="text-[0.77rem] text-ink-2 leading-relaxed">
                  A sessão de diagnóstico é gratuita e sem compromisso. Se no final não fizer sentido avançar — para o aluno, para a família, ou para mim — não há qualquer custo. Só continuamos se o plano fizer sentido para as duas partes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
