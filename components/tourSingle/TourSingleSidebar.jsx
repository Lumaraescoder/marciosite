"use client";
import React, { useEffect, useState, useRef } from "react";
import Calender from "../common/dropdownSearch/Calender";
import Image from "next/image";
import { times } from "@/data/tourSingleContent";
import Link from "next/link";
import { useTranslation } from "../../hooks/useLang";
import { LanguageProvider } from "../../hooks/useLang";

// Componente principal
function TourSingleSidebarContent({ tour }) {
  const { t, lang } = useTranslation();

  const isFixedPriceTour = [7, 8].includes(tour?.id);
  const fixedPrice = tour?.price || 0;

  // Preço base exibido na UI (não usado para cálculo real)
  const pricePerPerson = 30;

  // Função reutilizável para cálculo de preço
  function calculatePrice(persons, hours) {
    const factors = {
      1: 0.93,
      2: 0.83,
      3: 0.73,
      4: 0.63,
      5: 0.56,
      6: 0.5,
      7: 0.46,
    };
    const base = persons * hours * 30;
    const factor = factors[hours] || factors[7];
    let adjusted = base * factor;
    if (persons === 1) {
      adjusted *= 1.2;
    }
    return Math.round(adjusted);
  }

  const MIN_PERSONS = 2;
  const MAX_PERSONS = 50;
  const MIN_HOURS = 1;
  const PERSONS_PER_TUK = 5;

  const [persons, setPersons] = useState(MIN_PERSONS);
  const [hours, setHours] = useState(MIN_HOURS);
  const [tukCount, setTukCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [activeTimeDD, setActiveTimeDD] = useState(false);
  const [activeCalendarDD, setActiveCalendarDD] = useState(false);

  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReserveByPhoneModal, setShowReserveByPhoneModal] = useState(false);

  const calendarRef = useRef(null);

  // Preço TOTAL com lógica de fatores (não linear)
  const totalPrice = isFixedPriceTour
    ? fixedPrice.toFixed(2)
    : calculatePrice(persons, hours).toString();

  // Preço por pessoa ajustado (real)
  const adjustedPricePerPerson = isFixedPriceTour
    ? fixedPrice.toFixed(2)
    : Math.round(Number(totalPrice) / persons).toString();
  const minTuks = Math.ceil(persons / PERSONS_PER_TUK);
  const tukRequirementText = t("sidebar_tuks_note")
    .replace("{minTuks}", minTuks)
    .replace("{persons}", persons)
    .replace("{maxPerTuk}", PERSONS_PER_TUK);

  useEffect(() => {
    if (isFixedPriceTour) {
      if (tukCount !== 1) setTukCount(1);
      return;
    }
    if (tukCount < minTuks) {
      setTukCount(minTuks);
    }
  }, [persons, minTuks, tukCount, isFixedPriceTour]);

  // Máximo de pessoas

  const handleBookNowClick = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentChoice = (paymentMethod) => {
    setShowPaymentModal(false);

    if (paymentMethod === "cash") {
      setShowReserveByPhoneModal(true);
    } else {
      // Para pagamento pela plataforma, mostra os campos de dados primeiro
      setShowBookingDetails(true);
    }
  };

  const handlePlatformPayment = () => {
    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!selectedDate || !selectedTime) {
      alert(t("please_select_date_time"));
      return;
    }

    // Prepara os dados para enviar para a página de booking
    const bookingData = {
      persons: persons.toString(),
      hours: hours.toString(),
      tuks: tukCount.toString(),
      date: selectedDate,
      time: selectedTime,
      pricePerPerson: adjustedPricePerPerson,
      totalPrice: totalPrice,
      tourTitle: tour?.title || "Tour",
      tourImage: tour?.imageSrc || "/img/tourSingle/booking/1.png",
    };

    // Redireciona para a página de booking com os dados
    const queryString = new URLSearchParams(bookingData).toString();
    window.location.href = `/booking-pages?${queryString}`;
  };

  // Função para gerar mensagem personalizada do WhatsApp
  const getWhatsAppMessage = () => {
    const tourTitle = tour?.title || "Tour";
    const whatsappMessages = {
      pt: `Ola! Gostaria de reservar o ${tourTitle}. Data: ${
        selectedDate || "a definir"
      }, Horario: ${
        selectedTime || "a definir"
      }. Poderia me ajudar com a reserva?`,
      en: `Hello! I would like to book the ${tourTitle}. Date: ${
        selectedDate || "to be defined"
      }, Time: ${
        selectedTime || "to be defined"
      }. Could you help me with the booking?`,
      es: `Hola! Me gustaria reservar el ${tourTitle}. Fecha: ${
        selectedDate || "por definir"
      }, Hora: ${
        selectedTime || "por definir"
      }. Podria ayudarme con la reserva?`,
      fr: `Bonjour! Je voudrais reserver le ${tourTitle}. Date: ${
        selectedDate || "a definir"
      }, Heure: ${
        selectedTime || "a definir"
      }. Pourriez-vous m'aider avec la reservation?`,
      de: `Hallo! Ich mochte die ${tourTitle} buchen. Datum: ${
        selectedDate || "noch festzulegen"
      }, Uhrzeit: ${
        selectedTime || "noch festzulegen"
      }. Konnten Sie mir bei der Buchung helfen?`,
      it: `Ciao! Vorrei prenotare il ${tourTitle}. Data: ${
        selectedDate || "da definire"
      }, Orario: ${
        selectedTime || "da definire"
      }. Potrebbe aiutarmi con la prenotazione?`,
    };

    const message = whatsappMessages[lang] || whatsappMessages.en;
    return encodeURIComponent(message);
  };

  const whatsappNumber = "+351928346074";
  const phoneNumber = "+351928346074";

  // Função para lidar com a seleção de data
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setActiveCalendarDD(false);
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setActiveCalendarDD(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="tourSingleSidebar">
        <div className="d-flex items-center">
          <div>{isFixedPriceTour ? t("fixed_price") : t("sidebar_from")}</div>
          <div className="text-20 fw-500 ml-10">
            {t("currency_eur")} {isFixedPriceTour ? fixedPrice : pricePerPerson}
          </div>
          {!isFixedPriceTour && (
            <div className="text-14 text-light-2 ml-10">
              {t("sidebar_per_person_per_hour")}
            </div>
          )}
        </div>

        {showBookingDetails && (
          <>
            <div className="searchForm -type-1 -sidebar mt-20">
              <div className="searchForm__form">
                <div className="searchFormItem js-select-control js-form-dd js-calendar">
                  <div
                    className="searchFormItem__button"
                    onClick={() => setActiveCalendarDD((prev) => !prev)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="searchFormItem__icon size-50 rounded-12 bg-light-1 flex-center">
                      <i className="text-20 icon-calendar"></i>
                    </div>
                    <div className="searchFormItem__content">
                      <h5>{t("sidebar_from_date")}</h5>
                      <div>
                        <span className="js-first-date">
                          {selectedDate || t("sidebar_choose_date")}
                        </span>
                      </div>
                    </div>
                    <div className="searchFormItem__icon_chevron">
                      <i className="icon-chevron-down d-flex text-18"></i>
                    </div>
                  </div>

                  {activeCalendarDD && (
                    <div
                      className="searchFormItemDropdown -tour-type is-active"
                      ref={calendarRef}
                    >
                      <div className="searchFormItemDropdown__container">
                        <div className="p-3">
                          <Calender onDateSelect={handleDateSelect} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="searchFormItem js-select-control js-form-dd">
                  <div
                    className="searchFormItem__button"
                    onClick={() => setActiveTimeDD((prev) => !prev)}
                  >
                    <div className="searchFormItem__icon size-50 rounded-12 bg-light-1 flex-center">
                      <i className="text-20 icon-clock"></i>
                    </div>
                    <div className="searchFormItem__content">
                      <h5>{t("sidebar_time")}</h5>
                      <div className="js-select-control-chosen">
                        {selectedTime || t("sidebar_choose_time")}
                      </div>
                    </div>
                    <div className="searchFormItem__icon_chevron">
                      <i className="icon-chevron-down d-flex text-18"></i>
                    </div>
                  </div>

                  {activeTimeDD && (
                    <div className="searchFormItemDropdown -tour-type is-active">
                      <div className="searchFormItemDropdown__container">
                        <div className="searchFormItemDropdown__list sroll-bar-1">
                          {times.map((t, i) => (
                            <div
                              key={i}
                              onClick={() => {
                                setSelectedTime(t);
                                setActiveTimeDD(false);
                              }}
                              className="searchFormItemDropdown__item"
                            >
                              <button className="js-select-control-button">
                                <span className="js-select-control-choice">
                                  {t}
                                </span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Persons - APENAS PARA CONTROLE, NÃO AFETA PREÇO */}
            <h5 className="text-18 fw-500 mb-20 mt-20">
              {t("sidebar_persons")}
            </h5>

            <div className="d-flex items-center justify-between">
              <div className="text-14">{t("sidebar_persons")}</div>
              <div className="d-flex items-center js-counter">
                <button
                  onClick={() =>
                    setPersons((p) => (p > MIN_PERSONS ? p - 1 : p))
                  }
                  className="button size-30 border-1 rounded-full"
                >
                  <i className="icon-minus text-10"></i>
                </button>

                <div className="flex-center ml-10 mr-10">
                  <div className="text-14 size-20">{persons}</div>
                </div>

                <button
                  onClick={() => setPersons((p) => p + 1)}
                  disabled={persons >= MAX_PERSONS}
                  className="button size-30 border-1 rounded-full"
                  style={{
                    opacity: persons >= MAX_PERSONS ? 0.5 : 1,
                    cursor: persons >= MAX_PERSONS ? "not-allowed" : "pointer",
                  }}
                >
                  <i className="icon-plus text-10"></i>
                </button>
              </div>
            </div>

            {!isFixedPriceTour && (
              <>
                <div className="line mt-20 mb-20"></div>

                <h5 className="text-18 fw-500 mb-20">
                  {t("sidebar_hours_label")}
                </h5>

                <div className="d-flex items-center justify-between">
                  <div className="text-14">{t("sidebar_how_many_hours")}</div>
                  <div className="d-flex items-center js-counter">
                    <button
                      onClick={() =>
                        setHours((currentHours) =>
                          currentHours > MIN_HOURS
                            ? currentHours - 1
                            : currentHours,
                        )
                      }
                      className="button size-30 border-1 rounded-full"
                    >
                      <i className="icon-minus text-10"></i>
                    </button>

                    <div className="flex-center ml-10 mr-10">
                      <div className="text-14 size-20">{hours}</div>
                    </div>

                    <button
                      onClick={() =>
                        setHours((currentHours) => currentHours + 1)
                      }
                      className="button size-30 border-1 rounded-full"
                    >
                      <i className="icon-plus text-10"></i>
                    </button>
                  </div>
                </div>
              </>
            )}

            {!isFixedPriceTour && minTuks > 1 && (
              <>
                <div className="line mt-20 mb-20"></div>

                <h5 className="text-18 fw-500 mb-20">{t("sidebar_tuks")}</h5>

                <div className="d-flex items-center justify-between">
                  <div className="text-14">{t("sidebar_number_of_tuks")}</div>
                  <div className="d-flex items-center js-counter">
                    <button
                      onClick={() =>
                        setTukCount((t) => (t > minTuks ? t - 1 : t))
                      }
                      className="button size-30 border-1 rounded-full"
                    >
                      <i className="icon-minus text-10"></i>
                    </button>

                    <div className="flex-center ml-10 mr-10">
                      <div className="text-14 size-20">{tukCount}</div>
                    </div>

                    <button
                      onClick={() => setTukCount((t) => t + 1)}
                      className="button size-30 border-1 rounded-full"
                    >
                      <i className="icon-plus text-10"></i>
                    </button>
                  </div>
                </div>

                <div className="text-12 text-light-2 mt-10">
                  {tukRequirementText}
                </div>
              </>
            )}

            <div className="line mt-20 mb-20"></div>

            <div className="d-flex items-center justify-between">
              <div className="text-18 fw-500">{t("sidebar_total")}</div>
              <div className="text-18 fw-500">
                {t("currency_eur")} {totalPrice}
              </div>
            </div>

            {/* Botão para continuar com o pagamento pela plataforma */}
            <button
              onClick={handlePlatformPayment}
              h
              className="button -md -dark-1 col-12 bg-accent-1 text-white mt-20"
            >
              {t("sidebar_continue_payment")}
              <i className="icon-arrow-top-right ml-10"></i>
            </button>
          </>
        )}

        {!showBookingDetails && (
          <button
            onClick={handleBookNowClick}
            className="button -md -dark-1 col-12 bg-accent-1 text-white mt-20"
          >
            {t("sidebar_book_now")}
            <i className="icon-arrow-top-right ml-10"></i>
          </button>
        )}
      </div>

      {/* Modal de Pagamento */}
      {showPaymentModal && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setShowPaymentModal(false)}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "30px",
              maxWidth: "500px",
              width: "90%",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-22 fw-600 mb-20">
              {t("payment_choose_method")}
            </h3>
            <p className="text-15 mb-30">{t("payment_how_would_you_like")}</p>

            <div className="d-flex flex-column gap-3">
              <button
                onClick={() => handlePaymentChoice("cash")}
                className="button -md -outline-accent-1 col-12 text-accent-1"
                style={{ padding: "15px", marginBottom: "15px" }}
              >
                <i className="icon-wallet mr-10"></i>
                {t("payment_cash")}
              </button>

              {/* Opção de pagamento por plataforma sempre disponível */}
              <button
                onClick={() => handlePaymentChoice("platform")}
                className="button -md -dark-1 col-12 bg-accent-1 text-white"
                style={{ padding: "15px" }}
              >
                <i className="icon-credit-card mr-10"></i>
                {t("payment_platform")}
              </button>
            </div>

            <button
              onClick={() => setShowPaymentModal(false)}
              className="button -md -outline-dark-1 col-12 mt-20"
            >
              {t("payment_cancel")}
            </button>
          </div>
        </div>
      )}

      {/* Modal Reserve by Phone */}
      {showReserveByPhoneModal && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setShowReserveByPhoneModal(false)}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "40px",
              maxWidth: "450px",
              width: "90%",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-30">
              <i
                className="icon-phone text-40 text-accent-1 mb-20"
                style={{ display: "block" }}
              ></i>
              <h3 className="text-24 fw-600 mb-15">{t("reserve_by_phone")}</h3>

              {/* Telefone */}
              <div className="text-20 fw-500 text-accent-1 mb-10">
                📞 {phoneNumber}
              </div>

              <p className="text-16 text-dark-1">
                {t("reserve_contact_us")}
                <br />
                {t("reserve_call_send_tuk")}
              </p>
            </div>

            <div className="d-flex flex-column gap-3">
              {/* Botão de Ligação */}
              <a
                href={`tel:${phoneNumber}`}
                className="button -md -dark-1 col-12  mt-6 bg-accent-1 text-white"
                style={{ padding: "15px" }}
              >
                <i className="icon-phone mr-10"></i>
                {t("reserve_call_now")}
              </a>

              {/* Botão do WhatsApp */}
              <a
                href={`https://wa.me/${whatsappNumber.replace(
                  "+",
                  "",
                )}?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="button -md col-12 text-white"
                style={{
                  marginTop: "10px",
                  backgroundColor: "#25D366",
                  border: "1px solid #25D366",
                }}
              >
                <i className="icon-whatsapp mr-10"></i>
                {t("Whats App")}
              </a>

              <button
                onClick={() => setShowReserveByPhoneModal(false)}
                className="button -md -outline-dark-1 col-12 "
                style={{
                  marginTop: "10px",
                }}
              >
                {t("reserve_close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Componente com Provider
export default function TourSingleSidebar({ tour }) {
  return (
    <LanguageProvider>
      <TourSingleSidebarContent tour={tour} />
    </LanguageProvider>
  );
}
