import React from "react";
import { Outlet } from "react-router-dom";
import "./layout.css";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => (
  <div className="layout-wrapper">
    <header className="d-flex align-item-center justify-content-center bg-white">
      <Header />
    </header>
    <main className="overflow-x-hidden overflow-y-scroll">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
