import React, { useEffect } from "react";
import { Button, Input } from "reactstrap";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signupAsync } from "../../Redux/slices/authSlice";
import { notification } from "../../common/utils";

const signup = yup.object().shape({
  email: yup
    .string()
    .email("Invalid Email")
    .required("Required!")
    .trim("Space is not allowed")
    .strict(true),
  password: yup
    .string()
    .required("Required!")
    .trim("Space is not allowed")
    .strict(true)
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
      "Length atleast 6 and inclues numbers, latters and special character",
    ),
  name: yup
    .string()
    .required("Required!")
    .min(3, "Name must be of 3 chars")
    .trim("Space is not allowed")
    .strict(true),
});

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (values) => {
    const { payload } = await dispatch(signupAsync(values));
    if (typeof payload === "string") {
      notification("error", payload);
    } else {
      notification("success", payload.message);
      setTimeout(() => navigate("/login"), 1000);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const permissions = localStorage.getItem("permissions");
    if (token && permissions) {
      navigate("/");
    }
  }, []);

  return (
    <div
      style={{ width: "100%", height: "100vh", background: "#8b8b8b1a" }}
      className="d-flex align-items-center justify-content-center flex-column gap-4"
    >
      <div className="bg-white p-4 rounded" style={{ width: "30%" }}>
        <h5 className="mb-4 text-center">Signup</h5>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={signup}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            const { name, email, password } = values;
            submitHandler({ name, email, password });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
          }) => (
            <Form className="d-flex align-items-center justify-content-center flex-column gap-4">
              <div
                style={{ width: "100%" }}
                className="d-flex flex-column gap-1"
              >
                <Input
                  bsSize="sm"
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.name && touched.name ? (
                  <p
                    style={{ width: "100%", fontSize: "12px" }}
                    className="text-danger text-start m-0"
                  >
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div
                style={{ width: "100%" }}
                className="d-flex flex-column gap-1"
              >
                <Input
                  bsSize="sm"
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.email && touched.email ? (
                  <p
                    style={{ width: "100%", fontSize: "12px" }}
                    className="text-danger text-start  m-0"
                  >
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div
                style={{ width: "100%" }}
                className="d-flex flex-column gap-1  "
              >
                <Input
                  bsSize="sm"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.password && touched.password ? (
                  <p
                    style={{ width: "100%", fontSize: "12px" }}
                    className="text-danger text-start text-wrap  m-0"
                  >
                    {errors.password}
                  </p>
                ) : null}
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <Button size="sm" type="submit" color="primary">
                  Signup
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <Button onClick={() => navigate("/login")} color="link">
          Log In ?.
        </Button>
      </div>
      <Toaster />
    </div>
  );
};

export default Signup;
