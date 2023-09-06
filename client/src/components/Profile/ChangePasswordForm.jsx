import axios from 'axios';
import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, headerConfig } from '../../config';
import { verifyStatus } from '../../common/utils';

const ChangePasswordForm = () => {
  const [formValues, setFormValues] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const validator = (values) => {
    const { newPassword, confirmPassword } = values;
    const errorString = 'password length >= 6 and also contain letter, number and special characters';
    const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    const customErrors = {};

    if (!newPassword || newPassword.trim() === '') {
      customErrors.newPassword = 'Required';
    } else if (!pattern.test(newPassword)) {
      customErrors.newPassword = errorString;
    }

    if (!confirmPassword || confirmPassword.trim() === '') {
      customErrors.confirmPassword = 'Required';
      return customErrors;
    }

    if (!pattern.test(confirmPassword)) {
      customErrors.confirmPassword = errorString;
      return customErrors;
    }
    if (newPassword !== confirmPassword) {
      customErrors.confirmPassword = 'Password must be same in both fields';
      return customErrors;
    }
    return customErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ newPassword: '', confirmPassword: '' });

    const customErrors = validator(formValues);
    if (Object.keys(customErrors).length > 0) {
      setErrors(customErrors);
    } else {
      try {
        const response = await axios.put(
          `${BASE_URL}/users/change-password`,
          { password: formValues.newPassword },
          headerConfig,
        );
        toast.success(response.data.message, { position: 'top-right' });
        setFormValues({ newPassword: '', confirmPassword: '' });
        setErrors({ newPassword: '', confirmPassword: '' });
      } catch (error) {
        toast.error(error.response.data.message, { position: 'top-right' });
        verifyStatus(error.response.status, navigate);
      }
    }
  };

  return (
    <div className="my-4" style={{ width: '100%' }}>
      <Toaster />
      <form
        onSubmit={handleSubmit}
        style={{ width: '40%' }}
        className="rounded card p-4 d-flex align-items-center justift-content-center gap-4 mx-auto  "
      >
        <label htmlFor="newPassword" style={{ width: '100%' }}>
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
        <label
          htmlFor="confirmPassword"
          style={{ width: '100%' }}
        >
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
};

export default ChangePasswordForm;
