import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inscricaoSchema = z.object({
  nomeAluno: z.string().min(2, "Indica o nome do aluno"),
  anoEscolaridade: z.enum(["9", "10", "11", "12"], {
    message: "Seleciona o ano de escolaridade",
  }),
  disciplinas: z
    .array(z.enum(["fq", "biogeo"]))
    .min(1, "Seleciona pelo menos uma disciplina"),
  nomeEncarregado: z.string().optional(),
  email: z.string().email("Indica um email válido"),
  telefone: z.string().optional(),
  mensagem: z.string().optional(),
});

export const submeterInscricao = createServerFn({ method: "POST" })
  .inputValidator((data) => inscricaoSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("inscricoes").insert({
      nome_aluno: data.nomeAluno,
      ano_escolaridade: data.anoEscolaridade,
      disciplinas: data.disciplinas,
      nome_encarregado: data.nomeEncarregado || null,
      email: data.email,
      telefone: data.telefone || null,
      mensagem: data.mensagem || null,
    });

    if (error) {
      console.error("Erro ao guardar inscrição:", error);
      throw new Error("Não foi possível enviar a inscrição. Tenta novamente.");
    }

    return { ok: true };
  });
