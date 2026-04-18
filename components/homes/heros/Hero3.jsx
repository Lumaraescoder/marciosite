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

  // Verifica se estamos na página inicial
  const isHomePage =
    pathname === "/" ||
    pathname === "/pt" ||
    pathname === "/en" ||
    pathname.startsWith("/home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Função para lidar com a navegação
  const handleNavigation = (sectionClass) => {
    if (isHomePage) {
      // Na home: scroll suave
      const element = document.querySelector(`.${sectionClass}`);
      if (element) {
        const offsetTop =
          element.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    } else {
      // Em outras páginas: navegar para a home com hash
      // Você pode mapear as classes para hashes ou IDs
      const sectionMap = {
        "hero-section": "hero",
        "tours-section": "tours",
        "destinations-section": "destinations",
        "testimonials-section": "testimonials",
      };

      const hash =
        sectionMap[sectionClass] || sectionClass.replace("-section", "");
      router.push(`/#${hash}`);
    }
  };

  return (
    <div className="xl:d-none ml-30" style={{ color: "black" }}>
      <div className="desktopNav">
        {/* HOME */}
        <div className="desktopNav__item">
          {isHomePage ? (
            <button
              onClick={() => handleNavigation("hero-section")}
              className={
                pathname?.split("/")[1]?.split("-")[0] === "home"
                  ? "activeMenu"
                  : ""
              }
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
              {t("home")}
            </button>
          ) : (
            <Link
              href="/"
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
          )}
        </div>

        {/* TOURS */}
        <div className="desktopNav__item">
          {isHomePage ? (
            <button
              onClick={() => handleNavigation("tours-section")}
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
          ) : (
            <Link
              href="/#tours"
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
              {t("tours")}
            </Link>
          )}
        </div>

        {/* DESTINATIONS */}
        <div className="desktopNav__item">
          {isHomePage ? (
            <button
              onClick={() => handleNavigation("destinations-section")}
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
          ) : (
            <Link
              href="/#destinations"
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
              {t("destinations")}
            </Link>
          )}
        </div>

        {/* TESTIMONIALS */}
        <div className="desktopNav__item">
          {isHomePage ? (
            <button
              onClick={() => handleNavigation("testimonials-section")}
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
              {t("testimonials")}
            </button>
          ) : (
            <Link
              href="/#testimonials"
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
              {t("testimonials")}
            </Link>
          )}
        </div>

        {/* CONTACT - Este já está correto */}
        <div className="desktopNav__item">
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
        </div>
      </div>
    </div>
  );
}
