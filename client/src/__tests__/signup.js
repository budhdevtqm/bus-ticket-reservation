import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import Signup from "../components/Auth/Signup";
import { act } from "react-dom/test-utils";

function isValidName(name) {
  return /^[^\d\s]{3,}$/.test(name);
}

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
  return passwordRegex.test(password);
}

const mockFn = jest.fn();

describe("Signup component", () => {

  render(
    <Router>
      <Signup />
    </Router>,
  );

  const headingElement = screen.getByRole("heading");
  const nameElement = screen.getByPlaceholderText("Full name");
  const emailElement = screen.getByPlaceholderText("Email");
  const passwordElement = screen.getByPlaceholderText("Password");
  const submitBtnElement = screen.getByRole("button", { name: "Signup" });
  const navigateToLogin = screen.getByRole("button", { name: "Log In ?." });

  it("render elements", () => {
    expect(nameElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
    expect(submitBtnElement).toBeInTheDocument();
    expect(headingElement).toBeInTheDocument();
    expect(navigateToLogin).toBeInTheDocument();
  });

  it("validation's", () => {
    act(() => {
      fireEvent.change(nameElement, { target: { value: "Ram" } })
      fireEvent.change(emailElement, { target: { value: "test@example.com" } });
      fireEvent.change(passwordElement, { target: { value: "Xyz@123" } });
    })

    expect(isValidName(nameElement.value)).toBe(true);
    expect(isValidEmail(emailElement.value)).toBe(true);
    expect(isValidPassword(passwordElement.value)).toBe(true);
  })

  it("signup button", () => {
    act(() => fireEvent.click(submitBtnElement))
    expect(fireEvent.click(submitBtnElement)).toBeTruthy();
  });

  it("signup success", async () => {
    mockFn.mockResolvedValue(
      { status: 201, ok: true, message: "Signup successfully, please login." }
    );

    act(() => {
      fireEvent.change(nameElement, { target: { value: "User Name" } })
      fireEvent.change(emailElement, { target: { value: "test@example.com" } });
      fireEvent.change(passwordElement, { target: { value: "Abc@123" } });
    });

    try {
      await mockFn("/signup", { name: nameElement.value, email: emailElement.value, password: passwordElement.value })

      expect(mockFn).toBeCalled();
      setTimeout(() => expect(location.pathname).toBe("/login"), 2000)
    } catch (error) {
      throw new Error('An unexpected promise rejection occurred: ' + error.message);
    }
  });

});
