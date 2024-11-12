import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

function EditProfile() {
  const [profileData, setProfileData] = useState({
    About: "",
    Street: "",
    City: "",
    Pincode: "",
    DOB: "",
    CompanyName: "",
    PhoneNumber: "",
    Certifications: "",
    ProfileID: "",
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
          // console.log(data.profile);  
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
    console.log("coming here:",name, value);
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
      <h2 className="edit-profile-title mt-4">Edit Profile</h2>
      <form
        onSubmit={handleSubmit}
        className="edit-profile-form shadow p-4 rounded"
      >
        <div className="form-group mb-3">
          <label htmlFor="about">About</label>
          <textarea
            className="form-control"
            id="about"
            name="About"
            value={profileData.About}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            className="form-control"
            id="street"
            name="Street"
            value={profileData.Street}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="city">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="City"
            value={profileData.City}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="pincode">Pincode</label>
          <input
            type="text"
            className="form-control"
            id="pincode"
            name="Pincode"
            value={profileData.Pincode}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="DOB">Estd</label>
          <input
            type="date"
            className="form-control"
            id="DOB"
            name="DOB"
            value={profileData.DOB}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="company_name">Company Name</label>
          <input
            type="text"
            className="form-control"
            id="company_name"
            name="CompanyName"
            value={profileData.CompanyName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phone_number"
            name="PhoneNumber"
            value={profileData.PhoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="certifications">Certifications</label>
          <textarea
            className="form-control"
            id="certifications"
            name="Certifications"
            value={profileData.Certifications}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
