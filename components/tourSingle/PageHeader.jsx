"use client";
import React from "react";
import { useTranslation } from "../../hooks/useLang";
import { LanguageProvider } from "../../hooks/useLang";

// Componente principal
function PageHeaderContent() {
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="row justify-between py-30 mt-80">
        <div className="col-auto">
          <div className="text-14">
            {/* {t("pageheader_home")} {">"} {t("pageheader_tours")} {">"} */}
          </div>
        </div>

        <div className="col-auto">
          {/* <div className="text-14">{t("pageheader_best_tours")}</div> */}
        </div>
      </div>
    </div>
  );
}

// Componente com Provider - EXPORTA ESSE!
export default function PageHeader() {
  return (
    <LanguageProvider>
      <PageHeaderContent />
    </LanguageProvider>
  );
}
