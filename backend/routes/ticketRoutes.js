import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getTickets, createTicket } from "../controllers/ticketController.js";

const router = express.Router();

// .route : attach multiple requests to one route
router.route("/").get(protect, getTickets).post(protect, createTicket);

export default router;
