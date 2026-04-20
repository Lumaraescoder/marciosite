"use client";
import React, { useState } from "react"; // 👈 Adicionei useState
import Paymentcards from "../components/Paymentcards";
import Socials from "../components/Socials";
import Image from "next/image";
import { useTranslation } from "../../../hooks/useLang";
import { LanguageProvider } from "../../../hooks/useLang";
import Link from "next/link";

// Componente principal
function FooterTwoContent() {
  const { t } = useTranslation();
  const [email, setEmail] = useState(""); // 👈 Estado pro email
  const [message, setMessage] = useState(""); // 👈 Estado pra mensagem

  // Função para scroll suave (igual ao navbar)
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

  // Função pro newsletter
  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      setMessage("Obrigado por subscrever! 🎉"); // 👈 Mensagem zinha
      setEmail("");
      // Limpa a mensagem depois de 3 segundos
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <footer className="footer -type-1 -dark bg-dark-1 text-white">
      <div className="footer__main">
        <div className="footer__bg">
          <Image
            width="1800"
            height="627"
            src="/img/footer/1/bg.svg"
            alt="image"
          />
        </div>

        <div className="container">
          <div className="footer__info">
            <div className="row y-gap-20 justify-between">
              <div className="col-auto">
                <div className="row y-gap-20 items-center">
                  {/* <div className="col-auto">
                    <i className="icon-headphone text-50"></i>
                  </div> */}

                  <div className="col-auto">
                    <div className="text-20 fw-500">
                      {t("footer_book_by_call")}
                      <span className="text-accent-1 ml-10">
                        +351 933 653 296
                      </span>
                    </div>
                  </div>
                </div>

                {/* <div className="col-auto">
                  <div className="footerSocials">
                    <div className="footerSocials__title">Follow Us</div>

                    <div className="footerSocials__icons">
                      <Socials />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="footer__content">
            <div className="row y-gap-40 justify-between">
              {/* Links do Footer alinhados com o Navbar */}
              <div className="col-lg-auto col-6">
                <h4 className="text-20 fw-500">Navigation</h4>
                <div className="y-gap-10 mt-20 d-flex flex-column">
                  <button
                    onClick={() => scrollToSection("hero-section")}
                    style={{
                      color: "white",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      padding: "5px 0",
                    }}
                  >
                    {t("home")}
                  </button>
                  <button
                    onClick={() => scrollToSection("tours-section")}
                    style={{
                      color: "white",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      padding: "5px 0",
                    }}
                  >
                    {t("tours")}
                  </button>
                  <button
                    onClick={() => scrollToSection("destinations-section")}
                    style={{
                      color: "white",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      padding: "5px 0",
                    }}
                  >
                    {t("destinations")}
                  </button>

                  <Link
                    href="/contact"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      padding: "5px 0",
                      display: "block",
                    }}
                  >
                    {t("contact")}
                  </Link>
                </div>
              </div>

              {/* Company em inglês - sem traduções */}
              <div className="col-lg-auto col-6"></div>

              {/* Newsletter mantido */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Componente com Provider
export default function FooterTwo() {
  return (
    <LanguageProvider>
      <FooterTwoContent />
    </LanguageProvider>
  );
}
