"use client";
import React, { useState } from "react";
import { useTranslation } from "../../hooks/useLang";
import { LanguageProvider } from "../../hooks/useLang";

// Componente principal
function RoadMap2Content() {
  const { t } = useTranslation();
  const [activeRoadmap, setActiveRoadmap] = useState(2);

  // Dados traduzidos - AGORA GENÉRICOS
  const translatedRoadmapData = [
    {
      icon: "icon-pickup",
      title: t("roadmap_pickup"),
      content: t("roadmap_pickup_content"),
    },
    {
      icon: "icon-explore",
      title: t("roadmap_overview"),
      content: t("roadmap_overview_content"),
    },
    {
      icon: "icon-discovery",
      title: t("roadmap_exploration"),
      content: t("roadmap_exploration_content"),
    },
    {
      icon: "icon-monument",
      title: t("roadmap_culture"),
      content: t("roadmap_culture_content"),
    },
    {
      icon: "icon-viewpoint",
      title: t("roadmap_scenic"),
      content: t("roadmap_scenic_content"),
    },
    {
      icon: "icon-return",
      title: t("roadmap_return"),
      content: t("roadmap_return_content"),
    },
  ];

  return (
    <div className="roadmap roadMap2">
      {translatedRoadmapData.map((elm, i) => (
        <div key={i} className="roadmap__item">
          {elm.icon ? (
            <div
              className="roadmap__iconBig"
              onClick={() => setActiveRoadmap((pre) => (pre == i ? -1 : i))}
            >
              <i className={elm.icon}></i>
            </div>
          ) : (
            <div
              className="roadmap__icon"
              onClick={() => setActiveRoadmap((pre) => (pre == i ? -1 : i))}
            ></div>
          )}
          <div className="roadmap__wrap">
            <div
              className="roadmap__title "
              onClick={() => setActiveRoadmap((pre) => (pre == i ? -1 : i))}
            >
              {elm.title}
            </div>
            {elm.content && (
              <div
                className={`roadmap__content ${
                  activeRoadmap == i ? "active" : ""
                } `}
              >
                {elm.content}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Componente com Provider
export default function RoadMap2() {
  return (
    <LanguageProvider>
      <RoadMap2Content />
    </LanguageProvider>
  );
}
