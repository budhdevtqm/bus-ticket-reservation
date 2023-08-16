import React, { useState } from "react";
import { BiCheck } from "react-icons/bi";

function Seat(props) {
  const { setSelected, booked, seatNumber, _id: id } = props;
  const [ticked, setTickets] = useState(false);

  const selectTicket = (data) => {
    setSelected(data);
    console.log(data._id, "ticket-id");
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
      className={
        ticked
          ? "bg-primary card rounded shadow d-flex align-items-center justify-content-center"
          : "card rounded shadow d-flex align-items-center justify-content-center bg-secondary fs-4 text-light"
      }
      style={{ width: "50px", height: "50px", cursor: "pointer" }}
      title="Book Seat"
      onClick={ticked ? null : () => selectTicket(props)}
    >
      {ticked ? (
        <BiCheck style={{ fontSize: "25px", color: "white" }} />
      ) : (
        seatNumber
      )}
    </div>
  );
}

export default Seat;
