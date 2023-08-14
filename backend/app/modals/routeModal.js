const schema = require("../schemas/routeSchema");
require("dotenv").config({ path: "../../.env" });
const jwt = require("jsonwebtoken");

module.exports.create = async (req) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const verify = await jwt.verify(token, process.env.JWT_PRIVATE);
  const { userId } = verify;

  return new Promise(async (resolve, reject) => {
    const data = {
      ...req.body,
      createdAt: new Date().getTime(),
      createdBy: userId,
      availableSeats: req.body.totalSeats,
    };

    const isAlreadyExists = await schema.findOne({ ...req.body });
    if (isAlreadyExists !== null) {
      reject({ ok: false, message: "This Route already exists" });
      return;
    }

    try {
      const created = await schema.create(data);
      resolve({ ok: true, message: "Route Created Successfully." });
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
