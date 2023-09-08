import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import { screen, render } from "@testing-library/react";
import Signup from "../components/Auth/Signup";

describe("Signup component", () => {
  it("render elements", () => {
    render(
      <Router>
        <Signup />
      </Router>,
    );
    const headingElement = screen.getByRole("heading");
    expect(headingElement).toBeInTheDocument();

    const nameElement = screen.getByPlaceholderText("Full name");
    expect(nameElement).toBeInTheDocument();

    const emailElement = screen.getByPlaceholderText("Email");
    expect(emailElement).toBeInTheDocument();

    const passwordElement = screen.getByPlaceholderText("Password");
    expect(passwordElement).toBeInTheDocument();

    const submitBtnElement = screen.getByRole("button", { name: "Signup" });
    expect(submitBtnElement).toBeInTheDocument();

    const navigateToLogin = screen.getByRole("button", { name: "Log In ?." });
    expect(navigateToLogin).toBeInTheDocument();
  });
});
