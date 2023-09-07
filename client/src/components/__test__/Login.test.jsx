import { render, screen } from "@testing-library/react";
import Login from "../Auth/Login";

test("Testing Login component", () => {
    render(<Login />);
    const getText = screen.getByText(/login/i);
    expect(getText).toBe(/login/i);
});
