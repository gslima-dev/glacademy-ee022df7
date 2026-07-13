import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Download, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/materiais")({
  head: () => ({ meta: [{ title: "Materiais · GL Academy" }] }),
  component: Materiais,
});

function Materiais() {
  const [q, setQ] = useState("");
  const { data } = useQuery({
    queryKey: ["resources"],
    queryFn: async () => (await supabase.from("resources").select("*, lessons(title, modules(courses(title)))")).data ?? [],
  });

  const filtered = (data ?? []).filter((r) => r.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-6">
      <header>
        <h1 className="font-serif text-3xl text-ink">Materiais</h1>
        <p className="text-ink-3 mt-1">Todos os PDFs, resumos e recursos das tuas aulas.</p>
      </header>
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-3" />
        <Input placeholder="Pesquisar material..." value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
      </div>
      {filtered.length === 0 ? (
        <Card className="p-10 text-center">
          <FileText className="h-10 w-10 text-ink-3 mx-auto mb-3" />
          <p className="text-ink-3">Ainda não há materiais disponíveis.</p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-3">
          {filtered.map((r) => (
            <Card key={r.id} className="p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="h-5 w-5 text-teal shrink-0" />
                <div className="min-w-0">
                  <div className="font-medium text-ink truncate">{r.title}</div>
                  <div className="text-xs text-ink-3">{r.description}</div>
                </div>
              </div>
              <Button asChild size="sm" variant="outline">
                <a href={r.url} target="_blank" rel="noreferrer"><Download className="h-4 w-4" /></a>
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
