const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const vehicleRoutes = require('./routes/vehicleRoutes');  // Importing vehicle routes

dotenv.config();  // Load environment variables from .env

const app = express();

// Middleware
app.use(express.json());  // For parsing application/json
app.use(cors());  // Allow cross-origin requests

// MongoDB connection
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

// Use the routes defined in the vehicleRoutes file
app.use('/api/vehicles', vehicleRoutes);  // This is how your routes are linked

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectToDatabase();  // Connect to DB when server starts
});
