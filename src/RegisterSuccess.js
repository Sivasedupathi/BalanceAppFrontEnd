import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="main">
      <h1>Registration Completed Successfully</h1>
      <p>Thank you for registering!</p>

      <button className="home-button" onClick={() => navigate("/")}>
        Click to Home Page
      </button>
    </div>
  );
};

export default RegisterSuccess;
