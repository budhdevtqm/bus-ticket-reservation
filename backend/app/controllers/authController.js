const { validationResult } = require("express-validator");
const modal = require("../modals/passModal");

module.exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const signingUp = await modal.signUp(req.body);
    res.status(201).json({ ...signingUp });
  } catch (error) {
    res.status(400).json({ ...error });
  }
};

module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const logging = await modal.login(req.body);
    res.status(200).json(logging);
  } catch (error) {
    res.status(400).json({ ...error });
  }
};
