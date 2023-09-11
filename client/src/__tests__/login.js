// import React from "react";
// import { render, screen, fireEvent, act } from "@testing-library/react";
// import { BrowserRouter as Router } from "react-router-dom";
// import "@testing-library/jest-dom/extend-expect";



// function isValidEmail(email) {
//   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   return emailRegex.test(email);
// }

// function isValidPassword(password) {
//   const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
//   return passwordRegex.test(password);
// }

// describe("Login Component", () => {

//   render(
//     <Router>
//       <Login />
//     </Router>
//   );

//   const headingElement = screen.getByRole("heading");
//   const emailInput = screen.getByPlaceholderText("Email");
//   const passwordInput = screen.getByPlaceholderText("Password");
//   const loginButton = screen.getByRole("button", { name: "LogIn" });
//   const navigateToSignup = screen.getByRole("button", { name: "Sign Up ?." });


//   it("render elements", () => {
//     expect(headingElement).toBeInTheDocument();
//     expect(emailInput).toBeInTheDocument();
//     expect(passwordInput).toBeInTheDocument();
//     expect(loginButton).toBeInTheDocument();
//     expect(navigateToSignup).toBeInTheDocument();
//   });

//   it("validates fields", () => {

//     act(() => {
//       fireEvent.change(emailInput, { target: { value: "test@example.com" } });
//       fireEvent.change(passwordInput, { target: { value: "Xyz@123" } });
//     });

//     expect(isValidEmail(emailInput.value)).toBe(true);
//     expect(isValidPassword(passwordInput.value)).toBe(true);
//   });


//   it("login button", async () => {
//     act(() => fireEvent.click(loginButton))
//     expect(fireEvent.click(loginButton)).toBeTruthy();
//   });
// });

renderLoginComponent

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios'; // Mock axios calls
import Login from "../components/Auth/Login";


// Mock axios.post to return a success response
jest.mock('axios');
axios.post.mockResolvedValue({ data: { message: 'Login successful', token: 'token', permissions: 'permissions' } });

// Helper function to render the Login component
function renderLoginComponent() {
  return render(<Router><Login /> </Router>);
}

describe('Login Component', () => {
  it('renders the login form', () => {
    const { getByTestId } = renderLoginComponent();

    const emailInput = getByTestId('input-email');
    const passwordInput = getByTestId('input-password');
    const loginButton = getByTestId('login-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('validates the email field', async () => {
    const { getByTestId, getByText } = renderLoginComponent();

    const emailInput = getByTestId('input-email');
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });

    const errorMessage = await waitFor(() => getByText('Invalid Email'));
    expect(errorMessage).toBeInTheDocument();
  });

  it('validates the password field', async () => {
    const { getByTestId, getByText } = renderLoginComponent();

    const passwordInput = getByTestId('input-password');
    fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });

    const errorMessage = await waitFor(() =>
      getByText('Length atleast 6 and includes numbers, letters and special character')
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    const { getByTestId } = renderLoginComponent();

    const emailInput = getByTestId('input-email');
    const passwordInput = getByTestId('input-password');
    const loginButton = getByTestId('login-btn');

    fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'ValidPassword!1' } });

    fireEvent.click(loginButton);

    // Wait for the success toast message
    await waitFor(() => expect(getByText('Login successful')).toBeInTheDocument());

    // Check if the localStorage items are set
    expect(localStorage.getItem('token')).toBe('token');
    expect(localStorage.getItem('permissions')).toBe('permissions');
  });

  it('handles login failure', async () => {
    // Mock axios.post to return an error response
    axios.post.mockRejectedValue({ response: { data: { message: 'Login failed' } } });

    const { getByTestId } = renderLoginComponent();

    const emailInput = getByTestId('input-email');
    const passwordInput = getByTestId('input-password');
    const loginButton = getByTestId('login-btn');

    fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'ValidPassword!1' } });

    fireEvent.click(loginButton);

    // Wait for the error toast message
    await waitFor(() => expect(getByText('Login failed')).toBeInTheDocument());
  });
});
