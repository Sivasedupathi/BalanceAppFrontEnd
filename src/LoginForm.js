import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState("");
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBalance(null);

    // Validate account number: 16-digit numeric
    if (!/^[0-9]{16}$/.test(accountNumber)) {
      setError("Please enter a valid 16-digit numeric account number.");
      return;
    }

    try {
      const response = await fetch(`/balance/${accountNumber}`);
      const data = await response.json();

      // Check the response status and act accordingly
      if (data.message === "Successfully retrieved data!") {
        setBalance(data.data);
      } else {
        navigate("/register"); // Navigate to register if account is not registered
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
      setError("Failed to fetch balance. Please try again later.");
    }
  };

  return (
    <div className="login-form">
      <h1>Balance Enquiry</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter 16-digit Account Number:</label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          maxLength="16"
          required
        />
        <button type="submit">Check Balance</button>
      </form>
      
      {/* Display error message */}
      {error && <p className="error">{error}</p>}

      {/* Display balance if available */}
      {balance !== null && <p>Your Balance: ${balance}</p>}
    </div>
  );
};

export default LoginForm;
