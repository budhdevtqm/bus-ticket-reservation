import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import SeaterForm from "./SeaterForm";

const ConfirmSeats = ({
  modal,
  toggler,
  selectedSeats,
  setSelectedSeats,
  setModal,
  setSeatConfirmed,
}) => {
  return (
    <Modal isOpen={modal} toggle={toggler} fullscreen={true} scrollable={true}>
      <ModalHeader toggle={toggler}>Confirm Seats</ModalHeader>
      <ModalBody>
        <SeaterForm
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
          setModal={setModal}
          setSeatConfirmed={setSeatConfirmed}
        />
      </ModalBody>
    </Modal>
  );
};

export default ConfirmSeats;
