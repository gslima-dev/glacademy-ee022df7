import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "A sessão de diagnóstico é mesmo gratuita?",
    a: "Sim, totalmente. São 30 minutos online em que identifico com precisão o bloqueio do aluno. Saem com clareza sobre o que está a causar o problema e um plano concreto. Se não fizer sentido avançar, não há qualquer compromisso ou custo.",
  },
  {
    q: "Como sei se o meu filho precisa de acompanhamento ou apenas de uma boa explicação?",
    a: "O diagnóstico responde exatamente a isso. Muitos alunos parecem 'não estarem a perceber', quando na verdade o bloqueio é muito mais específico: falta de bases, dificuldade em responder em formato de exame, ou ausência de método de estudo. Só após o diagnóstico se define a melhor intervenção.",
  },
  {
    q: "As sessões são presenciais ou online?",
    a: "São 100% online, via Google Meet ou Zoom. Isso permite horários mais flexíveis, elimina deslocações e mantém a qualidade do acompanhamento com partilha de ecrã, exercícios em tempo real e gravações disponíveis.",
  },
  {
    q: "Quais disciplinas e anos acompanha?",
    a: "Acompanho alunos do 10.º ao 12.º ano em Física e Química A e Biologia e Geologia. O foco é no ensino secundário em ciências e tecnologias, especialmente na preparação para o exame nacional.",
  },
  {
    q: "Qual é o horário das sessões?",
    a: "As sessões são de 1h30 e o horário é acordado caso a caso — normalmente após a escola, durante a semana, e aos sábados de manhã. Procuramos sempre encontrar um horário que respeite o ritmo do aluno e da família.",
  },
  {
    q: "Há contrato de permanência?",
    a: "Não. O acompanhamento é mensal e pode ser interrompido a qualquer momento. Acredito que o valor deve ser evidente em cada sessão, não garantido por um contrato.",
  },
  {
    q: "Como funciona o apoio entre sessões?",
    a: "Envio materiais de apoio após cada sessão e respondo a dúvidas por mensagem durante a semana. Também ajusto o plano de trabalho nas semanas de testes e exames para que o esforço seja colocado onde realmente conta.",
  },
  {
    q: "O que distingue a GL Academy de um centro de explicações tradicional?",
    a: "Três coisas: diagnóstico inicial gratuito com mapeamento real do bloqueio; método focado no formato e critérios do exame nacional; e acompanhamento constante por quem conhece o percurso escolar recente de dentro.",
  },
];

export function FAQ() {
  return (
    <section className="py-16 bg-background" id="faq">
      <div className="max-w-4xl mx-auto px-6">
        <span className="text-[0.62rem] font-bold uppercase tracking-[0.15em] text-teal block mb-2">
          Perguntas frequentes
        </span>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.15] text-ink tracking-tight mb-8">
          Esclarecimentos práticos.
        </h2>

        <Accordion type="single" collapsible defaultValue="faq-0" className="flex flex-col gap-3">
          {faqs.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-border rounded-xl bg-card overflow-hidden px-4 transition-colors hover:border-teal-muted"
            >
              <AccordionTrigger className="text-left text-[0.88rem] font-semibold text-ink leading-snug hover:no-underline py-4">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-[0.82rem] text-ink-2 leading-relaxed pb-4 border-t border-border pt-3">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
