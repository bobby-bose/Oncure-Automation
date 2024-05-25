// src/SecondLeftMain.js
import React from 'react';
import SecondLeftSearch from './leftsearch/secondleftsearch';
import './secondleftmain.css';
import SecondLeftBox from './leftbox/secondleftbox';
import SecondLeftFirstBox from './leftfirstbox/secondleftfirstbox';
import SecondLeftSecondBox from './leftsecondbox/secondleftsecondbox';


const SecondLeftMain = () => {
  return (
    <div className="secondleftmaincontainer">
      <button className='secondleftmainbutton'>
        Register Now
      </button>
      <SecondLeftSearch />
      <SecondLeftBox/>
      <SecondLeftFirstBox />
      <SecondLeftSecondBox />
     
   
    </div>
  );
};

export default SecondLeftMain;
