import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { MdMode, MdOutlineInfo, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { BASE_URL, headerConfig } from "../../config";
import ViewBus from "./ViewBus";
import { verifyStatus } from "../../common/utils";

const AllBus = () => {
  const permissions = localStorage.getItem("permissions");
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [modal, setModal] = useState(false);
  const [bus, setBus] = useState({});

  const getAllBuses = async () => {
    try {
      const busesResponse = await axios.get(
        `${BASE_URL}/bus/all-buses`,
        headerConfig,
      );
      const busData = busesResponse.data.data;
      setBuses(busData);
    } catch (error) {
      verifyStatus(error.response.status, navigate);
    }
  };

  const getMyBuses = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/bus/my-buses`,
        headerConfig,
      );
      setBuses(response.data.data);
    } catch (error) {
      verifyStatus(error.response.status, navigate);
    }
  };

  const showModal = (modalData) => {
    setBus(modalData);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setBus({});
  };

  const getRealDate = (timeStamp) => format(timeStamp, "dd - MM - yyyy");

  const goToUpdate = (busId) => {
    localStorage.setItem("busId", busId);
    navigate("/update-bus");
  };

  const deleteHandler = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${BASE_URL}/bus/${id}`,
            headerConfig,
          );
          Swal.fire("Deleted!", "deleted successfully.", "success");
          if (permissions === "superAdmin") {
            getAllBuses();
          } else {
            getMyBuses();
          }
        } catch (error) {
          Swal.fire("Unable to delete!", "Something went wrong.", "error");
          verifyStatus(error.response.status, navigate);
        }
      }
    });
  };

  useEffect(() => {
    if (permissions === "superAdmin") {
      getAllBuses();
      localStorage.removeItem("busId");
    }
    if (permissions === "admin") {
      getMyBuses();
      localStorage.removeItem("busId");
    }
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
          {buses.map(({
            _id: id, busNo, manufacturer, model, createdAt,
          }, index) => (
            <tr key={id}>
              <td>{index + 1}</td>
              <td>{busNo}</td>
              <td>{manufacturer}</td>
              <td>{model}</td>
              <td>{getRealDate(createdAt)}</td>
              <td>
                <div className="d-flex align-items-center justify-content-start gap-2">
                  <MdOutlineInfo
                    style={{
                      fontSize: "22px",
                      color: "#0dcaf0",
                      cursor: "pointer",
                    }}
                    title="Info"
                    onClick={() => showModal({
                      id, busNo, manufacturer, model, createdAt,
                    })}
                  />

                  <MdMode
                    style={{
                      fontSize: "20px",
                      color: "green",
                      cursor: "pointer",
                    }}
                    title="Update"
                    onClick={() => goToUpdate(id)}
                  />
                  <MdDelete
                    style={{
                      fontSize: "20px",
                      color: "red",
                      cursor: "pointer",
                    }}
                    title="Delete"
                    onClick={() => deleteHandler(id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllBus;
