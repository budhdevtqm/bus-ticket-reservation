import React, { useState } from "react";
import { Table, Button } from "reactstrap";
import { Toaster, toast } from "react-hot-toast";
import { MdMode, MdOutlineInfo, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function BusRoutes() {
  const user = "admin";
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();

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
            <th>Total Seats</th>
            <th>Available Seats</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((bus, index) => (
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
    </section>
  );
}

export default BusRoutes;
