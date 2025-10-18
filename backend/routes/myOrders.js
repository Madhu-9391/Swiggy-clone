import express from "express";
import jwt from "jsonwebtoken";
import Order from "../models/Order.js";

const router = express.Router();

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach decoded info (like email) to request
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};

// GET /swiggy/myorders - protected route
router.get("/", verifyToken, async (req, res) => {
  try {
    const email = req.user.email; // get email from token
    const orders = await Order.find({ email }).sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
});

export default router;
