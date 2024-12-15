const express = require('express');
const mongoose = require('mongoose');
const vehicleRoutes = require('./routes/vehicleRoutes'); // Path to vehicleRoute.js
require('dotenv').config();  // Load environment variables

const app = express();

app.use(express.json());  // For parsing application/json

// MongoDB connection (inside the handler to work with Vercel's stateless environment)
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

// Use the vehicle routes defined earlier
app.use('/api', vehicleRoutes);

// Export the handler for Vercel
module.exports = async (req, res) => {
  // Ensure the database connection is established on each request
  await connectToDatabase();

  // Call the Express handler
  app(req, res);
};
