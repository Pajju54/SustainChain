import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Clear any previous error
  
    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Response data:", data); // Debugging line to inspect response data
  
      if (data.success) {
        navigate("/");
      } else {
        setError(data.message || "Failed to sign up. Please try again.");
      }
    } catch (error) {
      console.error("Fetch error:", error); // More descriptive error output
      setError("Failed to sign up. Please try again.");
    }
  };
  
  return (
    <div className="signup-container d-flex align-items-center justify-content-center">
      <div className="signup-card p-5 shadow-lg">
        <h2 className="text-center mb-4">Create an Account</h2>
        {error && <div className="alert alert-danger">{error}</div>} {}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="signupEmail" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="signupEmail"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="signupUsername" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="signupUsername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="signupPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="signupPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-block">
              Sign up
            </button>
          </div>
          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;