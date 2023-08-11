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
    };

    try {
      const created = await schema.create(data);
      resolve({ ok: true, message: "Route Created Successfully." });
    } catch (error) {
      reject({ ok: true, message: "Something went wrong." });
    }
  });
};
