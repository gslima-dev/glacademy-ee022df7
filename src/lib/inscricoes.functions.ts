import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Portuguese mobile/landline: 9 digits, starts 2 or 9. Accepts spaces/+351 prefix.
const phoneRegex = /^(?:\+351\s?)?[29]\d{2}\s?\d{3}\s?\d{3}$/;

const inscricaoSchema = z.object({
  nome: z.string().trim().min(2, "Indica o nome do encarregado de educação").max(120),
  email: z.string().trim().email("Indica um email válido").max(200),
  telefone: z
    .string()
    .trim()
    .regex(phoneRegex, "Indica um telefone português válido (9 dígitos)")
    .max(20),
  nome_aluno: z.string().trim().min(2, "Indica o nome do aluno").max(120),
  ano: z.string().trim().min(1, "Seleciona o ano").max(20),
  disciplina: z.string().trim().min(1, "Seleciona a disciplina").max(60),
  modalidade: z.string().trim().max(120).optional().or(z.literal("")),
  mensagem: z.string().trim().max(2000).optional().or(z.literal("")),
  // Honeypot — must be empty; bots typically fill every field.
  website: z.string().max(0).optional().or(z.literal("")),
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
  .validator({ parse: (data) => inscricaoSchema.parse(data) })
  .handler(async ({ data }) => {
    // Honeypot triggered — silently succeed so bots don't retry.
    if (data.website && data.website.length > 0) {
      return { ok: true };
    }

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
