export function MobileSticky() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.06)] p-3">
      <a
        href="#inscricao"
        className="block w-full text-center bg-teal text-white rounded-lg px-4 py-3 text-[0.85rem] font-semibold hover:bg-teal-dark transition-colors"
      >
        Reservar diagnóstico gratuito
      </a>
    </div>
  );
}
