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

const SITE_URL = "https://ignite-ambition-learn.lovable.app";
const TITLE = "GL Academy — Explicações Premium de Física e Química A e Biologia e Geologia";
const DESC =
  "Explicações premium de Física e Química A e Biologia e Geologia para alunos do ensino secundário. Diagnóstico gratuito de 30 minutos, 100% online, com foco no exame nacional.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "GL Academy",
  url: SITE_URL,
  description: DESC,
  areaServed: "PT",
  founder: { "@type": "Person", name: "Gabriel L." },
  makesOffer: [
    {
      "@type": "Offer",
      name: "Turma de grupo reduzido",
      price: "100",
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "100",
        priceCurrency: "EUR",
        unitCode: "MON",
      },
      itemOffered: {
        "@type": "Service",
        name: "Acompanhamento em grupo · FQ e BioGeo",
        serviceType: "Explicações de Física e Química A e Biologia e Geologia",
      },
    },
    {
      "@type": "Offer",
      name: "Acompanhamento individual",
      price: "150",
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "150",
        priceCurrency: "EUR",
        unitCode: "MON",
      },
      itemOffered: {
        "@type": "Service",
        name: "Acompanhamento individual · FQ e BioGeo",
        serviceType: "Explicações individuais de Física e Química A e Biologia e Geologia",
      },
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
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
      <main id="main-content">
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
