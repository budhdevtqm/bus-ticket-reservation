const modal = require("../modals/busModal");

module.exports.create = async (req, res) => {
  try {
    const addBus = await modal.addBus(req.body);
    res.status(201).json(addBus);
  } catch (error) {
    res.status(400).json(error);
  }
};
