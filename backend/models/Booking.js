const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flight_number: { type: String, required: true },
  airline: { type: String, required: true },
  departure: { type: String, required: true },
  arrival: { type: String, required: true },
  departure_time: { type: String, required: true }, // Added field
  price: { type: String, required: true },
  booking_date: { type: Date, default: Date.now },
  status: { type: String, default: 'confirmed' },
  meal: { type: String } // Optional, if you want to keep meal preference
});

module.exports = mongoose.model('Booking', BookingSchema);