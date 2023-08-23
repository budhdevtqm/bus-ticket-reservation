import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import { Formik, Form } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  seaterName: yup.string().required("Required").min(3, "must be of 3 latters"),
  age: yup.number().required("Required!").min(3, "Age must be >= 3"),
});

const SeaterForm = ({ ticket, selectedSeats, setSelectedSeats }) => {
  const [confirm, setConfirm] = useState(false);
  console.log(selectedSeats, "in the form");
  const provideStyle = (obj) => {
    if (Object.keys(obj).length > 0) {
      return "d-flex align-items-center justify-content-center";
    }
    return "d-flex align-items-end justify-content-center";
  };

  const removeHandler = (seatId) => {
    const filtered = selectedSeats.filter((seat) => seat._id !== seatId);
    setSelectedSeats(filtered);
  };

  return (
    <Formik
      initialValues={{ seaterName: "", age: 0 }}
      validationSchema={validationSchema}
      onSubmit={({ values }) => {
        console.log(values, "values");
      }}
    >
      {({ values, errors, touched, handleBlur, handleChange }) => (
        <Form style={{ width: "100%", margin: "8px 0" }}>
          <div className="d-flex gap-4  justify-content-center">
            <div className={provideStyle(errors)}>
              <h5 className="bg-info m-0 shadow px-4 py-2 rounded d-flex align-items-center justify-content-center">
                {ticket.seatNumber}
              </h5>
            </div>
            <label>
              Passenger Name
              <Input
                type="text"
                name="seaterName"
                value={values.seaterName}
                onChange={handleChange}
              />
              {errors.seaterName && (
                <div className="text-danger">{errors.seaterName}</div>
              )}
            </label>
            <label>
              Passenger Age
              <Input
                type="number"
                name="age"
                placeholder="Age"
                value={values.age}
                onChange={handleChange}
              />
              {errors.age && <div className="text-danger">{errors.age}</div>}
            </label>
            <div className={provideStyle(errors)}>
              <Button type="submit" color={confirm ? "success" : "primary"}>
                {confirm ? "Confirmed" : "Confirm"}
              </Button>
            </div>
            <div className={provideStyle(errors)}>
              <Button
                type="button"
                onClick={() => removeHandler(ticket._id)}
                color={confirm ? "success" : "danger"}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SeaterForm;
