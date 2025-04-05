import express from "express";
import path from "path";
import colors from "colors"; // used elsewhere
import cors from "cors";
import { config } from "dotenv";
import { errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
// routes
import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";

// config dotenv
config();
// connect db
connectDB();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);

// serve frontend
if (process.env.NODE_ENV === "production") {
  // set build folder as static
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => res.sendFile(__dirname, "../", "client", "dist", "index.html"));
} else {
  app.get("/", (req, res) => {
    res.status(201).json({ message: "Welcome to the support Desk API" });
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
