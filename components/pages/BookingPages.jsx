"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Stage1PersonalInfo from "./stage1";
import Stage3Confirmation from "./stage4-confirmation";
import BookingSidebar from "./bookingsidebar";
import Stage2Payment from "./stage-payment";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

export default function BookingPages() {
  const [bookingStage, setBookingStage] = useState(1);
  const [personalInfoSubmitted, setPersonalInfoSubmitted] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const searchParams = useSearchParams();

  const [bookingData, setBookingData] = useState({
    persons: 1,
    hours: 1,
    date: "",
    time: "",
    totalPrice: "0",
    pricePerPerson: "0",
    tourTitle: "Tour",
    tourImage: "/img/tourSingle/booking/1.png",
    clientSecret: "",
  });

  // Função de cálculo de preço conforme regras fornecidas
  function calculateTourPrice(persons, hours) {
    const factors = {
      1: 0.93,
      2: 0.83,
      3: 0.73,
      4: 0.63,
      5: 0.56,
      6: 0.5,
      7: 0.46,
    };
    const basePrice = persons * hours * 30;
    const factor = factors[hours] || factors[7];
    let adjustedPrice = basePrice * factor;
    if (persons === 1) {
      adjustedPrice *= 1.2;
    }
    const finalPrice = Math.round(adjustedPrice);
    return finalPrice;
  }

  useEffect(() => {
    const persons = parseInt(searchParams.get("persons") || "1");
    const hours = parseInt(searchParams.get("hours") || "1");
    const date = searchParams.get("date") || "";
    const time = searchParams.get("time") || "";
    const tourTitle = searchParams.get("tourTitle") || "Tour";
    const tourImage =
      searchParams.get("tourImage") || "/img/tourSingle/booking/1.png";

    if (persons && date && time) {
      const totalPrice = calculateTourPrice(persons, hours);
      const pricePerPerson = Math.round(totalPrice / persons);
      const bookingDataObj = {
        persons,
        hours,
        date,
        time,
        totalPrice: totalPrice.toString(),
        pricePerPerson: pricePerPerson.toString(),
        tourTitle,
        tourImage,
      };

      setBookingData(bookingDataObj);

      if (totalPrice > 0) {
        fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: Math.round(totalPrice * 100),
            bookingData: bookingDataObj,
          }),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            setBookingData((prev) => ({
              ...prev,
              clientSecret: data.clientSecret,
            }));
          })
          .catch((error) => {
            console.error("❌ Fetch error:", error);
            setBookingData((prev) => ({
              ...prev,
              clientSecret: "pi_mock_fallback_secret_xyz123",
            }));
          });
      }
    }
  }, [searchParams]);

  const handlePersonalInfoSuccess = () => {
    setPersonalInfoSubmitted(true);
    setBookingStage(2);
  };

  const handlePaymentSuccess = () => {
    setBookingStage(3);
  };

  const handleCompleteOrder = () => {
    setIsProcessingPayment(true);
  };

  const handleGoBack = () => {
    if (bookingStage > 1) {
      setBookingStage(bookingStage - 1);
    }
  };

  const renderStage = () => {
    switch (bookingStage) {
      case 1:
        return (
          <Stage1PersonalInfo
            onSuccess={handlePersonalInfoSuccess}
            bookingData={bookingData}
          />
        );
      case 2:
        return bookingData.clientSecret ? (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: bookingData.clientSecret,
              appearance: {
                theme: "stripe",
                variables: {
                  colorPrimary: "#0066cc",
                },
              },
            }}
          >
            <Stage2Payment
              bookingData={bookingData}
              onPaymentSuccess={handlePaymentSuccess}
              isProcessing={isProcessingPayment}
              onProcessingComplete={() => setIsProcessingPayment(false)}
            />
          </Elements>
        ) : (
          <div className="text-center py-5">
            <p>Loading payment form...</p>
          </div>
        );
      case 3:
        return <Stage3Confirmation bookingData={bookingData} />;
      default:
        return (
          <Stage1PersonalInfo
            onSuccess={handlePersonalInfoSuccess}
            bookingData={bookingData}
          />
        );
    }
  };

  return (
    <section className="layout-pt-md layout-pb-lg mt-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="bg-white rounded-12 shadow-2 py-30 px-30 md:py-20 md:px-20 mt-30">
              {/* Botão de voltar DENTRO do container e bem posicionado */}
              {bookingStage > 1 && (
                <div className="mb-30">
                  <button
                    onClick={handleGoBack}
                    className="flex items-center gap-10 text-accent-1 hover:text-accent-2 transition-colors duration-200 group"
                  >
                    <svg
                      className="w-20 h-20 group-hover:-translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <span className="text-16 fw-500">Back</span>
                  </button>
                </div>
              )}

              {renderStage()}

              {/* REMOVIDO O BOTÃO PREVIOUS ANTIGO */}
            </div>
          </div>

          <div className="col-lg-4">
            <BookingSidebar
              bookingData={bookingData}
              onCompleteOrder={handleCompleteOrder}
              isProcessing={isProcessingPayment}
              bookingStage={bookingStage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
