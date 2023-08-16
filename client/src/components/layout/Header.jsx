import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = () => {
  const user = useSelector((state) => state.auth.user);

  let links = [
    {
      label: "Home",
      path: "/home",
    },
    {
      label: "Buses",
      path: "/buses",
    },
    {
      label: "My Profile",
      path: "/profile",
    },
    {
      label: "Users",
      path: "/users",
    },
  ];

  // if (user && user.permissions === "superAdmin") {
  //   links = [
  //     {
  //       label: "Home",
  //       path: "/home",
  //     },
  //     {
  //       label: "Buses",
  //       path: "/buses",
  //     },
  //     {
  //       label: "My Profile",
  //       path: "/profile",
  //     },
  //     {
  //       label: "Users",
  //       path: "/users",
  //     },
  //   ];
  // }

  // if (user && user.permissions === "admin") {
  //   links = [
  //     {
  //       label: "Buses",
  //       path: "/buses",
  //     },
  //     {
  //       label: "My Profile",
  //       path: "/profile",
  //     },
  //     {
  //       label: "Home",
  //       path: "/home",
  //     },
  //   ];
  // }

  // if (user && user.permissions === "user") {
  //   links = [
  //     {
  //       label: "My Profile",
  //       path: "/profile",
  //     },
  //     {
  //       label: "Home",
  //       path: "/home",
  //     },
  //   ];
  // }

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
    </div>
  );
};

export default Header;
