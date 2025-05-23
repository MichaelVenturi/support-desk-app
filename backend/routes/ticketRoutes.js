import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getTickets,
  getTicketById,
  createTicket,
  deleteTicket,
  updateTicket,
} from "../controllers/ticketController.js";

import noteRoutes from "./noteRoutes.js";

const router = express.Router();
// tack note routes onto this ticket route
router.use("/:ticketId/notes", noteRoutes);

// .route : attach multiple requests to one route
router.route("/").get(protect, getTickets).post(protect, createTicket);
router.route("/:id").get(protect, getTicketById).delete(protect, deleteTicket).put(protect, updateTicket);

export default router;
