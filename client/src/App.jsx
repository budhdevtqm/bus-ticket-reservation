import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/Home/Home";
import Users from "./components/Users/Users";
import User from "./components/Users/User";
import UserForm from "./components/Users/UserForm";
import Buses from "./components/Buses/Buses";
import BusForm from "./components/Buses/BusForm";
import ViewBus from "./components/Buses/ViewBus";
import RouteForm from "./components/BusRoutes/RouteForm";
import ViewRoute from "./components/BusRoutes/ViewRoute";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Bookings from "./components/Bookings/Bookings";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Layout />}>
          {/* Home */}
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/add-route" element={<RouteForm />} />
          <Route path="/update-route" element={<RouteForm />} />
          <Route path="/view-route" element={<ViewRoute />} />

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

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />

          {/* Bookings */}
          <Route path="/bookings" element={<Bookings />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
