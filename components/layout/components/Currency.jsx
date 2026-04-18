"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "../../../hooks/useLang";

const languages = [
  { code: "en", name: "English" },
  { code: "pt", name: "Português" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "it", name: "Italiano" },
];

export default function LanguageSelector({ parentClass }) {
  const { lang, setLang } = useTranslation();
  const [openDropdown, setOpenDropdown] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("Português");

  // REMOVI o estado isScrolled - sempre preto!
  const dropRef = useRef();

  // Sincronizar com a linguagem atual
  useEffect(() => {
    const currentLang = languages.find((l) => l.code === lang);
    if (currentLang) {
      setSelectedLanguage(currentLang.name);
    }
  }, [lang]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropRef.current && !dropRef.current.contains(event.target)) {
        setOpenDropdown("");
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // REMOVI o useEffect do scroll - não precisa mais!

  const handleLanguageChange = (langCode, langName) => {
    setLang(langCode);
    setSelectedLanguage(langName);
    setOpenDropdown("");
  };

  return (
    <div
      ref={dropRef}
      style={{ color: "black" }}
      className={`${parentClass ? parentClass : "headerDropdown js-form-dd"}`}
    >
      <div
        className="headerDropdown__button"
        onClick={() =>
          setOpenDropdown((prev) => (prev === "language" ? "" : "language"))
        }
        style={{ color: "black" }}
      >
        {selectedLanguage}
        <i className="icon-chevron-down text-18"></i>
      </div>

      <div
        className={`headerDropdown__content ${
          openDropdown === "language" ? "is-active" : ""
        }`}
      >
        <div className="headerDropdown">
          <div className="headerDropdown__container">
            {languages.map((langItem, i) => (
              <div
                key={i}
                className="headerDropdown__item"
                onClick={() =>
                  handleLanguageChange(langItem.code, langItem.name)
                }
              >
                <button style={{ color: "black" }}>{langItem.name}</button>{" "}
                {/* 👈 PRETO TAMBÉM */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
