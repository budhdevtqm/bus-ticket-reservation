import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import StripeCheckout from "react-stripe-checkout";
function Payment({ seats, modal, toggler }) {
  console.log(seats, "seats in the payment popup");
  return (
    <Modal isOpen={modal} toggle={toggler} fullscreen={true} scrollable={true}>
      <ModalHeader toggle={toggler}>Payment</ModalHeader>
      <ModalBody></ModalBody>
    </Modal>
  );
}

export default Payment;
