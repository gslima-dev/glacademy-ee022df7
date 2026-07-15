// Mock data para a Área do Aluno (fase visual / estrutural).
// Substituir por queries reais quando a integração de sessões chegar.

export type Disciplina = "FQ" | "BG";

export const disciplinaLabel: Record<Disciplina, string> = {
  FQ: "Física e Química",
  BG: "Biologia e Geologia",
};

export type Sessao = {
  id: string;
  data: string; // ISO
  duracaoMin: number;
  disciplina: Disciplina;
  topico: string;
  resumo: string;
  estado: "futura" | "concluida";
  link?: string;
};

const hoje = new Date();
const dia = (offset: number, h = 18, m = 0) => {
  const d = new Date(hoje);
  d.setDate(d.getDate() + offset);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};

export const sessoes: Sessao[] = [
  {
    id: "s1",
    data: dia(2, 18, 30),
    duracaoMin: 90,
    disciplina: "FQ",
    topico: "Cinética química — fatores que afetam a velocidade",
    resumo: "Preparação para o próximo teste. Vamos rever exercícios do manual e um exame nacional.",
    estado: "futura",
    link: "https://meet.google.com/xxx-yyyy-zzz",
  },
  {
    id: "s2",
    data: dia(6, 19, 0),
    duracaoMin: 90,
    disciplina: "BG",
    topico: "Geologia — deformação das rochas",
    resumo: "Continuação do bloco de tectónica. Introdução a falhas e dobras.",
    estado: "futura",
  },
  {
    id: "s3",
    data: dia(-4, 18, 30),
    duracaoMin: 90,
    disciplina: "FQ",
    topico: "Equilíbrio químico — princípio de Le Chatelier",
    resumo: "Aluno consolidou a leitura de gráficos de concentração. Ficou de resolver 3 exames em casa.",
    estado: "concluida",
  },
  {
    id: "s4",
    data: dia(-9, 19, 0),
    duracaoMin: 90,
    disciplina: "BG",
    topico: "Biologia — metabolismo celular",
    resumo: "Boa evolução na fotossíntese. Rever fase escura antes da próxima sessão.",
    estado: "concluida",
  },
  {
    id: "s5",
    data: dia(-16, 18, 30),
    duracaoMin: 90,
    disciplina: "FQ",
    topico: "Ácido-base — pH e cálculos",
    resumo: "Sessão de diagnóstico. Foco em cálculos com logaritmos.",
    estado: "concluida",
  },
];

export type Material = {
  id: string;
  titulo: string;
  tipo: "pdf" | "exercicios" | "resumo";
  disciplina: Disciplina;
  data: string; // ISO
  tamanho?: string;
  url: string;
};

export const materiais: Material[] = [
  { id: "m1", titulo: "Resumo — Equilíbrio químico", tipo: "resumo", disciplina: "FQ", data: dia(-3), tamanho: "412 KB", url: "#" },
  { id: "m2", titulo: "Ficha de exercícios — Cinética", tipo: "exercicios", disciplina: "FQ", data: dia(-3), tamanho: "1.1 MB", url: "#" },
  { id: "m3", titulo: "Exame nacional 2023 (2.ª fase) resolvido", tipo: "pdf", disciplina: "FQ", data: dia(-10), tamanho: "2.4 MB", url: "#" },
  { id: "m4", titulo: "Resumo — Metabolismo celular", tipo: "resumo", disciplina: "BG", data: dia(-8), tamanho: "380 KB", url: "#" },
  { id: "m5", titulo: "Ficha de exercícios — Tectónica", tipo: "exercicios", disciplina: "BG", data: dia(-1), tamanho: "890 KB", url: "#" },
];

export type NotaHistorico = {
  mes: string;
  FQ: number | null;
  BG: number | null;
};

export const historicoNotas: NotaHistorico[] = [
  { mes: "Set", FQ: 10, BG: 11 },
  { mes: "Out", FQ: 11, BG: 12 },
  { mes: "Nov", FQ: 12, BG: 12 },
  { mes: "Dez", FQ: 13, BG: 13 },
  { mes: "Jan", FQ: 14, BG: 14 },
  { mes: "Fev", FQ: 15, BG: 14 },
];

export const focoDaSemana = {
  ultima: "Revimos equilíbrio químico com foco em Le Chatelier — resolveste 6 exercícios de exame com autonomia.",
  proxima: "Cinética química: fatores que afetam a velocidade de reação. Traz dúvidas dos exercícios do manual (pág. 84).",
};

export const streak = {
  sessoesConsecutivas: 7,
  assiduidade: 96, // %
  ultimoMes: [1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1], // últimas 12 semanas (mock)
};

export const perfilAluno = {
  ano: "11.º ano",
  disciplinas: ["Física e Química A", "Biologia e Geologia"],
  encarregado: { nome: "Maria Silva", email: "maria.silva@example.pt", telefone: "912 345 678" },
  modalidade: "Individual" as "Individual" | "Grupo",
  proximaRenovacao: dia(24),
};

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-PT", { day: "2-digit", month: "long", year: "numeric" });
}
export function formatDayShort(iso: string) {
  return new Date(iso).toLocaleDateString("pt-PT", { weekday: "short", day: "2-digit", month: "short" });
}
export function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });
}
