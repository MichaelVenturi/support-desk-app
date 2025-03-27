import express from "express";
import { config } from "dotenv";

// config dotenv
config();

const PORT = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.status(201).json({ message: "Welcome" });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
