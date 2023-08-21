import React, { useState } from "react";
import { Button, Input } from "reactstrap";

export default function ChangePasswordForm(props) {
  const [formValues, setFormValues] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const validator = (values) => {
    const { newPassword, confirmPassword } = values;
    let pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    let errors;
    if (!newPassword || newPassword.trim() === "") {
      errors.newPassword = "Required";
    }
    if (!pattern.test(newPassword)) {
      errors.newPassword =
        "Length should be >= 6 and password also contain letter, nubmer and specia characters";
    }

    if (!confirmPassword || confirmPassword.trim() === "") {
      errors.confirmPassword = "Required";
    }
    setErrors(errors);
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" });
    validator(formValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="my-4" style={{ width: "100%" }}>
      <form
        onChange={handleChange}
        onSubmit={handleSubmit}
        style={{ width: "40%" }}
        className="rounded card p-4 d-flex align-items-center justift-content-center gap-4 mx-auto  "
      >
        <label style={{ width: "100%" }}>
          New Password
          <Input
            type="password"
            name="newPassword"
            onChange={handleChange}
            value={formValues.newPassword}
          />
          {errors.newPassword && (
            <div className="text-danger">{errors.newPassword}</div>
          )}
        </label>
        <label style={{ width: "100%" }}>
          Confirm Password
          <Input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={formValues.confirmPassword}
          />
          {errors.confirmPassword && (
            <div className="text-danger pt-1 pl-1">
              {errors.confirmPassword}
            </div>
          )}
        </label>
        <Button type="submit" color="link">
          UPDATE
        </Button>
      </form>
    </div>
  );
}
