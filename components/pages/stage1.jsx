"use client";
import React, { useState, useCallback } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useTranslation } from "../../hooks/useLang";
import { LanguageProvider } from "../../hooks/useLang";

// Componente principal
function Stage1PersonalInfoContent({ onSuccess, bookingData }) {
  const { t } = useTranslation();
  const [state, handleSubmit] = useForm("xbdqklov");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Client-side validations removed per request — allow empty submits

  // Função segura para salvar no localStorage
  const safeLocalStorageSave = useCallback((key, data) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
      }
    } catch (error) {
      console.warn("localStorage não disponível:", error);
    }
    return false;
  }, []);

  // Simplified submit: allow empty fields and submit directly
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.target);
      const fullName = formData.get("fullName")?.trim() || "";
      const nameParts = fullName.split(/\s+/).filter(Boolean);

      const customerData = {
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email: formData.get("email")?.trim() || "",
        phone: formData.get("phone")?.trim() || "",
      };

      safeLocalStorageSave("customerData", customerData);
      await handleSubmit(event);
    } catch (error) {
      console.error("Erro no envio do formulário:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // When form succeeds, go to Stage 2
  if (state.succeeded) {
    // Pequeno delay para garantir que o estado foi processado
    setTimeout(() => {
      if (onSuccess && typeof onSuccess === "function") {
        onSuccess();
      }
    }, 100);
    return null;
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <h2 className="text-30 md:text-24 fw-700">{t("stage1_title")}</h2>

      <div className="row y-gap-30 contactForm pt-30">
        <input
          type="hidden"
          name="bookingDate"
          value={bookingData?.date || ""}
        />
        <input
          type="hidden"
          name="bookingTime"
          value={bookingData?.time || ""}
        />
        <input
          type="hidden"
          name="bookingHours"
          value={bookingData?.hours || ""}
        />

        <div className="col-md-6">
          <div className="form-input">
            <input
              type="text"
              value={bookingData?.date || ""}
              readOnly
              disabled
            />
            <label className="lh-1 text-16 text-light-1">
              {t("sidebar_date")}
            </label>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-input">
            <input
              type="text"
              value={bookingData?.time || ""}
              readOnly
              disabled
            />
            <label className="lh-1 text-16 text-light-1">
              {t("sidebar_time")}
            </label>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-input">
            <input
              type="text"
              value={
                bookingData?.hours ? `${bookingData.hours} ${t("hours")}` : ""
              }
              readOnly
              disabled
            />
            <label className="lh-1 text-16 text-light-1">
              {t("sidebar_hours_label")}
            </label>
          </div>
        </div>

        {/* Full Name */}
        <div className="col-12">
          <div className="form-input">
            <input type="text" name="fullName" disabled={isSubmitting} />
            <label className="lh-1 text-16 text-light-1">
              {t("stage1_full_name")}
            </label>
          </div>
         
        </div>

        {/* Email */}
        <div className="col-md-6">
          <div className="form-input">
            <input type="email" name="email" disabled={isSubmitting} />
            <label className="lh-1 text-16 text-light-1">
              {t("stage1_email")}
            </label>
          </div>
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>

        {/* Phone */}
        <div className="col-md-6">
          <div className="form-input">
            <input type="text" name="phone" disabled={isSubmitting} />
            <label className="lh-1 text-16 text-light-1">
              {t("stage1_phone")}
            </label>
          </div>
        
        </div>

        {/* Country */}
        <div className="col-md-6">
          <div className="form-input">
            <input type="text" name="country" disabled={isSubmitting} />
            <label className="lh-1 text-16 text-light-1">
              {t("stage1_country")}
            </label>
          </div>
        </div>

        {/* City */}
        <div className="col-md-6">
          <div className="form-input">
            <input type="text" name="city" disabled={isSubmitting} />
            <label className="lh-1 text-16 text-light-1">
              {t("stage1_city")}
            </label>
          </div>
        </div>

        {/* Address */}
        <div className="col-12">
          <div className="form-input">
            <input type="text" name="address" disabled={isSubmitting} />
            <label className="lh-1 text-16 text-light-1">
              {t("stage1_address")}
            </label>
          </div>
        </div>

        {/* Tour Content */}
        <div className="col-12">
          <div className="form-input">
            <textarea name="tourContent" rows="8" disabled={isSubmitting}></textarea>
            <label className="lh-1 text-16 text-light-1">
              {t("stage1_tour_content")}
            </label>
          </div>
        </div>
        

        {/* SUBMIT BUTTON */}
        <div className="col-12">
          <button
            type="submit"
            disabled={isSubmitting || state.submitting}
            className="button -md -dark-1 bg-accent-1 text-white w-100"
          >
            {isSubmitting || state.submitting
              ? t("stage1_submitting")
              : t("stage1_submit")}
          </button>
        </div>
      </div>
    </form>
  );
}

// Componente com Provider
export default function Stage1PersonalInfo({ onSuccess, bookingData }) {
  return (
    <LanguageProvider>
      <Stage1PersonalInfoContent
        onSuccess={onSuccess}
        bookingData={bookingData}
      />
    </LanguageProvider>
  );
}
