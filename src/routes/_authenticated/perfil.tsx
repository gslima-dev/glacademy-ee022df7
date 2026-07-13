import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/perfil")({
  head: () => ({ meta: [{ title: "Perfil · GL Academy" }] }),
  component: PerfilPage,
});

function PerfilPage() {
  const { user } = Route.useRouteContext();
  const qc = useQueryClient();
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [password, setPassword] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["profile", user.id],
    queryFn: async () => (await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle()).data,
  });

  useEffect(() => {
    if (data) {
      setFullName(data.full_name ?? "");
      setAvatarUrl(data.avatar_url ?? "");
    }
  }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("profiles").upsert({ id: user.id, full_name: fullName, avatar_url: avatarUrl, email: user.email });
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Perfil atualizado"); qc.invalidateQueries({ queryKey: ["profile"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  const changePassword = async () => {
    if (password.length < 6) return toast.error("Mínimo 6 caracteres");
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return toast.error(error.message);
    setPassword("");
    toast.success("Password atualizada");
  };

  if (isLoading) return <div className="p-8 max-w-2xl mx-auto"><Skeleton className="h-96" /></div>;

  const initials = (fullName || user.email || "?").slice(0, 2).toUpperCase();

  return (
    <div className="p-6 lg:p-10 max-w-2xl mx-auto space-y-6">
      <header>
        <h1 className="font-serif text-3xl text-ink">Perfil</h1>
      </header>

      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-teal text-white font-serif">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-serif text-lg text-ink">{fullName || user.email}</div>
            <div className="text-sm text-ink-3">{user.email}</div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Nome completo</Label>
          <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="avatar">URL da fotografia</Label>
          <Input id="avatar" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://..." />
        </div>
        <Button onClick={() => save.mutate()} disabled={save.isPending}>Guardar</Button>
      </Card>

      <Card className="p-6 space-y-4">
        <h2 className="font-serif text-lg text-ink">Alterar password</h2>
        <div className="space-y-2">
          <Label htmlFor="pw">Nova password</Label>
          <Input id="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button variant="outline" onClick={changePassword}>Atualizar password</Button>
      </Card>
    </div>
  );
}
