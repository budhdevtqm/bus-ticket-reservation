const modal = require("../modals/routeModal");

module.exports.create = async (req, res) => {
  try {
    const response = await modal.create(req);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await modal.update(id, req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await modal.delete(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const response = await modal.getAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.getRoute = async (req, res) => {
  const id = req.params.id;
  console.log(id, "id");
  res.end();
  try {
    const response = await modal.get(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};
