import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL, headerConfig } from "../../../config";
import { verifyStatus } from "../../common/utils";
import { useNavigate } from "react-router-dom";
import { BiSolidBus } from "react-icons/bi";
import Seat from "./Seat";
import StripeCheckout from "react-stripe-checkout";
import { Button } from "reactstrap";
import { toast, Toaster } from "react-hot-toast";
import SeaterForm from "./SeaterForm";
import ConfirmSeats from "./ConfirmSeats";
import Payment from "../Payment/Payment";
const stripeKey = import.meta.env.VITE_PUBLIC_KEY;

function ViewRoute() {
  const [busDeatils, setBusDetails] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selected, setSelected] = useState({});
  const [tickets, setTickets] = useState([]);
  const [seatConfirmed, setSeatConfirmed] = useState(false);
  const routeId = localStorage.getItem("busRouteId");
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);

  const toggler = () => setModal(!modal);
  const paymentToggler = () => setPaymentModal(!paymentModal);

  const getRouteDetails = async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/bus-route/get-route/${id}`,
        headerConfig
      );
      const { busId } = response.data.data;
      const busInfo = await axios.get(`${BASE_URL}/bus/${busId}`, headerConfig);
      const busData = busInfo.data.bus;
      setBusDetails(busData);

      const ticketResponse = await axios.get(
        `${BASE_URL}/tickets/${routeId}`,
        headerConfig
      );
      const allTickets = ticketResponse.data.data;
      setTickets(allTickets);
    } catch (error) {
      verifyStatus(error.response.status, navigate);
    }
  };

  useEffect(() => {
    if (routeId) {
      getRouteDetails(routeId);
    } else {
      navigate("/");
    }
  }, []);

  const confirmSeats = async () => {
    if (selectedSeats.length > 0) {
      setModal(true);
    }
  };

  const tokenHandler = async () => {};

  useEffect(() => {
    if (Object.keys(selected).length > 0) {
      setSelectedSeats([...selectedSeats, selected]);
      setSelected({});
    }
  }, [selected]);

  return (
    <section style={{ width: "100%", height: "100%" }}>
      <ConfirmSeats
        toggler={toggler}
        modal={modal}
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
        setModal={setModal}
        setSeatConfirmed={setSeatConfirmed}
      />
      <Payment
        seats={selectedSeats}
        modal={paymentModal}
        toggler={paymentToggler}
      />
      <div className="d-flex flex-column p-4">
        <h4>Book Ticket</h4>
        {!seatConfirmed && (
          <div style={{ width: "100%" }} className="my-4 card p-4 color-danger">
            <div className="d-flex">
              <div
                style={{ width: "40%" }}
                className="d-flex align-items-center justify-content-center flex-column"
              >
                <BiSolidBus
                  style={{ fontSize: "300px", color: "dodgerblue" }}
                />
                <b className="rounded p-3 bg-warning"> {busDeatils.busNo}</b>
              </div>
              <div
                style={{ width: "60%" }}
                className="d-flex aign-items-center flex-wrap gap-4"
              >
                {tickets.map((ticket) => (
                  <Seat
                    key={ticket._id}
                    {...ticket}
                    setSelected={setSelected}
                    selected={selected}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        {!seatConfirmed && (
          <div className="d-flex align-items-center justify-content-end">
            <Button
              onClick={confirmSeats}
              color={selectedSeats.length > 0 ? "success" : "danger"}
            >
              {selectedSeats.length > 0 ? "Book" : "Select"}
            </Button>
          </div>
        )}
        {seatConfirmed && (
          <div className="d-flex align-items-center justify-content-center my-2 py-4">
            <StripeCheckout stripeKey={stripeKey} token={tokenHandler} />
          </div>
        )}
      </div>
      <Toaster />
    </section>
  );
}

// navigate("/");
// try {
// const response = await axios.put(
// `${BASE_URL}/tickets/booking`,
// { tickets: selectedSeats },
// headerConfig
// );
// toast.success(response.data.message, { position: "top-right" });
// } catch (error) {
// toast.error(error.response.data.message, { position: "top-right" });
// }

// setSelectedSeats([]);
// const ticketResponse = await axios.get(
//   `${BASE_URL}/tickets/${routeId}`,
//   headerConfig
// );
// const allTickets = ticketResponse.data.data;
// setTickets(allTickets);

export default ViewRoute;
