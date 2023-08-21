const busSchema = require("../schemas/busSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../../.env" });

module.exports.addBus = async (body) => {
  const { busNo, userID, manufacturer, model } = body;
  return new Promise(async (resolve, reject) => {
    const data = {
      busNo,
      manufacturer,
      model,
      createdAt: new Date().getTime(),
      createdBy: userID,
      updatedAt: 0,
      status: false,
    };
    const isAlready = await busSchema.findOne({ busNo });
    if (isAlready !== null) {
      reject({ ok: false, message: "This bus already exist" });
      return;
    }
    try {
      const save = await busSchema.create(data);
      resolve({ ok: true, message: "Bus added successfully" });
    } catch (error) {
      reject({ ok: false, message });
    }
  });
};

module.exports.getAllBuses = async (body) => {
  const { userID, permissions } = body;
  return new Promise(async (resolve, reject) => {
    try {
      if (permissions === "admin") {
        const myBuses = await busSchema.find({ createdBy: userID.toString() });
        resolve({ ok: true, data: myBuses });
      }
      if (permissions === "superAdmin") {
        const allBuses = await busSchema.find({});
        resolve({ ok: true, data: allBuses });
      }
    } catch (error) {
      reject({ ok: false, message: "Something went wrong!" });
    }
  });
};

module.exports.getBusById = async (busId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const bus = await busSchema.findOne({ _id: busId });
      resolve({ ok: true, bus: bus });
    } catch (error) {
      reject({ ok: false, message: "Something went wrong" });
    }
  });
};

module.exports.deleteBus = async (busId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deleting = await busSchema.deleteOne({ _id: busId });
      resolve({ ok: true, message: "Deleted" });
    } catch (error) {
      reject({ ok: false, message: "Something went wrong" });
    }
  });
};

module.exports.updateBus = async (busId, values) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updated = await busSchema.findOneAndUpdate(
        { _id: busId },
        {
          ...values,
          updatedAt: new Date().getTime(),
        }
      );
      resolve({ ok: true, message: "Bus Updated succesfully" });
    } catch (error) {
      reject({ ok: false, message: "Something went wrong" });
    }
  });
};
