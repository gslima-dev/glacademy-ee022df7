export function Footer() {
  return (
    <footer className="bg-ink border-t border-white/10 py-10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid md:grid-cols-[1.2fr_1fr_1fr] gap-8 mb-8">
          <div>
            <div className="font-serif text-[1.1rem] font-bold text-white mb-2">GL Academy</div>
            <p className="text-[0.75rem] text-white/40 leading-relaxed">
              Acompanhamento académico premium em Física e Química A e Biologia e Geologia para alunos do ensino secundário que querem resultados.
            </p>
          </div>
          <div>
            <div className="text-[0.62rem] font-bold uppercase tracking-[0.15em] text-white/30 mb-3">Contacto</div>
            <ul className="flex flex-col gap-1.5 text-[0.75rem] text-white/50">
              <li>Email: gllugabriel@hotmail.com</li>
              <li>WhatsApp: +351 925 328 999</li>
              <li>Online · 100% Portugal</li>
            </ul>
          </div>
          <div>
            <div className="text-[0.62rem] font-bold uppercase tracking-[0.15em] text-white/30 mb-3">Páginas</div>
            <ul className="flex flex-col gap-1.5 text-[0.75rem] text-white/50">
              <li>
                <a href="#problema" className="hover:text-white transition-colors">O problema</a>
              </li>
              <li>
                <a href="#metodo" className="hover:text-white transition-colors">O método</a>
              </li>
              <li>
                <a href="#resultados" className="hover:text-white transition-colors">Resultados</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">Perguntas frequentes</a>
              </li>
              <li>
                <a href="#inscricao" className="hover:text-white transition-colors">Diagnóstico gratuito</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-[0.68rem] text-white/30">
          © {new Date().getFullYear()} GL Academy. Gabriel L. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
