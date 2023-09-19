import React, { useEffect, useState } from "react";
import { Table, Button, Badge } from "reactstrap";
import { MdMode, MdOutlineInfo, MdDelete } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, headerConfig } from "../../config";
import User from "./User";
import { handleFetch } from "../../Redux/slices/commonThunks";
import { verifyStatus } from "../../common/utils";

const Users = () => {
  const { users } = useSelector((state) => state.users);

  const [modal, setModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggler = () => setModal(!modal);

  const chip = (permissions) => {
    if (permissions === "user") {
      return <Badge color="dark">{permissions}</Badge>;
    }
    if (permissions === "admin") {
      return <Badge color="secondary">{permissions}</Badge>;
    }

    return <Badge color="primary">{permissions}</Badge>;
  };

  const getUsers = async () => {
    const response = await dispatch(handleFetch("/users/get-all"));
    if (response.type === "/fetch/rejected") {
      verifyStatus(response.payload.response.status, navigate);
    }
  };

  const goToUpdate = (id) => {
    localStorage.setItem("userId", id);
    navigate("/update-user");
  };

  useEffect(() => {
    getUsers();
    localStorage.removeItem("userId");
  }, []);

  const deleteHandler = async (userId) => {
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
          await axios.delete(`${BASE_URL}/users/${userId}`, headerConfig);
          Swal.fire("Deleted!", "user successfully deleted.", "success");
          getUsers();
        } catch (error) {
          Swal.fire("Oops!", "Something went wrong.", "error");
        }
      }
    });
  };

  const viewUserHandler = (id) => {
    localStorage.setItem("userId", id);
    setModal(true);
  };

  return (
    <section
      style={{
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        overflowY: "scroll",
      }}
      className="p-4"
    >
      <User modal={modal} toggler={toggler} />
      <div className="d-flex align-items-center justify-content-between my-4">
        <h4>Users</h4>
        <Button
          color="info"
          outline
          size="sm"
          onClick={() => navigate("/create-user")}
        >
          Create
        </Button>
      </div>
      <div>
        <Table borderless hover responsive size="lg">
          <thead>
            <tr>
              <th>#</th>
              <th className="text-center">Full Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Permission</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 && users.map(({
              _id: id, name, email, permissions,
            }, index) => (
              <tr key={id}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{name}</td>
                <td className="text-center">{email}</td>
                <td className="text-center">{chip(permissions)}</td>
                <td>
                  <div className="d-flex align-items-center justify-content-start gap-2">
                    <MdOutlineInfo
                      style={{
                        fontSize: "22px",
                        color: "#0dcaf0",
                        cursor: "pointer",
                      }}
                      title="Info"
                      onClick={() => viewUserHandler(id)}
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
      <Toaster />
    </section>
  );
};

export default Users;
