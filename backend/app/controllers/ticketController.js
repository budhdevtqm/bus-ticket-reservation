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
    const response = await modal.book(req.body);
    res.status(200).json(response);
  } catch (er) {
    res.status(400).json(er);
  }
};

module.exports.getMyTickets = async (req, res) => {
  try {
    const response = await modal.myTickets(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports.getTicket = async (req, res) => {
  const ticketId = req.params.id;
  try {
    const response = await modal.getTicket(ticketId);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.cancelTicket = async (req, res) => {
  const ticketId = req.params.id;
  try {
    const response = await modal.cancel(ticketId);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.ticketPayment = async (req, res) => {
  try {
    const response = await modal.payment(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};
