import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidBus } from "react-icons/bi";
import { Button } from "reactstrap";
import { BASE_URL, headerConfig } from "../../config";
import { verifyStatus } from "../../common/utils";
import Seat from "./Seat";
import ConfirmSeats from "./ConfirmSeats";

const ViewRoute = () => {
  const [busDeatils, setBusDetails] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selected, setSelected] = useState({});
  const [tickets, setTickets] = useState([]);
  const [seatConfirmed, setSeatConfirmed] = useState(false);
  const [amount, setAmount] = useState(0);
  const routeId = localStorage.getItem("busRouteId");
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const toggler = () => setModal(!modal);

  const getRouteDetails = async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/bus-route/get-route/${id}`,
        headerConfig,
      );
      const { busId } = response.data.data;
      const busInfo = await axios.get(`${BASE_URL}/bus/${busId}`, headerConfig);
      const busData = busInfo.data.bus;
      setBusDetails(busData);

      const ticketResponse = await axios.get(
        `${BASE_URL}/tickets/${routeId}`,
        headerConfig,
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
      navigate(window.location.origin);
    }
  }, []);

  const confirmSeats = async () => {
    if (selectedSeats.length > 0) {
      setModal(true);
    }
  };

  useEffect(() => {
    if (Object.keys(selected).length > 0) {
      setSelectedSeats([...selectedSeats, selected]);
      setSelected({});
    }
  }, [selected]);

  return (
    <section style={{ width: "100%", height: "100%", overflowY: "scroll" }}>
      <ConfirmSeats
        toggler={toggler}
        modal={modal}
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
        setModal={setModal}
        setSeatConfirmed={setSeatConfirmed}
        seatConfirmed={seatConfirmed}
        setAmount={setAmount}
        amount={amount}
      />

      <div className="d-flex flex-column p-4">
        <h4>Book Ticket</h4>

        <div style={{ width: "100%" }} className="my-4 card p-4 color-danger">
          <div className="d-flex">
            <div
              style={{ width: "40%" }}
              className="d-flex align-items-center justify-content-center flex-column"
            >
              <BiSolidBus style={{ fontSize: "300px", color: "dodgerblue" }} />
              <b className="rounded p-3 bg-warning">
                {
                  busDeatils.busNo
                }
              </b>
            </div>
            <div
              style={{ width: "60%" }}
              className="d-flex aign-items-center flex-wrap gap-4"
            >
              {tickets.map(({
                _id: id, booked, seatNumber, price, routeId: ruteId,
              }) => (
                <Seat
                  key={id}
                  price={price}
                  routeId={ruteId}
                  booked={booked}
                  ticketId={id}
                  seatNumber={seatNumber}
                  setSelected={setSelected}
                  selected={selected}
                />
              ))}
            </div>
          </div>
        </div>

        {!seatConfirmed && (
          <div className="d-flex align-items-center justify-content-end">
            <Button
              onClick={confirmSeats}
              disabled={selectedSeats.length <= 0 ?? !selectedSeats.length <= 0}
              style={{ cursor: selectedSeats.length <= 0 ? "not-allowed" : "" }}
              color={selectedSeats.length > 0 ? "success" : "danger"}
            >
              {selectedSeats.length > 0 ? "Book" : "Select"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ViewRoute;
