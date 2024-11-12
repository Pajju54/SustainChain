import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

function EditProfile() {
  const [profileData, setProfileData] = useState({
    companyName: "",
    productDetails: "",
    quantity: "",
    laborPractices: "",
    ecoFriendlyMaterials: "",
    energyConsumption: "",
    wasteManagement: "",
    fairWages: "",
    certifications: "",
    street: "",
    city: "",
    pincode: "",
    about: "",
    website: "",
    establishedYear: "",
    additionalNotes: "",
    environmentalImpact: "",
    supplyChainTransparency: "",
    ethicalSourcing: "",
    employeeWelfare: "",
    renewableEnergyUse: "",
    dob: ""
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("http://localhost:8080/profile", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await response.json();
        if (data.profile) {
          setProfileData(data.profile);  // Ensure the data matches with the backend profile keys
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to load profile data", error);
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(profileData);  // Log the profileData to check its structure
    try {
      const response = await fetch("http://localhost:8080/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(profileData),  // Send updated profile data to backend
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      navigate("/profile");  // Navigate to profile page after success
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-title mt-4">Manufacturer Sustainability Questionnaire</h2>
      <form
        onSubmit={handleSubmit}
        className="edit-profile-form shadow p-4 rounded"
      >
        <div className="form-group mb-3">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            className="form-control"
            id="companyName"
            name="companyName"
            value={profileData.companyName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="productDetails">What products do you manufacture?</label>
          <textarea
            className="form-control"
            id="productDetails"
            name="productDetails"
            value={profileData.productDetails}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="quantity">Annual Production Quantity</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            value={profileData.quantity}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="ecoFriendlyMaterials">Do you use eco-friendly materials? If so, specify.</label>
          <textarea
            className="form-control"
            id="ecoFriendlyMaterials"
            name="ecoFriendlyMaterials"
            value={profileData.ecoFriendlyMaterials}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="energyConsumption">Annual Energy Consumption (kWh)</label>
          <input
            type="number"
            className="form-control"
            id="energyConsumption"
            name="energyConsumption"
            value={profileData.energyConsumption}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="wasteManagement">What waste management practices do you follow?</label>
          <textarea
            className="form-control"
            id="wasteManagement"
            name="wasteManagement"
            value={profileData.wasteManagement}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="fairWages">Do you provide fair wages to workers? (Yes/No)</label>
          <input
            type="text"
            className="form-control"
            id="fairWages"
            name="fairWages"
            value={profileData.fairWages}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="certifications">List any environmental or labor certifications.</label>
          <textarea
            className="form-control"
            id="certifications"
            name="certifications"
            value={profileData.certifications}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            className="form-control"
            id="street"
            name="street"
            value={profileData.street}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="city">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={profileData.city}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="pincode">Pincode</label>
          <input
            type="text"
            className="form-control"
            id="pincode"
            name="pincode"
            value={profileData.pincode}
            onChange={handleChange}
          />
        </div>

        {/* Additional Fields */}
        <div className="form-group mb-3">
          <label htmlFor="about">About the Company</label>
          <textarea
            className="form-control"
            id="about"
            name="about"
            value={profileData.about}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            className="form-control"
            id="website"
            name="website"
            value={profileData.website}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="establishedYear">Year Established</label>
          <input
            type="number"
            className="form-control"
            id="establishedYear"
            name="establishedYear"
            value={profileData.establishedYear}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="additionalNotes">Additional Notes</label>
          <textarea
            className="form-control"
            id="additionalNotes"
            name="additionalNotes"
            value={profileData.additionalNotes}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
}

export default EditProfile;
