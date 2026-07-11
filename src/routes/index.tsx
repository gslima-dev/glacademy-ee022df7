import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/landing/TopBar";
import { Navbar } from "@/components/landing/Navbar";
import { Strip } from "@/components/landing/Strip";
import { Hero } from "@/components/landing/Hero";
import { Problema } from "@/components/landing/Problema";
import { NovoOlhar } from "@/components/landing/NovoOlhar";
import { Metodo } from "@/components/landing/Metodo";
import { ComoFunciona } from "@/components/landing/ComoFunciona";
import { Beneficios } from "@/components/landing/Beneficios";
import { Resultados } from "@/components/landing/Resultados";
import { Sobre } from "@/components/landing/Sobre";
import { Oferta } from "@/components/landing/Oferta";
import { InscricaoForm } from "@/components/landing/InscricaoForm";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { MobileSticky } from "@/components/landing/MobileSticky";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GL Academy — Acompanhamento Premium FQ e BioGeo" },
      { name: "description", content: "Acompanhamento académico premium em Física e Química A e Biologia e Geologia para alunos do ensino secundário. Sessão de diagnóstico gratuita e online." },
      { property: "og:title", content: "GL Academy — Acompanhamento Premium FQ e BioGeo" },
      { property: "og:description", content: "Sessão de diagnóstico gratuito para alunos do 10.º ao 12.º ano." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <TopBar />
      <Navbar />
      <Strip />
      <main>
        <Hero />
        <Problema />
        <NovoOlhar />
        <Metodo />
        <ComoFunciona />
        <Beneficios />
        <Resultados />
        <Sobre />
        <Oferta />
        <InscricaoForm />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileSticky />
    </>
  );
}
