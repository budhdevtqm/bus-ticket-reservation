const schema = require("../schemas/ticketSchema");

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
