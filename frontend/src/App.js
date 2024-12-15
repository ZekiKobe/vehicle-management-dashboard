import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VehicleTable from './components/VehicleTable';
import AddVehicleForm from './components/AddVehicleForm';
import './App.css'

const App = () => {
    const [vehicles, setVehicles] = useState([]);

    // Fetch vehicles
    useEffect(() => {
        axios.get('https://vehicle-management-dashboard.vercel.app/api/vehicles')
            .then(response => setVehicles(response.data))
            .catch(err => console.error(err));
    }, []);

    // Add vehicle
    const addVehicle = (vehicle) => {
        axios.post('https://vehicle-management-dashboard.vercel.app/api/vehicles', vehicle)
            .then(response => setVehicles([...vehicles, response.data]))
            .catch(err => console.error(err));
    };

    // Delete vehicle
    const deleteVehicle = (id) => {
        axios.delete(`https://vehicle-management-dashboard.vercel.app/api/vehicles/${id}`)
            .then(() => setVehicles(vehicles.filter(v => v._id !== id)))
            .catch(err => console.error(err));
    };


    const updateVehicle = (id, updatedData) => {
      axios.put(`https://vehicle-management-dashboard.vercel.app/api/vehicles/${id}`, updatedData)
          .then(response => {
              // Update the state with the edited vehicle
              setVehicles(vehicles.map(vehicle => vehicle._id === id ? response.data : vehicle));
          })
          .catch(err => console.error(err));
  };
  

    return (
        <div className='vehicle-container'>
            <img src='/veh.jpg' alt='not found'></img>
            <h1>Vehicle Management Dashboard</h1>
            <AddVehicleForm addVehicle={addVehicle} />
            <VehicleTable vehicles={vehicles} deleteVehicle={deleteVehicle} updateVehicle={updateVehicle} />
        </div>
    );
};

export default App;
