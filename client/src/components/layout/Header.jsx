import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const Header = () => {
  const [links, setLinks] = useState([]);
  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.auth.permissions);
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("permissions");
    localStorage.removeItem("totalAmount");
    localStorage.removeItem("busRouteId");
    navigate("/login");
  };

  const ignoreRoutes = (userPermissions) => {
    let array;
    switch (userPermissions) {
      case "admin":
        setLinks([
          { label: "Dashboard", path: "/home" },
          { label: "My Bus", path: "/buses" },
          { label: "Profile", path: "/profile" },
        ]);
        break;
      case "superAdmin":
        setLinks([
          { label: "Routes", path: "/home" },
          { label: "Buses", path: "/buses" },
          { label: "Users", path: "/users" },
          { label: "Profile", path: "/profile" },
        ]);
        break;
      default:
        setLinks([
          { label: "Routes", path: "/home" },
          { label: "Bookings", path: "/bookings" },
          { label: "Profile", path: "/profile" },
        ]);
        break;
    }
    return array;
  };

  useEffect(() => {
    const permissions = localStorage.getItem("permissions");
    if (permissions) {
      ignoreRoutes(permissions);
    }
  }, [permissions]);

  return (
    <div
      style={{ width: "100%" }}
      className="px-4 d-flex aligns-item-center justify-content-between"
    >
      <span>
        <img
          src="/public/images/ticket.png"
          alt="Logo"
          style={{ width: "65px" }}
        />
      </span>
      <div className=" d-flex align-items-center justify-content-between gap-8">
        <nav className=" d-flex align-items-center justify-content-between">
          {links.map((link, index) => (
            <NavLink
              className="mx-4 text-decoration-none"
              to={link.path}
              key={index}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <Button onClick={() => logoutUser()} color="primary" className="mx-4">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;
