const express = require('express');
const mongoose = require('mongoose');
const vehicleRoutes = require('./routes/vehicleRoutes'); // Path to vehicleRoute.js
require('dotenv').config();  // Load environment variables

const app = express();

app.use(express.json());  // For parsing application/json

// MongoDB connection (establish once and reuse)
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw new Error('Database connection failed');
  }
};

// Use the vehicle routes defined earlier
app.use('/api', vehicleRoutes);

// Export the handler for Vercel
module.exports = async (req, res) => {
  try {
    // Ensure the database connection is established (only once)
    await connectToDatabase();

    // Call the Express handler
    app(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
};
