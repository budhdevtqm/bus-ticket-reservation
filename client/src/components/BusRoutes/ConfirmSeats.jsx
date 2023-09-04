import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import SeaterForm from "./SeaterForm";
import Wrapper from "../layout/CheckoutForm";

const ConfirmSeats = ({
  modal,
  toggler,
  selectedSeats,
  setSelectedSeats,
  setModal,
  setSeatConfirmed,
  seatConfirmed,
  amount,
  setAmount
}) => {
  return (
    <Modal isOpen={modal} toggle={toggler} fullscreen scrollable>
      <ModalHeader toggle={toggler}>Confirm Seats</ModalHeader>
      <ModalBody>
        <div className="d-flex align-items-center justify-content-center">
          {seatConfirmed && (
            <Wrapper amount={amount} selectedSeats={selectedSeats} />
          )}
          {!seatConfirmed && (
            <SeaterForm
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              setModal={setModal}
              setSeatConfirmed={setSeatConfirmed}
              seatConfirmed={seatConfirmed}
              setAmount={setAmount}
            />
          )}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ConfirmSeats;
