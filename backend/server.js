//server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
// Route imports
import loginRoutes from "./routes/login.js";
import registerRoutes from "./routes/register.js";
// CORRECTED: This now correctly imports the default export from OrderStore.js
import orderRoutes from "./routes/OrderStore.js";
import myOrders from "./routes/myOrders.js";
import adminOrders from "./routes/adminOrders.js";
import adminUsers from "./routes/users.js";


const app = express();
app.use(cors());
app.use(express.json()); 
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Swiggy";

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/swiggy/login", loginRoutes);
app.use("/swiggy/register", registerRoutes);
app.use("/swiggy/orders", orderRoutes);
app.use("/swiggy/admin/orders", adminOrders);
app.use("/swiggy/myorders", myOrders);
app.use("/swiggy/admin/users",adminUsers);
// Server start
app.listen(PORT, () =>
  console.log(`🚀 Backend running at http://localhost:${PORT}`)
);
