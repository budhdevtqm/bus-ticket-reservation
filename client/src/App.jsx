import { Fragment, useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/layout/Layout";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Users from "./components/Users/Users";
import User from "./components/Users/User";
import UserForm from "./components/Users/UserForm";
import Buses from "./components/Buses/Buses";
import BusForm from "./components/Buses/BusForm";
import ViewBus from "./components/Buses/ViewBus";
import RouteForm from "./components/BusRoutes/RouteForm";

function App() {
  useEffect(() => {}, []);
  return (
    <Fragment>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Layout />}>
          {/* Home */}
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add-route" element={<RouteForm />} />
          <Route path="/update-route" element={<RouteForm />} />

          {/* Bus Routes */}
          <Route path="/buses" element={<Buses />} />
          <Route path="/add-bus" element={<BusForm />} />
          <Route path="/update-bus" element={<BusForm />} />
          <Route path="view-bus" element={<ViewBus />} />

          {/* User Routes */}
          <Route path="/users" element={<Users />} />
          <Route path="/create-user" element={<UserForm />} />
          <Route path="/update-user" element={<UserForm />} />
          <Route path="/view-user/:id" element={<User />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
