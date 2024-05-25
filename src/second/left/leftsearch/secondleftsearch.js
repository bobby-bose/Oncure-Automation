import React from 'react';
import './secondleftsearch.css';

const SecondLeftSearch = () => {
  return (
    <div className="search-container">
      <input type="text" placeholder="Search..." className="search-input" />
      <i className="search-icon">&#128269;</i>
    </div>
  );
};

export default SecondLeftSearch;

