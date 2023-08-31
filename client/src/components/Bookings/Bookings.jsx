import React, { useState, useEffect } from "react";
import { verifyStatus } from "../../common/utils";
import axios from "axios";
import { BASE_URL, headerConfig } from "../../../config";
import { useNavigate } from "react-router-dom";
import { Table } from "reactstrap";
import ViewTicket from "./ViewTicket";
import { BsFillInfoCircleFill } from "react-icons/bs";
const Bookings = (props) => {
  const [tickets, setTickets] = useState([]);
  const [showTicket, setShowTicket] = useState(null);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const toggler = () => setModal(!modal);

  const getMyTickets = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/tickets/get-my-tickets`,
        headerConfig
      );
      setTickets(response.data.data);
    } catch (error) {
      verifyStatus(error.response.status, navigate);
    }
  };

  const viewTicket = (ticketData) => {
    setShowTicket(ticketData);
    setModal(true);
  };

  const cancelHandler = async (id) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/tickets/cancel-ticket/${id}`,
        headerConfig
      );
      setModal(false);
      getMyTickets();
      toast.success(response.data.message, { position: "top-right" });
    } catch (error) {
      verifyStatus(error.response.status, navigate);
      toast.error(error.response.data.message, { position: "top-right" });
    }
  };

  const getTimeString = (stamp) => new Date(stamp).toString().split(" ");

  useEffect(() => {
    getMyTickets();
    localStorage.removeItem("ticket-id");
  }, []);

  return (
    <section className="p-4" style={{ width: "100%", height: "100%" }}>
      <ViewTicket
        toggler={toggler}
        setModal={setModal}
        ticket={showTicket}
        modal={modal}
        cancelHandler={cancelHandler}
      />
      <h4 className="text-center bg-info p-2 rounded">Tickets</h4>
      <div className="my-4">
        <Table>
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Date</th>
              <th className="text-center"> Seat No.</th>
              <th className="text-center">Booking Time</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id} style={{ cursor: "pointer" }}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{`${
                  getTimeString(ticket.bookedOn)[2]
                } ${getTimeString(ticket.bookedOn)[1]} ${
                  getTimeString(ticket.bookedOn)[3]
                }`}</td>
                <td className="text-center">{ticket.seatNumber}</td>
                <td className="text-center">{`${
                  getTimeString(ticket.bookedOn)[4].split(":")[0]
                } : ${getTimeString(ticket.bookedOn)[4].split(":")[1]}`}</td>
                <td className="text-center">
                  <BsFillInfoCircleFill
                    style={{ fontSize: "25px" }}
                    onClick={() => viewTicket(ticket)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </section>
  );
};

export default Bookings;
