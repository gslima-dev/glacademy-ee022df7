import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { submeterInscricao } from "@/lib/inscricoes.functions";

const ANOS = ["10.º ano", "11.º ano", "12.º ano"];
const DISCIPLINAS = ["Física e Química A", "Biologia e Geologia", "Ambas"];
const TURMAS = ["Turma de grupo (100€/mês)", "Individual (150€/mês)", "Ainda não sei — quero ouvir a recomendação"];

const phoneRegex = /^(?:\+351\s?)?[29]\d{2}\s?\d{3}\s?\d{3}$/;

const clientSchema = z.object({
  nome: z.string().trim().min(2, "Indica o nome do encarregado de educação").max(120),
  email: z.string().trim().email("Indica um email válido").max(200),
  telefone: z.string().trim().regex(phoneRegex, "Telefone português inválido (9 dígitos, começa por 2 ou 9)"),
  nome_aluno: z.string().trim().min(2, "Indica o nome do aluno").max(120),
  ano: z.string().min(1, "Seleciona o ano"),
  disciplina: z.string().min(1, "Seleciona a disciplina"),
  modalidade: z.string().max(120).optional(),
  mensagem: z.string().max(2000).optional(),
});

type FormState = z.infer<typeof clientSchema> & { website: string };
type Errors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = {
  nome: "",
  email: "",
  telefone: "",
  nome_aluno: "",
  ano: "",
  disciplina: "",
  modalidade: "",
  mensagem: "",
  website: "",
};

export function InscricaoForm() {
  const submit = useServerFn(submeterInscricao);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    const parsed = clientSchema.safeParse(form);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      toast.error("Verifica os campos assinalados.");
      return;
    }

    setStatus("submitting");
    try {
      const result = await submit({ data: form });
      if (result?.ok) {
        setStatus("success");
        setForm(emptyForm);
        setErrors({});
        toast.success("Pedido recebido! Entro em contacto no mesmo dia.");
      } else {
        setStatus("error");
        toast.error("Não foi possível enviar. Tenta novamente.");
      }
    } catch {
      setStatus("error");
      toast.error("Ocorreu um erro ao enviar. Tenta novamente ou usa o WhatsApp.");
    }
  };

  const inputBase =
    "w-full rounded-lg border bg-background px-3 py-2.5 text-[0.85rem] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-11";
  const cls = (key: keyof Errors) =>
    `${inputBase} ${errors[key] ? "border-destructive" : "border-input"}`;

  return (
    <section className="py-16 bg-teal-soft/50 border-y border-teal-muted scroll-mt-20" id="inscricao">
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

        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-[var(--shadow-md)]"
        >
          {/* Honeypot — hidden from users, visible to bots */}
          <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="nome" className="block text-[0.75rem] font-semibold text-ink mb-1.5">
                Nome do encarregado de educação <span className="text-destructive" aria-hidden="true">*</span>
              </label>
              <input
                id="nome"
                name="nome"
                required
                aria-required="true"
                aria-invalid={!!errors.nome}
                aria-describedby={errors.nome ? "nome-error" : undefined}
                value={form.nome}
                onChange={(e) => update("nome", e.target.value)}
                className={cls("nome")}
                placeholder="Nome completo"
                maxLength={120}
              />
              {errors.nome && <p id="nome-error" className="mt-1 text-[0.72rem] text-destructive">{errors.nome}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-[0.75rem] font-semibold text-ink mb-1.5">
                Email <span className="text-destructive" aria-hidden="true">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={cls("email")}
                placeholder="email@exemplo.com"
                maxLength={200}
                autoComplete="email"
              />
              {errors.email && <p id="email-error" className="mt-1 text-[0.72rem] text-destructive">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="telefone" className="block text-[0.75rem] font-semibold text-ink mb-1.5">
                Telefone <span className="text-destructive" aria-hidden="true">*</span>
              </label>
              <input
                id="telefone"
                name="telefone"
                type="tel"
                required
                aria-required="true"
                aria-invalid={!!errors.telefone}
                aria-describedby={errors.telefone ? "telefone-error" : "telefone-hint"}
                value={form.telefone}
                onChange={(e) => update("telefone", e.target.value)}
                className={cls("telefone")}
                placeholder="9XX XXX XXX"
                maxLength={20}
                autoComplete="tel"
                inputMode="tel"
              />
              {errors.telefone ? (
                <p id="telefone-error" className="mt-1 text-[0.72rem] text-destructive">{errors.telefone}</p>
              ) : (
                <p id="telefone-hint" className="mt-1 text-[0.7rem] text-ink-3">9 dígitos · com ou sem +351</p>
              )}
            </div>
            <div>
              <label htmlFor="nome_aluno" className="block text-[0.75rem] font-semibold text-ink mb-1.5">
                Nome do aluno <span className="text-destructive" aria-hidden="true">*</span>
              </label>
              <input
                id="nome_aluno"
                name="nome_aluno"
                required
                aria-required="true"
                aria-invalid={!!errors.nome_aluno}
                aria-describedby={errors.nome_aluno ? "nome_aluno-error" : undefined}
                value={form.nome_aluno}
                onChange={(e) => update("nome_aluno", e.target.value)}
                className={cls("nome_aluno")}
                placeholder="Nome do aluno"
                maxLength={120}
              />
              {errors.nome_aluno && <p id="nome_aluno-error" className="mt-1 text-[0.72rem] text-destructive">{errors.nome_aluno}</p>}
            </div>
            <div>
              <label htmlFor="ano" className="block text-[0.75rem] font-semibold text-ink mb-1.5">
                Ano do aluno <span className="text-destructive" aria-hidden="true">*</span>
              </label>
              <select
                id="ano"
                name="ano"
                required
                aria-required="true"
                aria-invalid={!!errors.ano}
                aria-describedby={errors.ano ? "ano-error" : undefined}
                value={form.ano}
                onChange={(e) => update("ano", e.target.value)}
                className={cls("ano")}
              >
                <option value="">Selecionar ano</option>
                {ANOS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
              {errors.ano && <p id="ano-error" className="mt-1 text-[0.72rem] text-destructive">{errors.ano}</p>}
            </div>
            <div>
              <label htmlFor="disciplina" className="block text-[0.75rem] font-semibold text-ink mb-1.5">
                Disciplina <span className="text-destructive" aria-hidden="true">*</span>
              </label>
              <select
                id="disciplina"
                name="disciplina"
                required
                aria-required="true"
                aria-invalid={!!errors.disciplina}
                aria-describedby={errors.disciplina ? "disciplina-error" : undefined}
                value={form.disciplina}
                onChange={(e) => update("disciplina", e.target.value)}
                className={cls("disciplina")}
              >
                <option value="">Selecionar disciplina</option>
                {DISCIPLINAS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              {errors.disciplina && <p id="disciplina-error" className="mt-1 text-[0.72rem] text-destructive">{errors.disciplina}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="modalidade" className="block text-[0.75rem] font-semibold text-ink mb-1.5">
              Modalidade preferida
            </label>
            <select
              id="modalidade"
              name="modalidade"
              value={form.modalidade}
              onChange={(e) => update("modalidade", e.target.value)}
              className={cls("modalidade")}
            >
              <option value="">Selecionar modalidade</option>
              {TURMAS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label htmlFor="mensagem" className="block text-[0.75rem] font-semibold text-ink mb-1.5">
              O que gostariam de resolver primeiro?
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows={4}
              maxLength={2000}
              value={form.mensagem}
              onChange={(e) => update("mensagem", e.target.value)}
              className={`${cls("mensagem")} min-h-[100px]`}
              placeholder="Ex.: nota estagnada em FQ, dificuldade em responder a exercícios no formato do exame, dúvidas em BioGeo..."
            />
          </div>

          <div role="status" aria-live="polite">
            {status === "success" && (
              <div className="mb-5 p-4 rounded-lg bg-success-soft border border-success/20 text-success text-[0.82rem] leading-relaxed">
                ✅ Pedido recebido. Entro em contacto no mesmo dia para marcar o diagnóstico gratuito de 30 minutos.
              </div>
            )}
            {status === "error" && (
              <div className="mb-5 p-4 rounded-lg bg-destructive/8 border border-destructive/20 text-destructive text-[0.82rem] leading-relaxed">
                Ocorreu um erro ao enviar. Tenta novamente ou contacta-me por WhatsApp.
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full inline-flex items-center justify-center gap-2 bg-teal text-white rounded-lg px-6 py-3.5 font-semibold text-[0.95rem] min-h-12 hover:bg-teal-dark hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                A enviar...
              </>
            ) : (
              "Quero o diagnóstico gratuito"
            )}
          </button>

          <p className="text-[0.7rem] text-ink-3 text-center mt-3">
            Sem pagamento. Sem compromisso. Sem spam.
          </p>
        </form>
      </div>
    </section>
  );
}
