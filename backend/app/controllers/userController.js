const modal = require("../modals/userModal");

module.exports.create = async (req, res) => {
  try {
    const response = await modal.create(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const response = await modal.getAllUsers();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};
