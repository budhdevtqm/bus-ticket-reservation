const modal = require("../modals/busModal");

module.exports.create = async (req, res) => {
  try {
    const response = await modal.addBus(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const allBuses = await modal.getAllBuses(req.body);
    res.status(200).json(allBuses);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.getBus = async (req, res) => {
  const busId = req.params.id;
  try {
    const bus = await modal.getBusById(busId);
    res.status(200).json(bus);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.delete = async (req, res) => {
  const busId = req.params.id;
  try {
    const response = await modal.deleteBus(busId);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.update = async (req, res) => {
  const busId = req.params.id;
  try {
    const response = await modal.updateBus(busId, req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.myBuses = async (req, res) => {
  try {
    const response = await modal.myBuses(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};
