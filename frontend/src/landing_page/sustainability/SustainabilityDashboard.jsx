import React, { useState } from 'react';
import axios from 'axios';

import './SustainabilityDashboard.css';

function SustainabilityDashboard() {
    const [formData, setFormData] = useState({
        energyUsage: '',
        waterConsumption: '',
        wasteGeneration: '',
        recyclingRate: '',
        laborCompliance: '',
        workerSafety: '',
        communityImpact: '',
        supplierEthics: '',
        transportationEmissions: '',
        materialSourcing: ''
    });

    const [errors, setErrors] = useState({});

    // Handle input change and validate value to be under 100
    const handleChange = (e) => {
        const { name, value } = e.target;

        // If value exceeds 100, set an error
        if (value > 100) {
            setErrors({
                ...errors,
                [name]: 'Value must be under 100'
            });
        } else {
            setErrors({
                ...errors,
                [name]: ''
            });
        }

        // Update the form data
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if there are any validation errors before submitting
        if (Object.values(errors).some(error => error !== '')) {
            console.log('Please fix the errors before submitting');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/sustainability/calculate-score', formData);
            console.log(response.data);
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Sustainability Dashboard</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                {['energyUsage', 'waterConsumption', 'wasteGeneration', 'recyclingRate', 'laborCompliance', 
                'workerSafety', 'communityImpact', 'supplierEthics', 'transportationEmissions', 'materialSourcing']
                .map((field, idx) => (
                    <div className="form-group" key={idx}>
                        <label>{field.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
                        <input
                            type="number"
                            name={field}
                            className="form-control"
                            value={formData[field]}
                            onChange={handleChange}
                            max="100" // Restrict the max value
                        />
                        {errors[field] && <small className="text-danger">{errors[field]}</small>}
                    </div>
                ))}
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
    );
}

export default SustainabilityDashboard;
