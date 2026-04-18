"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "../../../hooks/useLang";
import Link from "next/link";

export default function Menu() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

  const isHomePage =
    pathname === "/" || pathname === "/pt" || pathname === "/en"; // ajuste conforme suas rotas

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Função para lidar com navegação/seleção de menu
  const handleMenuClick = (sectionClass) => {
    if (isHomePage) {
      // Se está na home, faz scroll suave
      scrollToSection(sectionClass);
    } else {
      // Se não está na home, navega para home com hash
      router.push(`/#${sectionClass}`);
    }
  };

  // Função para scroll suave até a seção (apenas na home)
  const scrollToSection = (sectionClass) => {
    const element = document.querySelector(`.${sectionClass}`);
    if (element) {
      const offsetTop =
        element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="xl:d-none ml-30" style={{ color: "black" }}>
        <div className="desktopNav">
          {/* HOME */}
          <div className="desktopNav__item">
            <Link
              href="/"
              className={pathname === "/" ? "activeMenu" : ""}
              style={{
                color: "black",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "inherit",
                fontFamily: "inherit",
                padding: "8px 16px",
                textDecoration: "none",
                display: "block",
              }}
            >
              {t("home")}
            </Link>
          </div>

          {/* TOURS */}
          <div className="desktopNav__item">
            <button
              onClick={() => handleMenuClick("tours-section")}
              style={{
                color: "black",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "inherit",
                fontFamily: "inherit",
                padding: "8px 16px",
              }}
            >
              {t("tours")}
            </button>
          </div>

          {/* DESTINATIONS */}
          <div className="desktopNav__item">
            <button
              onClick={() => handleMenuClick("destinations-section")}
              style={{
                color: "black",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "inherit",
                fontFamily: "inherit",
                padding: "8px 16px",
              }}
            >
              {t("destinations")}
            </button>
          </div>

          {/* <div className="desktopNav__item">
            <Link
              href="/contact"
              style={{
                color: "black",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "inherit",
                fontFamily: "inherit",
                padding: "8px 16px",
                textDecoration: "none",
                display: "block",
              }}
            >
              {t("contact")}
            </Link>
          </div> */}
        </div>
      </div>
    </>
  );
}
