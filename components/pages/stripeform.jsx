import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

export default function StripePaymentForm({ bookingData, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/booking-success`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      onSuccess();
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="contactForm">
      <div className="mb-30">
        <PaymentElement />
      </div>

      {errorMessage && <div className="text-red-500 mb-20">{errorMessage}</div>}

      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="button -md -dark-1 bg-accent-1 text-white w-full"
      >
        {isLoading ? "Processing..." : `Pay $${bookingData.totalPrice}`}
      </button>
    </form>
  );
}
