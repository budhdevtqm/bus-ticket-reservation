import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { Formik, Form } from "formik";
import * as yup from "yup";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { Toaster, toast } from "react-hot-toast";

const UserScheam = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Required!"),
  password: yup
    .string()
    .required("Required!")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Minimun 8 Char, at least one letter, one number"
    ),
  name: yup.string().required("Required!").min(3, "Name must be of 3 chars"),
  permissions: yup.string().required("Required!"),
});

const UserForm = (props) => {
  const { modal, toggler, mode } = props;
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    permissions: "",
  });

  const getUserDetails = async () => {
    const userId = localStorage.getItem("userId");
    const response = await axios.get(`${BASE_URL}/get-response/${userId}`);
    setFormValues(response.data.data);
  };

  useEffect(() => {
    getUserDetails();
  });

  return (
    <div>
      <Modal isOpen={modal} toggler={toggler} {...props}>
        <ModalHeader toggler={toggler}>{mode + " User"} </ModalHeader>
        <ModalBody>
          <div
            style={{ width: "100%" }}
            className="d-flex align-items-center flex-column mx-auto"
          >
            <Formik
              initialValues={formValues}
              enableReinitialize={true}
              validationSchema={UserScheam}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                if (mode === "CREATE") {
                  try {
                    const response = await axios.post(
                      `${BASE_URL}/user/create`,
                      values
                    );
                    toast.success(response.data.message, {
                      position: "top-right",
                    });
                    toggler();
                  } catch (error) {
                    toast.error(error.response.data.message, {
                      position: "top-right",
                    });
                  }
                }
              }}
            >
              {({ values, errors, touched, handleBlur, handleChange }) => (
                <Form
                  style={{ width: "100%" }}
                  className="d-flex align-items-center justify-content-center flex-column gap-4"
                >
                  <label
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
                    style={{ width: "100%" }}
                    className="d-flex flex-column gap-1"
                  >
                    Email
                    <Input
                      bsSize="sm"
                      type="text"
                      name="email"
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
                  </label>

                  <label
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

                  <label
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
                        <em>-Select-</em>
                      </option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="superAdmin">Super Admin</option>
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
                      {mode}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggler}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Toaster />
    </div>
  );
};

export default UserForm;
