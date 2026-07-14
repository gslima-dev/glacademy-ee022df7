export function MobileSticky() {
  return (
    <>
      {/* Spacer so sticky bar doesn't cover page bottom content */}
      <div className="h-20 md:hidden" aria-hidden="true" />
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.06)] p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <a
          href="#inscricao"
          className="block w-full text-center bg-teal text-white rounded-lg px-4 py-3 min-h-12 text-[0.9rem] font-semibold hover:bg-teal-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Reservar diagnóstico gratuito
        </a>
      </div>
    </>
  );
}
