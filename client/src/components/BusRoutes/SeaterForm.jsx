import React, { useState } from "react";
import { Button, Input } from "reactstrap";

const SeaterForm = ({
  selectedSeats,
  setSelectedSeats,
  setSeatConfirmed,
  setAmount,
}) => {
  const valuesArray = selectedSeats.map((seat, index) => ({
    [`seaterName${index}`]: "",
    [`age${index}`]: "",
  }));
  const defalultValues = Object.assign({}, ...valuesArray);
  const [values, setValues] = useState(defalultValues);
  const [errors, setErrors] = useState(defalultValues);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validate = (values) => {
    let errors = {};
    const keys = Object.keys(values);

    keys.forEach((key, index) => {
      if (key.includes("seaterName")) {
        if (values[key] === "" || values[key].trim() === "") {
          errors[`${keys[index]}`] = "Required";
        }
        if (values[key].length < 3) {
          errors[`${keys[index]}`] = "Name should be of 3 characters";
        }
      } else if (key.includes("age")) {
        if (
          values[key] === 0 ||
          values[key] === "" ||
          values[key].trim() === ""
        ) {
          errors[`${keys[index]}`] = "Required";
        }
        if (isNaN(Number(values[key]))) {
          errors[`${keys[index]}`] = "Please enter a valid age";
        }
        if (Number(values[key]) <= 3) {
          errors[`${keys[index]}`] = "Age should be greater than 3";
        }
      }
    });
    return errors;
  };

  const provideStyle = (obj) => {
    if (Object.keys(obj).length > 0) {
      return "d-flex align-items-baseline justify-content-center";
    }
    return "d-flex align-items-end justify-content-center";
  };

  const collectValues = (num, keys, obj) => {
    const sameKeys = keys.filter((item) => item.includes(`${num}`));
    const values = sameKeys.map((key) => ({
      [`${key}`]: obj[key],
    }));
    const newObject = Object.assign({}, ...values);
    return newObject;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setErrors(defalultValues);

    const validationErros = validate(values);
    if (Object.keys(validationErros).length > 0) {
      setErrors(validationErros);
      return;
    }

    const keys = Object.keys(values);
    let newValues = [];
    for (let i = 0; i < selectedSeats.length; i++) {
      const newObj = collectValues(i, keys, values);
      newValues.push(newObj);
    }
    const modifiedValues = selectedSeats.map((seat, index) => {
      const modified = {
        ...seat,
        seaterName: newValues[index][`seaterName${index}`],
        age: Number(newValues[index][`age${index}`]),
      };
      return modified;
    });
    const priceArray = modifiedValues.map((items) => items.price);
    const totalAmount = priceArray.reduce((a, b) => a + b, 0);
    localStorage.setItem("totalAmount", totalAmount);
    setSelectedSeats(modifiedValues);
    setSeatConfirmed(true);
  };

  return (
    <form
      style={{ width: "100%", margin: "8px 0" }}
      className="d-flex flex-column gap-4"
      onSubmit={submitHandler}
    >
      <div className="d-flex gap-4  justify-content-center flex-column gap-2">
        {selectedSeats.map((seat, index) => {
          return (
            <div key={seat._id} className="d-flex justify-content-center gap-2">
              <div className={provideStyle(errors)}>
                <h5 className="bg-info m-0 shadow px-4 py-2 rounded d-flex align-items-center justify-content-center">
                  {seat.seatNumber}
                </h5>
              </div>
              <label>
                <Input
                  type="text"
                  name={"seaterName" + index}
                  value={values["seaterName" + index]}
                  onChange={handleChange}
                  onBlur={validate}
                  placeholder="Enter name"
                />
                {errors[`seaterName${index}`] ? (
                  <div
                    style={{ fontSize: "13px", marginLeft: "5px" }}
                    className="text-danger"
                  >
                    {errors[`seaterName${index}`]}
                  </div>
                ) : null}
              </label>
              <label>
                <Input
                  type="number"
                  name={"age" + index}
                  placeholder="Enter age"
                  value={values["age" + index]}
                  onBlur={validate}
                  onChange={handleChange}
                />
                {errors[`age${index}`] ? (
                  <div
                    style={{ fontSize: "13px", marginLeft: "5px" }}
                    className="text-danger"
                  >
                    {errors[`age${index}`]}
                  </div>
                ) : null}
              </label>
            </div>
          );
        })}
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <Button type="submit" color="primary">
          Confirm
        </Button>
      </div>
    </form>
  );
};

export default SeaterForm;
