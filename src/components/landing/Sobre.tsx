import gabrielPhoto from "@/assets/gabriel-portrait.jpg";

export function Sobre() {
  return (
    <section className="py-16 bg-ink" id="sobre">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid md:grid-cols-[auto_1fr] gap-10 items-start">
          <div className="text-center">
            <div className="w-[152px] h-[152px] rounded-full overflow-hidden border-[3px] border-white/12 mx-auto mb-4">
              <img src={gabrielPhoto} alt="Gabriel — GL Academy" className="w-full h-full object-cover object-top" width={152} height={152} />
            </div>
            <div className="flex flex-wrap gap-1 justify-center max-w-[165px] mx-auto">
              {["NOVA FCT", "Biologia Celular", "FQ · BioGeo", "19 anos"].map((chip) => (
                <span
                  key={chip}
                  className="text-[0.63rem] font-semibold bg-white/6 border border-white/9 rounded-full px-2 py-1 text-white/60"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-[0.62rem] font-bold uppercase tracking-[0.15em] text-white/35 block mb-2">
              Quem está do outro lado
            </span>
            <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.15] text-white tracking-tight mb-4">
              Sou o Gabriel.
              <br />
              <em className="text-white/50 not-italic">Conheço este percurso por dentro.</em>
            </h2>
            <p className="text-[0.9rem] text-white/60 leading-[1.8] mt-3">
              Tenho 19 anos e estou a licenciar-me em <strong className="text-white">Biologia Celular e Molecular na NOVA FCT</strong>. Não tenho décadas de experiência. Tenho algo com um valor diferente:{" "}
              <strong className="text-white">a memória recente e precisa de estar exactamente onde os meus alunos estão.</strong>
            </p>
            <p className="text-[0.9rem] text-white/60 leading-[1.8] mt-3">
              Sei o que é estudar horas para FQ e não perceber porque os resultados não mudam. Sei o que é chegar a um teste a pensar que a matéria estava dominada — e bloquear. Essa experiência não é apenas parte da minha história.{" "}
              <strong className="text-white">É a base do método que desenvolvi.</strong>
            </p>
            <p className="text-[0.9rem] text-white/60 leading-[1.8] mt-3">
              O que faço de diferente: parto sempre do nível real do aluno, não do nível que "deveria" ter. Explico de uma forma que finalmente faz sentido. E trabalho sempre com o exame nacional em mente — não com os exercícios do manual que raramente saem.{" "}
              <strong className="text-white">A nota é o único resultado que me interessa medir.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
