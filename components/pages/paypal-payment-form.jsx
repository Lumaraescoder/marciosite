"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "../../hooks/useLang";

export default function PayPalPaymentComponent({
  bookingData,
  onPaymentSuccess,
  isProcessing,
  onProcessingComplete,
}) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [paypalOrder, setPaypalOrder] = useState(null);

  // Carrega o PayPal Buttons Script
  useEffect(() => {
    // Depuração: mostra no console qual valor do client-id foi embutido no build
    const _paypalPublicId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    try {
      // eslint-disable-next-line no-console
      console.log("DEBUG: NEXT_PUBLIC_PAYPAL_CLIENT_ID=", _paypalPublicId);
    } catch (e) {}

    // Verifica se o client id do PayPal está disponível (build-time)
    if (!_paypalPublicId) {
      setErrorMessage(
        `PayPal client ID not configured. Configure NEXT_PUBLIC_PAYPAL_CLIENT_ID in production. (value: ${_paypalPublicId})`,
      );
      setIsLoading(false);
      return;
    }

    // Remove script anterior se existir
    const existingScript = document.getElementById("paypal-checkout-script");
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.id = "paypal-checkout-script";
    // Não desabilitar funding para permitir pagamentos com cartão via PayPal
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=EUR&intent=capture&components=buttons,hosted-fields`;
    script.async = true;
    script.onload = () => {
      setIsLoading(false);
      renderPayPalButtons();
    };
    script.onerror = () => {
      setErrorMessage(
        t("payment_error") || "Failed to load PayPal. Please try again later.",
      );
      setIsLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const renderPayPalButtons = () => {
    if (typeof window !== "undefined" && window.paypal) {
      // Limpa botões anteriores
      const container = document.getElementById("paypal-button-container");
      if (container) {
        container.innerHTML = "";
      }

      window.paypal
        .Buttons({
          // Cria a ordem quando o usuário clica em "Pay Now"
          createOrder: async (data, actions) => {
            try {
              setIsLoading(true);
              const response = await fetch("/api/create-paypal-order", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  amount: Math.round(parseFloat(bookingData.totalPrice) * 100),
                  bookingData,
                }),
              });

              if (!response.ok) {
                throw new Error("Failed to create PayPal order");
              }

              const data = await response.json();

              if (data.success) {
                setPaypalOrder(data.orderId);
                return data.orderId;
              } else {
                throw new Error(data.error || "Failed to create order");
              }
            } catch (error) {
              console.error("❌ Error creating PayPal order:", error);
              setErrorMessage(
                t("payment_error") ||
                  "Failed to create payment order. Please try again.",
              );
              throw error;
            } finally {
              setIsLoading(false);
            }
          },

          // Chamado quando a ordem está aprovada pelo PayPal
          onApprove: async (data, actions) => {
            try {
              setIsLoading(true);

              // Captura a ordem
              const response = await fetch("/api/create-paypal-order", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  orderId: data.orderID,
                }),
              });

              if (!response.ok) {
                throw new Error("Failed to capture payment");
              }

              const captureData = await response.json();

              if (captureData.success && captureData.status === "COMPLETED") {
                // Pagamento capturado com sucesso
                onPaymentSuccess();
              } else {
                throw new Error(captureData.error || "Payment capture failed");
              }
            } catch (error) {
              console.error("❌ Error capturing PayPal payment:", error);
              setErrorMessage(
                t("payment_error") ||
                  "Failed to process payment. Please try again.",
              );
            } finally {
              setIsLoading(false);
              onProcessingComplete?.();
            }
          },

          // Chamado quando há um erro ou o usuário cancela
          onError: (err) => {
            console.error("❌ PayPal error:", err);
            setErrorMessage(
              err.message ||
                t("payment_error") ||
                "Payment failed. Please try again.",
            );
            onProcessingComplete?.();
          },

          onCancel: () => {
            console.log("🔄 Payment cancelled by user");
            onProcessingComplete?.();
          },

          // Opções de estilo dos botões
          style: {
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "pay",
            height: 45,
            tagline: false,
          },

          // Campos customizados para o novo PayPal Checkout
          fields: {
            items: "visible",
          },
        })
        .render("#paypal-button-container");
    }
  };

  // Re-renderiza os botões quando os dados de booking mudam
  useEffect(() => {
    if (!isLoading && typeof window !== "undefined" && window.paypal) {
      renderPayPalButtons();
    }
  }, [bookingData]);

  return (
    <div>
      <h2 className="text-30 md:text-24 fw-700 mb-30">
        {t("stage2_title") || "Payment"}
      </h2>

      {/* Métodos de pagamento - agora com PayPal */}
      <div className="tabs -pills-3 js-tabs">
        <div className="tabs__controls row x-gap-10 y-gap-10 js-tabs-controls">
          <div className="col-auto">
            <button
              className="tabs__button fw-500 rounded-200 js-tabs-button is-tab-el-active"
              data-tab-target=".-tab-item-1"
            >
              {t("payment_method") || "PayPal / Credit Card"}
            </button>
          </div>
        </div>
        asdasd
        <div className="tabs__content pt-30 js-tabs-content">
          <div className="tabs__pane -tab-item-1 is-tab-el-active">
            {isLoading && (
              <div className="text-center py-30">
                <div className="spinner-border" role="status">
                  <span className="sr-only">
                    {t("loading") || "Loading..."}
                  </span>
                </div>
                <p className="mt-20">
                  {t("loading_payment") || "Loading payment options..."}
                </p>
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-danger mb-30" role="alert">
                <strong>{t("error") || "Error"}:</strong> {errorMessage}
              </div>
            )}

            {/* Container dos botões PayPal */}
            <div id="paypal-button-container" className="mt-30"></div>

            {/* Informações adicionais */}
            <div className="mt-40 pt-30 border-top">
              <p className="text-14 text-gray-600">
                <svg
                  className="w-16 h-16 d-inline me-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
                {t("payment_secure_info") ||
                  "Your payment information is secure and encrypted."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
