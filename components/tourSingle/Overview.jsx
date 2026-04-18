"use client";
import React from "react";
import { useTranslation } from "../../hooks/useLang";
import { LanguageProvider } from "../../hooks/useLang";

// Componente principal
function OverviewContent({ data }) {
  const { t } = useTranslation();

  if (!data) return null;

  return (
    <>
      <h2 className="text-30">{t("tour_overview")}</h2>
      <p className="mt-20">{data.description}</p>

      {/* {data.highlights && data.highlights.length > 0 && (
        <>
          <h3 className="text-20 fw-500 mt-20">{t("tour_highlights")}</h3>
          <ul className="ulList mt-20">
            {data.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </>
      )} */}
    </>
  );
}

// Componente com Provider
export default function Overview({ data }) {
  return (
    <LanguageProvider>
      <OverviewContent data={data} />
    </LanguageProvider>
  );
}
