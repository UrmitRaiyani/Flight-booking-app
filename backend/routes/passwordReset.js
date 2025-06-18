const express = require('express');
const crypto = require('crypto');
const User = require('../models/User');
const sendPasswordReset = require('../utils/sendPasswordReset');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Request password reset
router.post('/request', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Generate token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send email
    await sendPasswordReset(user.email, token);

    res.json({ msg: 'Password reset email sent' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Reset password
router.post('/reset/:token', async (req, res) => {
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) return res.status(400).json({ msg: 'Invalid or expired token' });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ msg: 'Password has been reset' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;