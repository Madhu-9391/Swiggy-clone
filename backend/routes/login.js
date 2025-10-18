// backend/routes/login.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// POST /swiggy/login
router.post("/", async (req, res) => {
  const { email, password } = req.body;


  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "2h" });

    res.status(200).json({ msg: "Login successful",email:user.email, name: user.name, token });
    
  } catch (err) {
    res.status(500).json({ msg: "Server error: " + err.message });
  }
});
// 👇 This is the critical line
export default router;
