import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "reactstrap";
import axios from "axios";
import { BASE_URL, headerConfig } from "../../../config";
import { toast } from "react-hot-toast";
const stripeKey = import.meta.env.VITE_PUBLIC_KEY;

const stripePromise = loadStripe(stripeKey);

const options = {
  mode: "payment",
  amount: Number(localStorage.getItem("totalAmount")),
  currency: "inr",
  appearance: {
    type: "accordion",
    defaultCollapsed: false,
    radios: true,
    spacedAccordionItems: false,
  },
};

const CheckoutForm = ({ selectedSeats }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (elements == null) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    const response = await axios.post(
      `${BASE_URL}/tickets/ticket-payment`,
      {
        amount: localStorage.getItem("totalAmount"),
        tickets: selectedSeats,
      },
      headerConfig
    );

    const { clientSecret } = await response.data;

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:5173/view-route",
      },
    });

    if (error) {
      setErrorMessage(error.message);
      toast.success(error.message, { position: "top-right" });
    } else {
      toast.success("Ticket Booked Successfully.", { position: "top-right" });
    }
  };

  return (
    <form
      style={{ width: "100vw" }}
      onSubmit={handleSubmit}
      className="my-4 d-flex align-items-center justify-content-center flex-column gap-4 card p-4"
    >
      <PaymentElement className="mx-auto" style={{ width: "60%" }} />
      <Button color="primary" type="submit" disabled={!stripe || !elements}>
        Pay
      </Button>
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
    </form>
  );
};

const Wrapper = ({ selectedSeats }) => {
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm selectedSeats={selectedSeats} />
    </Elements>
  );
};

export default Wrapper;
