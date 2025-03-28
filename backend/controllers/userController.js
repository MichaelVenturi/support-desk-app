import asyncHandler from "express-async-handler";

// register a new user
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }
  res.send("Register Route");
});

// login an existing user
export const loginUser = asyncHandler(async (req, res) => {
  res.send("login Route");
});
