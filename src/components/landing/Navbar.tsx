import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#metodo", label: "Método" },
  { href: "#resultados", label: "Resultados" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const isActive = (href: string) => active === href.slice(1);

  return (
    <nav className="sticky top-0 z-50 bg-paper/96 backdrop-blur-md border-b border-border h-14 flex items-center">
      <div className="max-w-4xl mx-auto px-6 w-full flex items-center justify-between">
        <a
          href="#top"
          className="font-serif text-[1.08rem] font-bold text-ink tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
        >
          GL<span className="text-teal">.</span>Academy
        </a>

        <div className="hidden md:flex items-center gap-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "true" : undefined}
              className={`text-[0.8rem] font-medium transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded ${
                isActive(link.href) ? "text-teal opacity-100" : "text-ink-2 opacity-70 hover:opacity-100"
              }`}
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/auth"
            className="text-[0.8rem] text-ink-2 font-medium opacity-80 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
          >
            Entrar
          </Link>
          <a
            href="#inscricao"
            className="bg-teal text-white text-[0.8rem] font-semibold px-4 py-2 rounded-md hover:bg-teal-dark hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Reservar diagnóstico →
          </a>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center min-h-11 min-w-11 rounded-md text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="absolute top-14 left-0 right-0 md:hidden bg-paper border-b border-border shadow-md"
        >
          <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-[0.95rem] font-medium py-3 min-h-11 flex items-center border-b border-border ${
                  isActive(link.href) ? "text-teal" : "text-ink-2"
                }`}
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/auth"
              onClick={() => setOpen(false)}
              className="text-[0.95rem] font-medium py-3 min-h-11 flex items-center border-b border-border text-ink-2"
            >
              Entrar
            </Link>
            <a
              href="#inscricao"
              onClick={() => setOpen(false)}
              className="mt-3 bg-teal text-white text-center font-semibold px-4 py-3 rounded-md min-h-12 flex items-center justify-center"
            >
              Reservar diagnóstico →
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
