import React, { useEffect } from "react";
import { Button, Input } from "reactstrap";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../Redux/slices/authSlice";
import { notification } from "../../common/utils";

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
  const dispatch = useDispatch();

  const submitHandler = async (values) => {
    const { payload } = await dispatch(loginAsync(values));
    if (typeof payload === "string") {
      notification("error", payload);
    } else {
      notification("success", payload.message);
      setTimeout(() => window.location.assign(window.location.origin), 500);
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
        <h5 className="mb-4 text-center">Login</h5>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            submitHandler({ email: values.email, password: values.password });
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
