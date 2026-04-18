"use client";
import Image from "next/image";
import { useTranslation } from "../../hooks/useLang";
import { LanguageProvider } from "../../hooks/useLang";

function BookingSidebarContent({
  bookingData,
  onCompleteOrder,
  isProcessing,
  bookingStage,
}) {
  const { t } = useTranslation();
  const isPaymentStage = bookingStage === 2;

  return (
    <div className="pl-50 md:pl-0">
      <div className="bg-white rounded-12 shadow-2 py-30 px-30 md:py-20 md:px-20">
        <h2 className="text-20 fw-500">{t("sidebar_booking_details")}</h2>

        <div className="d-flex mt-30">
          <Image
            width={90}
            height={84}
            src={bookingData.tourImage}
            alt="tour image"
          />
          <div className="ml-20">{bookingData.tourTitle}</div>
        </div>

        <div className="line mt-20 mb-20"></div>

        <div className="">
          <div className="d-flex items-center justify-between">
            <div className="fw-500">{t("sidebar_date")}</div>
            <div className="">{bookingData.date}</div>
          </div>

          <div className="d-flex items-center justify-between">
            <div className="fw-500">{t("sidebar_time")}</div>
            <div className="">{bookingData.time}</div>
          </div>

          <div className="d-flex items-center justify-between">
            <div className="fw-500">{t("sidebar_persons")}</div>
            <div className="">
              {bookingData.persons} x {bookingData.hours || 1} {t("hours")} x{" "}
              {t("currency_eur")} {bookingData.pricePerPerson} = {t("currency_eur")}{" "}
              {bookingData.totalPrice}
            </div>
          </div>
        </div>

        <div className="line mt-20 mb-20"></div>

        <div className="y-gap-15">
          <div className="d-flex justify-between">
            <div className="fw-500">
              {t("sidebar_service_per_person")} ({bookingData.persons}{" "}
              {t("sidebar_persons_count")} x {bookingData.hours || 1} {t("hours")})
            </div>
            <div className="">
              {t("currency_eur")} {bookingData.totalPrice}
            </div>
          </div>
        </div>

        <div className="line mt-20 mb-20"></div>

        <div className="">
          <div className="d-flex items-center justify-between">
            <div className="fw-500">{t("sidebar_total")}</div>
            <div className="">
              {t("currency_eur")} {bookingData.totalPrice}
            </div>
          </div>
        </div>
      </div>

      {isPaymentStage && (
        <div className="mt-30">
          <button
            className="button -md -dark-1 bg-accent-1 text-white col-12"
            onClick={onCompleteOrder}
            disabled={isProcessing}
          >
            {isProcessing
              ? t("sidebar_processing")
              : t("sidebar_complete_order")}
            <i className="icon-arrow-top-right text-16 ml-10"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default function BookingSidebar({
  bookingData,
  onCompleteOrder,
  isProcessing,
  bookingStage,
}) {
  return (
    <LanguageProvider>
      <BookingSidebarContent
        bookingData={bookingData}
        onCompleteOrder={onCompleteOrder}
        isProcessing={isProcessing}
        bookingStage={bookingStage}
      />
    </LanguageProvider>
  );
}
