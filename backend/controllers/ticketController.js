import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Ticket from "../models/ticketModel.js";

//  get user tickets
export const getTickets = asyncHandler(async (req, res) => {
  // get user using id in JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // get tickets
  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

// create new ticket
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

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(ticket);
});
