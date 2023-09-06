import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Table } from 'reactstrap';
import { format } from 'date-fns';
import { BASE_URL, headerConfig } from '../../config';
import ViewTicket from './ViewTicket';
import { verifyStatus } from '../../common/utils';

const Bookings = () => {
  const [tickets, setTickets] = useState([]);
  const [ticketId, setTicketId] = useState(null);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const toggler = () => setModal(!modal);

  const getMyTickets = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/tickets/get-my-tickets`,
        headerConfig,
      );
      setTickets(response.data.data);
    } catch (error) {
      verifyStatus(error.response.status, navigate);
    }
  };

  const viewTicket = (id) => {
    setTicketId(id);
    setModal(true);
  };

  const cancelHandler = async (id) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/tickets/cancel/${id}`,
        {
          isCanceled: true,
        },
        headerConfig,
      );
      setModal(false);
      getMyTickets();
      toast.success(response.data.message, { position: 'top-right' });
    } catch (error) {
      verifyStatus(error.response.status, navigate);
      toast.error(error.response.data.message, { position: 'top-right' });
    }
  };

  const getDateStr = (timeStamp) => {
    if (timeStamp) {
      return format(timeStamp - 19800000, 'dd MMM yy');
    } return '';
  };

  const getTimeString = (timeStamp) => {
    if (timeStamp) {
      const string = new Date(timeStamp).toString();
      const [hours, minutes] = string.split(' ')[4].split(':');
      return `${hours} : ${minutes}`;
    } return '';
  };

  useEffect(() => {
    getMyTickets();
    localStorage.removeItem('ticket-id');
  }, []);

  return (
    <section className="p-4" style={{ width: '100%', height: '100%' }}>
      <Toaster />
      <ViewTicket
        toggler={toggler}
        setModal={setModal}
        ticketId={ticketId}
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
            {tickets.map(({
              _id: id,
              bookedOn,
              seatNumber,
            }, index) => (
              <tr key={id} style={{ cursor: 'pointer' }}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">
                  {
                    getDateStr(bookedOn)
                  }
                </td>
                <td className="text-center">{seatNumber}</td>
                <td className="text-center">
                  {
                    getTimeString(bookedOn)
                  }
                </td>
                <td className="text-center">
                  <BsFillInfoCircleFill
                    style={{ fontSize: '25px' }}
                    onClick={() => viewTicket(id)}
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
