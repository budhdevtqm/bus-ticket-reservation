import React from "react";
import BusRoutes from "../BusRoutes/BusRoutes";
import { useSelector } from "react-redux";

const Home = () => {
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
