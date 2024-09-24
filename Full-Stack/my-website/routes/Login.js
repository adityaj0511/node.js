const express = require('express');
const router = express.Router();
const User = require('./User');  // Make sure this is pointing to the correct path
const bcrypt = require('bcrypt');

// POST /login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // Log the request body for debugging purposes
  console.log('Request Body:', req.body);

  // Check if both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the entered password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log(isMatch)
    // If login is successful, respond with a success message
    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
