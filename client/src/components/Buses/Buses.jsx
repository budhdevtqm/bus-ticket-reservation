import React from "react";
import AllBus from "./AllBus";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Buses() {
  const user = localStorage.getItem("permissions");
  const navigate = useNavigate();

  return (
    <section
      style={{
        width: "100%",
        height: "100%",
      }}
      className="p-4"
    >
      <div className="d-flex align-items-center justify-content-between my-4">
        <h4> {user === "admin" ? "My Buses" : "All Buses"}</h4>
        <Button
          color="info"
          outline
          size="sm"
          onClick={() => navigate("/add-bus")}
        >
          Create
        </Button>
      </div>
      <div>
        <AllBus />
      </div>
    </section>
  );
}

export default Buses;
