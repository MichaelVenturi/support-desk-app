import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Ticket from "../models/ticketModel.js";
import Note from "../models/noteModel.js";

// @desc get all notes for a ticket
// @route GET api/tickets/:ticketId/notes
// @access  private
export const getNotes = asyncHandler(async (req, res) => {
  // get user using id in JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // get ticket
  const ticket = await Ticket.findById(req.params.ticketId).select("-__v");
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  // check if this is the users ticket
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const notes = await Note.find({ ticket: req.params.ticketId }).select("-__v");
  res.status(200).json(notes);
});

// @desc create note for ticket
// @route POST api/tickets/:ticketId/notes
// @access  private
export const addNote = asyncHandler(async (req, res) => {
  // get user using id in JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // get ticket
  const ticket = await Ticket.findById(req.params.ticketId).select("-__v");
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  // check if this is the users ticket
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  let note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id,
  });
  note = note.toObject();
  delete note.__v;
  res.status(200).json(note);
});
