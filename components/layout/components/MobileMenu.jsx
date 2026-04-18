"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

export default function MobileMenu({ mobileMenuOpen, setMobileMenuOpen }) {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage =
    pathname === "/" || pathname === "/pt" || pathname === "/en";

  // Função para lidar com navegação/seleção de menu
  const handleMenuClick = (sectionClass) => {
    if (isHomePage) {
      // Se está na home, faz scroll suave
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
      // Se não está na home, navega para home com hash
      router.push(`/#${sectionClass}`);
    }
    setMobileMenuOpen(false);
  };

  return (
    <div
      data-aos="fade"
      data-aos-delay=""
      className={`menu js-menu ${mobileMenuOpen ? "-is-active" : ""} `}
      style={
        mobileMenuOpen
          ? { opacity: "1", visibility: "visible" }
          : { pointerEvents: "none", visibility: "hidden" }
      }
    >
      <div
        onClick={() => setMobileMenuOpen(false)}
        className="menu__overlay js-menu-button"
      ></div>

      <div className="menu__container">
        <div className="menu__header">
          <h4>Main Menu</h4>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="js-menu-button"
          >
            <i className="icon-cross text-10"></i>
          </button>
        </div>

        <div className="menu__content">
          <ul
            className="menuNav js-navList -is-active"
            style={{ maxHeight: "calc(100vh - 262px)", overflowY: "auto" }}
          >
            {/* HOME */}
            <li className="menuNav__item">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "8px 16px",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                Home
              </Link>
            </li>

            {/* TOURS */}
            <li className="menuNav__item">
              <button
                onClick={() => handleMenuClick("tours-section")}
                style={{
                  color: "inherit",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "inherit",
                  fontFamily: "inherit",
                  padding: "8px 16px",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                Tours
              </button>
            </li>

            {/* DESTINATIONS */}
            <li className="menuNav__item">
              <button
                onClick={() => handleMenuClick("destinations-section")}
                style={{
                  color: "inherit",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "inherit",
                  fontFamily: "inherit",
                  padding: "8px 16px",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                Destinations
              </button>
            </li>

            {/* CONTACT */}
            <li className="menuNav__item">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "8px 16px",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="menu__footer">
          <i className="icon-headphone text-50"></i>

          <div className="text-20 lh-12 fw-500 mt-20">
            <div>Book a tour By phone </div>
            <div className="text-accent-1">+351 928346074</div>
          </div>
        </div>
      </div>
    </div>
  );
}
