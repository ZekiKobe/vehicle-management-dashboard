import React, { useState } from 'react';
import '../components/css/addVehicle.css';

const AddVehicleForm = ({ addVehicle }) => {
    const [vehicle, setVehicle] = useState({
        name: '',
        status: '',
        lastUpdated: '',
    });

    const handleChange = (e) => {
        setVehicle({ ...vehicle, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addVehicle(vehicle);
        // Reset the form fields
        setVehicle({ name: '', status: '', lastUpdated: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="add-vehicle-form">
            <h2>Add New Vehicle</h2>
            <input
                name="name"
                value={vehicle.name}
                onChange={handleChange}
                placeholder="Vehicle Name"
                required
            />
            <input
                name="status"
                value={vehicle.status}
                onChange={handleChange}
                placeholder="Status (e.g., Active, Inactive)"
                required
            />
            <input
                name="lastUpdated"
                type="datetime-local"
                value={vehicle.lastUpdated}
                onChange={handleChange}
                required
            />
            <button type="submit">Add Vehicle</button>
        </form>
    );
};

export default AddVehicleForm;
