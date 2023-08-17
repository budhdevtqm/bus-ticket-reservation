const schema = require("../schemas/ticketSchema");
const routeSchema = require("../schemas/routeSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../../.env" });

module.exports.getAll = async (routeId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allTicket = await schema.find({ routeId });
      resolve({ ok: true, data: allTicket });
    } catch (error) {
      reject({ ok: false, message: "Something went wrong" });
    }
  });
};

module.exports.book = async (req) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const verify = await jwt.verify(token, process.env.JWT_PRIVATE);
  const { userId } = verify;
  const ticketId = req.params.id;
  return new Promise(async (resolve, reject) => {
    try {
      const ticket = await schema.find({ _id: ticketId });
      const booked = await schema.updateOne(
        { _id: ticketId },
        {
          ...ticket,
          bookedOn: new Date().getTime(),
          booked: true,
          assignedTo: userId,
        }
      );
      resolve({ ok: true, message: "Booked successfully", response: booked });
    } catch (error) {
      reject({ ok: false, message: "Something went worng" });
    }
  });
};

module.exports.myTickets = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await schema.find({ assignedTo: userId });
      resolve({ ok: true, data: data });
    } catch (error) {
      reject({ ok: false, message: "Something went worng" });
    }
  });
};

module.exports.getTicket = async (ticketId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ticketData = await schema.findOne({ _id: ticketId });
      resolve({ ok: true, data: ticketData });
    } catch (error) {
      reject({ ok: false, message: "Something went worng" });
    }
  });
};

module.exports.cancel = async (ticketId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ticketData = await schema.findOne({ _id: ticketId });
      const { busId, routeId } = ticketData;
      const update = await schema.updateOne(
        { _id: ticketId },
        {
          busId,
          routeId,
          booked: false,
          bookedOn: 0,
          assignedTo: "",
          isCanceled: true,
        }
      );
      resolve({ ok: true, message: "cancelled Successfully." });
    } catch (error) {
      reject({ ok: false, message: "Unable to cancel" });
    }
  });
};
