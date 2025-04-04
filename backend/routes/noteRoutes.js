import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getNotes, addNote } from "../controllers/noteController.js";

// /api/tickets/:ticketId/notes
const router = express.Router({ mergeParams: true });

router.route("/").get(protect, getNotes).post(protect, addNote);

export default router;
