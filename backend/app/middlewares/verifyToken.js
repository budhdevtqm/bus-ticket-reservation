require("dotenv").config({ path: "../../.env" });
const jwt = require("jsonwebtoken");

module.exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null || token == undefined) return res.status(401);
  try {
    await jwt.verify(token, process.env.JWT_PRIVATE);
    next();
  } catch (error) {
    res.status(401).json({ ok: false, message: "Invalid Token" });
  }
};
