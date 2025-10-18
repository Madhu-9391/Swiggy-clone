import express from "express";
import Order from "../models/Order.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

// POST /swiggy/orders
// Handles creating a new order
router.post("/",verifyToken, async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.json({ success: true, orderId: newOrder.orderId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error saving order" });
  }
});

// This is a "default export". In the other file, you can import it with any name.
export default router;
