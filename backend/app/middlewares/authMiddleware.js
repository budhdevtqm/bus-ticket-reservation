require("dotenv").config({ path: "../../.env" });
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");

module.exports.auth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null || token == undefined) return res.status(401);
  try {
    const verify = await jwt.verify(token, process.env.JWT_PRIVATE);
    const { userId } = verify;
    req.body.userID = userId;
    next();
  } catch (error) {
    res.status(401).json({ ok: false, message: "Invalid Token" });
  }
};

module.exports.authAdmins = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const verify = await jwt.verify(token, process.env.JWT_PRIVATE);
  const { userId } = verify;
  const user = await userSchema.findOne({ _id: userId });

  if (user.permissions === "user" || user === null) {
    return res.status(403).json({ ok: false, message: "Action Not Allowed" });
  } else {
    req.body.userID = user._id.toString();
    req.body.permissions = user.permissions;
    next();
  }
};
