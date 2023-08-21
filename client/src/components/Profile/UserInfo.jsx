import React, { useEffect, useState } from "react";
import { BASE_URL, headerConfig } from "../../../config";
import { verifyStatus } from "../../common/utils";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserInfo() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/users/my-info`,
        headerConfig
      );
      setUser(response.data.data);
    } catch (error) {
      verifyStatus(error.response.status, navigate);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div style={{ width: "100%" }} className="p-4 my-4">
      <div
        style={{ width: "100%" }}
        className="d-flex px-4 align-items-center justify-content-between"
      >
        <h4>Hi, {user?.name}</h4>
        <span>{user.email}</span>
      </div>
    </div>
  );
}

export default UserInfo;
