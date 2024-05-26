import React from 'react';
import './secondmiddleform.css';

const SecondMiddleForm = () => {
  return (
    <div className="container">
      <div className="form">
        <div className="form-row">
          <label htmlFor="name" className="form-label">UPCOMING:</label>
          <div className="form-input">
            <input type="text" className="input text-center" id="name" value="Psychology : 30mins" readOnly />
          </div>
        </div>
        <div className="form-row">
          <label htmlFor="current" className="form-label">CURRENTLY:</label>
          <div className="form-input">
            <input type="text" className="input text-center" id="current" value="0:39 sec" readOnly />
          </div>
        </div>
        <div className="button-group">
          <button className="btn">Finished</button>
          <button className="btn">Secondary</button>
        </div>
      </div>
    </div>
  );
};

export default SecondMiddleForm;
