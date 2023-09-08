import React from "react";
import { Button, Input } from "reactstrap";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../config";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid Email")
    .trim("Space is not allowed")
    .strict(true)
    .required("Required!"),
  password: yup
    .string()

    .required("Required!")
    .strict(true)
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
      "Length atleast 6 and inclues numbers, latters and special character",
    ),
});

const Login = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{ width: "100%", height: "100vh", background: "#8b8b8b1a" }}
      className="d-flex align-items-center justify-content-center flex-column gap-4"
    >
      <div className="bg-white p-4 rounded" style={{ width: "30%" }}>
        <h5 className="mb-4 text-center">Login</h5>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              const res = await axios.post(`${BASE_URL}/auth/login`, values);
              toast.success(res.data.message, { position: "top-right" });
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("permissions", res.data.permissions);
              window.location.assign(window.location.origin);
            } catch (er) {
              toast.error(er.response.data.message, { position: "top-right" });
            }
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
                  name="email"
                  data-testid="input-email"
                  placeholder="Email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.email && touched.email ? (
                  <p
                    style={{ width: "100%", fontSize: "12px" }}
                    className="text-danger text-start m-0"
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
                    className="text-danger text-start text-wrap m-0"
                  >
                    {errors.password}
                  </p>
                ) : null}
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <Button size="sm" type="submit" color="primary">
                  LogIn
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <Button onClick={() => navigate("/signup")} color="link">
          Sign Up ?.
        </Button>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
