import React from 'react';
import './secondrightfirstbox.css';

const SecondRightFirstBox = ({ onDepartmentClick,simplepress }) => {
  const departmentfunction = (department) => {
    simplepress(false);
    onDepartmentClick(department);
    
  };
  return (
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
  );
};

export default SecondRightFirstBox;
