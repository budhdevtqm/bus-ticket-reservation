import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BASE_URL, headerConfig } from "../../../config";
import UserProfile from "./UserProfile";

function Profile() {
  const {
    _id: id,
    permissions,
    name,
  } = useSelector((state) => state.auth.user);

  const getTickets = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/tickets/get-my-tickets`,
        headerConfig
      );
      console.log(response, "response");
    } catch (error) {
      console.log(error, "er");
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <section style={{ width: "100%", height: "100%" }}>
      <div className="d-flex align-items-center justify-content-between my-4 p-4">
        <h4>{`Hi, ${name}`}</h4>
      </div>

      <UserProfile />
    </section>
  );
}

export default Profile;
