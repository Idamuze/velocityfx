// backend/routes/register.js
const express = require('express');
const router = express.Router();
const User = require('backend/models/user');

router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
