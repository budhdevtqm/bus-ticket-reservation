import React from "react";
import { useSelector } from "react-redux";
import BusRoutes from "../BusRoutes/BusRoutes";

const Home = () => {
  // const getall = () => { };
  const user = useSelector((state) => state.auth);
  console.log(user, "user");

  return (
    <section
      style={{
        width: "100%",
        height: "100%",
      }}
      className="p-4"
    >
      <BusRoutes />
    </section>
  );
};
export default Home;
