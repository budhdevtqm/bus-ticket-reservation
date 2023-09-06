import React from "react";
import ChangePasswordForm from "./ChangePasswordForm";
import UserInfo from "./UserInfo";

const Profile = () => (
  <section
    style={{
      width: "100%",
      height: "100%",
    }}
  >
    <div
      style={{ width: "100%" }}
      className="d-flex align-items-center justify-content-center flex-column"
    >
      <UserInfo />
      <ChangePasswordForm />
    </div>
  </section>
);

export default Profile;
