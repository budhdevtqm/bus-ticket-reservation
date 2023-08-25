import React, { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import { Toaster, toast } from "react-hot-toast";
import { MdMode, MdOutlineInfo, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, headerConfig } from "../../../config";
import { format, milliseconds } from "date-fns";
import { verifyStatus } from "../../common/utils";
import { BsFillArrowRightSquareFill } from "react-icons/bs";

function BusRoutes() {
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();
  const permissions = localStorage.getItem("permissions");

  const goToView = (id) => {
    localStorage.setItem("busRouteId", id);
    navigate("/view-route");
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

  const decideHeading = (role) => {
    if (role === "user") return "Bus Routes";
    if (role === "admin") return "My Routes";
    return "All Routes";
  };

  useEffect(() => {
    getAllRoutes();
    localStorage.removeItem("routeId");
    localStorage.removeItem("busRouteId");
    decideHeading(permissions);
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

  const getTime = (milliseconds) => {
    const [h, m] = new Date(milliseconds).toString().split(" ")[4].split(":");
    return `${h} : ${m}`;
  };

  const goToUpdate = (id) => {
    localStorage.setItem("routeId", id);
    navigate("/update-route");
  };

  return (
    <section style={{ width: "100%", height: "100" }}>
      <div className="d-flex align-items-center justify-content-between my-4">
        <h4>{decideHeading(permissions)}</h4>
        {permissions !== "user" && (
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
            <th className="text-center">From</th>
            <th className="text-center">To</th>
            <th className="text-center">Date</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route, index) => (
            <tr key={index}>
              <td className="text-center">{`${route.from}  [${getTime(
                route.startTime
              )}]`}</td>
              <td className="text-center">{`${route.to}  [${getTime(
                route.endTime
              )}]`}</td>
              <td className="text-center">
                {format(route.date, "dd  MMM  yy")}
              </td>
              <td>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  {permissions === "user" ? (
                    <BsFillArrowRightSquareFill
                      style={{
                        fontSize: "25px",
                        color: "#1b1bb9",
                        cursor: "pointer",
                      }}
                      title="Book Ticket"
                      onClick={() => goToView(route._id)}
                    />
                  ) : (
                    <>
                      <MdOutlineInfo
                        style={{
                          fontSize: "25px",
                          color: "#1b1bb9",
                          cursor: "pointer",
                        }}
                        title="Info"
                        onClick={() => goToView(route._id)}
                      />

                      <MdMode
                        style={{
                          fontSize: "25px",
                          color: "green",
                          cursor: "pointer",
                        }}
                        title="Update"
                        onClick={() => goToUpdate(route._id)}
                      />
                      <MdDelete
                        style={{
                          fontSize: "25px",
                          color: "red",
                          cursor: "pointer",
                        }}
                        title="Delete"
                        onClick={() => deleteHandler(route._id)}
                      />
                    </>
                  )}
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
