"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "../../hooks/useLang";

export default function PayPalPaymentComponent({
  bookingData,
  onPaymentSuccess,
  onProcessingComplete,
}) {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isReady, setIsReady] = useState(false);

  // ----------------------------
  // LOAD PAYPAL SDK (ONLY BUTTONS)
  // ----------------------------
  useEffect(() => {
    if (document.getElementById("paypal-sdk")) return;

    const script = document.createElement("script");
    script.id = "paypal-sdk";

    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=EUR&intent=capture&components=buttons`;

    script.async = true;

    script.onload = () => {
      setIsLoading(false);
      setIsReady(true);
    };

    script.onerror = () => {
      setErrorMessage("Failed to load PayPal");
      setIsLoading(false);
    };

    document.body.appendChild(script);
  }, []);

  // ----------------------------
  // RENDER BUTTONS
  // ----------------------------
  useEffect(() => {
    if (!isReady || !window.paypal) return;

    const container = document.getElementById("paypal-button-container");
    if (!container) return;

    container.innerHTML = "";

    window.paypal
      .Buttons({
        style: {
          layout: "vertical",
          color: "blue",
          shape: "rect",
          label: "pay",
          height: 48,
          tagline: false,
        },

        // CREATE ORDER
        createOrder: async () => {
          try {
            setErrorMessage("");

            const res = await fetch("/api/create-paypal-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                amount: Math.round(parseFloat(bookingData.totalPrice) * 100),
                bookingData,
              }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Order failed");

            return data.orderId;
          } catch (err) {
            console.error(err);
            setErrorMessage("Failed to create order");
            throw err;
          }
        },

        // APPROVE PAYMENT
        onApprove: async (data) => {
          try {
            const res = await fetch("/api/create-paypal-order", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: data.orderID,
              }),
            });

            const result = await res.json();

            if (result.success) {
              onPaymentSuccess?.();
            } else {
              throw new Error(result.error || "Payment failed");
            }
          } catch (err) {
            console.error(err);
            setErrorMessage("Payment failed. Try again.");
          } finally {
            onProcessingComplete?.();
          }
        },

        onError: (err) => {
          console.error("PayPal error:", err);
          setErrorMessage("Payment error occurred");
          onProcessingComplete?.();
        },

        onCancel: () => {
          setErrorMessage("");
          onProcessingComplete?.();
        },
      })
      .render("#paypal-button-container");
  }, [isReady, bookingData]);

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <div className="paypal-wrapper">
      <h2 className="title">{t("stage2_title") || "Complete your payment"}</h2>

      <div className="card">
        {isLoading && <div className="loading">Loading secure payment...</div>}

        {errorMessage && <div className="error">{errorMessage}</div>}

        <div id="paypal-button-container" className="paypal-box" />

        <div className="info">
          Secure payment powered by PayPal. You can pay with PayPal or card.
        </div>
      </div>

      <style jsx>{`
        .paypal-wrapper {
          max-width: 520px;
          margin: 0 auto;
        }

        .title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .card {
          background: white;
          border: 1px solid #eaeaea;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        .paypal-box {
          margin-top: 20px;
        }

        .loading {
          text-align: center;
          padding: 20px;
          color: #666;
        }

        .error {
          background: #ffe5e5;
          color: #c00;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 15px;
          font-size: 14px;
        }

        .info {
          margin-top: 20px;
          font-size: 13px;
          color: #777;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
