import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { BASE_URL, headerConfig } from "../../../config";
import { verifyStatus } from "../../common/utils";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const ViewTicket = (props) => {
  console.log(props);
  const [ticket, setTickets] = useState("");
  const [bus, setBus] = useState("");
  const [rute, setRute] = useState("");
  const { modal, toggler } = props;
  const ticketId = localStorage.getItem("ticket-id");
  const navigate = useNavigate();

  const getTicketDetails = async (id) => {
    try {
      const ticketResponse = await axios.get(
        `${BASE_URL}/tickets/ticket/${id}`,
        headerConfig
      );
      const ticketData = ticketResponse.data.data;
      setTickets(ticketData);

      const busResponse = await axios.get(
        `${BASE_URL}/bus/${ticketData.busId}`,
        headerConfig
      );
      const busDetails = busResponse.data.bus;
      setBus(busDetails);

      const ruteResponse = await axios.get(
        `${BASE_URL}/bus-route/get-route/${ticketData.routeId}`,
        headerConfig
      );
      const ruteDetails = ruteResponse.data.data;
      setRute(ruteDetails);
    } catch (error) {
      verifyStatus(error.response.status, navigate);
    }
  };

  useEffect(() => {
    if (ticketId) {
      getTicketDetails(ticketId);
    }
  }, []);

  const getDate = (stamp, type) => {
    const strArr = new Date(stamp).toString().split(" ");
    let date, time;
    if (type === "date") {
      date = `${strArr[0]} ${strArr[1]} ${strArr[2]} ${strArr[3]}`;
      return date;
    }
    if (type === "time") {
      const splitedTime = strArr[4].split(":");
      time = `${splitedTime[0]} : ${splitedTime[1]}`;
      return time;
    }

    if (type === "full") {
      const splitedTime = strArr[4].split(":");
      return `${strArr[0]} ${strArr[1]} ${strArr[2]} ${strArr[3]} [${splitedTime[0]} : ${splitedTime[1]}]`;
    }
  };

  const cancelHandler = async (id) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/tickets/cancel-ticket/${id}`,
        headerConfig
      );
      debugger;

      console.log(response.data.message, "resp");
    } catch (error) {
      console.log(error, "cancel-er");
    }
  };

  return (
    <>
      {bus && rute && ticket && (
        <Modal isOpen={modal} toggle={toggler}>
          <ModalHeader
            toggle={toggler}
          >{`${bus?.model} (${bus?.busNo})`}</ModalHeader>
          <ModalBody>
            <div className="d-flex align-items-center my-1">
              <span style={{ width: "50%" }}>Date</span>
              <b style={{ width: "50%" }}>{format(rute?.date, "dd-MM-yy")}</b>
            </div>
            <div className="d-flex align-items-center  my-1">
              <span style={{ width: "50%" }}>Time</span>
              <b style={{ width: "50%" }}>{`[${getDate(
                rute?.startTime,
                "time"
              )}] - [${getDate(rute?.endTime, "time")}]`}</b>
            </div>
            <div className="d-flex align-items-center my-1">
              <span style={{ width: "50%" }}>Booked On</span>
              <b style={{ width: "50%" }}>
                {getDate(ticket?.bookedOn, "full")}
              </b>
            </div>
            <div className="d-flex align-items-center my-1">
              <span style={{ width: "50%" }}>Price</span>
              <b style={{ width: "50%" }}>{`₹ ${rute?.ticketPrice}`}</b>
            </div>
            <div className="d-flex align-items-center my-1">
              <span style={{ width: "50%" }}>Seat Number</span>
              <b style={{ width: "50%" }}>{ticket?.seatNumber}</b>
            </div>
          </ModalBody>
          <ModalFooter>
            {rute?.startTime > new Date().getTime() ? (
              <Button color="danger" onClick={() => cancelHandler(ticket?._id)}>
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
      )}
    </>
  );
};

export default ViewTicket;
