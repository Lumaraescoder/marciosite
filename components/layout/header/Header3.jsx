"use client";

import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Currency from "../components/Currency";
import MobileMenu from "../components/MobileMenu";
import Image from "next/image";
import Link from "next/link";

export default function Header3() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Detecta scroll para sticky
  const handleScroll = () => {
    if (window.scrollY >= 50) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`header -type-3 js-header ${isSticky ? "-is-sticky" : ""}`}
      >
        <div className="header__container container">
          {/* Mobile Menu Button */}
          <div className="headerMobile__left">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="header__menuBtn js-menu-button"
            >
              <i className="icon-main-menu"></i>
            </button>
          </div>

          {/* Logo e Menu */}
          <div className="header__logo">
            <Link href="/">
              <Image
                width={isSticky ? 70 : 88} // diminui ao scroll
                height={isSticky ? 25 : 32}
                src="/img/general/semfundo.png"
                alt="logo icon"
                priority
              />
            </Link>

            <Menu />
          </div>

          {/* Currency Desktop */}
          <div className="header__right">
            <Currency />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />

      {/* Estilos */}
      <style jsx>{`
        .header {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          /* padding: 10px 0; */
          background-color: transparent;
          transition: all 0.3s ease;
          z-index: 1000;
        }

        .header.-is-sticky {
          position: fixed;
          top: 0;
          background-color: white;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          /* padding: 10px 0; */
        }

        .header__container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .headerMobile__left {
          display: none;
        }

        @media (max-width: 768px) {
          .header__container {
            justify-content: center;
            position: relative;
          }

          .headerMobile__left {
            display: block;
            position: absolute;
            left: 10px;
            z-index: 10;
          }

          .header__logo {
            display: flex;
            justify-content: center;
            flex: 1;
          }

          .header__right {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
