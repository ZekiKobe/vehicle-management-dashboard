const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Vehicle name
    status: { type: String, required: true }, // Vehicle status, e.g., 'Active', 'Inactive'
    lastUpdated: { type: Date, required: true }, // Last updated timestamp
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
