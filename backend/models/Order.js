import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: String,
  email: String,
  restaurantName: String,
  items: [
    { name: String, qty: Number, price: Number },
  ],
  subtotal: Number,
  deliveryFee: Number,
  total: Number,
  paymentMode: String,
  address: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("orders", orderSchema);
