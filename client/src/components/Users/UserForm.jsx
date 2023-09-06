import React, { useState, useEffect } from "react";
import { Button, Input } from "reactstrap";
import { Formik, Form } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BASE_URL, headerConfig } from "../../config";
import { verifyStatus } from "../../common/utils";

const createSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Required!"),
  password: yup
    .string()
    .required("Required!")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
      "Length atleast 6 and inclues numbers, latters and special character",
    ),
  name: yup.string().required("Required!").min(3, "Name must be of 3 chars"),
  permissions: yup.string().required("Required!"),
});

const updateSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Required!"),
  name: yup.string().required("Required!").min(3, "Name must be of 3 chars"),
  permissions: yup.string().required("Required!"),
});

const UserForm = () => {
  const [formMode, setFormMode] = useState("Create");
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    permissions: "",
  });
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const getUserDetails = async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/users/get-user/${id}`,
        headerConfig,
      );
      setFormValues(response.data.data);
    } catch (error) {
      verifyStatus(error.response.status, navigate);
    }
  };

  useEffect(() => {
    if (userId) {
      setFormMode("Update");
      getUserDetails(userId);
    }
  }, []);

  return (
    <section
      style={{ width: "100%", height: "100%" }}
      className="d-flex  flex-column "
    >
      <h4 className="p-2 mx-4 my-2" color="info">
        {`${formMode} User`}
      </h4>

      <div
        style={{ width: "50%", background: "white" }}
        className="d-flex align-items-center flex-column mx-auto my-auto p-4 rounded"
      >
        <Formik
          initialValues={formValues}
          enableReinitialize
          validationSchema={formMode === "Create" ? createSchema : updateSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            if (formMode === "Create") {
              try {
                const response = await axios.post(
                  `${BASE_URL}/users/create`,
                  values,
                  headerConfig,
                );
                toast.success(response.data.message, {
                  position: "top-right",
                });
                navigate(-1);
              } catch (error) {
                toast.error(error.response.data.message, {
                  position: "top-right",
                });
              }
            }
            if (formMode === "Update") {
              try {
                const response = await axios.put(
                  `${BASE_URL}/users/${userId}`,
                  values,
                  headerConfig,
                );

                toast.success(response.data.message, {
                  position: "top-right",
                });
                navigate(-1);
              } catch (er) {
                toast.error(er.response.data.message, {
                  position: "top-right",
                });
              }
            }
          }}
        >
          {({
            values, errors, touched, handleBlur, handleChange,
          }) => (
            <Form
              style={{ width: "100%", background: "white" }}
              className="d-flex align-items-center justify-content-center flex-column gap-4"
            >
              <label
                htmlFor="name"
                style={{ width: "100%" }}
                className="d-flex flex-column gap-1"
              >
                Full Name
                <Input
                  bsSize="sm"
                  type="text"
                  name="name"
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
              </label>

              <label
                htmlFor="email"
                style={{ width: "100%" }}
                className="d-flex flex-column gap-1"
              >
                Email
                <Input
                  bsSize="sm"
                  type="text"
                  name="email"
                  value={values.email}
                  disabled={formMode === "Update" ?? false}
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
              </label>

              {formMode === "Create" && (
                <label
                  htmlFor="password"
                  style={{ width: "100%" }}
                  className="d-flex flex-column gap-1  "
                >
                  Password
                  <Input
                    bsSize="sm"
                    type="password"
                    name="password"
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
                </label>
              )}

              <label
                htmlFor="permissions"
                style={{ width: "100%" }}
                className="d-flex flex-column gap-1 "
              >
                Permissions
                <Input
                  bsSize="sm"
                  type="select"
                  name="permissions"
                  value={values.permissions}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option disabled value="">
                    -Select-
                  </option>
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                  <option value="superAdmin">superAdmin</option>
                </Input>
                {errors.permissions && touched.permissions ? (
                  <p
                    style={{ width: "100%", fontSize: "12px" }}
                    className="text-danger text-start text-wrap  m-0"
                  >
                    {errors.permissions}
                  </p>
                ) : null}
              </label>

              <div className="d-flex align-items-center justify-content-end">
                <Button
                  size="sm"
                  type="submit"
                  color="primary"
                  style={{ width: "150px" }}
                >
                  {formMode}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <Toaster />
    </section>
  );
};

export default UserForm;
