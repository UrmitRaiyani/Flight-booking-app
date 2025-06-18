const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Get profile
router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user).select('-password');
  res.json(user);
});

// Update profile
router.put('/', auth, async (req, res) => {
  const { name, email, password } = req.body;
  const update = {};
  if (name) update.name = name;
  if (email) update.email = email;
  if (password) update.password = await bcrypt.hash(password, 10);

  const user = await User.findByIdAndUpdate(req.user, update, { new: true }).select('-password');
  res.json(user);
});

module.exports = router;