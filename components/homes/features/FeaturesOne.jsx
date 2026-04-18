"use client";
import { useTranslation } from "../../../hooks/useLang";
import Image from "next/image";
import React from "react";
import { LanguageProvider } from "../../../hooks/useLang";

// COMPONENTE PRINCIPAL
export default function FeaturesOne() {
  const { t } = useTranslation();

  const translatedFeatures = [
    {
      id: 1,
      iconSrc: "/img/icons/1/ticket.svg",
      title: t("feature1_title"),
      text: t("feature1_text"),
    },
    {
      id: 2,
      iconSrc: "/img/icons/1/hot-air-balloon.svg",
      title: t("feature2_title"),
      text: t("feature2_text"),
    },
    {
      id: 3,
      iconSrc: "/img/icons/1/diamond.svg",
      title: t("feature3_title"),
      text: t("feature3_text"),
    },
    {
      id: 4,
      iconSrc: "/img/icons/1/medal.svg",
      title: t("feature4_title"),
      text: t("feature4_text"),
    },
  ];

  return (
    <section className="pt-[150px] pb-[100px]">
      <div className="container">
        <div className="row">
          <div className="col-auto">
            <h2 data-aos="fade-up" className="text-30 md:text-24">
              {t("why_choose_us")}
            </h2>
          </div>
        </div>

        <div
          data-aos="fade-up"
          className="row md:x-gap-20 pt-40 sm:pt-20 mobile-css-slider -w-280"
        >
          {translatedFeatures.map((elm, i) => (
            <div key={i} className="col-lg-3 col-sm-6">
              <div className="featureIcon -type-1 pr-40 md:pr-0">
                <div className="featureIcon__icon">
                  <Image width={60} height={60} src={elm.iconSrc} alt="icon" />
                </div>

                <h3 className="featureIcon__title text-18 fw-500 mt-20">
                  {elm.title}
                </h3>
                <p className="featureIcon__text mt-10">{elm.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// PROVIDER EMBAIXO - SIMPLES ASSIM PORRA!
export function FeaturesOneWithProvider() {
  return (
    <LanguageProvider>
      <FeaturesOne />
    </LanguageProvider>
  );
}
