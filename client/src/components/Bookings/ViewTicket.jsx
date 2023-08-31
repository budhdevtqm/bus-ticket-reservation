import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { BASE_URL, headerConfig } from "../../../config";
import { verifyStatus } from "../../common/utils";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Toaster, toast } from "react-hot-toast";

const ViewTicket = (props) => {
  const [ticket, setTicket] = useState("");
  const [bus, setBus] = useState("");
  const [rute, setRute] = useState("");
  const { modal, toggler } = props;
  const ticketId = localStorage.getItem("ticket-id");
  const navigate = useNavigate();

  const getTicket = async (id) => {
    const response = await axios.get(
      `${BASE_URL}/tickets/ticket/${id}`,
      headerConfig
    );
    verifyStatus(response.status, navigate);
    setTicket(response.data.data);
    console.log(response.data.data, "----ticket-res");
    return response.data.data;
  };

  const getBus = async (id) => {
    const response = await axios.get(`${BASE_URL}/bus/${id}`, headerConfig);
    verifyStatus(response.status, navigate);
    console.log(response.data.data, "----bus-res");

    setBus(response.data.bus);
  };

  const getRoute = async (id) => {
    const response = await axios.get(
      `${BASE_URL}/bus-route/get-route/${id}`,
      headerConfig
    );
    verifyStatus(response.status, navigate);
    console.log(response.data.data, "----rute-res");
    setRute(response.data.data);
  };

  const getDetails = async (ticketId) => {
    const { busId, routeId } = await getTicket(ticketId);
    getBus(busId);
    getRoute(routeId);
  };

  useEffect(() => {
    if (ticketId) {
      getDetails(ticketId);
    }
  }, [ticketId]);

  const getDate = (stamp, type) => {
    if (stamp) {
      const strArr = new Date(stamp).toString().split(" ");
      if (type === "time") {
        const timeString = strArr[4].split(":");
        return `${timeString[0]} : ${timeString[1]}`;
      }
      if (type === "date") {
        return `${strArr[2]} ${strArr[1]} ${strArr[3]}`;
      }
      if (type === "full") {
        const timeString = strArr[4].split(":");
        return `${strArr[2]} ${strArr[1]} ${strArr[3]} [${timeString[0]} : ${timeString[1]}]`;
      }
    }
    return "";
  };

  return (
    <Modal isOpen={modal} toggle={toggler}>
      <Toaster />
      <ModalHeader
        toggle={toggler}
      >{`${bus?.model} (${bus?.busNo})`}</ModalHeader>
      <ModalBody>
        <div className="d-flex align-items-center my-1">
          <span style={{ width: "50%" }}>Date</span>
          <b style={{ width: "50%" }}>{getDate(rute?.date, "date")}</b>
        </div>
        <div className="d-flex align-items-center  my-1">
          <span style={{ width: "50%" }}>Time</span>
          <b style={{ width: "50%" }}>{`[${getDate(
            rute?.startTime,
            "time"
          )}] - [${getDate(rute?.endTime, "time")}]`}</b>
        </div>
        <div className="d-flex align-items-center my-1">
          <span style={{ width: "50%" }}>Booking</span>
          <b style={{ width: "50%" }}>{getDate(ticket?.bookedOn, "full")}</b>
        </div>
        <div className="d-flex align-items-center my-1">
          <span style={{ width: "50%" }}>Price</span>
          <b style={{ width: "50%" }}>{`₹ ${rute?.ticketPrice}`}</b>
        </div>
        <div className="d-flex align-items-center my-1">
          <span style={{ width: "50%" }}>Seat Number</span>
          <b style={{ width: "50%" }}>{ticket?.seatNumber}</b>
        </div>
        <div className="d-flex align-items-center my-1">
          <span style={{ width: "50%" }}>Journey</span>
          <b style={{ width: "50%" }}>{`${rute?.from}  To  ${rute?.to}`}</b>
        </div>
      </ModalBody>
      <ModalFooter>
        {rute?.startTime > new Date().getTime() ? (
          <Button
            color="danger"
            onClick={() => props.cancelHandler(ticket?._id)}
          >
            Cancel Ticket
          </Button>
        ) : (
          ""
        )}
        <Button color="secondary" onClick={toggler}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ViewTicket;
