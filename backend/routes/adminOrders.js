import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// GET /swiggy/orders?email=user@example.com
router.get("/", async (req, res) => {
  try {
  
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
});

export default router;
