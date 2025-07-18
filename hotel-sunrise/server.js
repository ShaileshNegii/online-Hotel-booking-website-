const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/roomBooking')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// ✅ Booking Schema (without "destination")
const bookingSchema = new mongoose.Schema({
  guestName: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: { type: Number, required: true },
  roomType: { type: String, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

// API Endpoint to receive booking
app.post("/api/book-room", async (req, res) => {
  const { guestName, checkIn, checkOut, guests, roomType } = req.body;

  try {
    const newBooking = new Booking({
      guestName,
      checkIn,
      checkOut,
      guests,
      roomType,
    });

    await newBooking.save();
    res.status(200).json({ message: "Booking successful!" });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ message: "Booking failed." });
  }
});

// Start the server
const PORT = process.env.PORT || 5050; // change 5000 → 5050
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
