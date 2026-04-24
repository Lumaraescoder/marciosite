"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "../../../hooks/useLang";

export default function Hero7() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      setWindowWidth(window.innerWidth);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Função para calcular valores responsivos
  const getResponsiveStyles = () => {
    if (windowWidth < 768) {
      // Mobile
      return {
        marginTop: "100px",
        top: "280px",
        width: "200px", // Menor no mobile
        fontSize: "14px",
        padding: "10px 20px",
      };
    } else if (windowWidth < 1024) {
      // Tablet
      return {
        marginTop: "180px",
        top: "90px",
        width: "220px",
        fontSize: "16px",
        padding: "12px 24px",
      };
    } else if (windowWidth < 1440) {
      // Desktop médio
      return {
        marginTop: "220px",
        top: "150px",
        width: "240px",
        fontSize: "18px",
        padding: "14px 28px",
      };
    } else {
      // Desktop grande
      return {
        marginTop: "250px",
        top: "220px",
        width: "250px",
        fontSize: "20px",
        padding: "16px 32px",
      };
    }
  };

  const responsiveStyles = getResponsiveStyles();

  // Função para rolar até a seção de tours
  const scrollToToursSection = () => {
    const toursSection = document.getElementById("tours-section");
    if (toursSection) {
      // Suave scroll para a seção de tours
      toursSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      // Fallback: scroll para o topo se a seção não for encontrada
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="hero -type-7 min-h-screen relative">
      {/* Overlay transparente */}
      <div className="hero__shape absolute inset-0 bg-transparent z-10"></div>

      {/* Background */}
      <div className="hero__bg h-screen w-full relative z-0">
        {!isMobile && (
          <Image
            width={1920}
            height={960}
            src="/img/hero/7/marciofoto.jpeg"
            alt="background"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 60%" }}
          />
        )}
        {isMobile && (
          <Image
            width={768}
            height={1024}
            src="/img/hero/7/marciofoto.jpeg"
            alt="background mobile"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Conteúdo */}
      <div className="container h-full flex items-center relative z-20">
        <div className="row justify-center">
          <div className="col-lg-8 col-md-10">
            <div className="hero__content text-center">
              {/* SUBTITLE - quase invisível */}
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="sr-only-visually-hidden"
                style={{ fontSize: "0.1px", color: "transparent" }}
                aria-label={t("heroSubtitle")}
              >
                {t("heroSubtitle")}
              </div>

              {/* TITLE (H1) - quase invisível */}
              <h1
                data-aos="fade-up"
                data-aos-delay="300"
                className="text-8xl md:text-9xl lg:text-[15rem] xl:text-[18rem] 2xl:text-[20rem] fw-700 text-white text-center mt-50 -tracking-wide drop-shadow-2xl  mt-5 leading-none"
                style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
              >
                Sightseeing tours by tuk tuk <br /> by
                <br /> Kika Santos
                <br />
                &
                <br />
                Marcio Nascimento
                <br />
              </h1>

              {/* Botão Book Now - TOTALMENTE RESPONSIVO */}
              <div
                style={{
                  marginTop: responsiveStyles.marginTop,
                  position: "relative",
                  top: responsiveStyles.top,
                  width: responsiveStyles.width,
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderRadius: "12px",
                  padding: "0",
                }}
                className="flex justify-center"
              >
                {/* <button
                  style={{
                    background: "linear-gradient(to right, #f97316, #ea580c)",
                    color: "white",
                    fontWeight: "bold",
                    padding: responsiveStyles.padding,
                    borderRadius: "9999px",
                    boxShadow:
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    transition: "all 0.3s ease",
                    width: "100%",
                    fontSize: responsiveStyles.fontSize,
                    letterSpacing: "0.025em",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background =
                      "linear-gradient(to right, #ea580c, #c2410c)";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background =
                      "linear-gradient(to right, #f97316, #ea580c)";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
                  }}
                  onFocus={(e) => {
                    e.target.style.outline = "none";
                    e.target.style.boxShadow =
                      "0 0 0 4px rgba(249, 115, 22, 0.5)";
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow =
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
                  }}
                  onClick={scrollToToursSection}
                  aria-label="Book Now - Ir para seção de Tours"
                >
                  BOOK NOW
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
