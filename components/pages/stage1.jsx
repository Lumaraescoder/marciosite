"use client";
import React, { useState, useCallback } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useTranslation } from "../../hooks/useLang";
import { LanguageProvider } from "../../hooks/useLang";

// Componente principal
function Stage1PersonalInfoContent({ onSuccess, bookingData }) {
  const { t } = useTranslation();
  const [state, handleSubmit] = useForm("xbdqklov");
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validação com useCallback para evitar recriação desnecessária
  const validateField = useCallback(
    (name, value) => {
      const errors = {};

      switch (name) {
        case "email":
          if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errors.email = t("validation_valid_email");
          }
          break;

        case "phone":
          const phoneDigits = value.replace(/\s/g, "");
          if (value && !/^[\d\s\-\+\(\)]{10,}$/.test(phoneDigits)) {
            errors.phone = t("validation_valid_phone");
          }
          break;

        case "fullName":
          if (value && value.trim().split(/\s+/).length < 2) {
            errors.fullName = t("validation_first_last_name");
          }
          break;

        default:
          break;
      }

      return errors;
    },
    [t],
  );

  const handleBlur = useCallback(
    (fieldName) => (e) => {
      setTouched((prev) => ({ ...prev, [fieldName]: true }));
      const errors = validateField(fieldName, e.target.value);
      setFormErrors((prev) => ({ ...prev, ...errors }));
    },
    [validateField],
  );

  const handleChange = useCallback(
    (fieldName) => (e) => {
      const errors = validateField(fieldName, e.target.value);
      setFormErrors((prev) => {
        const updated = { ...prev };
        if (Object.keys(errors).length === 0) {
          delete updated[fieldName];
        } else {
          Object.assign(updated, errors);
        }
        return updated;
      });
    },
    [validateField],
  );

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

  // Main submit function com tratamento robusto de erros
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Previne múltiplos submits simultâneos
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Final validation before submit
      const formData = new FormData(event.target);
      const finalErrors = {};

      const email = formData.get("email")?.trim();
      const phone = formData.get("phone")?.trim();
      const fullName = formData.get("fullName")?.trim();

      // Required field checks
      if (!email) {
        finalErrors.email = t("validation_email_required");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        finalErrors.email = t("validation_valid_email");
      }

      if (!phone) {
        finalErrors.phone = t("validation_phone_required");
      }

      if (!fullName) {
        finalErrors.fullName = t("validation_name_required");
      } else if (fullName.split(/\s+/).length < 2) {
        finalErrors.fullName = t("validation_first_last_name");
      }

      if (Object.keys(finalErrors).length > 0) {
        setFormErrors(finalErrors);
        setTouched(
          Object.keys(finalErrors).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {},
          ),
        );

        // Smooth scroll to first error - versão segura
        setTimeout(() => {
          const firstError = Object.keys(finalErrors)[0];
          const element = document.querySelector(`[name="${firstError}"]`);
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 100);

        setIsSubmitting(false);
        return;
      }

      // Get form data
      const nameParts = fullName.split(/\s+/);
      const customerData = {
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email: email,
        phone: phone,
      };

      // Save to localStorage for confirmation email (non-blocking)
      safeLocalStorageSave("customerData", customerData);

      // Submit to Formspree
      await handleSubmit(event);
    } catch (error) {
      console.error("Erro no envio do formulário:", error);
      setFormErrors({
        submit:
          "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.",
      });
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
            <input
              type="text"
              name="fullName"
              required
              onBlur={handleBlur("fullName")}
              onChange={handleChange("fullName")}
              className={
                touched.fullName && formErrors.fullName ? "error-field" : ""
              }
              disabled={isSubmitting}
            />
            <label className="lh-1 text-16 text-light-1">
              {t("stage1_full_name")}
            </label>
          </div>
          {touched.fullName && formErrors.fullName && (
            <div className="error-message">{formErrors.fullName}</div>
          )}
        </div>

        {/* Email */}
        <div className="col-md-6">
          <div className="form-input">
            <input
              type="email"
              name="email"
              required
              onBlur={handleBlur("email")}
              onChange={handleChange("email")}
              className={touched.email && formErrors.email ? "error-field" : ""}
              disabled={isSubmitting}
            />
            <label className="lh-1 text-16 text-light-1">
              {t("stage1_email")}
            </label>
          </div>
          {touched.email && formErrors.email && (
            <div className="error-message">{formErrors.email}</div>
          )}
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>

        {/* Phone */}
        <div className="col-md-6">
          <div className="form-input">
            <input
              type="text"
              name="phone"
              required
              onBlur={handleBlur("phone")}
              onChange={handleChange("phone")}
              className={touched.phone && formErrors.phone ? "error-field" : ""}
              disabled={isSubmitting}
            />
            <label className="lh-1 text-16 text-light-1">
              {t("stage1_phone")}
            </label>
          </div>
          {touched.phone && formErrors.phone && (
            <div className="error-message">{formErrors.phone}</div>
          )}
        </div>

        {/* Country */}
        <div className="col-md-6">
          <div className="form-input">
            <input
              type="text"
              name="country"
              required
              disabled={isSubmitting}
            />
            <label className="lh-1 text-16 text-light-1">
              {t("stage1_country")}
            </label>
          </div>
        </div>

        {/* City */}
        <div className="col-md-6">
          <div className="form-input">
            <input type="text" name="city" required disabled={isSubmitting} />
            <label className="lh-1 text-16 text-light-1">
              {t("stage1_city")}
            </label>
          </div>
        </div>

        {/* Address */}
        <div className="col-12">
          <div className="form-input">
            <input
              type="text"
              name="address"
              required
              disabled={isSubmitting}
            />
            <label className="lh-1 text-16 text-light-1">
              {t("stage1_address")}
            </label>
          </div>
        </div>

        {/* Tour Content */}
        <div className="col-12">
          <div className="form-input">
            <textarea
              name="tourContent"
              required
              rows="8"
              disabled={isSubmitting}
            ></textarea>
            <label className="lh-1 text-16 text-light-1">
              {t("stage1_tour_content")}
            </label>
          </div>
        </div>

        {/* Erro geral de submit */}
        {formErrors.submit && (
          <div className="col-12">
            <div className="error-message">{formErrors.submit}</div>
          </div>
        )}

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
