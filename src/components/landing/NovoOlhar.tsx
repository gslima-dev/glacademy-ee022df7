export function NovoOlhar() {
  return (
    <section className="py-16 bg-background" id="novo-olhar">
      <div className="max-w-4xl mx-auto px-6">
        <span className="text-[0.62rem] font-bold uppercase tracking-[0.15em] text-amber block mb-2">
          Novo olhar
        </span>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.15] text-ink tracking-tight mb-3">
          O que muda quando o bloqueio é identificado.
        </h2>
        <p className="text-[0.92rem] text-ink-2 leading-[1.78] max-w-xl mb-8">
          Não se trata de estudar mais horas. Trata-se de perceber, com precisão, onde o raciocínio do aluno perde força — e corrigir isso antes de avançar.
        </p>

        <div className="bg-card border border-border rounded-2xl p-8 max-w-3xl shadow-[var(--shadow-md)] transition-shadow hover:shadow-[var(--shadow-lg)]">
          <p className="text-[0.93rem] text-ink-2 leading-[1.82] mb-4">
            A GL Academy trabalha com uma ideia simples: <strong className="text-ink">o problema raramente é o aluno.</strong> É a ausência de um diagnóstico claro sobre o que está a impedir o progresso. Quando esse diagnóstico é feito, o plano torna-se evidente — e os resultados seguem.
          </p>
          <p className="text-[0.93rem] text-ink-2 leading-[1.82] mb-4">
            O método é construído em três pilares: <em className="text-teal not-italic">diagnóstico preciso</em>,{" "}
            <em className="text-teal not-italic">explicação que finalmente faz sentido</em> e{" "}
            <em className="text-teal not-italic">prática no formato exato do exame</em>.
          </p>
          <p className="text-[0.93rem] text-ink-2 leading-[1.82]">
            Cada sessão parte do nível real do aluno. Não se salta etapas. Não se memoriza o que não se compreendeu. E o objetivo final é sempre o mesmo: a nota.
          </p>
        </div>
      </div>
    </section>
  );
}
