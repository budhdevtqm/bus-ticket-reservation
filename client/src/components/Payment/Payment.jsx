import React, { useState } from "react";
// import SeaterForm from "./SeaterForm";

function Payment() {
  const [tickets, setTickets] = useState(
    JSON.parse(localStorage.getItem("selectedTickets"))
  );
  return <section></section>;
}

export default Payment;
