import React from 'react';
import './secondmain.css';
import SecondTopMain from './top/main';
import SecondLeftMain from './left/secondleftmain';
import SecondMiddleMain from './middle/secondmiddlemain/secondmiddlemain';
import SecondRightMain from './right/main/secondrightmain';

const SecondMain = () => {
    return (
        <div className="secondmaincontainer">
          <div className="top-section">
          <SecondTopMain/>
          </div>
          <div className="bottom-section">
            <div className="bottom-div">
              <SecondLeftMain/>
            </div>
            <div className="bottom-div">
              <SecondMiddleMain/>
            </div>
            <div className="bottom-div">
              <SecondRightMain/>
            </div>
          </div>
        </div>
      );
};

export default SecondMain;

