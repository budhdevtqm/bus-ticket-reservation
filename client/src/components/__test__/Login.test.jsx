import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import Login from "../Auth/Login";

test("Testing Login component", async () => {
    render(
        <Router>
            <Login />
        </Router>,
    );
    const getText = screen.getByText(/login/i);
    expect(getText).toBe(/login/i);
});
