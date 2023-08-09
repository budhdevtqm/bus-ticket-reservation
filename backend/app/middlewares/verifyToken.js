module.exports.verifyToken = async (req, res, next) => {
  const reqHeader = req.headers["authorization"];
  console.log(reqHeader, "rq");
};
