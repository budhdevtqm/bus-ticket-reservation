import React from "react";
import BusRoutes from "../BusRoutes/BusRoutes";

const Home = (props) => {
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
