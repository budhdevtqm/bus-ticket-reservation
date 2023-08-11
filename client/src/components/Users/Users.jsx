import React, { useEffect, useState } from "react";
import { Table, Button, Badge } from "reactstrap";
import { MdMode, MdOutlineInfo, MdDelete } from "react-icons/md";
import axios from "axios";
import { BASE_URL, headerConfig } from "../../../config";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const chip = (permissions) => {
    if (permissions === "user") {
      return <Badge color="dark">{permissions.toUpperCase()}</Badge>;
    }
    if (permissions === "admin") {
      return <Badge color="secondary">{permissions.toUpperCase()}</Badge>;
    }
    if (permissions === "superAdmin") {
      return <Badge color="primary">{permissions.toUpperCase()}</Badge>;
    }
  };

  const getUsers = async () => {
    const response = await axios.get(`${BASE_URL}/get-all/users`, headerConfig);
    setUsers(response.data.data);
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
    try {
      const response = await axios.delete(
        `${BASE_URL}/delete/${userId}`,
        headerConfig
      );
      toast.success(response.data.message, { position: "top-right" });
      getUsers();
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-rights" });
    }
  };

  const viewUserHandler = (id) => {};

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
              <th>Full Name</th>
              <th>Email</th>
              <th>Permission</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{chip(user.permissions)}</td>
                <td>
                  <div className="d-flex align-items-center justify-content-start gap-2">
                    <MdOutlineInfo
                      style={{
                        fontSize: "22px",
                        color: "#0dcaf0",
                        cursor: "pointer",
                      }}
                      title="Info"
                      onClick={() => navigate(`/view-user/${user._id}`)}
                    />

                    <MdMode
                      style={{
                        fontSize: "20px",
                        color: "green",
                        cursor: "pointer",
                      }}
                      title="Update"
                      onClick={() => goToUpdate(user._id)}
                    />
                    <MdDelete
                      style={{
                        fontSize: "20px",
                        color: "red",
                        cursor: "pointer",
                      }}
                      title="Delete"
                      onClick={() => deleteHandler(user._id)}
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
