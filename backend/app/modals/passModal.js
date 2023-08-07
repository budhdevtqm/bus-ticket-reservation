const passSchema = require("../schemas/passSchema");
require("dotenv").config({ path: "../../.env" });
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_PRIVATE;

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
        message: "This email is already in use.",
      });

    try {
      const saved = await data.save();
      console.log(saved, "saved");
      const userId = saved._id.toString();
      const token = jwt.sign({ userId: userId }, secretKey);
      resolve({
        status: 201,
        ok: true,
        message: "SignUp successfully",
        token: token,
      });
    } catch (error) {
      return reject({
        ok: false,
        message: "Something went wrong while signup.",
      });
    }
  });
};

module.exports.login = async (values) => {
  const { email, password } = values;

  return new Promise(async (resolve, reject) => {
    const isExistingUser = await passSchema.findOne({ email });
    if (isExistingUser == null)
      return reject({ ok: false, message: "User not found" });

    const isValidPassword = isExistingUser.password === password;

    if (!isValidPassword)
      return reject({ ok: false, message: "Invalid password" });

    const userId = isExistingUser._id.toString();
    const token = jwt.sign({ userId: userId }, secretKey);
    resolve({ ok: true, token: token, message: "Login successfully" });
  });
};
