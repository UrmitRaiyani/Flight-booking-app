const express = require('express');
const connectDB = require('./db/mongo');
const authRoutes = require('./routes/auth');
const flightRoutes = require('./routes/flights');
const bookingRoutes = require('./routes/bookings');
const paymentRoutes = require('./routes/payments');
const adminRoutes = require('./routes/admin');
const profileRoutes = require('./routes/profile');
const passwordResetRoutes = require('./routes/passwordReset');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

const API_KEY = process.env.AVIATIONSTACK_API_KEY;
const mongoUri = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/password-reset', passwordResetRoutes);

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});