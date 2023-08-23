const schema = require("../schemas/routeSchema");
const ticketSchema = require("../schemas/ticketSchema");
require("dotenv").config({ path: "../../.env" });
const jwt = require("jsonwebtoken");

module.exports.create = async (body) => {
  const {
    userID,
    busId,
    from,
    to,
    date,
    startTime,
    endTime,
    totalSeats,
    ticketPrice,
    permissons,
  } = body;

  return new Promise(async (resolve, reject) => {
    const data = {
      busId,
      from,
      to,
      date,
      startTime,
      endTime,
      totalSeats,
      ticketPrice,
      status: true,
      createdAt: new Date().getTime(),
      createdBy: userID,
      availableSeats: totalSeats,
      updatedAt: 0,
    };
    const isAlreadyExists = await schema.findOne({ ...data });
    if (isAlreadyExists !== null) {
      reject({ ok: false, message: "This Route already exists" });
      return;
    }
    try {
      const created = await schema.create(data);
      const { busId, _id, totalSeats, ticketPrice } = created;
      for (let i = 1; i <= totalSeats; i++) {
        await ticketSchema.create({
          busId,
          routeId: _id,
          seatNumber: i,
          seaterName: "",
          assignedTo: "",
          isCanceled: false,
          booked: false,
          price: ticketPrice,
          bookedOn: 0,
        });
      }
      resolve({
        ok: true,
        message: "Route Created Successfully.",
      });
    } catch (error) {
      reject({ ok: true, message: "Something went wrong." });
    }
  });
};

module.exports.update = async (routeId, values) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updated = await schema.findOneAndUpdate(
        { _id: routeId },
        { ...values, updatedAt: new Date().getTime() }
      );

      resolve({ ok: true, message: "Route Updated succesfully" });
    } catch (error) {
      reject({ ok: false, message: "Something went wrong" });
    }
  });
};

module.exports.getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allRoutes = await schema.find({});
      resolve({ ok: true, data: allRoutes });
    } catch (error) {
      reject({ ok: false, message: "Something went wrong" });
    }
  });
};

module.exports.delete = async (routeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deleted = await schema.deleteOne({ _id: routeId });
      resolve({ ok: true, message: "Deleted Successfully" });
    } catch (error) {
      reject({ ok: false, message: "Something went wrong" });
    }
  });
};

module.exports.get = async (routeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const route = await schema.findOne({ _id: routeId });
      resolve({ ok: true, data: route });
    } catch (error) {
      reject({ ok: false, message: error.message });
    }
  });
};
