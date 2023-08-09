const busSchema = require("../schemas/busSchema");

module.exports.addBus = async (values) => {
  return new Promise(async (resolve, reject) => {
    const data = {
      ...values,
      createdAt: new Date().getTime(),
      updatedAt: 0,
      status: false,
    };

    const isAlready = await busSchema.findOne({ busNo: values.busNo });
    if (isAlready !== null)
      reject({ ok: false, message: "This bus already exist" });

    try {
      const save = await busSchema.create(data);
      resolve({ ok: true, message: "Bus added successfully" });
    } catch (error) {
      reject({ ok: false, message });
    }
  });
};
