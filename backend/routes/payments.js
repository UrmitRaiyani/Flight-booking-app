require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/payments/create-payment-intent:
 *   post:
 *     summary: Create a Stripe payment intent
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: string
 *               currency:
 *                 type: string
 *     responses:
 *       200:
 *         description: Stripe client secret returned
 */

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