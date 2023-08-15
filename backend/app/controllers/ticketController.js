const modal = require("../modals/ticketModal");

module.exports.getAll = async (req, res) => {
  const routeId = req.params.id;
  try {
    const response = await modal.getAll(routeId);
    res.status(200).json(response);
  } catch (er) {
    res.status(400).json(er);
  }
};
