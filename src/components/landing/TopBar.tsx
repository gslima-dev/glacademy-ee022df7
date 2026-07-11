export function TopBar() {
  return (
    <div className="bg-ink py-2 px-4 flex items-center justify-center gap-2 text-[0.73rem] font-medium text-white/65 tracking-wide">
      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
      <span>
        Vagas limitadas para o presente período —{" "}
        <a href="#marcar" className="text-white/90 font-semibold underline underline-offset-2">
          ver disponibilidade
        </a>
      </span>
    </div>
  );
}
