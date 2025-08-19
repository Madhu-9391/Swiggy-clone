const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (Swiggy database)
mongoose.connect('mongodb://127.0.0.1:27017/Swiggy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Schema and Model for login_details collection
const userSchema = new mongoose.Schema({
  email: String,
  password: String, // stored as hashed password
});

const User = mongoose.model('login details', userSchema);

// POST /swiggy/login - Validate login credentials
app.post('/swiggy/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: 'Invalid email or password' });
    }

    // 2. Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid email or password' });
    }

    // 3. Login success
    res.status(200).json({ msg: 'Login successful' });

  } catch (err) {
    res.status(500).json({ msg: 'Server error: ' + err.message });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
