import React from 'react';
import './dashboarddetailcard.css';

const DashboardDetailCard = () => {
  return (
    <div className="module-container">
      <div className="card left-card">
        <h2>M1B01</h2>
        <div className="button-container">
        <button>Physchology</button>
        <span className="time">3:45</span>
        </div>
        <h3>Upcoming</h3>
        <ul>
          <li>1. Dental - 30 mins</li>
          <li>2. Physiotherapy - 20 mins</li>
          <li>3. Gasterology - 45 mins</li>
        </ul>
      </div>
      <div className="card right-card">
        <h2>M1B01</h2>
        <div className="button-container">
        <button>Gasterology</button>
        <span className="time">3:45</span>
        </div>
        <h3>Upcoming</h3>
        <ul>
          <li>1. Dental - 30 mins</li>
          <li>2. Physiotherapy - 20 mins</li>
            <li>3. Gasterology - 45 mins</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardDetailCard;
