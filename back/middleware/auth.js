// auth.js
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { JWT_SECRET } from "../config.js";

export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Invalid token:", err.message);
    res.status(400).json({ message: "Invalid token" });
  }
};
