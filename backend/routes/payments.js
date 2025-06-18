require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const auth = require('../middleware/auth');

const router = express.Router();

// Create a payment intent
router.post('/create-payment-intent', auth, async (req, res) => {
  const { price, currency = 'usd' } = req.body; // price sent from frontend
  try {
    const amount = Math.round(Number(price.replace('$', '')) * 100); // Remove $ and convert to cents
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ msg: 'Stripe error', error: err.message });
  }
});

module.exports = router;