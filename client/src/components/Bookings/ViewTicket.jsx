import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { BASE_URL, headerConfig } from "../../../config";
import { verifyStatus } from "../../common/utils";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Toaster, toast } from "react-hot-toast";

const ViewTicket = (props) => {
  const { modal, toggler, ticketId } = props;
  const [ticket, setTicket] = useState({});
  const navigate = useNavigate();
  const getTicketData = async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/tickets/ticket-details/${id}`
      );
      const {
        _doc,
        busNo,
        currency,
        date,
        from,
        to,
        model,
        payment_type,
        startTime,
        transactionId,
      } = response.data.data;

      setTicket({
        busNo,
        currency,
        date,
        from,
        to,
        model,
        payment_type,
        startTime,
        transactionId,
        ..._doc,
      });
    } catch (error) {
      verifyStatus(error.response.status, navigate);
    }
  };

  useEffect(() => {
    if (ticketId) {
      getTicketData(ticketId);
    }
  }, [ticketId]);

  const getDate = (stamp, type) => {
    stamp = stamp - 19800000;
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
      >{`${ticket?.model} (${ticket?.busNo})`}</ModalHeader>
      <ModalBody>
        <div className="d-flex align-items-center my-1">
          <span style={{ width: "50%" }}>Booking</span>
          <b style={{ width: "50%" }}>{getDate(ticket?.bookedOn, "full")}</b>
        </div>

        <div className="d-flex align-items-center my-1">
          <span style={{ width: "50%" }}>Seat Number</span>
          <b style={{ width: "50%" }}>{ticket?.seatNumber}</b>
        </div>

        <div className="d-flex align-items-center my-1">
          <span style={{ width: "50%" }}>Date & Time</span>
          <b style={{ width: "50%" }}>{`${getDate(
            ticket?.date,
            "date"
          )} [${getDate(ticket?.startTime, "time")}]`}</b>
        </div>

        <div className="d-flex align-items-center my-1">
          <span style={{ width: "50%" }}>Rute</span>
          <b
            style={{ width: "50%" }}
          >{`[${ticket?.from}] To [${ticket?.to}]`}</b>
        </div>

        <div className="d-flex align-items-center my-1">
          <span style={{ width: "50%" }}>Assigned To</span>
          <b style={{ width: "50%" }}>{ticket?.seaterName}</b>
        </div>

        <h4 className="bg-info text-center rounded py-1 my-2">
          Payment Details
        </h4>

        <div className="d-flex align-items-center my-1">
          <span style={{ width: "50%" }}>Payment type</span>
          <b style={{ width: "50%" }}>{ticket?.payment_type}</b>
        </div>

        <div className="d-flex align-items-center my-1">
          <span style={{ width: "50%" }}>Payment ID</span>
          <b style={{ width: "50%" }}>{ticket?.paymentId}</b>
        </div>
      </ModalBody>
      <ModalFooter>
        {ticket?.startTime - 19800000 > new Date().getTime() ? (
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
