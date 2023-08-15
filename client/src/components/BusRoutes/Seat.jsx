import React, { useState } from "react";
import { BiCheck } from "react-icons/bi";

function Seat({}) {
  const [selected, setSelected] = useState(true);
  const seatNumber = 1;
  let booked = false;

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

  /*
  
  {
      busId: busId,
      routeId: "",
      assignedTo: "",
      isCanceled: false,
      booked: false,
      seatNumber: 0,
      bookedOn: 0,
    }
  */
  return (
    <div
      className="card rounded shadow d-flex align-items-center justify-content-center bg-success
        fs-4 text-light"
      style={{ width: "50px", height: "50px", cursor: "pointer" }}
      title="Add Seat"
    >
      {selected ? <BiCheck /> : seatNumber}
    </div>
  );
}

export default Seat;
