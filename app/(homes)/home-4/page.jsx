import ArticlesOne from "@/components/homes/articles/ArticlesOne";
import BannerSeven from "@/components/homes/banners/BannerSeven";
import PopulerDestinations from "@/components/homes/destinations/PopulerDestinations";
import TrendingDestinationsTwo from "@/components/homes/destinations/TrendingDestinationsTwo";
import FeaturesOne from "@/components/homes/features/FeaturesOne";
import Hero7 from "@/components/homes/heros/Hero7";

import FeaturedToures from "@/components/homes/tours/FeaturedToures";
import FooterFour from "@/components/layout/footers/FooterFour";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header3 from "@/components/layout/header/Header3";
import FeaturedTouresWithProvider from "../../../hooks/FeaturedTouresWithProvider";
import React from "react";
import PopulerDestinationsTranslated from "@/hooks/PopulerDestinationsTranslated";

export const metadata = {
  title: "Tour de Tuk-Tuk em Lisboa | Explore a Cidade com Guia Local",
  description:
    "Descubra Lisboa de tuk-tuk! Tours personalizados com pickup em hotéis, navios ou pontos combinados. Explore bairros históricos, miradouros secretos e atrações imperdíveis com um guia local simpático.",
  keywords:
    "Lisboa, tour de tuk-tuk, passeio em Lisboa, guia local, city tour, bairros históricos, miradouros, passeio divertido, transporte turístico",
  author: "ViaTour",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function Page() {
  return (
    <>
      <main>
        <Header3 />

        {/* Hero Section - Adiciona ID */}
        <div id="hero-section" className="hero-section">
          <Hero7 />
        </div>

        {/* Tours Section - Adiciona ID */}
        <div id="tours-section" className="tours-section mt-6">
          <FeaturedTouresWithProvider />
        </div>

        {/* Destinations Section - Adiciona ID */}
        <div id="destinations-section" className="destinations-section">
          <PopulerDestinationsTranslated />
        </div>

        {/* Features Section - Adiciona ID */}
        <div id="features-section" className="features-section">
          <FeaturesOne />
        </div>

        <FooterTwo />
      </main>
    </>
  );
}
