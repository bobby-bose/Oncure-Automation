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

  // const handleDepartmentClick = (department) => {
  //   setCurrentDepartment(department);
  // };

  const departmentfunction = (department) => {
    // simplepress(false);
    // onDepartmentClick(department);
    console.log("just kidding");
    
  };


  return (
            <div className="secondmaincontainer">
              <div className="top-section">
              <SecondTopMain/>
              <div className="secondleftmaincontainer" >
      <button className='secondleftmainbutton'>
        Register Now
      </button>
      <div class="search-bar">
                <input type="text" name="search-record" id="search-record" placeholder="Search records" className="search-bar-input"/>
            </div>
            <div class="secondleftfirstboxitem" 
            //  onClick={secondleftfirstboxitemclick}
             >
            <div class="secondleftboxspan">
                        <span class="secondleftboxspanname">Patient Name</span>
                        <span class="value">ZAINUL ABIDEEN</span>
                    </div>
                    <div class="secondleftboxspan">
                        <span class="secondleftboxspanname">Reg Id</span>
                        <span class="value">M1-0120</span>
                    </div>
                    <div class="secondleftboxspan">
                        <span class="secondleftboxspanname">Contact Number</span>
                        <span class="value">9447100534</span>
                    </div>
                    <div class="secondleftboxspan">
                        <span class="secondleftboxspanname">Address</span>
                        <span class="value">Kozhikode</span>
                    </div>
                </div>
                </div>
              </div>
              <div className="bottom-section">
                <div className="bottom-div-one">
                  <SecondLeftMain />
                </div>
                <div className="bottom-div-two">
        {showLeftForm ? (
          <SecondMiddleleftForm 
          // pid={patientid}
        
          />
        ) : (
          <SecondMiddleRightForm
            departments={departments}
            currentDepartment={currentDepartment}
          />
        )}
      </div>
                <div className="bottom-div-three">
               
                  {/* <SecondRightFirstBox onDepartmentClick={handleDepartmentClick} simplepress={handleButtonClick} /> */}
                  <div className="secondrightfirstbox">
      <button className='secondrightfirstboxbutton'>
        GENERATE REPORT
      </button>
      <h3>SECTIONS</h3>

      <div>
        <div className="secondrightfirstboxitem active" onClick={() => departmentfunction('Anthropometry')}>
        Anthropometry
        </div>
        <div className="secondrightfirstboxitem" onClick={() => departmentfunction('Vitals')}>
        Vitals
        </div>
        <div className="secondrightfirstboxitem" onClick={() => departmentfunction('Blood Investigations')}>
        Blood Investigations
        </div>
        <div className="secondrightfirstboxitem" onClick={() => departmentfunction('Scanning and X Ray')}>
        Scanning and X Ray
        </div>
        <div className="secondrightfirstboxitem" onClick={() => departmentfunction('Psychology')}>
        Psychology
        </div>
        <div className="secondrightfirstboxitem" onClick={() => departmentfunction('Preventive Oncology')}>
        Preventive Oncology
        </div>
        <div className="secondrightfirstboxitem" onClick={() => departmentfunction('⁠Dental')}>
        ⁠Dental
        </div>
        <div className="secondrightfirstboxitem" onClick={() => departmentfunction('⁠Nutrition')}>
        ⁠Nutrition
        </div>
        <div className="secondrightfirstboxitem" onClick={() => departmentfunction('⁠Physiotherapy')}>
        ⁠Physiotherapy
        </div>
        <div className="secondrightfirstboxitem" onClick={() => departmentfunction('⁠Physician')}>
        ⁠Physician
        </div>
        <div className="secondrightfirstboxitem" onClick={() => departmentfunction('⁠Any Specialist')}>
        ⁠Any Specialist 
        </div>

       
        
      </div>
    </div>
                </div>
              </div>
            </div>
          );
};

export default SecondMain;


