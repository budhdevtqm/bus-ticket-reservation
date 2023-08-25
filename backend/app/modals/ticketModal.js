const schema = require("../schemas/ticketSchema");
const routeSchema = require("../schemas/routeSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../../.env" });
const stripe = require("stripe")(process.env.SECRET_KEY);

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

module.exports.book = async (body) => {
  const { tickets, userID } = body;
  return new Promise(async (resolve, reject) => {
    try {
      tickets.map(
        async (ticket) =>
          await schema.updateOne(
            { _id: ticket._id },
            {
              ...ticket,
              bookedOn: new Date().getTime(),
              booked: true,
              assignedTo: userID,
              isCanceled: false,
            }
          )
      );
      resolve({ ok: true, message: "ticket booked" });
    } catch (error) {
      reject({ ok: false, message: "Something went wrong" });
    }
  });
};

module.exports.myTickets = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await schema.find({ assignedTo: body.userID });
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

module.exports.payment = async (body) => {
  const { amount } = body;
  return new Promise(async (resolve, reject) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "INR",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      console.log(paymentIntent, "payment-intent");
      // resolve({
      //   ok: true,
      //   message: "payment successfull",
      //   clientSecret: paymentIntent.client_secret,
      // });
    } catch (error) {
      reject({ ok: false, message: error.message });
    }
  });
};

/*

try {
  //     const ticket = await schema.find({ _id: ticketId });
  //     const booked = await schema.updateOne(
  //       { _id: ticketId },
  //       {
  //         ...ticket,
  //         bookedOn: new Date().getTime(),
  //         booked: true,
  //         assignedTo: userId,
  //       }
  //     );
  //     resolve({ ok: true, message: "Booked successfully", response: booked });
  //   } catch (error) {
  //     reject({ ok: false, message: "Something went worng" });
  //   }

*/
