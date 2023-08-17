import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import UserProfile from "./UserProfile";

function Profile() {
  const {
    _id: id,
    permissions,
    name,
  } = useSelector((state) => state.auth.user);

  return (
    <section
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div className="d-flex flex-col p-4">
        <h4>{`Hi, ${name}`}</h4>
      </div>

      {permissions === "user" && <UserProfile userId={id} />}
    </section>
  );
}

export default Profile;
