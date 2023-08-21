const { validationResult } = require("express-validator");
const modal = require("../modals/userModal");

module.exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const signingUp = await modal.signUp(req.body);
    res.status(201).json(signingUp);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.login = async (req, res) => {
  console.log(req.body, "res=body-login");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const logging = await modal.login(req.body);
    res.status(200).json(logging);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.checkToken = async (req, res) => {
  try {
    const response = await modal.checkToken(req);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};
