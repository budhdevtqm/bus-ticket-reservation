import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BASE_URL, headerConfig } from "../../../config";

function Profile() {
  const {
    _id: id,
    permissions,
    name,
  } = useSelector((state) => state.auth.user);
  console.log(id, permissions);

  const getTickets = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/tickets/get-my-tickets`,
        headerConfig
      );
      console.log(response);
    } catch (error) {}
  };

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <section style={{ width: "100%", height: "100%" }}>
      <div className="d-flex align-items-center justify-content-between my-4 p-4">
        <h4>{`Hi, ${name}`}</h4>
      </div>

      <div>
        <h4>Tickets</h4>
      </div>
    </section>
  );
}

export default Profile;
