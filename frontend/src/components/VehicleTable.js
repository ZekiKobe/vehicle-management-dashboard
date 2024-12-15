import React, { useState } from 'react';
import '../components/css/vehicleTable.css'

const VehicleTable = ({ vehicles, updateVehicle, deleteVehicle }) => {
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({
        name: '',
        status: '',
        lastUpdated: '',
    });

    const startEdit = (vehicle) => {
        setEditingId(vehicle._id);
        setEditData(vehicle);
    };

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateVehicle(editingId, editData);
        setEditingId(null);
    };

    return (
        <table className='vehicle-table'>
            <thead>
                <tr>
                    <th>Vehicle Name</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {vehicles.map(vehicle => (
                    editingId === vehicle._id ? (
                        <tr key={vehicle._id}>
                            <td>
                                <input
                                    name="name"
                                    value={editData.name}
                                    onChange={handleEditChange}
                                />
                            </td>
                            <td>
                                <input
                                    name="status"
                                    value={editData.status}
                                    onChange={handleEditChange}
                                />
                            </td>
                            <td>
                                <input
                                    name="lastUpdated"
                                    value={editData.lastUpdated}
                                    onChange={handleEditChange}
                                    type="datetime-local"
                                />
                            </td>
                            <td>
                                <button
                                    onClick={handleEditSubmit}
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditingId(null)}
                                >
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ) : (
                        <tr key={vehicle._id}>
                            <td>{vehicle.name}</td>
                            <td>{vehicle.status}</td>
                            <td>{vehicle.lastUpdated}</td>
                            <td>
                                <button
                                    onClick={() => startEdit(vehicle)}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteVehicle(vehicle._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )
                ))}
            </tbody>
        </table>
    );
};

export default VehicleTable;
