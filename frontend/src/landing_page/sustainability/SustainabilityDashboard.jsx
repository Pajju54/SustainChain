import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SustainabilityDashboard.css';

function SustainabilityDashboard() {
    const location = useLocation();
    const emailFromLocation = location.state?.email || ''; // Retrieve email from ProfilePage

    const [formData, setFormData] = useState({
        email: '',
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

    useEffect(() => {
        // Check and set email only when it's available from location.state
        if (emailFromLocation) {
            setFormData((prevData) => ({
                ...prevData,
                email: emailFromLocation
            }));
        }
    }, [emailFromLocation]); // Trigger only if emailFromLocation changes

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/sustainability/calculate-score", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Form submitted successfully!");
            } else {
                console.error("Form submission failed.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
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
                            onChange={handleInputChange}
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
