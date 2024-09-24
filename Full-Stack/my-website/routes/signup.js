const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcrypt');

const saltRounds = 5;

router.post('/signup', async (req, res) => {
  console.log(req.body);
  const {
    username,
    email,
    dateOfBirth,
    role,
    location,
    password,
    confirmPassword,
  } = req.body;

  if (
    !username ||
    !email ||
    !dateOfBirth ||
    !role ||
    !location ||
    !password ||
    !confirmPassword
  ) {
    return res.status(400).send('All fields are required.');
  }

  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match.');
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email is already registered.');
    }

    // Hash the password using bcrypt with the defined saltRounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      email,
      dateOfBirth,
      role,
      location,
      password: hashedPassword, // Store the hashed password
    });
    await newUser.save();

    res.status(201).send('Signup successful!');
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('Server error.');
  }
});

module.exports = router;
