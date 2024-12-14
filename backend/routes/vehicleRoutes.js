const express = require('express');
const Vehicle = require('../models/Vehicle');  // Importing the Vehicle model
const router = express.Router();

// Get all vehicles
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles', error });
  }
});

// Add a new vehicle
router.post('/', async (req, res) => {
  const { name, status, lastUpdated } = req.body;

  try {
    const newVehicle = new Vehicle({
      name,
      status,
      lastUpdated: new Date(lastUpdated),  // Ensure timestamp is parsed
    });

    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ error: 'Error adding vehicle', details: error.message });
  }
});

// Delete a vehicle
router.delete('/:id', async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vehicle deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a vehicle
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, status, lastUpdated } = req.body;

  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      { name, status, lastUpdated: new Date(lastUpdated) },
      { new: true }
    );

    if (!updatedVehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    res.status(200).json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ error: 'Error updating vehicle', details: error.message });
  }
});

module.exports = router;
