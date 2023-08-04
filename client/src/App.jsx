import { Fragment } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./components/Auth/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/Auth/Signup";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Redirect from="/" to="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
