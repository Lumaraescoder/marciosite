"use client";
import React from "react";
import { useTranslation } from "../../hooks/useLang";
import { LanguageProvider } from "../../hooks/useLang";

// Componente principal
function OthersInformationContent({ tour }) {
  const { t } = useTranslation();
  const groupSizeValue = tour?.groupSize || t("others_group_size_value");

  return (
    <>
      <div className="col-lg-3 col-6">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-clock"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">{t("others_duration")}</div>
            <div className="text-14 text-light-2 lh-16">
              {t("others_duration_value")}
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-6">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-teamwork"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">{t("others_group_size")}</div>
            <div className="text-14 text-light-2 lh-16">
              {groupSizeValue}
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-6">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-translate"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">{t("others_languages")}</div>
            <div className="text-14 text-light-2 lh-16">
              {t("others_languages_value")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Componente com Provider - EXPORTA ESSE!
export default function OthersInformation({ tour }) {
  return (
    <LanguageProvider>
      <OthersInformationContent tour={tour} />
    </LanguageProvider>
  );
}
