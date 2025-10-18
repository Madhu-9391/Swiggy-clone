import express from "express";
import Order from "../models/User.js";

const router = express.Router();

// GET /swiggy/orders?email=user@example.com
router.get("/", async (req, res) => {
  try {
    
    
    const users = await Order.find().sort({ createdAt: -1 });
    console.log(users)
    res.json({ success: true, users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching users" });
  }
});

export default router;
