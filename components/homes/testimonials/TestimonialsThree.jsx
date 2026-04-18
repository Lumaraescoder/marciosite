"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "../../../hooks/useLang";
import { LanguageProvider } from "../../../hooks/useLang";

// Importar CSS do Swiper
import "swiper/css";
import "swiper/css/pagination";

export default function TestimonialsThree() {
  const { t } = useTranslation();
  const swiperRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0); // Set the initial slide to index 0
    }
  }, []);

  const handlePaginationClick = (index) => {
    setCurrentSlideIndex(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const handleSlideChange = (swiper) => {
    setCurrentSlideIndex(swiper.activeIndex);

    if (swiper.activeIndex >= 5) {
      setCurrentSlideIndex(swiper.activeIndex - 5);
    }
  };

  const translatedTestimonials = [
    {
      id: 1,
      imgSrc: "/img/tourSingle/1/bruna.png",
      name: t("testimonial1_name"),
      role: t("testimonial1_role"),
      comment: t("testimonial1_comment"),
    },
    {
      id: 2,
      imgSrc: "/img/tourSingle/1/vasco.png",
      name: t("testimonial2_name"),
      role: t("testimonial2_role"),
      comment: t("testimonial2_comment"),
    },
    {
      id: 3,
      imgSrc: "/img/tourSingle/1/pina.png",
      name: t("testimonial3_name"),
      role: t("testimonial3_role"),
      comment: t("testimonial3_comment"),
    },
    {
      id: 4,
      imgSrc: "/img/tourSingle/1/maria.png",
      name: t("testimonial4_name"),
      role: t("testimonial4_role"),
      comment: t("testimonial4_comment"),
    },
    {
      id: 5,
      imgSrc: "/img/tourSingle/1/roberto.png",
      name: t("testimonial5_name"),
      role: t("testimonial5_role"),
      comment: t("testimonial5_comment"),
    },
  ];

  return (
    <section className="layout-pt-xl layout-pb-xl bg-light-3">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <h2 data-aos="fade-up" className="text-30">
              {t("testimonials_title")}
            </h2>
          </div>
        </div>

        <div className="row justify-center pt-30 md:pt-30">
          <div className="col-lg-8 col-md-9">
            <div className="overflow-hidden js-testimonialsSlider_1">
              <div data-aos="fade-up" className="swiper-wrapper">
                <Swiper
                  spaceBetween={30}
                  className="w-100"
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper; // Store the Swiper instance in the ref
                  }}
                  onSlideChange={handleSlideChange}
                  modules={[Pagination, Autoplay]}
                  autoplay={{
                    delay: 5000, // Muda a cada 5 segundos
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true, // Pausa quando o mouse está sobre
                  }}
                  loop={true}
                  breakpoints={{
                    500: { slidesPerView: 1 },
                    768: { slidesPerView: 1 },
                    1024: { slidesPerView: 1 },
                    1200: { slidesPerView: 1 },
                  }}
                >
                  {translatedTestimonials.map((elm, i) => (
                    <SwiperSlide key={i}>
                      <div className="testimonials -type-2 text-center">
                        {/* 5 Estrelinhas do Google */}
                        <div className="testimonials__stars flex justify-center">
                          {[...Array(5)].map((_, index) => (
                            <svg
                              key={index}
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="#FFB400"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.174L12 18.897l-7.336 3.854 1.402-8.174L.132 9.21l8.2-1.192L12 .587z" />
                            </svg>
                          ))}
                        </div>

                        <div className="text-20 lh-18 md:text-18 fw-500 mt-20">
                          {elm.comment}
                        </div>

                        <div className="mt-20">
                          <div className="text-16 fw-500 lh-14">{elm.name}</div>
                          <div className="lh-14">{elm.role}</div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div
              data-aos="fade-left"
              className="testimonialsPagination -type-2 pt-30 testimonialsSlider_2-pagination js-testimonialsSlider_1-pagination"
            >
              {translatedTestimonials.map((elm, i) => (
                <div
                  onClick={() => handlePaginationClick(i)}
                  key={i}
                  className={`testimonialsPagination__item ${
                    currentSlideIndex === i ? "is-active" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  <div>
                    <Image
                      width={70}
                      height={71}
                      src={elm.imgSrc}
                      style={{ height: "auto" }}
                      alt="person"
                    />
                  </div>
                </div>
              ))}

              <a
                href="https://share.google/5JqlxJ0aRYGrpmaaa"
                className="d-flex text-15 fw-500 text-accent-2 mt-15"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("see_google_reviews")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsThreeWithProvider() {
  return (
    <LanguageProvider>
      <TestimonialsThree />
    </LanguageProvider>
  );
}
