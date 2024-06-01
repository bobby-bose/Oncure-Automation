import React,{useState} from 'react';
import './secondleftmain.css';



const SecondLeftMain = ({simplepress}) => {
 

  return (
    <div className="secondleftmaincontainer" >
      <button className='secondleftmainbutton'>
        Register Now
      </button>
      <div class="search-bar">
                <input type="text" name="search-record" id="search-record" placeholder="Search records" className="search-bar-input"/>
            </div>
            <div class="secondleftfirstboxitem"  onClick={() => simplepress(true)}>
                    <span>Sabith p v</span>
                    <span>OCW24052402</span>
                    <span>2222222222</span>
                    <span>dgaskdgdajhdajhdb</span>
                </div>
                <div class="secondleftsecondboxitem" onClick={() => simplepress(true)}>
                    <span>Sabith p v</span>
                    <span>OCW24052402</span>
                    <span>2222222222</span>
                    <span>dgaskdgdajhdajhdb</span>
                </div>
                <div class="secondleftsecondboxitem" onClick={() => simplepress(true)}>
                    <span>Sabith p v</span>
                    <span>OCW24052402</span>
                    <span>2222222222</span>
                    <span>dgaskdgdajhdajhdb</span>
                </div>
     
     
   
    </div>
  );
};

export default SecondLeftMain;
