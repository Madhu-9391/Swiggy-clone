const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt'); // ← import bcrypt

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Swiggy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Schema and model
const loginSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const LoginDetail = mongoose.model('login details', loginSchema);

// Register API
app.post('/swiggy/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  try {
    const existingUser = await LoginDetail.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: 'Email already registered' });
    }

    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new LoginDetail({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
