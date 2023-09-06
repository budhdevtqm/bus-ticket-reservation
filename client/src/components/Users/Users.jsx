import React, { useEffect, useState } from "react";
import { Table, Button, Badge } from "reactstrap";
import { MdMode, MdOutlineInfo, MdDelete } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { BASE_URL, headerConfig } from "../../config";
import { verifyStatus } from "../../common/utils";
import User from "./User";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const toggler = () => setModal(!modal);

  const chip = (permissions) => {
    if (permissions === "user") {
      return <Badge color="dark">{permissions.toUpperCase()}</Badge>;
    }
    if (permissions === "admin") {
      return <Badge color="secondary">{permissions.toUpperCase()}</Badge>;
    }

    return <Badge color="primary">{permissions.toUpperCase()}</Badge>;
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/users/get-all`,
        headerConfig,
      );
      setUsers(response.data.data);
    } catch (error) {
      verifyStatus(error.response.status, navigate);
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
            {users.map(({
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
