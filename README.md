# ✈️ Flight Booking App Backend

A robust Node.js backend for a flight booking platform, featuring user authentication, flight search, booking management, Stripe payments, email notifications, admin panel, and more.

---

## 🚀 Features

- **User Registration & Login** (JWT-based)
- **Profile Management**
- **Flight Search** (via Aviationstack API)
- **Booking Creation, History & Cancellation**
- **Stripe Payment Integration**
- **Booking Confirmation Emails** (HTML templates)
- **Password Reset via Email**
- **Admin Panel** (view users/bookings, manage roles)
- **Role-based Access Control**
- **Input Validation & Error Handling**
- **Unit/Integration Tests** (Jest & Supertest)
- **Environment Variable Management**
- **CORS Enabled for Frontend Integration**

---

## 🛠️ Tech Stack

- Node.js, Express.js
- MongoDB & Mongoose
- Stripe API
- Nodemailer (with Handlebars templates)
- Aviationstack API
- JWT for authentication
- Jest & Supertest for testing

---

## ⚙️ Setup & Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/flight-booking-app-backend.git
   cd flight-booking-app/backend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the backend directory:

   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   AVIATIONSTACK_API_KEY=your_aviationstack_api_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   EMAIL_USER=your_gmail_address@gmail.com
   EMAIL_PASS=your_gmail_app_password
   ```

4. **Run the server:**
   ```sh
   npm run dev
   ```
   The server will start on [http://localhost:5000](http://localhost:5000).

---

## 📚 API Endpoints Overview

### **Auth**
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT

### **Profile**
- `GET /api/profile` — Get user profile
- `PUT /api/profile` — Update user profile

### **Flights**
- `GET /api/flights/all` — Search flights (with filters)

### **Bookings**
- `POST /api/bookings` — Book a flight (JWT required)
- `GET /api/bookings` — Get user bookings (JWT required)
- `DELETE /api/bookings/:id` — Cancel a booking (JWT required)
- `POST /api/bookings/resend/:id` — Resend confirmation email

### **Payments**
- `POST /api/payments/create-payment-intent` — Create Stripe payment intent (JWT required)

### **Password Reset**
- `POST /api/password-reset/request` — Request password reset email
- `POST /api/password-reset/reset/:token` — Reset password

### **Admin**
- `GET /api/admin/users` — List all users (admin only)
- `GET /api/admin/admins` — List all admins (admin only)
- `PATCH /api/admin/users/:id/role` — Change user role (admin only)
- `DELETE /api/admin/bookings/:id` — Delete any booking (admin only)

---

## 📝 Testing

- Run all tests:
  ```sh
  npm test
  ```

---

## 🔒 Security & Best Practices

- All secrets and API keys are stored in `.env` (never committed to Git).
- Role-based access control for admin endpoints.
- Input validation and error handling throughout.
- CORS enabled for frontend integration.

---

## 📄 API Documentation

For detailed API docs, see the [Swagger/OpenAPI documentation](https://flight-booking-app-xfeq.onrender.com/api-docs)

---

## 👨‍💻 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📧 Contact

For questions, contact [urmitkraiyani@gmail.com](urmitkraiyani@gmail.com).

---

## ⭐️ License

This project is licensed under the MIT License.
