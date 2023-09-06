import React, { useState } from "react";
import { Button, Input } from "reactstrap";

const SeaterForm = ({
  selectedSeats,
  setSelectedSeats,
  setSeatConfirmed,
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

  const validate = (inputs) => {
    const customErrors = {};
    const keys = Object.keys(inputs);

    keys.forEach((key, index) => {
      if (key.includes("seaterName")) {
        if (inputs[key] === "" || inputs[key].trim() === "") {
          customErrors[`${keys[index]}`] = "Required";
        }
        if (inputs[key].length < 3) {
          customErrors[`${keys[index]}`] = "Name should be of 3 characters";
        }
      } else if (key.includes("age")) {
        if (
          inputs[key] === 0
          || inputs[key] === ""
          || inputs[key].trim() === ""
        ) {
          customErrors[`${keys[index]}`] = "Required";
        }
        if (Number.isNaN(inputs[key])) {
          customErrors[`${keys[index]}`] = "Please enter a valid age";
        }
        if (Number(inputs[key]) <= 3) {
          customErrors[`${keys[index]}`] = "Age should be greater than 3";
        }
      }
    });
    return customErrors;
  };

  const provideStyle = (obj) => {
    if (Object.keys(obj).length > 0) {
      return "d-flex align-items-baseline justify-content-center";
    }
    return "d-flex align-items-end justify-content-center";
  };

  const collectValues = (num, keys, obj) => {
    const sameKeys = keys.filter((item) => item.includes(`${num}`));
    const data = sameKeys.map((key) => ({
      [`${key}`]: obj[key],
    }));
    const newObject = Object.assign({}, ...data);
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
    const newValues = [];

    for (let i = 0; i < selectedSeats.length; i += 1) {
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
        {selectedSeats.map(({ ticketId: id, seatNumber }, index) => (
          <div key={id} className="d-flex justify-content-center gap-2">
            <div className={provideStyle(errors)}>
              <h5 className="bg-info m-0 shadow px-4 py-2 rounded d-flex align-items-center justify-content-center">
                {seatNumber}
              </h5>
            </div>
            <label htmlFor={`seaterName${index}`}>
              <Input
                type="text"
                name={`seaterName${index}`}
                value={values[`seaterName${index}`]}
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
            <label htmlFor={`age${index}`}>
              <Input
                type="number"
                name={`age${index}`}
                placeholder="Enter age"
                value={values[`age${index}`]}
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
        ))}
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
