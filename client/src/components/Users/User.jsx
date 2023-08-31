import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { BASE_URL, headerConfig } from "../../../config";
import { useNavigate } from "react-router-dom";
import { verifyStatus } from "../../common/utils";

const User = ({ modal, toggler }) => {
  const [user, setUser] = useState("");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const getUser = async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/users/get-user/${id}`,
        headerConfig
      );
      setUser(response.data.data);
    } catch (error) {
      verifyStatus(error.response.status, navigate);
    }
  };

  const getDate = (timestamp) => {
    if (timestamp) {
      const string = new Date(timestamp).toString().split(" ");
      return `${string[2]} ${string[1]} ${string[3]}`;
    }
    return "";
  };

  useEffect(() => {
    if (userId) {
      getUser(userId);
    }
  }, [userId]);
  return (
    <Modal isOpen={modal} toggle={toggler}>
      <ModalHeader toggle={toggler}>User Information</ModalHeader>
      <ModalBody>
        <div className="d-flex flex-row my-4">
          <span style={{ width: "50%" }}>Full Name</span>
          <b style={{ width: "50%" }}>{user.name}</b>
        </div>
        <div className="d-flex flex-row my-4">
          <span style={{ width: "50%" }}>Email</span>
          <b style={{ width: "50%" }}>{user.email}</b>
        </div>
        <div className="d-flex flex-row my-4">
          <span style={{ width: "50%" }}>Joined On</span>
          <b style={{ width: "50%" }}>{getDate(user.createdAt)}</b>
        </div>
        <div className="d-flex flex-row my-4">
          <span style={{ width: "50%" }}>Last Updated</span>
          <b style={{ width: "50%" }}>
            {user.updatedAt ? getDate(user.updatedAt) : "N/A"}
          </b>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default User;
