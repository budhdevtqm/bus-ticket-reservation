import React, { useEffect } from "react";
import { Table, Button } from "reactstrap";
import { MdMode, MdOutlineInfo, MdDelete } from "react-icons/md";
import { BsFillArrowUpRightSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  beforeDelete, verifyStatus, getTime, getDate,
} from "../../common/utils";
import { handleDelete, handleFetch } from "../../Redux/slices/commonThunks";

const BusRoutes = () => {
  const { routes } = useSelector((state) => state.routes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const permissions = localStorage.getItem("permissions");

  const goToView = (id) => {
    localStorage.setItem("busRouteId", id);
    navigate("/view-route");
  };

  const getAllRoutes = async () => {
    const response = await dispatch(handleFetch("/bus-route/get-all"));
    if (response.type === "/fetch/rejected") {
      verifyStatus(response.payload.response.status, navigate);
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
    Swal.fire({ ...beforeDelete }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await dispatch(handleDelete(`/bus-route/${id}`));
        console.log(response, "response-----");
      }
    });
  };

  const goToUpdate = (id) => {
    localStorage.setItem("routeId", id);
    navigate("/update-route");
  };

  const routeOptions = (role, startTime, id) => {
    const adminsNavigation = (
      <>
        <MdOutlineInfo
          style={{
            fontSize: "25px",
            color: "#1b1bb9",
            cursor: "pointer",
          }}
          title="Info"
          onClick={() => goToView(id)}
        />

        <MdMode
          style={{
            fontSize: "25px",
            color: "green",
            cursor: "pointer",
          }}
          title="Update"
          onClick={() => goToUpdate(id)}
        />
        <MdDelete
          style={{
            fontSize: "25px",
            color: "red",
            cursor: "pointer",
          }}
          title="Delete"
          onClick={() => deleteHandler(id)}
        />
      </>
    );

    const userNavigation = (
      <BsFillArrowUpRightSquareFill
        style={{
          fontSize: "25px",
          color: "#1b1bb9",
          cursor: "pointer",
        }}
        title="Info"
        onClick={() => goToView(id)}
      />
    );

    if (role === "user") {
      if (startTime - 19800000 > new Date().getTime()) return userNavigation;
      return <span className="text-danger font-weight-bold">Expired</span>;
    }

    return adminsNavigation;
  };

  // eslint-disable-next-line react/jsx-no-useless-fragment
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
          {routes.length > 0 && routes.map(({
            _id: id, from, to, startTime, endTime, date,
          }) => (
            <tr key={id}>
              <td className="text-center">
                {`${from}  [${getTime(startTime !== false && true)}]`}
              </td>
              <td className="text-center">
                {`${to}  [${getTime(endTime)}]`}
              </td>
              <td className="text-center">
                {getDate(date)}
              </td>
              <td>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  {routeOptions(permissions, startTime, id)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
};

export default BusRoutes;

// Swal.fire({
//   title: "Are you sure?",
//   text: "You won't be able to revert this!",
//   icon: "warning",
//   showCancelButton: true,
//   confirmButtonColor: "#3085d6",
//   cancelButtonColor: "#d33",
//   confirmButtonText: "Yes, delete it!",
// }).then(async (result) => {
//   if (result.isConfirmed) {
//     console.log(id, "id");
//     // try {
//     //   await axios.delete(
//     //     `${BASE_URL}/bus-route/${id}`,
//     //     headerConfig,
//     //   );
//     //   getAllRoutes();
//     //   Swal.fire("Deleted!", "Deleted.", "success");
//     // } catch (error) {
//     //   Swal.fire("Unable to delete!", "Something went wrong.", "error");
//     //   verifyStatus(error.response.status, navigate);
//     // }
//   }
// });
