import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL, headerConfig } from "../../../config";
import { verifyStatus } from "../../common/utils";
import { useNavigate } from "react-router-dom";
import { BiSolidBus } from "react-icons/bi";
import Seat from "./Seat";

function ViewRoute() {
  const [route, setRoute] = useState({});
  const [busDeatils, setBusDetails] = useState({});

  const navigate = useNavigate();

  const getTotalSeats = (total) => {
    let array = [];
    for (let i = 1; i <= total; i++) {
      array.push(i);
    }
    return array;
  };

  console.log(busDeatils);

  const getRouteDetails = async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/bus-route/get-route/${id}`,
        headerConfig
      );
      const data = response.data.data;
      setRoute(data);

      const busId = response.data.data.busId;
      const busInfo = await axios.get(`${BASE_URL}/bus/${busId}`, headerConfig);
      const busData = busInfo.data.bus;
      setBusDetails(busData);
    } catch (error) {
      verifyStatus(error.response.status, navigate);
    }
  };

  useEffect(() => {
    const routeId = localStorage.getItem("busRouteId");
    if (routeId) {
      getRouteDetails(routeId);
    }
  }, []);

  return (
    <section style={{ width: "100%", height: "100%" }}>
      <div className="d-flex flex-column p-4">
        <h4>Book Ticket</h4>
        <div style={{ width: "100%" }} className="my-4 card p-4 color-danger">
          <div className="d-flex">
            <div
              style={{ width: "40%" }}
              className="d-flex align-items-center justify-content-center flex-column"
            >
              <BiSolidBus style={{ fontSize: "300px", color: "dodgerblue" }} />
              <b className="rounded p-3 bg-warning"> {busDeatils.busNo}</b>
            </div>
            <div style={{ width: "60%" }} className="right"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ViewRoute;
