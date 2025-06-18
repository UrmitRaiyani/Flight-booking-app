require('dotenv').config();
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const handlebarOptions = {
  viewEngine: {
    extname: '.handlebars',
    layoutsDir: path.resolve(__dirname, '../templates'),
    defaultLayout: false,
    partialsDir: path.resolve(__dirname, '../templates'),
  },
  viewPath: path.resolve(__dirname, '../templates'),
  extName: '.handlebars',
};

transporter.use('compile', hbs(handlebarOptions));

const sendBookingConfirmation = async (to, booking) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Booking Confirmation',
    template: 'bookingConfirmation',
    context: {
      flight_number: booking.flight_number,
      airline: booking.airline,
      departure_time: booking.departure_time,
      departure: booking.departure,
      arrival: booking.arrival,
      meal: booking.meal,
      price: booking.price,
    },
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendBookingConfirmation;