import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submeterInscricao } from "@/lib/inscricoes.functions";

const ANOS = ["10.º ano", "11.º ano", "12.º ano"];
const DISCIPLINAS = ["Física e Química A", "Biologia e Geologia", "Ambas"];
const TURMAS = ["Turma de grupo (100€/mês)", "Individual (150€/mês)", "Ainda não sei — quero ouvir a recomendação"];

export function InscricaoForm() {
  const submit = useServerFn(submeterInscricao);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    nome_aluno: "",
    ano: "",
    disciplina: "",
    modalidade: "",
    mensagem: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    try {
      const result = await submit({ data: form });
      if (result?.ok) {
        setStatus("success");
        setForm({
          nome: "",
          email: "",
          telefone: "",
          nome_aluno: "",
          ano: "",
          disciplina: "",
          modalidade: "",
          mensagem: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-16 bg-teal-soft/50 border-y border-teal-muted" id="inscricao">
      <div className="max-w-[720px] mx-auto px-6">
        <div className="text-center mb-8">
          <span className="text-[0.62rem] font-bold uppercase tracking-[0.15em] text-teal block mb-2">
            Começar
          </span>
          <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.15] text-ink tracking-tight mb-3">
            Reservem o diagnóstico gratuito.
          </h2>
          <p className="text-[0.9rem] text-ink-2 leading-relaxed">
            Preencham o formulário. Entro em contacto no mesmo dia para marcar a sessão de 30 minutos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-[var(--shadow-md)]">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="nome" className="block text-[0.75rem] font-semibold text-ink mb-1.5">
                Nome do encarregado de educação <span className="text-destructive">*</span>
              </label>
              <input
                id="nome"
                required
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-[0.85rem] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                placeholder="Nome completo"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-[0.75rem] font-semibold text-ink mb-1.5">
                Email <span className="text-destructive">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-[0.85rem] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                placeholder="email@exemplo.com"
              />
            </div>
            <div>
              <label htmlFor="telefone" className="block text-[0.75rem] font-semibold text-ink mb-1.5">
                Telefone <span className="text-destructive">*</span>
              </label>
              <input
                id="telefone"
                type="tel"
                required
                value={form.telefone}
                onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-[0.85rem] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                placeholder="9XX XXX XXX"
              />
            </div>
            <div>
              <label htmlFor="nome_aluno" className="block text-[0.75rem] font-semibold text-ink mb-1.5">
                Nome do aluno
              </label>
              <input
                id="nome_aluno"
                value={form.nome_aluno}
                onChange={(e) => setForm({ ...form, nome_aluno: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-[0.85rem] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                placeholder="Nome do aluno"
              />
            </div>
            <div>
              <label htmlFor="ano" className="block text-[0.75rem] font-semibold text-ink mb-1.5">
                Ano do aluno
              </label>
              <select
                id="ano"
                value={form.ano}
                onChange={(e) => setForm({ ...form, ano: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-[0.85rem] text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Selecionar ano</option>
                {ANOS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="disciplina" className="block text-[0.75rem] font-semibold text-ink mb-1.5">
                Disciplina
              </label>
              <select
                id="disciplina"
                value={form.disciplina}
                onChange={(e) => setForm({ ...form, disciplina: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-[0.85rem] text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Selecionar disciplina</option>
                {DISCIPLINAS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="modalidade" className="block text-[0.75rem] font-semibold text-ink mb-1.5">
              Modalidade preferida
            </label>
            <select
              id="modalidade"
              value={form.modalidade}
              onChange={(e) => setForm({ ...form, modalidade: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-[0.85rem] text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">Selecionar modalidade</option>
              {TURMAS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label htmlFor="mensagem" className="block text-[0.75rem] font-semibold text-ink mb-1.5">
              O que gostariam de resolver primeiro?
            </label>
            <textarea
              id="mensagem"
              rows={4}
              value={form.mensagem}
              onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-[0.85rem] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              placeholder="Ex.: nota estagnada em FQ, dificuldade em responder a exercícios no formato do exame, dúvidas em BioGeo..."
            />
          </div>

          {status === "success" && (
            <div className="mb-5 p-4 rounded-lg bg-success-soft border border-success/20 text-success text-[0.82rem] leading-relaxed">
              ✅ Pedido recebido. Entro em contacto no mesmo dia para marcar o diagnóstico gratuito de 30 minutos.
            </div>
          )}
          {status === "error" && (
            <div className="mb-5 p-4 rounded-lg bg-destructive/8 border border-destructive/20 text-destructive text-[0.82rem] leading-relaxed">
              Ocorreu um erro ao enviar. Tente novamente ou contacte-me por WhatsApp.
            </div>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full inline-flex items-center justify-center gap-2 bg-teal text-white rounded-lg px-6 py-3.5 font-semibold text-[0.95rem] hover:bg-teal-dark hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "A enviar..." : "Quero o diagnóstico gratuito"}
          </button>

          <p className="text-[0.7rem] text-ink-3 text-center mt-3">
            Sem pagamento. Sem compromisso. Sem spam.
          </p>
        </form>
      </div>
    </section>
  );
}
