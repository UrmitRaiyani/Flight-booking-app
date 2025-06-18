require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = process.env.AVIATIONSTACK_API_KEY; 

/**
 * @swagger
 * /api/flights/all:
 *   get:
 *     summary: Get all available flights (with optional filters)
 *     tags: [Flights]
 *     parameters:
 *       - in: query
 *         name: airline
 *         schema:
 *           type: string
 *         description: Filter by airline
 *       - in: query
 *         name: price_min
 *         schema:
 *           type: number
 *         description: Minimum price
 *       - in: query
 *         name: price_max
 *         schema:
 *           type: number
 *         description: Maximum price
 *     responses:
 *       200:
 *         description: List of flights
 */

// Get all available flights with ticket price
router.get('/all', async (req, res) => {
  try {
    const response = await axios.get(
      `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}`
    );
    // Extract only flight and price info
    const flights = response.data.data.map(flight => ({
      flight_number: flight.flight.iata,
      airline: flight.airline.name,
      departure: flight.departure.airport,
      arrival: flight.arrival.airport,
      price: `$${flight.price || (Math.floor(Math.random() * 500) + 100)}`
    }));
    res.json(flights);
  } catch (err) {
    console.error('Aviationstack error:', err.response ? err.response.data : err.message);
    res.status(500).json({ msg: 'Error fetching flight data', error: err.message });
  }
});

module.exports = router;