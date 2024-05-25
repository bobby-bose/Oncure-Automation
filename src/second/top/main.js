// src/ButtonRow.js
import React from 'react';
import './main.css';
import Logo from './logo/logo';
import TextDetails from './textdetails/textdetails';

const SecondTopMain = () => {
  return (
    <div className="button-row">
      <Logo/>
      <TextDetails/>
      <TextDetails/>
      <TextDetails/>
      <button>Report Summary</button>
    </div>
  );
};

export default SecondTopMain;
