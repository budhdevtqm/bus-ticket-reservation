import React, { useState } from "react";
import { BiCheck } from "react-icons/bi";

const Seat = (props) => {
  const {
    setSelected, booked, seatNumber, ticketId, routeId, price,
  } = props;
  const data = {
    booked, seatNumber, ticketId, routeId, price,
  };
  const [ticked, setTickets] = useState(false);

  const selectTicket = (ticketDetails) => {
    setSelected(ticketDetails);
    setTickets(true);
  };

  if (booked) {
    return (
      <div
        className="card rounded shadow d-flex align-items-center justify-content-center bg-danger"
        style={{ width: "50px", height: "50px", cursor: "not-allowed" }}
        title="Booked"
      >
        {seatNumber}
      </div>
    );
  }

  return (
    <div
      className={ticked
        ? "bg-primary card rounded shadow d-flex align-items-center justify-content-center"
        : "card rounded shadow d-flex align-items-center justify-content-center bg-secondary fs-4 text-light"}
      style={{ width: "50px", height: "50px", cursor: "pointer" }}
      title="Book Seat"
      onClick={ticked ? null : () => selectTicket(data)}
      onKeyDown={ticked ? null : () => selectTicket(data)}
    >
      {ticked ? (
        <BiCheck style={{ fontSize: "25px", color: "white" }} />
      ) : (
        seatNumber
      )}
    </div>
  );
};

export default Seat;
