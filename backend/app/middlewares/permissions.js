require("dotenv").config({ path: "../../.env" });
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");

module.exports.onlyAdmin = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const verify = await jwt.verify(token, process.env.JWT_PRIVATE);
  const { userId } = verify;
  const isAdmin = await userSchema.findOne({
    _id: userId,
    permissions: "admin",
  });

  if (isAdmin === null) {
    return res.status(403).json({ ok: false, message: "Action Not Allowed" });
  }
  next();
};

module.exports.onlySuperAdmin = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const verify = await jwt.verify(token, process.env.JWT_PRIVATE);
  const { userId } = verify;
  const superAdmin = await userSchema.findOne({
    _id: userId,
    permissions: "superAdmin",
  });

  if (superAdmin === null) {
    return res.status(403).json({ ok: false, message: "Action Not Allowed" });
  }
  next();
};

module.exports.adminAndSuperadmin = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const verify = await jwt.verify(token, process.env.JWT_PRIVATE);
  const { userId } = verify;

  const user = await userSchema.findOne({ _id: userId });

  try {
    if (user.permissions === "admin" || user.permissions === "superAdmin") {
      next();
    }
  } catch (error) {
    return res.status(403).json({ ok: false, message: "Action Not Allowed" });
  }
};
