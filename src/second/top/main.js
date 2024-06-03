// src/ButtonRow.js
import React from 'react';
import './main.css';
import Avatar from './logo/logo';
import TextDetails from './textdetails/textdetails';

const SecondTopMain = () => {
  return (
   
    <div className="button-row" >
     <Avatar src="https://owas.oncurehealth.com/logo.svg" alt="Avatar" />
      <TextDetails/>
   
      <button className="reportsummary" style={{width:"30%"}}>Report Summary</button>
   </div>
  );
};

export default SecondTopMain;
