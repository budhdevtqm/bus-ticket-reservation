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

module.exports.bookTicket = async (req, res) => {
  try {
    const response = await modal.book(req);
    res.status(200).json(response);
  } catch (er) {
    res.status(400).json(er);
  }
};

module.exports.getMyTickets = async (req, res) => {
  try {
    const response = await modal.myTickets(req);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};
