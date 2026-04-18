"use client";
import { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import Image from "next/image";
import { useTranslation } from "../../hooks/useLang";
import { LanguageProvider } from "../../hooks/useLang";

const elementStyles = {
  style: {
    base: {
      fontSize: "16px",
      color: "black",
      border: "1px solid black",
      borderRadius: "4px",
      padding: "12px",
      backgroundColor: "white",
      "::placeholder": {
        color: "#666",
        opacity: 1,
      },
    },
    invalid: {
      color: "#E53935",
      borderColor: "#E53935",
      "::placeholder": {
        color: "#E53935",
        opacity: 1,
      },
    },
  },
};

// Estilos CSS personalizados para os containers dos elementos Stripe
const stripeElementContainerStyles = {
  border: "1px solid black",
  borderRadius: "4px",
  padding: "12px",
  backgroundColor: "white",
  transition: "border-color 0.2s ease",
};

const stripeElementContainerFocusStyles = {
  border: "2px solid black",
  outline: "none",
};

// Componente principal
function Stage2PaymentContent({
  bookingData,
  onPaymentSuccess,
  isProcessing,
  onProcessingComplete,
}) {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [cardCompleted, setCardCompleted] = useState({
    number: false,
    expiry: false,
    cvc: false,
  });

  // Estados para controlar o foco nos elementos Stripe
  const [focusedElement, setFocusedElement] = useState(null);

  // Efeito para processar o pagamento quando o botão do sidebar for clicado
  useEffect(() => {
    if (isProcessing && !isLoading) {
      handleSubmit();
    }
  }, [isProcessing]);

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();

    if (!stripe || !elements) {
      onProcessingComplete?.();
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    // Verifica se todos os campos estão completos
    if (!cardCompleted.number || !cardCompleted.expiry || !cardCompleted.cvc) {
      setErrorMessage(t("validation_complete_card"));
      setIsLoading(false);
      onProcessingComplete?.();
      return;
    }

    if (!cardholderName) {
      setErrorMessage(t("validation_cardholder_name"));
      setIsLoading(false);
      onProcessingComplete?.();
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        bookingData.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: cardholderName,
            },
          },
        }
      );

      if (error) {
        setErrorMessage(error.message);
      } else if (paymentIntent.status === "succeeded") {
        onPaymentSuccess();
      }
    } catch (error) {
      setErrorMessage(t("validation_payment_error"));
    }

    setIsLoading(false);
    onProcessingComplete?.();
  };

  const handleCardChange = (field) => (event) => {
    setCardCompleted((prev) => ({
      ...prev,
      [field]: event.complete,
    }));

    if (event.error) {
      setErrorMessage(event.error.message);
    } else {
      setErrorMessage("");
    }
  };

  const handleFocus = (element) => () => {
    setFocusedElement(element);
  };

  const handleBlur = () => {
    setFocusedElement(null);
  };

  return (
    <div>
      <h2 className="text-30 md:text-24 fw-700 mb-30">{t("stage2_title")}</h2>

      <div className="d-flex flex-wrap gap-12 mb-20">
        {["PayPal", "G Pay", "Apple Pay"].map((method) => (
          <div key={method} className="payment-method-badge">
            {method}
          </div>
        ))}
      </div>

      <div className="tabs -pills-3 js-tabs">
        <div className="tabs__controls row x-gap-10 y-gap-10 js-tabs-controls">
          <div className="col-auto">
            <button
              className="tabs__button fw-500 rounded-200 js-tabs-button is-tab-el-active"
              data-tab-target=".-tab-item-1"
            >
              {t("stage2_credit_debit")}
            </button>
          </div>
        </div>

        <div className="tabs__content pt-30 js-tabs-content">
          <div className="tabs__pane -tab-item-1 is-tab-el-active">
            <form onSubmit={handleSubmit}>
              {/* Card Holder Name - COM efeito normal */}
              <div className="contactForm">
                <div className="form-input ">
                  <input
                    type="text"
                    required
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    placeholder=" "
                    style={{
                      border: "1px solid black",
                      borderRadius: "4px",
                      padding: "12px",
                    }}
                  />
                  <label className="lh-1 text-16 ">
                    {t("stage2_card_holder")}
                  </label>
                </div>
              </div>

              <div className="row y-gap-30 pt-30">
                <div className="col-lg-6">
                  <div className="row y-gap-30">
                    {/* Stripe Card Number - SEM efeito de label */}
                    <div className="col-12">
                      <div className="payment-field">
                        <label className="text-16  mb-8 block">
                          {t("stage2_card_number")}
                        </label>
                        <div
                          className="stripe-card-element"
                          style={{
                            ...stripeElementContainerStyles,
                            ...(focusedElement === "number" &&
                              stripeElementContainerFocusStyles),
                          }}
                        >
                          <CardNumberElement
                            options={elementStyles}
                            onChange={handleCardChange("number")}
                            onFocus={handleFocus("number")}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Stripe Expiry Date - SEM efeito de label */}
                    <div className="col-lg-6">
                      <div className="payment-field">
                        <label className="text-16  mb-8 block">
                          {t("stage2_expiry_date")}
                        </label>
                        <div
                          className="stripe-card-element"
                          style={{
                            ...stripeElementContainerStyles,
                            ...(focusedElement === "expiry" &&
                              stripeElementContainerFocusStyles),
                          }}
                        >
                          <CardExpiryElement
                            options={elementStyles}
                            onChange={handleCardChange("expiry")}
                            onFocus={handleFocus("expiry")}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Stripe CVC - SEM efeito de label */}
                    <div className="col-lg-6">
                      <div className="payment-field">
                        <label className="text-16  mb-8 block">
                          {t("stage2_cvc")}
                        </label>
                        <div
                          className="stripe-card-element"
                          style={{
                            ...stripeElementContainerStyles,
                            ...(focusedElement === "cvc" &&
                              stripeElementContainerFocusStyles),
                          }}
                        >
                          <CardCvcElement
                            options={elementStyles}
                            onChange={handleCardChange("cvc")}
                            onFocus={handleFocus("cvc")}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="text-red-500 mt-20 text-14">
                      {errorMessage}
                    </div>
                  )}
                </div>

                <div className="col-lg-6">
                  <Image
                    width={820}
                    height={500}
                    src="/img/tourSingle/booking/card.png"
                    alt="Credit card illustration"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .stripe-card-element {
          border: 1px solid black;
          border-radius: 4px;
          padding: 12px;
          background-color: white;
          transition: border-color 0.2s ease;
        }

        .stripe-card-element:focus-within {
          border: 2px solid black;
          outline: none;
        }

        .form-input input {
          border: 1px solid black !important;
          border-radius: 4px;
          padding: 12px;
          transition: border-color 0.2s ease;
        }

        .form-input input:focus {
          border: 2px solid black !important;
          outline: none;
        }

        .payment-method-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 110px;
          height: 46px;
          padding: 0 16px;
          border: 1px solid #d9d9d9;
          border-radius: 12px;
          background: #fff;
          font-size: 15px;
          font-weight: 600;
          color: #111;
          box-shadow: 0 6px 18px rgba(17, 17, 17, 0.06);
        }
      `}</style>
    </div>
  );
}

// Componente com Provider
export default function Stage2Payment({
  bookingData,
  onPaymentSuccess,
  isProcessing,
  onProcessingComplete,
}) {
  return (
    <LanguageProvider>
      <Stage2PaymentContent
        bookingData={bookingData}
        onPaymentSuccess={onPaymentSuccess}
        isProcessing={isProcessing}
        onProcessingComplete={onProcessingComplete}
      />
    </LanguageProvider>
  );
}
