import { Fragment, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import ViewRoute from "./components/BusRoutes/ViewRoute";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, headerConfig } from "../config";
import Profile from "./components/Profile/Profile";
import axios from "axios";
import { setUser } from "./Store/authSlice";

function App() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const checkToken = async () => {
    const response = await axios.get(
      `${BASE_URL}/auth/checkToken`,
      headerConfig
    );
    dispatch(setUser(response.data.data));
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkToken();
    }
  }, []);

  return (
    <Fragment>
      <Routes>
        {!isLoggedIn && <Route path="/" element={<Auth />} />}
        {isLoggedIn && (
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
          </Route>
        )}
      </Routes>
    </Fragment>
  );
}

export default App;
