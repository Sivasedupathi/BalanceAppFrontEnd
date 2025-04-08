import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// InputField component to reduce repetition
const InputField = ({ id, name, type, placeholder, value, onChange, required }) => (
  <div className="input-group">
    <label htmlFor={id}>{placeholder.replace("Enter your ", "")}:</label>
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

const Register = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    cardNumber: "",
    password: "", // Added password field
  });
  const [statusMessage, setStatusMessage] = useState(""); // State for status messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to send in the API request
    const requestData = {
      cardNo: formData.cardNumber,
      name: formData.customerName,
      password: formData.password, // Added password to the request data
    };

    try {
      // Simulate API call using fetch
      const response = await fetch("/balance/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      // Parse the response
      const data = await response.json();

      if (response.ok && data.message === "Successfully registered!") {
        // On successful registration
        setStatusMessage("Registration is success");
        navigate("/register-success"); // Redirect to success page
      } else {
        // On failure
        setStatusMessage("Registration is not success");
      }
    } catch (error) {
      // Handle network or server errors
      setStatusMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h1>Customer Registration</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <InputField
          id="customerName"
          name="customerName"
          type="text"
          placeholder="Enter your Name"
          value={formData.customerName}
          onChange={handleChange}
          required
        />

        <InputField
          id="cardNumber"
          name="cardNumber"
          type="text"
          placeholder="Enter your Card Number"
          value={formData.cardNumber}
          onChange={handleChange}
          required
        />

        {/* Added Password input field */}
        <InputField
          id="password"
          name="password"
          type="password" // Hides the text input
          placeholder="Enter your Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="register-button">Register</button>
      </form>

      <button className="back-button" onClick={() => navigate("/")}>
        Back to Login
      </button>

      {/* Display the status message */}
      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </div>
  );
};

export default Register;
