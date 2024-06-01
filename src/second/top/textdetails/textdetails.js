import React from 'react';
import './textdetails.css';

const TextDetails = () => {
  return (
    <div className="container">
      <div className="text-details">
        <p>Patient Name:</p>
        <p>Registration ID:</p>
        <p>Age:</p>
        <p>Gender:</p>
        <p>Contact Number:</p>
        <p>Address:</p>
      </div>
    </div>
  );
};

export default TextDetails;
