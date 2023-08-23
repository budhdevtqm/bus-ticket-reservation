import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import SeaterForm from "./SeaterForm";

const ConfirmSeats = ({ modal, toggler, selectedSeats, setSelectedSeats }) => {
  return (
    <Modal isOpen={modal} toggle={toggler} fullscreen={true}>
      <ModalHeader toggle={toggler}>Confirm Seats</ModalHeader>
      <ModalBody>
        {selectedSeats.map((ticket) => (
          <SeaterForm
            key={ticket._id}
            ticket={ticket}
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
          />
        ))}
      </ModalBody>
      <ModalFooter>
        <Button>Payment</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmSeats;
