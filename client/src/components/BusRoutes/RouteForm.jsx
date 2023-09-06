import axios from 'axios';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Input } from 'reactstrap';
import * as yup from 'yup';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { verifyStatus } from '../../common/utils';
import { BASE_URL, headerConfig } from '../../config';

const routeSchema = yup.object().shape({
  busId: yup.string().required('Required'),
  from: yup.string().required('Required').min(3, 'Must be of 3 letters!'),
  to: yup.string().required('Required').min(3, 'Must be of 3 letters!'),
  startTime: yup.string().required('Required'),
  endTime: yup.string().required('Required'),
  ticketPrice: yup.number().required('Required').min(1, 'Must be > 0'),
  date: yup
    .date()
    .min(new Date(), 'Must be of upcoming days')
    .required('Required'),
});

const RouteForm = () => {
  const [formMode, setFormMode] = useState('Create');
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    busId: '',
    from: '',
    to: '',
    date: 0,
    startTime: '',
    endTime: '',
    totalSeats: 0,
    ticketPrice: 0,
  });

  const stampToTimeString = (miliSeconds) => {
    const [h, m] = new Date(miliSeconds).toString().split(' ')[4].split(':');
    return `${h}:${m}`;
  };

  const routeId = localStorage.getItem('routeId');

  const getMyBuses = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/bus/my-buses`,
        headerConfig,
      );
      setBuses(response.data.data);
    } catch (error) {
      verifyStatus(error.response.status, navigate);
    }
  };

  const getRouteDetails = async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/bus-route/get-route/${id}`,
        headerConfig,
      );
      const { startTime: st, endTime: et, date: dt } = response.data.data;
      const startTime = stampToTimeString(st);
      const endTime = stampToTimeString(et);
      const date = format(dt, 'yyyy-MM-dd');
      setFormValues({
        startTime, endTime, date, ...response.data.data,
      });
    } catch (error) {
      verifyStatus(error.response.status, navigate);
    }
  };

  useEffect(() => {
    getMyBuses();
  }, []);

  useEffect(() => {
    if (routeId) {
      getRouteDetails(routeId);
      setFormMode('Update');
    }
  }, []);

  const converDateToTimeStamp = (date) => new Date(date).getTime();
  const convertHMtoTimeStamp = (string) => {
    const splited = string.split(':');
    const [hours, minutes] = splited;
    return +hours * 3600000 + +minutes * 60000;
  };

  return (
    <section style={{ width: '100%' }} className="d-flex  flex-column py-4">
      <h4 className="p-2 mx-4 my-2" color="info">
        {`${formMode} Route`}
      </h4>

      <div
        style={{ width: '50%', background: 'white' }}
        className="d-flex align-items-center flex-column mx-auto my-auto p-4 rounded"
      >
        <Formik
          initialValues={formValues}
          enableReinitialize
          validationSchema={routeSchema}
          onSubmit={async (values) => {
            const date = converDateToTimeStamp(values.date);
            const startTime = convertHMtoTimeStamp(values.startTime) + date;
            const endTime = convertHMtoTimeStamp(values.endTime) + date;
            const modifiedValues = {
              ...values, startTime, endTime, date,
            };

            if (formMode === 'Create') {
              try {
                const response = await axios.post(
                  `${BASE_URL}/bus-route/create`,
                  modifiedValues,
                  headerConfig,
                );
                toast.success(response.data.message, { position: 'top-right' });
                navigate(-1);
              } catch (error) {
                toast.error(error.response.data.message, {
                  position: 'top-right',
                });
              }
            }

            if (formMode === 'Update') {
              try {
                const response = await axios.put(
                  `${BASE_URL}/bus-route/update/${routeId}`,
                  modifiedValues,
                  headerConfig,
                );
                toast.success(response.data.message, { position: 'top-right' });
                navigate(-1);
              } catch (error) {
                toast.error(error.response.data.message, {
                  position: 'top-right',
                });
              }
            }
          }}
        >
          {({
            values, errors, touched, handleBlur, handleChange,
          }) => (
            <Form
              style={{ width: '100%', background: 'white' }}
              className="d-flex align-items-center justify-content-center flex-column gap-4"
            >
              <label
                htmlFor="busId"
                style={{ width: '100%' }}
                className="d-flex flex-column gap-1 "
              >
                Choose Bus
                <Input
                  bsSize="sm"
                  type="select"
                  name="busId"
                  value={values.busId}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option disabled value="">
                    -Select-
                  </option>
                  {buses.map(({ _id: id, model }) => (
                    <option key={id} value={id}>
                      {model}
                    </option>
                  ))}
                </Input>
                {errors.busId && touched.busId ? (
                  <p
                    style={{ width: '100%', fontSize: '12px' }}
                    className="text-danger text-start text-wrap  m-0"
                  >
                    {errors.busId}
                  </p>
                ) : null}
              </label>

              <div
                style={{ width: '100%' }}
                className="d-flex align-items-center justify-content-between"
              >
                <label
                  htmlFor="from"
                  style={{ width: '45%' }}
                  className="d-flex flex-column gap-1"
                >
                  From
                  <Input
                    bsSize="sm"
                    type="text"
                    name="from"
                    value={values.from}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.from && touched.from ? (
                    <p
                      style={{ width: '100%', fontSize: '12px' }}
                      className="text-danger text-start m-0"
                    >
                      {errors.from}
                    </p>
                  ) : null}
                </label>
                <label
                  htmlFor="to"
                  style={{ width: '45%' }}
                  className="d-flex flex-column gap-1"
                >
                  To
                  <Input
                    bsSize="sm"
                    type="text"
                    name="to"
                    value={values.to}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.to && touched.to ? (
                    <p
                      style={{ width: '100%', fontSize: '12px' }}
                      className="text-danger text-start m-0"
                    >
                      {errors.to}
                    </p>
                  ) : null}
                </label>
              </div>

              <label
                htmlFor="ticketPrice"
                style={{ width: '100%' }}
                className="d-flex flex-column gap-1"
              >
                Ticket Price (₹)
                <Input
                  bsSize="sm"
                  type="number"
                  name="ticketPrice"
                  value={values.ticketPrice}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.ticketPrice && touched.ticketPrice ? (
                  <p
                    style={{ width: '100%', fontSize: '12px' }}
                    className="text-danger text-start m-0"
                  >
                    {errors.ticketPrice}
                  </p>
                ) : null}
              </label>

              <div
                style={{ width: '100%' }}
                className="d-flex align-items-center justify-content-between"
              >
                <label
                  htmlFor="startTime"
                  style={{ width: '45%' }}
                  className="d-flex flex-column gap-1"
                >
                  Start Time
                  <Input
                    bsSize="sm"
                    type="time"
                    name="startTime"
                    value={values.startTime}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.startTime && touched.startTime ? (
                    <p
                      style={{ width: '100%', fontSize: '12px' }}
                      className="text-danger text-start m-0"
                    >
                      {errors.startTime}
                    </p>
                  ) : null}
                </label>

                <label
                  htmlFor="endTime"
                  style={{ width: '45%' }}
                  className="d-flex flex-column gap-1"
                >
                  End Time
                  <Input
                    bsSize="sm"
                    type="time"
                    name="endTime"
                    value={values.endTime}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.endTime && touched.endTime ? (
                    <p
                      style={{ width: '100%', fontSize: '12px' }}
                      className="text-danger text-start m-0"
                    >
                      {errors.endTime}
                    </p>
                  ) : null}
                </label>
              </div>

              <label
                htmlFor="date"
                style={{ width: '100%' }}
                className="d-flex flex-column gap-1"
              >
                Date
                <Input
                  bsSize="sm"
                  type="date"
                  name="date"
                  value={values.date}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.date && touched.date ? (
                  <p
                    style={{ width: '100%', fontSize: '12px' }}
                    className="text-danger text-start m-0"
                  >
                    {errors.date}
                  </p>
                ) : null}
              </label>
              <div>
                <Button
                  style={{ width: '200px' }}
                  color="primary"
                  type="submit"
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

export default RouteForm;
