export function ComoFunciona() {
  const steps = [
    {
      num: "1",
      title: "Diagnóstico gratuito — 30 minutos",
      text: "Conversamos com o aluno e a família, percebendo onde está o bloqueio. Saem com clareza sobre o que está a causar o problema — e se faz sentido avançar.",
      free: true,
    },
    {
      num: "2",
      title: "Plano personalizado",
      text: "Com base no diagnóstico, defino um plano com os tópicos prioritários, a frequência ideal e a modalidade (grupo ou individual). Nada é genérico.",
      free: false,
    },
    {
      num: "3",
      title: "Sessões semanais de 1h30",
      text: "Cada sessão: compreensão do conceito → prática no formato IAVE → feedback directo nos erros com explicação. Não avanço enquanto o conceito não estiver consolidado. E não deixo memorizar o que não foi compreendido.",
      free: false,
    },
    {
      num: "4",
      title: "Acompanhamento contínuo",
      text: "Materiais de apoio enviados após cada sessão, suporte por mensagem entre sessões e ajuste do plano nas semanas de avaliação.",
      free: false,
    },
  ];

  return (
    <section className="py-16 bg-background" id="como-funciona">
      <div className="max-w-4xl mx-auto px-6">
        <span className="text-[0.62rem] font-bold uppercase tracking-[0.15em] text-teal block mb-2">
          Como funciona
        </span>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.15] text-ink tracking-tight mb-3">
          Do primeiro contacto ao primeiro resultado.
        </h2>
        <p className="text-[0.92rem] text-ink-2 leading-[1.78] max-w-xl mb-8">
          Um processo simples, com clareza em cada etapa. O primeiro passo é gratuito e sem compromisso.
        </p>

        <div className="flex flex-col">
          {steps.map((s) => (
            <div key={s.num} className="grid grid-cols-[50px_1fr] gap-4 py-5 border-b border-border last:border-b-0 items-start">
              <div className="w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center font-serif text-[0.9rem] font-bold mt-0.5">
                {s.num}
              </div>
              <div>
                <h3 className="text-[0.93rem] font-semibold text-ink mb-1 leading-snug">
                  {s.title}
                  {s.free && (
                    <span className="ml-2 inline-block text-[0.65rem] font-bold uppercase tracking-wide bg-amber-soft border border-amber-muted text-amber rounded px-2 py-0.5">
                      Gratuito
                    </span>
                  )}
                </h3>
                <p className="text-[0.8rem] text-ink-2 leading-relaxed">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
