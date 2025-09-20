// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define port and MongoDB URL directly
const PORT = 5000; // you can change this to any port
const MONGO_URI = "mongodb://127.0.0.1:27017/Swiggy"; // or your remote MongoDB URL

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Define Order schema
const orderSchema = new mongoose.Schema({
  orderId: String,
  email: String,
  restaurantName: String,
  items: [
    {
      name: String,
      qty: Number,
      price: Number,
    },
  ],
  subtotal: Number,
  deliveryFee: Number,
  total: Number,
  paymentMode: String,
  createdAt: { type: Date, default: Date.now },
  address:String,
});

const Order = mongoose.model("Order", orderSchema,"orders");

// POST /swiggy/orders - Save a new order
app.post("/swiggy/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.json({ success: true, orderId: newOrder.orderId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error saving order" });
  }
});

// Optional: GET /api/orders - fetch all orders
app.get("/swiggy/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
