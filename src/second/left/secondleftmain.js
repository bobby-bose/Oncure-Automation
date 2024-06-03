import React,{useState} from 'react';
import './secondleftmain.css';



const SecondLeftMain = () => {

 
 

  return (
    <div className="secondleftmaincontainer" >
      <button className='secondleftmainbutton'>
        Register Now
      </button>
      <div class="search-bar">
                <input type="text" name="search-record" id="search-record" placeholder="Search records" className="search-bar-input"/>
            </div>
            <div class="secondleftfirstboxitem"  
            // onClick={secondleftfirstboxitemclick}
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
                {/* <div class="secondleftsecondboxitem"  onClick={secondleftfirstboxitemclick}>
                <div class="secondleftboxspan">
                        <span class="secondleftboxspanname">Patient Name</span>
                        <span class="value">BOBBY K BOSE</span>
                    </div>
                    <div class="secondleftboxspan">
                        <span class="secondleftboxspanname">Reg Id</span>
                        <span class="value">M1-0121</span>
                    </div>
                    <div class="secondleftboxspan">
                        <span class="secondleftboxspanname">Contact Number</span>
                        <span class="value">9447100533</span>
                    </div>
                    <div class="secondleftboxspan">
                        <span class="secondleftboxspanname">Address</span>
                        <span class="value">Kozhikode</span>
                    </div>
                </div>
                <div class="secondleftsecondboxitem"  onClick={secondleftfirstboxitemclick}>
                <div class="secondleftboxspan">
                        <span class="secondleftboxspanname">Patient Name</span>
                        <span class="value">DHAMODARAN P</span>
                    </div>
                    <div class="secondleftboxspan">
                        <span class="secondleftboxspanname">Reg Id</span>
                        <span class="value">M1-0122</span>
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
                <div class="secondleftsecondboxitem"  onClick={secondleftfirstboxitemclick}>
                <div class="secondleftboxspan">
                        <span class="secondleftboxspanname">Patient Name</span>
                        <span class="value">SALMA KHADER</span>
                    </div>
                    <div class="secondleftboxspan">
                        <span class="secondleftboxspanname">Reg Id</span>
                        <span class="value">M1-0123</span>
                    </div>
                    <div class="secondleftboxspan">
                        <span class="secondleftboxspanname">Contact Number</span>
                        <span class="value">9447100530</span>
                    </div>
                    <div class="secondleftboxspan">
                        <span class="secondleftboxspanname">Address</span>
                        <span class="value">Kozhikode</span>
                    </div> */}
                {/* </div> */}
     
     
   
    </div>
  );
};

export default SecondLeftMain;
