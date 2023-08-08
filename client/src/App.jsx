import { Fragment } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/layout/Layout";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Users from "./components/Users/Users";
import User from "./components/Users/User";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />}>
            <Route path=":id" element={<User />} />
          </Route>
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
