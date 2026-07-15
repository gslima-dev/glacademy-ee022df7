import { createFileRoute } from "@tanstack/react-router";
import { AlunoHeader, AlunoContainer } from "@/components/aluno/AlunoShell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, FileSpreadsheet, StickyNote, Download, FolderOpen } from "lucide-react";
import { materiais, disciplinaLabel, formatDate, type Material, type Disciplina } from "@/lib/aluno-mock";

export const Route = createFileRoute("/aluno/materiais")({
  head: () => ({ meta: [{ title: "Materiais · Área do Aluno · GL Academy" }] }),
  component: MateriaisPage,
});

function MateriaisPage() {
  return (
    <>
      <AlunoHeader
        eyebrow="Recursos"
        title="Materiais"
        saudacao="Tudo o que precisas para consolidar, organizado por disciplina. Novos ficheiros aparecem aqui após cada sessão."
      />
      <AlunoContainer>
        <Tabs defaultValue="FQ" className="space-y-6">
          <TabsList className="bg-paper-2/60 border border-border/60 h-auto p-1">
            <TabsTrigger value="FQ" className="data-[state=active]:bg-card px-5 py-2">
              Física e Química
            </TabsTrigger>
            <TabsTrigger value="BG" className="data-[state=active]:bg-card px-5 py-2">
              Biologia e Geologia
            </TabsTrigger>
          </TabsList>

          {(["FQ", "BG"] as Disciplina[]).map((d) => {
            const items = materiais.filter((m) => m.disciplina === d);
            return (
              <TabsContent key={d} value={d} className="space-y-3">
                {items.length === 0 ? (
                  <EmptyState disciplina={d} />
                ) : (
                  items.map((m) => <MaterialItem key={m.id} m={m} />)
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </AlunoContainer>
    </>
  );
}

const iconFor = {
  pdf: FileText,
  exercicios: FileSpreadsheet,
  resumo: StickyNote,
} as const;

const tipoLabel = {
  pdf: "PDF",
  exercicios: "Exercícios",
  resumo: "Resumo",
} as const;

function MaterialItem({ m }: { m: Material }) {
  const Icon = iconFor[m.tipo];
  return (
    <div className="group flex items-center gap-4 rounded-xl border border-border/60 bg-card px-5 py-4 hover:border-teal/40 hover:shadow-sm transition-all">
      <div className="grid place-items-center h-11 w-11 rounded-lg bg-teal-soft/70 shrink-0">
        <Icon className="h-5 w-5 text-teal" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-medium text-ink truncate">{m.titulo}</div>
        <div className="text-xs text-ink-3 mt-0.5 flex items-center gap-2 flex-wrap">
          <span className="uppercase tracking-wide">{tipoLabel[m.tipo]}</span>
          <span aria-hidden>·</span>
          <span>{formatDate(m.data)}</span>
          {m.tamanho && (
            <>
              <span aria-hidden>·</span>
              <span>{m.tamanho}</span>
            </>
          )}
        </div>
      </div>
      <Button asChild size="sm" variant="outline" className="shrink-0">
        <a href={m.url} target="_blank" rel="noreferrer" aria-label={`Descarregar ${m.titulo}`}>
          <Download className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Descarregar</span>
        </a>
      </Button>
    </div>
  );
}

function EmptyState({ disciplina }: { disciplina: Disciplina }) {
  return (
    <div className="rounded-xl border border-dashed border-border/70 bg-paper-2/40 py-14 px-6 text-center">
      <FolderOpen className="h-8 w-8 text-ink-3 mx-auto mb-3" />
      <h3 className="font-serif text-lg text-ink">Ainda não há materiais aqui</h3>
      <p className="text-sm text-ink-3 mt-1 max-w-sm mx-auto">
        Os recursos de {disciplinaLabel[disciplina]} aparecem após a primeira sessão.
      </p>
    </div>
  );
}
