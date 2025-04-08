import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BalanceCheckPage = () => {
  const { accountNumber } = useParams();
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(
          `http://api.weatherstack.com/current?access_key=5c555a97b24985e334f8978bbd809849&query=${accountNumber}`
        );
        const data = await response.json();
        setBalance(data);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
      setLoading(false);
    };

    fetchBalance();
  }, [accountNumber]);

  if (loading) return <h2>Loading balance data...</h2>;

  return (
    <div className="wbalance-check-page">
      <h1>Balance Details</h1>
      
      {/* Balance Check Form */}
      <form className="balance-form">
        <label>Balance:</label>
        <label>Account Balance ($):</label>
        <input type="text" value={balance?.balance ?? "N/A"} readOnly />

       {/* Small Back Button */}
      <button className="back-button" onClick={() => navigate("/")}>
        Back
      </button>

      </form>

     
    </div>
  );
};

export default BalanceCheckPage;
