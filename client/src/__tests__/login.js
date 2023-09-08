import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import Login from "../components/Auth/Login";
// import user from "@testing-library/user-event";

//validation functions
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

describe("", () => {
//   it("Render Login component", async () => {
//     render(
//       <Router>
//         <Login />
//       </Router>,
//     );
//     const headingElement = screen.getByRole("heading");
//     const emailInput = screen.getByPlaceholderText("Email");
//     const passwordInput = screen.getByPlaceholderText("Password");
//     const loginButton = screen.getByRole("button", { name: "LogIn" });
//     const navigateToSignup = screen.getByRole("button", { name: "Sign Up ?." });

//     expect(headingElement).toBeInTheDocument();
//     expect(emailInput).toBeInTheDocument();
//     expect(passwordInput).toBeInTheDocument();
//     expect(loginButton).toBeInTheDocument();
//     expect(navigateToSignup).toBeInTheDocument();
//   });
// });

it("validate fields", async () => {
  render(
    <Router>
      <Login />
    </Router>,
  );
  const emailInput = screen.getByPlaceholderText("Email");
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  
  expect(isValidEmail(emailInput.value)).toBe(true);

  const passwordInput = screen.getByPlaceholderText("Password");
  fireEvent.change(passwordInput,{target : {value : "Xyz@123"}})
  console.log(passwordInput.value, "passwordInput")
  expect(passwordInput).toBeValid();
});

});