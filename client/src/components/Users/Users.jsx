import React, { useEffect, useState } from "react";
import { Table, Button, Badge } from "reactstrap";
import { MdMode, MdOutlineInfo, MdDelete } from "react-icons/md";
import UserForm from "./UserForm";
import axios from "axios";
import { BASE_URL } from "../../../config";
// const users = [
//   { name: "user1", email: "user1@gmail.com", permissions: "user" },
//   { name: "Admin", email: "Admin@gmail.com", permissions: "admin" },
//   {
//     name: "Super Admin",
//     email: "superAdmin@gmail.com",
//     permissions: "superAdmin",
//   },
// ];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState("CREATE");

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

  console.log(users, "users");
  const createHandler = () => {
    setModal(true);
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-all/users`);
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggler = () => setModal(!modal);

  useEffect(() => {
    getUsers();
  }, []);

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
      <UserForm
        mode={mode}
        modal={modal}
        setModal={setModal}
        setMode={setMode}
        toggler={toggler}
      />
      <div className="d-flex align-items-center justify-content-between my-4">
        <h4>Users</h4>
        <Button color="info" outline size="sm" onClick={createHandler}>
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
              <tr key={index + 1}>
                <td>{index}</td>
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
                    />

                    <MdMode
                      style={{
                        fontSize: "20px",
                        color: "green",
                        cursor: "pointer",
                      }}
                      title="Update"
                    />
                    <MdDelete
                      style={{
                        fontSize: "20px",
                        color: "red",
                        cursor: "pointer",
                      }}
                      title="Delete"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </section>
  );
};

export default Users;
