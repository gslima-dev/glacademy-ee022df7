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

    // Send notification emails via Resend. Failures are logged but never block
    // the successful submission response.
    await sendInscricaoEmails(data).catch((err) => {
      console.error("Falha ao enviar emails de inscrição (não bloqueante):", err);
    });

    return { ok: true };
  });

async function sendInscricaoEmails(data: z.infer<typeof inscricaoSchema>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY não configurada — a saltar envio de emails.");
    return;
  }

  const from = process.env.INSCRICOES_FROM_EMAIL || "onboarding@resend.dev";
  const notifyTo = process.env.INSCRICOES_NOTIFY_EMAIL || "gl.academy.pt@gmail.com";
  const fromHeader = `GL Academy <${from}>`;

  const disciplinasLabel = data.disciplina;
  const modalidadeLabel = data.modalidade || "—";
  const mensagemLabel = data.mensagem || "—";

  const escape = (s: string) =>
    s.replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!),
    );

  const ownerHtml = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#1a1a1a;line-height:1.55;">
      <h2 style="margin:0 0 16px;">Nova inscrição — GL Academy</h2>
      <table style="border-collapse:collapse;font-size:14px;">
        <tbody>
          <tr><td style="padding:6px 12px 6px 0;color:#666;">Aluno</td><td><strong>${escape(data.nome_aluno)}</strong></td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#666;">Ano</td><td>${escape(data.ano)}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#666;">Disciplina</td><td>${escape(disciplinasLabel)}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#666;">Modalidade</td><td>${escape(modalidadeLabel)}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#666;">Encarregado</td><td>${escape(data.nome)}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#666;">Email</td><td>${escape(data.email)}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#666;">Telefone</td><td>${escape(data.telefone)}</td></tr>
        </tbody>
      </table>
      <h3 style="margin:20px 0 6px;font-size:14px;">Mensagem</h3>
      <p style="margin:0;white-space:pre-wrap;">${escape(mensagemLabel)}</p>
    </div>`;

  const ownerRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromHeader,
      to: [notifyTo],
      reply_to: data.email,
      subject: `Nova inscrição — ${data.nome_aluno} (${data.ano})`,
      html: ownerHtml,
    }),
  });
  if (!ownerRes.ok) {
    const body = await ownerRes.text();
    console.error(`Resend (owner) falhou [${ownerRes.status}]:`, body);
  }

  // Confirmation to the interested party. Will 403 with onboarding@resend.dev
  // until a verified domain is used as "from" — expected for now.
  const confirmHtml = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#1a1a1a;line-height:1.6;max-width:560px;">
      <h2 style="margin:0 0 12px;">Recebemos a tua inscrição</h2>
      <p>Olá ${escape(data.nome)},</p>
      <p>Obrigado por te inscreveres na <strong>GL Academy</strong>. Recebemos os dados de <strong>${escape(data.nome_aluno)}</strong> (${escape(data.ano)} — ${escape(disciplinasLabel)}).</p>
      <p>Vamos entrar em contacto muito em breve para agendar a <strong>sessão de diagnóstico gratuita</strong>.</p>
      <p style="margin-top:24px;">Até já,<br/>Equipa GL Academy</p>
    </div>`;

  const confirmRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromHeader,
      to: [data.email],
      subject: "Recebemos a tua inscrição — GL Academy",
      html: confirmHtml,
    }),
  });
  if (!confirmRes.ok) {
    const body = await confirmRes.text();
    console.error(`Resend (confirmação) falhou [${confirmRes.status}]:`, body);
  }
}
