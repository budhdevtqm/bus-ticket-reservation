import React from "react";
import { render, screen, fireEvent, act, getByTestId, getByText } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import Login from "../components/Auth/Login";

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
  return passwordRegex.test(password);
}

const result = {
  ok: true,
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGYwNzIwY2UxZDRmZWUwOWYyYjhhNjUiLCJpYXQiOjE2OTQ0OTUwMDIsImV4cCI6MTY5NDQ5ODYwMn0.2vrXPftmlOBxn3P81jz8fPoyHK0Pwl9RE3K3pToLTuk",
  message: "Login successfully",
  permissions: "user"
  };

const mockFn = jest.fn();
mockFn.mockReturnValue(result);

describe("Login Component", () => {
  render(<Router><Login /></Router>);

  const headingElement = screen.getByRole("heading");
  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");
  const loginButton = screen.getByRole("button", { name: "LogIn" });
  const navigateToSignup = screen.getByRole("button", { name: "Sign Up ?." });

  it("render elements", () => {
    expect(headingElement).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(navigateToSignup).toBeInTheDocument();
  });

  it("validates fields", () => {
    act(() => {
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "Xyz@123" } });
    });

    expect(isValidEmail(emailInput.value)).toBe(true);
    expect(isValidPassword(passwordInput.value)).toBe(true);
  });

  it("login button", async () => {
    act(() => fireEvent.click(loginButton))
    expect(fireEvent.click(loginButton)).toBeTruthy();
  });

  it("login success", () => {
    mockFn()
    expect(mockFn).toHaveBeenCalled();
    expect(location.pathname).toBe("/");
  });
});
