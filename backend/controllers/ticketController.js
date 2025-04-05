import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Ticket from "../models/ticketModel.js";

// @desc get all tickets
// @route GET api/tickets
// @access  private
export const getTickets = asyncHandler(async (req, res) => {
  // get user using id in JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // get tickets
  const tickets = await Ticket.find({ user: req.user.id }).select("-__v");
  res.status(200).json(tickets);
});

// @desc get one ticket by ID
// @route GET api/tickets/:id
// @access  private
export const getTicketById = asyncHandler(async (req, res) => {
  // get user using id in JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // get ticket
  const ticket = await Ticket.findById(req.params.id).select("-__v");
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  // authorize
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }
  res.status(200).json(ticket);
});

// @desc create new ticket
// @route POST api/tickets
// @access  private
export const createTicket = asyncHandler(async (req, res) => {
  // get ticket info
  const { product, description } = req.body;
  if (!product || !description) {
    res.status(400);
    throw new Error("Please add a product and description");
  }
  // get user using id in JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  let ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });
  ticket = ticket.toObject();
  delete ticket.__v;

  res.status(201).json(ticket);
});

// @desc delete ticket
// @route DELETE api/tickets/:id
// @access  private
export const deleteTicket = asyncHandler(async (req, res) => {
  // get user using id in JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // get ticket
  const ticket = await Ticket.findById(req.params.id).select("-__v");
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  // authorize
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }
  await Ticket.deleteOne({ _id: req.params.id });
  res.status(200).json({ success: true, deletedTicket: ticket });
});

// @desc update a ticket
// @route PUT api/tickets/:id
// @access  private
export const updateTicket = asyncHandler(async (req, res) => {
  // get user using id in JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // get ticket
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  // authorize
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }
  const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-__v");
  res.status(200).json(updatedTicket);
});
