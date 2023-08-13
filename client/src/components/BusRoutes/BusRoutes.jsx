import React, { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import { Toaster, toast } from "react-hot-toast";
import { MdMode, MdOutlineInfo, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, headerConfig } from "../../../config";
import { format } from "date-fns";
import { verifyStatus } from "../../common/utils";

function BusRoutes() {
  const user = "admin";
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();

  const getRealDate = (timeStamp) => {
    return format(timeStamp, "dd - MM - yyyy");
  };

  const getAllRoutes = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/bus-route/get-all`,
        headerConfig
      );
      const data = response.data.data;
      setRoutes(data);
    } catch (error) {
      verifyStatus(error.response.status, navigate);
    }
  };

  useEffect(() => {
    getAllRoutes();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/bus-route/${id}`,
        headerConfig
      );
      getAllRoutes();
      toast.success(response.data.message, { position: "top-right" });
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-right" });
      verifyStatus(error.response.status, navigate);
    }
  };

  const goToUpdate = (id) => {
    localStorage.setItem("routeId", id);
    navigate("/update-route");
  };

  return (
    <section
      style={{ width: "100%", height: "100" }}
      className="overflow-x-hidden overflow-y-scroll "
    >
      <div className="d-flex align-items-center justify-content-between my-4">
        <h4>Bus Route</h4>
        {user !== "user" && (
          <Button
            color="info"
            outline
            size="sm"
            onClick={() => navigate("/add-route")}
          >
            Add Route
          </Button>
        )}
      </div>
      <Table>
        <thead>
          <tr>
            <th>Bus No.</th>
            <th>From</th>
            <th>To</th>
            <th>Seats</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{route.from}</td>
              <td>{route.to}</td>
              <td>{`${route.availableSeats} / ${route.totalSeats}`}</td>
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
                    onClick={() => goToUpdate(route._id)}
                  />
                  <MdDelete
                    style={{
                      fontSize: "20px",
                      color: "red",
                      cursor: "pointer",
                    }}
                    title="Delete"
                    onClick={() => deleteHandler(route._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Toaster />
    </section>
  );
}

export default BusRoutes;
