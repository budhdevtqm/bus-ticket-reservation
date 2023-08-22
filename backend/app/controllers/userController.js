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

module.exports.getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const response = await modal.getUser(userId);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.update = async (req, res) => {
  const userId = req.params.id;
  try {
    const response = await modal.updateUser(userId, req.body);
    res.status(202).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const response = await modal.delete(userId, req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.getInfo = async (req, res) => {
  try {
    const response = await modal.myInfo(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    const response = await modal.updatePassword(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};
