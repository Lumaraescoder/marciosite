import Stars from "@/components/common/Stars";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslatedTours } from "../../../hooks/toursTranslated";
import { useTranslation } from "../../../hooks/useLang";

export default function FeaturedToures() {
  const { t } = useTranslation();
  const translatedTours = useTranslatedTours();
  const pricePerPerson = 30;

  return (
    <section className="layout-pt-xl layout-pb-xl bg-accent-1-05">
      <div className="container">
        <div className="row justify-between items-end y-gap-10">
          <div className="col-auto">
            <h2 className="text-30 md:text-24">{t("featuredTrips")}</h2>
          </div>
        </div>

        <div className="row y-gap-30 justify-between pt-40 sm:pt-20 mobile-css-slider -w-300">
          {translatedTours.map((elm, i) => {
            const isFixedPriceTour = [7, 8].includes(elm.id);
            const displayPrice = isFixedPriceTour ? elm.price : pricePerPerson;
            return (
            <div key={i} className="col-lg-3 col-md-6">
              <Link
                href={`/tour-single-1/${elm.slug}`}
                className="tourCard -type-1 d-block border-1 bg-white hover-shadow-1 overflow-hidden rounded-12  -hover-shadow"
              >
                <div className="tourCard__header">
                  <div className="tourCard__image ratio ratio-28:20">
                    <Image
                      width={421}
                      height={301}
                      src={elm.imageSrc}
                      alt={elm.imageAlt || elm.title}
                      className="img-ratio"
                    />
                  </div>
                  <button className="tourCard__favorite">
                    <i className="icon-heart"></i>
                  </button>
                </div>

                <div className="tourCard__content px-20 py-10">
                  <div className="tourCard__location d-flex items-center text-13 text-light-2">
                    <i className="icon-pin d-flex text-16 text-light-2 mr-5"></i>
                    {elm.location}
                  </div>

                  <h3 className="tourCard__title text-16 fw-500 mt-5">
                    <span>{elm.title}</span>
                  </h3>

                  <div className="tourCard__rating text-13 mt-5">
                    <div className="d-flex items-center">
                      <div className="d-flex x-gap-5">
                        <Stars star={elm.rating} />
                      </div>
                      <span className="text-dark-1 ml-10">
                        {elm.rating} ({elm.ratingCount})
                      </span>
                    </div>
                  </div>

                  <div className="d-flex justify-between items-center border-1-top text-13 text-dark-1 pt-10 mt-10">
                    <div className="d-flex items-center">
                      <i className="icon-clock text-16 mr-5"></i>
                      {elm.duration}
                    </div>
                    <div>
                      {isFixedPriceTour ? t("fixed_price") : t("from")} 
                      <span className="text-16 fw-500">€{displayPrice}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
