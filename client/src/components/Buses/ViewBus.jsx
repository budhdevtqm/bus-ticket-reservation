import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const ViewBus = ({ modal, bus, closeModal }) => {
  const { busNo, manufacturer, model, createdBy, createdAt, updatedAt } = bus;
  const { permissions } = useSelector((state) => state.auth.user);

  const getRealDate = (timeStamp) => {
    return format(timeStamp, "dd - MM - yyyy");
  };

  return (
    <div>
      <Modal isOpen={modal}>
        <ModalHeader toggle={closeModal}>{busNo}</ModalHeader>
        <ModalBody>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-nowrap align-item-center justify-content-evenly">
              <span style={{ width: "50%" }}>Manufactured By</span>
              <span style={{ width: "50%", textAlign: "center" }}>
                <b>{manufacturer}</b>
              </span>
            </div>

            <div className="d-flex flex-nowrap align-item-center justify-content-evenly">
              <span style={{ width: "50%" }}>Model</span>
              <span style={{ width: "50%", textAlign: "center" }}>
                <b>{model}</b>
              </span>
            </div>

            <div className="d-flex flex-nowrap align-item-center justify-content-evenly">
              <span style={{ width: "50%" }}>Created</span>
              <span style={{ width: "50%", textAlign: "center" }}>
                <b>{createdAt && getRealDate(createdAt)}</b>
              </span>
            </div>

            <div className="d-flex flex-nowrap align-item-center justify-content-evenly">
              <span style={{ width: "50%" }}>Last Updated</span>
              <span style={{ width: "50%", textAlign: "center" }}>
                <b>{updatedAt && getRealDate(updatedAt)}</b>
              </span>
            </div>

            {permissions === "superAdmin" && (
              <div className="d-flex flex-nowrap align-item-center justify-content-evenly">
                <span style={{ width: "50%" }}>Created By</span>
                <span style={{ width: "50%", textAlign: "center" }}>
                  <b>{createdBy}</b>
                </span>
              </div>
            )}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ViewBus;
