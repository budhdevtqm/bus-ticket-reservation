import axios from "axios";
import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import { BASE_URL, headerConfig } from "../../../config";
import { verifyStatus } from "../../common/utils";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

export default function ChangePasswordForm(props) {
  const [formValues, setFormValues] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const validator = (values) => {
    const { newPassword, confirmPassword } = values;
    let errorString =
      "password length >= 6 and also contain letter, number and special characters";
    let pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    let errors = {};

    if (!newPassword || newPassword.trim() === "") {
      errors.newPassword = "Required";
    } else if (!pattern.test(newPassword)) {
      errors.newPassword = errorString;
    }

    if (!confirmPassword || confirmPassword.trim() === "") {
      errors.confirmPassword = "Required";
      return errors;
    } else if (!pattern.test(confirmPassword)) {
      errors.confirmPassword = errorString;
      return errors;
    }
    if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Password must be same in both fields";
      return errors;
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ newPassword: "", confirmPassword: "" });

    const errors = validator(formValues);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    } else {
      try {
        const response = await axios.put(
          `${BASE_URL}/users/change-password`,
          { password: formValues.newPassword },
          headerConfig
        );
        toast.success(response.data.message, { position: "top-right" });
        setFormValues({ newPassword: "", confirmPassword: "" });
        setErrors({ newPassword: "", confirmPassword: "" });
      } catch (error) {
        toast.error(error.response.data.message, { position: "top-right" });
        verifyStatus(error.response.status, navigate);
      }
    }
  };

  return (
    <div className="my-4" style={{ width: "100%" }}>
      <Toaster />
      <form
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
            <div className="text-danger fs-6 m-1 px-2">
              {errors.newPassword}
            </div>
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
            <div className="text-danger fs-6 m-1 px-2">
              {errors.confirmPassword}
            </div>
          )}
        </label>
        <Button type="submit" color="primary">
          UPDATE
        </Button>
      </form>
    </div>
  );
}
