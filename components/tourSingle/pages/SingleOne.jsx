"use client";
import React from "react";
import MainInformation from "../MainInformation";
import OthersInformation from "../OthersInformation";
import Overview from "../Overview";
import Included from "../Included";
import Faq from "../Faq";
import TourSingleSidebar from "../TourSingleSidebar";
import Gallery1 from "../Galleries/Gallery1";
import RoadMap2 from "../Roadmap2";
import { useTranslatedTours } from "../../../hooks/usetranslatedtours";
import { useTranslation } from "../../../hooks/useLang";

export default function SingleOne({ tour }) {
  const translatedTours = useTranslatedTours(); // Pega TODOS os tours traduzidos
  const { t } = useTranslation();

  // Encontra o tour TRADUZIDO pelo mesmo ID
  const translatedTour = translatedTours.find((t) => t.id === tour.id);

  // Usa o tour traduzido se existir, senão usa o original
  const currentTour = translatedTour || tour;

  return (
    <>
      {/* Main Section */}
      <section className="">
        <div className="container">
          <MainInformation tour={currentTour} /> {/* Passa o tour TRADUZIDO */}
          {/* Gallery específica do tour */}
          {currentTour.gallery && <Gallery1 images={currentTour.gallery} />}
        </div>
      </section>

      {/* Details Section */}
      <section className="layout-pt-md js-pin-container">
        <div className="container">
          <div className="row y-gap-30 justify-between">
            <div className="col-lg-8">
              {/* Other Information */}
              <div className="row y-gap-20 justify-between items-center layout-pb-md">
                <OthersInformation tour={currentTour} />
              </div>

              {/* Overview - Agora recebe dados TRADUZIDOS */}
              {currentTour.overview && <Overview data={currentTour.overview} />}

              <div className="line mt-60 mb-60"></div>

              {/* What's included */}
              <h2 className="text-30">{t("whats_included")}</h2>
              <Included />

              <div className="line mt-60 mb-60"></div>

              {/* Itinerary / Roadmap */}
              <h2 className="text-30">{t("itinerary")}</h2>
              <RoadMap2 />

              <h2 className="text-30">{t("faq")}</h2>
              <div className="accordion -simple row y-gap-20 mt-30 js-accordion">
                <Faq />
              </div>
            </div>

            <div className="col-lg-4">
              <div className="d-flex justify-end js-pin-content">
                <TourSingleSidebar tour={currentTour} />{" "}
                {/* Passa o tour TRADUZIDO */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
