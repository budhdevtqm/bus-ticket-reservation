import React from "react";
import BusRoutes from "../BusRoutes/BusRoutes";

const Home = () => {
  return (
    <section
      style={{
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        overflowY: "scroll",
      }}
      className="p-4"
    >
      <BusRoutes />
    </section>
  );
};

export default Home;
