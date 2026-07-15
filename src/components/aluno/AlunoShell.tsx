import { ReactNode, useState } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  Home,
  FolderOpen,
  CalendarDays,
  LineChart,
  UserCircle2,
  LogOut,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

type NavItem = { label: string; to: string; icon: React.ComponentType<{ className?: string }> };

const nav: NavItem[] = [
  { label: "Início", to: "/aluno", icon: Home },
  { label: "Materiais", to: "/aluno/materiais", icon: FolderOpen },
  { label: "Sessões", to: "/aluno/sessoes", icon: CalendarDays },
  { label: "Progresso", to: "/aluno/progresso", icon: LineChart },
  { label: "Perfil", to: "/aluno/perfil", icon: UserCircle2 },
];

type Aluno = { nome: string; email: string; avatarUrl?: string | null };

export function AlunoShell({ aluno, children }: { aluno: Aluno; children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-paper text-ink flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border/70 bg-paper-2/40 sticky top-0 h-screen">
        <SidebarInner aluno={aluno} />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 h-14 border-b border-border/70 bg-paper/95 backdrop-blur flex items-center justify-between px-4">
        <Link to="/aluno" className="flex items-center gap-2 font-serif text-ink">
          <GraduationCap className="h-5 w-5 text-teal" />
          <span className="text-base font-semibold">GL<span className="text-teal">.</span>Academy</span>
        </Link>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            className="inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-paper-3/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 bg-paper-2/60">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SidebarInner aluno={aluno} onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      <main className="flex-1 min-w-0 pt-14 md:pt-0">{children}</main>
    </div>
  );
}

function SidebarInner({ aluno, onNavigate }: { aluno: Aluno; onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const qc = useQueryClient();
  const initials = (aluno.nome || aluno.email).slice(0, 2).toUpperCase();

  const handleSignOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  const isActive = (to: string) => (to === "/aluno" ? pathname === "/aluno" : pathname.startsWith(to));

  return (
    <div className="flex flex-col h-full w-full">
      {/* Logo */}
      <div className="px-6 pt-6 pb-5 hidden md:block">
        <Link to="/aluno" className="flex items-center gap-2 font-serif" onClick={onNavigate}>
          <GraduationCap className="h-5 w-5 text-teal" />
          <span className="text-lg font-semibold tracking-tight">
            GL<span className="text-teal">.</span>Academy
          </span>
        </Link>
      </div>

      {/* Aluno card */}
      <div className="mx-4 md:mx-4 mt-4 md:mt-0 mb-6 rounded-xl border border-border/60 bg-card/70 px-4 py-3 flex items-center gap-3">
        <Avatar className="h-11 w-11 border border-border/60">
          {aluno.avatarUrl ? <AvatarImage src={aluno.avatarUrl} alt={aluno.nome} /> : null}
          <AvatarFallback className="bg-teal text-white font-serif text-sm">{initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="font-serif text-sm text-ink truncate leading-tight">{aluno.nome}</div>
          <div className="text-[11px] uppercase tracking-wide text-ink-3 mt-0.5">Aluno · 11.º ano</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        <div className="px-3 pb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-ink-3">
          Sala de estudo
        </div>
        {nav.map((item) => {
          const active = isActive(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-card text-ink shadow-sm border border-border/60"
                  : "text-ink-2 hover:text-ink hover:bg-card/60"
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4 transition-colors",
                  active ? "text-teal" : "text-ink-3 group-hover:text-ink-2"
                )}
              />
              <span className={cn(active && "font-medium")}>{item.label}</span>
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-teal" />}
            </Link>
          );
        })}
      </nav>

      {/* Sair */}
      <div className="p-3 border-t border-border/60 mt-4">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink-2 hover:text-ink hover:bg-card/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <LogOut className="h-4 w-4 text-ink-3" />
          Sair
        </button>
      </div>
    </div>
  );
}

export function AlunoHeader({
  eyebrow,
  title,
  saudacao,
  children,
}: {
  eyebrow: string;
  title: string;
  saudacao?: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-border/60 bg-paper/60">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-8 lg:py-10">
        <div className="text-[11px] uppercase tracking-[0.18em] text-teal font-medium">{eyebrow}</div>
        <h1 className="font-serif text-3xl lg:text-4xl text-ink mt-2 leading-tight">{title}</h1>
        {saudacao && <p className="text-ink-2 mt-3 max-w-2xl">{saudacao}</p>}
        {children}
      </div>
    </header>
  );
}

export function AlunoContainer({ children }: { children: ReactNode }) {
  return <div className="max-w-5xl mx-auto px-6 lg:px-10 py-8 lg:py-12 space-y-10">{children}</div>;
}
