import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Input, Button } from "reactstrap";
import { toast, Toaster } from "react-hot-toast";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { verifyStatus } from "../../common/utils";
import { BASE_URL, headerConfig } from "../../config";

const busValidationSchema = yup.object().shape({
  busNo: yup
    .string()
    .matches(/^[a-zA-Z0-9_.-]*$/, "Only number and letter allowed")
    .trim("Space is not allowed")
    .strict(true)
    .min(9, "Please enter a valid bus number. (IN)")
    .required("Required!"),
  totalSeats: yup.number().required("Required").min(1, "Must be > 0"),
  manufacturer: yup
    .string()
    .required("Required!")
    .trim("Space is not allowed")
    .strict(true),
  model: yup
    .string()
    .required("Required")
    .min(3, "Must be of 3 Characters")
    .trim("Space is not allowed")
    .strict(true),
});

const BusForm = () => {
  const [formMode, setFormMode] = useState("Create");
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    busNo: "",
    manufacturer: "",
    model: "",
    totalSeats: "",
  });

  const busId = localStorage.getItem("busId");

  const getBusDetails = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/bus/${id}`, headerConfig);
      setFormValues(response.data.bus);
    } catch (error) {
      verifyStatus(error.response.status, navigate);
    }
  };

  useEffect(() => {
    if (busId) {
      setFormMode("Update");
      getBusDetails(busId);
    }
  }, []);

  return (
    <section
      style={{
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        overflowY: "scroll",
      }}
      className="d-flex flex-column"
    >
      <h4 className="p-2 mx-4 my-2" color="info">
        {`${formMode} Bus`}
      </h4>

      <div
        style={{ width: "50%", background: "white" }}
        className="d-flex align-items-center flex-column mx-auto my-auto p-4 rounded"
      >
        <Formik
          initialValues={formValues}
          enableReinitialize
          validationSchema={busValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            if (formMode === "Create") {
              try {
                const response = await axios.post(
                  `${BASE_URL}/bus/add-bus`,
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
                verifyStatus(error.response.status, navigate);
              }
            }
            if (formMode === "Update") {
              try {
                const response = await axios.put(
                  `${BASE_URL}/bus/update/${busId}`,
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
                verifyStatus(error.response.status, navigate);
              }
            }
          }}
        >
          {
            (
              {
                values, errors, touched, handleBlur, handleChange,
              },
            ) => (
              <Form
                style={{ width: "100%", background: "white" }}
                className="d-flex align-items-center justify-content-center flex-column gap-4"
              >
                <label
                  htmlFor="busNo"
                  style={{ width: "100%" }}
                  className="d-flex flex-column gap-1"
                >
                  Bus Number
                  <Input
                    bsSize="sm"
                    type="text"
                    name="busNo"
                    value={values.busNo}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.busNo && touched.busNo ? (
                    <p
                      style={{ width: "100%", fontSize: "12px" }}
                      className="text-danger text-start m-0"
                    >
                      {errors.busNo}
                    </p>
                  ) : null}
                </label>

                <label
                  htmlFor="manufacturer"
                  style={{ width: "100%" }}
                  className="d-flex flex-column gap-1"
                >
                  Bus Manufacturer Company
                  <Input
                    bsSize="sm"
                    type="text"
                    name="manufacturer"
                    value={values.manufacturer}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.manufacturer && touched.manufacturer ? (
                    <p
                      style={{ width: "100%", fontSize: "12px" }}
                      className="text-danger text-start  m-0"
                    >
                      {errors.manufacturer}
                    </p>
                  ) : null}
                </label>
                <label
                  htmlFor="model"
                  style={{ width: "100%" }}
                  className="d-flex flex-column gap-1"
                >
                  Bus Model
                  <Input
                    bsSize="sm"
                    type="text"
                    name="model"
                    value={values.model}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.model && touched.model ? (
                    <p
                      style={{ width: "100%", fontSize: "12px" }}
                      className="text-danger text-start  m-0"
                    >
                      {errors.model}
                    </p>
                  ) : null}
                </label>
                <label
                  htmlFor="totalSeats"
                  style={{ width: "100%" }}
                  className="d-flex flex-column gap-1"
                >
                  Total Seats
                  <Input
                    bsSize="sm"
                    type="number"
                    name="totalSeats"
                    value={values.totalSeats}
                    onBlur={handleBlur}
                    disabled={formMode === "Update" ?? false}
                    onChange={handleChange}
                  />
                  {errors.totalSeats && touched.totalSeats ? (
                    <p
                      style={{ width: "100%", fontSize: "12px" }}
                      className="text-danger text-start m-0"
                    >
                      {errors.totalSeats}
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
            )
          }
        </Formik>
      </div>

      <Toaster />
    </section>
  );
};

export default BusForm;
