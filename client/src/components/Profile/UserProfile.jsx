import React, { useState, useEffect } from "react";
import { verifyStatus } from "../../common/utils";
import axios from "axios";
import { BASE_URL, headerConfig } from "../../../config";
import { useNavigate } from "react-router-dom";
import { Table } from "reactstrap";
import ViewTicket from "./ViewTicket";
import { BsFillInfoCircleFill } from "react-icons/bs";

const UserProfile = (props) => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const toggler = () => setModal(!modal);

  const getTickets = async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/tickets/get-my-tickets/${id}`,
        headerConfig
      );
      setTickets(response.data.data);
    } catch (error) {
      verifyStatus(error.response.status, navigate);
    }
  };

  const viewTicket = (id) => {
    localStorage.setItem("ticket-id", id);
    setModal(true);
  };

  const getTimeString = (stamp) => new Date(stamp).toString().split(" ");

  useEffect(() => {
    getTickets(props.userId);
    localStorage.removeItem("token-id");
  }, []);

  console.log(modal, "modal");

  return (
    <div className="p-4" style={{ width: "100%" }}>
      <ViewTicket toggler={toggler} setModal={setModal} modal={modal} />
      <h4 className="text-center bg-info p-2 rounded">Tickets</h4>
      <div className="my-4">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Cancelled</th>
              <th> Seat No.</th>
              <th>Booking Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id} style={{ cursor: "pointer" }}>
                <td>{index + 1}</td>
                <td>{`${getTimeString(ticket.bookedOn)[2]} ${
                  getTimeString(ticket.bookedOn)[1]
                } ${getTimeString(ticket.bookedOn)[3]}`}</td>
                <td>{ticket.isCanceled ? "Yes" : "No"}</td>
                <td>{ticket.seatNumber}</td>
                <td>{`${getTimeString(ticket.bookedOn)[4].split(":")[0]} : ${
                  getTimeString(ticket.bookedOn)[4].split(":")[1]
                }`}</td>
                <td>
                  <BsFillInfoCircleFill
                    style={{ fontSize: "25px" }}
                    onClick={() => viewTicket(ticket._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default UserProfile;
