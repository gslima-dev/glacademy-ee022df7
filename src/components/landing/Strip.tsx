export function Strip() {
  const items = [
    { label: "Ensino secundário", value: "FQ · BioGeo" },
    { label: "Formato", value: "100% online" },
    { label: "Sessão inicial", value: "Diagnóstico gratuito" },
    { label: "Resposta", value: "No próprio dia" },
  ];

  return (
    <div className="bg-ink py-3.5">
      <div className="max-w-4xl mx-auto px-6 flex justify-center gap-8 flex-wrap">
        {items.map((item) => (
          <div key={item.label} className="text-[0.73rem] text-white/50 flex items-center gap-1.5">
            {item.label}: <strong className="text-white/85">{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
