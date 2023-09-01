const schema = require("../schemas/ticketSchema");
const routeSchema = require("../schemas/routeSchema");
const paymentSchema = require("../schemas/paymentSchema");
const ticketSchema = require("../schemas/ticketSchema");
const mailer = require("nodemailer");
const userSchema = require("../schemas/userSchema");
const busSchema = require("../schemas/busSchema");
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

      const { from, to, startTime, busId, date } = await routeSchema.findOne({
        _id: ticketData.routeId,
      });

      const { busNo, model } = await busSchema.findOne({ _id: busId });

      const paymentDetails = await paymentSchema.findOne({
        _id: ticketData.paymentId,
      });

      const { _id: transactionId, payment } = paymentDetails;

      resolve({
        ok: true,
        data: {
          ...ticketData,
          from,
          to,
          startTime,
          date,
          busNo,
          model,
          currency: payment.currency,
          payment_type: payment.payment_method_types[0],
          transactionId,
        },
      });
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
          seaterName: "",
          age: 0,
        }
      );

      resolve({ ok: true, message: "cancelled Successfully." });
    } catch (error) {
      reject({ ok: false, message: "Unable to cancel" });
    }
  });
};

module.exports.payment = async (body) => {
  const { amount, userID, tickets } = body;

  return new Promise(async (resolve, reject) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "inr",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      const { email, name } = await userSchema.findOne({ _id: userID });
      const ticketIds = tickets.map((ticket) => ticket._id);
      const seatNumber = tickets.map((ticket) => ticket.seatNumber);

      const savePayment = await paymentSchema.create({
        ticketIds,
        createdBy: userID,
        createdAt: new Date().getTime(),
        updatedAt: 0,
        status: true,
        payment: paymentIntent,
      });

      const { _id: paymentId } = savePayment;

      const { routeId } = tickets[0];
      const { startTime, date, busId, endTime } = await routeSchema.findOne({
        _id: routeId,
      });

      const { busNo } = await busSchema.findOne({ _id: busId });

      const updateTickets = await tickets.map(async (ticket) => {
        const updating = await ticketSchema.findOneAndUpdate(
          { _id: ticket._id },
          {
            ...ticket,
            paymentId: paymentId.toString(),
            bookedOn: new Date().getTime(),
            booked: true,
            assignedTo: userID,
          }
        );
      });

      const mailTransporter = mailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.MY_EMAIL,
          pass: process.env.MY_EMAIL_PASSWORD,
        },
      });

      const getTime = (milliseconds) => {
        const [h, m] = new Date(milliseconds - 19800000)
          .toString()
          .split(" ")[4]
          .split(":");
        return `${h} : ${m}`;
      };

      const mailDetails = {
        from: process.env.MY_EMAIL,
        to: email,
        subject: "Ticket Confirmation!",
        text: `Dear ${name},

        We are excited to confirm your ticket. Here are the details of your booking:
        
        Date: ${new Date(date).toDateString()}
        Time: ${getTime(startTime)} : ${getTime(endTime)}
        
        Ticket Details: 
        Quantity: ${ticketIds.length}
        Ticket ID: ${ticketIds}
        Bus No. : ${busNo}
        Seats: ${seatNumber.join(" ,")}
        
        Billing Information:
        Total Amount: ${amount}
        Payment Method: ${paymentIntent["payment_method_types"][0]}
        Transaction ID: ${savePayment._id.toString()}
        
        Please ensure that you bring a copy of this confirmation email or your ticket ID to the event. Your ticket ID is a unique identifier and will be used for verification during entry.
        
        If you have any questions or need further assistance, feel free to reply to this email or contact our customer support at ticketreservation@gmail.com or +91 **********.
        
        
        Best regards,
        Bus Ticket Reservation
        `,
      };

      await mailTransporter.sendMail(mailDetails, (error, info) => {
        if (error) console.log(error, "mail-error");
      });

      resolve({
        ok: true,
        message: "payment and booking is successfull",
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      reject({ ok: false, message: error.message });
    }
  });
};
