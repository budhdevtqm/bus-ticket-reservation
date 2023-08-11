const modal = require("../modals/routeModal");

module.exports.create = async (req, res) => {
  try {
    const response = await modal.create(req);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.update = async (req, res) => {};

module.exports.delete = async (req, res) => {};

module.exports.get = async (req, res) => {};

module.exports.getAll = async (req, res) => {};
