const passSchema = require("../schemas/passSchema");

module.exports.signUp = async (values) => {
  const data = new passSchema({
    ...values,
    permissions: "traveller",
    createdAt: new Date().getTime(),
    updatedAt: 0,
  });

  return new Promise(async (resolve, reject) => {
    const isAlready = await passSchema.findOne({ email: values.email });

    if (isAlready !== null)
      return reject({
        status: 409,
        ok: false,
        message: "This email already in use.",
      });

    try {
      await data.save();
      resolve({ ok: true, message: "Signup successed" });
    } catch (error) {
      return reject({
        ok: false,
        message: "Something went wrong while signup.",
      });
    }
  });
};
