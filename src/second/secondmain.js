import './secondmain.css';
import SecondTopMain from './top/main';
import SecondLeftMain from './left/secondleftmain';

import React, { useState } from 'react';
import SecondRightFirstBox from './right/rightfirstbox/secondrightfirstbox';
import SecondMiddleRightForm from './middle/secondmiddlerightform/secondmiddlerightform';
import SecondMiddleleftForm from './middle/secondmiddleleftform/secondmiddleleftform';

const SecondMain = () => {

  const departments = [
  'Oncology',
  'Psychology',
  'Pediatrics',
  'Biology',
  'Criminology',
  'English',
  'Malayalam',
  'Tamil'
];
const [showLeftForm, setShowLeftForm] = useState(true);

  const handleButtonClick = (form) => {
    setShowLeftForm(form);
  };
  const [currentDepartment, setCurrentDepartment] = useState('Oncology');

  const handleDepartmentClick = (department) => {
    setCurrentDepartment(department);
  };


  return (
            <div className="secondmaincontainer">
              <div className="top-section">
              <SecondTopMain/>
              </div>
              <div className="bottom-section">
                <div className="bottom-div-one">
                  <SecondLeftMain simplepress={handleButtonClick}/>
                </div>
                <div className="bottom-div-two">
        {showLeftForm ? (
          <SecondMiddleleftForm />
        ) : (
          <SecondMiddleRightForm
            departments={departments}
            currentDepartment={currentDepartment}
          />
        )}
      </div>
                <div className="bottom-div-three">
               
                  <SecondRightFirstBox onDepartmentClick={handleDepartmentClick} simplepress={handleButtonClick} />
                </div>
              </div>
            </div>
          );
};

export default SecondMain;


