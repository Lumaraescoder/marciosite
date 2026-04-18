"use client";
import React from "react";
import { useTranslation } from "../../hooks/useLang";
import { LanguageProvider } from "../../hooks/useLang";

// Componente principal
function IncludedContent() {
  const { t } = useTranslation();

  const translatedIncluded = [
    { text: t("included_guided_tour") },
    { text: t("included_local_guide") },
    { text: t("included_insurance") },
    { text: t("included_photos") },
    { text: t("included_stories") },
    { text: t("included_hotel_pickup") },
  ];

  const translatedExcluded = [
    { text: t("excluded_food_drinks") },
    { text: t("excluded_gratuities") },
    { text: t("excluded_entrance_fees") },
    { text: t("excluded_personal_expenses") },
  ];

  return (
    <div className="row x-gap-130 y-gap-20 pt-20">
      <div className="col-lg-6">
        <div className="y-gap-15">
          {translatedIncluded.map((elm, i) => (
            <div key={i} className="d-flex">
              <i className="icon-check flex-center text-10 size-24 rounded-full text-green-2 bg-green-1 mr-15"></i>
              {elm.text}
            </div>
          ))}
        </div>
      </div>

      <div className="col-lg-6">
        <div className="y-gap-15">
          {translatedExcluded.map((elm, i) => (
            <div key={i} className="d-flex">
              <i className="icon-cross flex-center text-10 size-24 rounded-full text-red-3 bg-red-4 mr-15"></i>
              {elm.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Componente com Provider
export default function Included() {
  return (
    <LanguageProvider>
      <IncludedContent />
    </LanguageProvider>
  );
}
