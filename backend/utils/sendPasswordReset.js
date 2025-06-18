require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendPasswordReset = async (to, token) => {
  const resetUrl = `http://localhost:4200/reset-password/${token}`; // Change to your frontend URL
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Password Reset Request',
    text: `You requested a password reset. Click the link below to reset your password:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email.`,
    html: `<p>You requested a password reset. Click the link below to reset your password:</p>
           <a href="${resetUrl}">${resetUrl}</a>
           <p>If you did not request this, please ignore this email.</p>`
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendPasswordReset;