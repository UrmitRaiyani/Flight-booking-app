const express = require('express');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
const sendBookingConfirmation = require('../utils/mailer');
const User = require('../models/User');

const router = express.Router();

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Book a flight
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               flight_number:
 *                 type: string
 *               airline:
 *                 type: string
 *               departure:
 *                 type: string
 *               arrival:
 *                 type: string
 *               departure_time:
 *                 type: string
 *               meal:
 *                 type: string
 *               price:
 *                 type: string
 *     responses:
 *       201:
 *         description: Flight booked successfully
 *
 *   get:
 *     summary: Get all bookings for the logged-in user
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings
 */

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Cancel a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking cancelled
 */

/**
 * @swagger
 * /api/bookings/resend/{id}:
 *   post:
 *     summary: Resend booking confirmation email
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Confirmation email resent
 */

// Book a flight
router.post('/', auth, async (req, res) => {
  const { flight_number, airline, departure, arrival, departure_time, price, meal } = req.body;
  try {
    const booking = new Booking({
      user: req.user,
      flight_number,
      airline,
      departure,
      arrival,
      departure_time,
      price,
      meal
    });
    await booking.save();

    const user = await User.findById(req.user);
    await sendBookingConfirmation(user.email, booking);

    res.status(201).json({ msg: 'Flight booked successfully', booking });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all bookings for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Cancel a booking
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({ _id: req.params.id, user: req.user });
    if (!booking) return res.status(404).json({ msg: 'Booking not found' });
    res.json({ msg: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Resend booking confirmation email
router.post('/resend/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user });
    if (!booking) return res.status(404).json({ msg: 'Booking not found' });
    const user = await User.findById(req.user);
    await sendBookingConfirmation(user.email, booking);
    res.json({ msg: 'Confirmation email resent' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;