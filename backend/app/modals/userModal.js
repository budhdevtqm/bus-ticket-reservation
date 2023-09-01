const userSchema = require("../schemas/userSchema");
require("dotenv").config({ path: "../../.env" });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_PRIVATE;

module.exports.signUp = async (values) => {
  const { name, email, password } = values;

  return new Promise(async (resolve, reject) => {
    const isAlready = await userSchema.findOne({ email: values.email });

    if (isAlready !== null)
      return reject({
        status: 409,
        ok: false,
        message: "This email is already in use.",
      });

    try {
      await bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          await new userSchema({
            name,
            email,
            password: hash,
            permissions: "user",
            createdAt: new Date().getTime(),
            updatedAt: 0,
          }).save();
        });
      });

      resolve({
        status: 201,
        ok: true,
        message: "Signup successfully, please login.",
      });
    } catch (error) {
      return reject({
        ok: false,
        message: "Something went wrong while signup.",
      });
    }
  });
};

module.exports.myInfo = async (body) => {
  return new Promise(async (resolve, reject) => {
    const userInfo = await userSchema.findOne({ _id: body.userID });
    if (userInfo !== null) {
      const { name, email, createdAt, updatedAt } = userInfo;
      resolve({ ok: true, data: { name, email, createdAt, updatedAt } });
    } else {
      reject({ ok: false, message: "Something went wrong" });
    }
  });
};

module.exports.login = async (values) => {
  const { email, password } = values;
  return new Promise(async (resolve, reject) => {
    const isUser = await userSchema.findOne({ email });
    if (isUser == null) return reject({ ok: false, message: "Invalid email" });

    const userId = isUser._id.toString();
    const { permissions, password: passwordHash } = isUser;

    const matchPassword = await bcrypt.compare(password, passwordHash);

    if (!matchPassword)
      return reject({ ok: false, message: "Invalid password" });

    const token = jwt.sign({ userId: userId }, secretKey, { expiresIn: "1h" });

    resolve({
      ok: true,
      token: token,
      message: "Login successfully",
      permissions,
    });
  });
};

module.exports.create = async (values) => {
  return new Promise(async (resolve, reject) => {
    const isAlready = await userSchema.findOne({ email: values.email });

    if (isAlready !== null)
      return reject({
        status: 409,
        ok: false,
        message: "This email is already in use.",
      });

    const { name, email, password, permissions } = values;

    try {
      await bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          await new userSchema({
            name,
            email,
            password: hash,
            permissions,
            createdAt: new Date().getTime(),
            updatedAt: 0,
          }).save();
        });
      });

      resolve({
        status: 201,
        ok: true,
        message: "User Created successfully",
      });
    } catch (error) {
      return reject({
        ok: false,
        message: "Error occurred while adding user",
      });
    }
  });
};

module.exports.getAllUsers = async () => {
  return new Promise(async (resolve, rejcet) => {
    try {
      const allUsers = await userSchema.find({});
      resolve({ ok: true, data: allUsers });
    } catch (error) {
      rejcet({ ok: false, message: "Something went wrong." });
    }
  });
};

module.exports.getUser = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { createdAt, updatedAt, name, email, permissions, _id } =
        await userSchema.findOne({ _id: userId });
      resolve({
        ok: true,
        data: { createdAt, updatedAt, name, email, permissions, _id },
      });
    } catch (er) {
      reject({ ok: false, message: "User Not Found" });
    }
  });
};

module.exports.updateUser = async (userId, values) => {
  return new Promise(async (resolve, reject) => {
    try {
      await userSchema.findOneAndUpdate(
        { _id: userId },
        { ...values, updatedAt: new Date().getTime() }
      );
      resolve({ ok: true, message: "Updated Successfully." });
    } catch (error) {
      reject({ ok: false, message: "Somethng went wrong while updating" });
    }
  });
};

module.exports.delete = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await userSchema.deleteOne({ _id: userId });
      resolve({ ok: true, message: "Deleted successfully" });
    } catch (error) {
      reject({
        ok: false,
        message: "Something went wrong",
      });
    }
  });
};

module.exports.updatePassword = async (body) => {
  const { userID, password } = body;
  return new Promise(async (resolve, reject) => {
    try {
      const { name, email, createdAt, permissions } = await userSchema.findOne({
        _id: userID,
      });

      await bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          await userSchema.findOneAndUpdate(
            { _id: userID },
            {
              name,
              email,
              password: hash,
              permissions,
              createdAt,
              updatedAt: new Date().getTime(),
            }
          );
        });
      });

      resolve({ ok: true, message: "password changed successfully." });
    } catch (error) {
      reject({ ok: false, message: "Unable to update Password" });
    }
  });
};
