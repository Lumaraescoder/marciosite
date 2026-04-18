"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "../../hooks/useLang";
import { LanguageProvider } from "../../hooks/useLang";

// Componente principal
function Stage3ConfirmationContent({ bookingData }) {
  const { t } = useTranslation();
  const [emailStatus, setEmailStatus] = useState("sending"); // 'sending', 'sent', 'error'
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    sendConfirmationEmail();
  }, []);

  const sendConfirmationEmail = async () => {
    try {
      // Recupera dados do cliente do localStorage
      const customerData = JSON.parse(
        localStorage.getItem("customerData") || "{}"
      );

      if (!customerData.email) {
        setEmailStatus("error");
        setEmailError(t("error_no_email"));
        return;
      }

      const response = await fetch("/api/send-confirmation-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingData: bookingData,
          customerEmail: customerData.email,
          customerName: `${customerData.firstName} ${customerData.lastName}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setEmailStatus("sent");
      } else {
        setEmailStatus("error");
        setEmailError(result.error || t("error_network_email"));
      }
    } catch (error) {
      setEmailStatus("error");
      setEmailError(t("error_network_email"));
      console.error("❌ Email error:", error);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-30 md:text-24 fw-700 mb-20">{t("stage3_title")}</h2>

      <div className="text-green-500 mb-20">
        <svg
          className="w-50 h-50 mx-auto"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <p className="text-18 mb-20">{t("stage3_thank_you")}</p>

      <div className="bg-light-3 rounded-8 p-20 mb-20">
        <h3 className="text-20 fw-600 mb-10">{t("stage3_booking_details")}</h3>
        <p>
          <strong>{t("stage3_tour")}</strong> {bookingData.tourTitle}
        </p>
        <p>
          <strong>{t("stage3_date")}</strong> {bookingData.date}
        </p>
        <p>
          <strong>{t("stage3_time")}</strong> {bookingData.time}
        </p>
        <p>
          <strong>{t("stage3_persons")}</strong> {bookingData.persons}
        </p>
        <p>
          <strong>{t("stage3_total_paid")}</strong> €{bookingData.totalPrice}
        </p>
      </div>

      {/* Status do Email */}
      <div className="mb-20">
        {emailStatus === "sending" && (
          <p className="text-blue-500">{t("stage3_sending_email")}</p>
        )}

        {emailStatus === "sent" && (
          <p className="text-green-500">{t("stage3_email_sent")}</p>
        )}

        {emailStatus === "error" && (
          <p className="text-red-500">
            {t("stage3_email_error")} {emailError}
          </p>
        )}
      </div>

      <p className="text-16 text-light-1">{t("stage3_email_footer")}</p>
    </div>
  );
}

// Componente com Provider
export default function Stage3Confirmation({ bookingData }) {
  return (
    <LanguageProvider>
      <Stage3ConfirmationContent bookingData={bookingData} />
    </LanguageProvider>
  );
}
