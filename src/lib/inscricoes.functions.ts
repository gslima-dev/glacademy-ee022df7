import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inscricaoSchema = z.object({
  nome: z.string().min(2, "Indica o nome do encarregado de educação"),
  email: z.string().email("Indica um email válido"),
  telefone: z.string().min(1, "Indica um telefone"),
  nome_aluno: z.string().min(2, "Indica o nome do aluno"),
  ano: z.string().min(1, "Seleciona o ano"),
  disciplina: z.string().min(1, "Seleciona a disciplina"),
  modalidade: z.string().optional(),
  mensagem: z.string().optional(),
});

function mapDisciplina(val: string): string[] {
  const map: Record<string, string> = {
    "Física e Química A": "fq",
    "Biologia e Geologia": "biogeo",
    "Ambas": "ambas",
  };
  const d = map[val] ?? val.toLowerCase();
  if (d === "ambas") return ["fq", "biogeo"];
  if (d === "fq" || d === "biogeo") return [d];
  return [d];
}

function mapAno(val: string): string {
  const m = val.match(/(10|11|12)/);
  return m ? m[1] : val;
}

export const submeterInscricao = createServerFn({ method: "POST" })
  .inputValidator((data) => inscricaoSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("inscricoes").insert({
      nome_encarregado: data.nome,
      email: data.email,
      telefone: data.telefone,
      nome_aluno: data.nome_aluno,
      ano_escolaridade: mapAno(data.ano),
      disciplinas: mapDisciplina(data.disciplina),
      modalidade: data.modalidade || null,
      mensagem: data.mensagem || null,
    });

    if (error) {
      console.error("Erro ao guardar inscrição:", error);
      throw new Error("Não foi possível enviar a inscrição. Tenta novamente.");
    }

    return { ok: true };
  });
