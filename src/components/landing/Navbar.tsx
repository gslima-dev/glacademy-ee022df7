export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-paper/96 backdrop-blur-md border-b border-border h-14 flex items-center">
      <div className="max-w-4xl mx-auto px-6 w-full flex items-center justify-between">
        <div className="font-serif text-[1.08rem] font-bold text-ink tracking-tight">
          GL<span className="text-teal">.</span>Academy
        </div>
        <div className="flex items-center gap-6">
          <a href="#metodo" className="hidden sm:block text-[0.8rem] text-ink-2 font-medium opacity-60 hover:opacity-100 transition-opacity">
            Método
          </a>
          <a href="#resultados" className="hidden sm:block text-[0.8rem] text-ink-2 font-medium opacity-60 hover:opacity-100 transition-opacity">
            Resultados
          </a>
          <a
            href="#marcar"
            className="bg-teal text-white text-[0.8rem] font-semibold px-4 py-2 rounded-md hover:bg-teal-dark hover:-translate-y-0.5 transition-all"
          >
            Ver disponibilidade →
          </a>
        </div>
      </div>
    </nav>
  );
}
