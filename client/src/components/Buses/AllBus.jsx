import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { MdMode, MdOutlineInfo, MdDelete } from "react-icons/md";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, headerConfig } from "../../../config";
import { format } from "date-fns";
import { toast, Toaster } from "react-hot-toast";
import ViewBus from "./ViewBus";
import { useSelector } from "react-redux";

function AllBus() {
  const user = useSelector((state) => state.auth.user.permissions);
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [modal, setModal] = useState(false);
  const [bus, setBus] = useState({});

  const getAllBuses = async () => {
    const allBuses = await axios
      .get(`${BASE_URL}/bus/allBuses`, headerConfig)
      .then((response) => setBuses(response.data.data));
  };

  if (user === "user") {
    navigate("/");
  }

  const showModal = (bus) => {
    setBus(bus);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setBus({});
  };

  const getRealDate = (timeStamp) => {
    return format(timeStamp, "dd - MM - yyyy");
  };

  const goToUpdate = (busId) => {
    localStorage.setItem("busId", busId);
    navigate("/update-bus");
  };

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/bus/${id}`,
        headerConfig
      );
      toast.success(response.data.message, { position: "top-right" });
      if (user === "superAdmin") {
        getAllBuses();
      }
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-right" });
    }
  };

  useEffect(() => {
    if (user === "admin") {
    }
    if (user === "superAdmin") {
      getAllBuses();
    }
    localStorage.removeItem("busId");
  }, []);

  return (
    <div>
      <ViewBus
        modal={modal}
        setModal={setModal}
        showModal={showModal}
        closeModal={closeModal}
        bus={bus}
      />
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Bus No.</th>
            <th>Manufacturer</th>
            <th>Model</th>
            <th>Added At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{bus.busNo}</td>
              <td>{bus.manufacturer}</td>
              <td>{bus.model}</td>
              <td>{getRealDate(bus.createdAt)}</td>
              <td>
                <div className="d-flex align-items-center justify-content-start gap-2">
                  <MdOutlineInfo
                    style={{
                      fontSize: "22px",
                      color: "#0dcaf0",
                      cursor: "pointer",
                    }}
                    title="Info"
                    onClick={() => showModal(bus)}
                  />

                  <MdMode
                    style={{
                      fontSize: "20px",
                      color: "green",
                      cursor: "pointer",
                    }}
                    title="Update"
                    onClick={() => goToUpdate(bus._id)}
                  />
                  <MdDelete
                    style={{
                      fontSize: "20px",
                      color: "red",
                      cursor: "pointer",
                    }}
                    title="Delete"
                    onClick={() => deleteHandler(bus._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Toaster />
    </div>
  );
}

export default AllBus;
