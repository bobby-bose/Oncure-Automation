import './secondmain.css';
import Avatar from './top/logo/logo';
import SecondLeftMain from './left/secondleftmain';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { ProgressBar, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setCurrentDepartment, toggleForm, setCurrentPatient } from '../redux/actions';

const SecondMain = () => {
  const [formData, setFormData] = useState({
    name: '',
    regId: '',
    contactNumber: '',
    address: ''
  });

  const handleButtonClick = (name, regId, contactNumber, address) => {
    setFormData({ name, regId, contactNumber, address });
  };

  const departmentFunction = (section) => {
    showleftform(false);
    setcurrentDepartment(section);
  };

  const departments = [
    'Oncology', 'Psychology', 'Pediatrics', 'Biology', 
    'Criminology', 'English', 'Malayalam', 'Tamil'
  ];

  const dispatch = useDispatch();
  const [leftform, showleftform] = useState(false);
  const [currentDepartment, setcurrentDepartment] = useState('');


  const currentPatient = useSelector((state) => state.currentPatient);

  const [time, setTime] = useState(10);
  const [progress, setProgress] = useState(100);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const startTimer = () => {
    setTime(10);
    setProgress(100);
    setIsAnimating(true);

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          setProgress((prevTime - 1) * 10);
          return prevTime - 1;
        } else {
          clearInterval(intervalRef.current);
          setIsAnimating(false);
          return 0;
        }
      });
    }, 1000);
  };

  const addTime = (seconds) => {
    setTime((prevTime) => {
      const newTime = prevTime + seconds;
      setProgress(newTime * 10);
      return newTime;
    });
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsAnimating(false);
  };


  
  

  const patientDetails = currentPatient || {};
  const { name, regId, age, gender, contactNumber, address } = patientDetails;

  return (
    <div className="secondmaincontainer">
      <div className="top-section">
        <div className="button-row">
          <Avatar src="https://owas.oncurehealth.com/logo.svg" alt="Avatar" />
          <div className="textdetailscontainer">
            <div className="text-details">
              <p>Patient Name: {name || 'N/A'}</p>
              <p>Registration ID: {regId || 'N/A'}</p>
              <p>Age: {age || 'N/A'}</p>
              <p>Gender: {gender || 'N/A'}</p>
              <p>Contact Number: {contactNumber || 'N/A'}</p>
              <p>Address: {address || 'N/A'}</p>
            </div>
          </div>
          <button className="reportsummary" style={{ width: "30%" }}>Report Summary</button>
        </div>
        
      </div>
      <div className="bottom-section">
        <div className="bottom-div-one">
          <div className="secondleftmaincontainer">
            <button className='secondleftmainbutton'>
              Register Now
            </button>
            <div class="search-bar">
              <input type="text" name="search-record" id="search-record" placeholder="Search records" className="search-bar-input"/>
            </div>
            <div class="secondleftfirstboxitem" 
            
            
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
              <div className="secondleftboxspan">
                <span className="secondleftboxspanname">Address</span>
                <span className="value">Kozhikode</span>
              </div>
            </div>
            <div className="d-flex justify-content-between w-100 mt-2">
            <button className="btn btn-success flex-grow-1 me-1" onClick={() => {
              showleftform(true);
              handleButtonClick('ZAINUL ABIDEEN', 'M1-0120', '9447100534', 'Kozhikode');
              
            }}>EDIT</button>

              <button className="btn btn-danger flex-grow-1 ms-1">DELETE</button>
            </div>
            <div class="secondleftfirstboxitem"
            
            
        
            
            >
              <div class="secondleftboxspan">
                <span class="secondleftboxspanname">Patient Name</span>
                <span class="value">BOBBY K BOSE</span>
              </div>
              <div class="secondleftboxspan">
                <span class="secondleftboxspanname">Reg Id</span>
                <span class="value">M2-2222</span>
              </div>
              <div class="secondleftboxspan">
                <span class="secondleftboxspanname">Contact Number</span>
                <span class="value">7012083645</span>
              </div>
              <div className="secondleftboxspan">
                <span className="secondleftboxspanname">Address</span>
                <span className="value">Sharjah</span>
              </div>
            </div>
            <div className="d-flex justify-content-between w-100 mt-2">
            <button className="btn btn-success flex-grow-1 me-1"     onClick={() => {
              showleftform(true);
              handleButtonClick('BOBBY K BOSE', 'M2-2222', '7012083645', 'Sharjah');
              
            }}>EDIT</button>

              <button className="btn btn-danger flex-grow-1 ms-1">DELETE</button>
            </div>
          </div>
        </div>
        <div className="bottom-div-two">
          {leftform ? (
            <div className="form" style={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <div className="ConsultationFacilitator">
              <form style={{ width: '100%' }}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={formData.name} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="regId" className="form-label">Registration Id</label>
                    <input type="text" className="form-control" id="regId" value={formData.regId} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                    <input type="text" className="form-control" id="contactNumber" value={formData.contactNumber} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" value={formData.address} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="consultationFacilitator" className="form-label">Consultation Facilitator</label>
                    <input type="text" className="form-control" id="consultationFacilitator"  value={formData.consultationfacilitator} />
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="container text-center mt-5">
              <ProgressBar now={progress} animated={isAnimating} />
              <h2 className="mt-3">Current Department:{currentDepartment}</h2>
              <h3>{`${String(Math.floor(time / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`}</h3>
              <div className="mt-3 d-flex flex-column">
                {!isAnimating && (
                  <Button variant="success" onClick={startTimer} className="mb-2">Start</Button>
                )}
                <Button variant="primary" onClick={() => addTime(5)} className="mb-2">Add 5 seconds</Button>
                <Button variant="primary" onClick={() => addTime(10)} className="mb-2">Add 10 seconds</Button>
                <Button variant="danger" onClick={stopTimer} className="mb-2">Stop</Button>
              </div>
            </div>
          )}
        </div>
        <div className="bottom-div-three">
          <div className="secondrightfirstbox">
            <button className='secondrightfirstboxbutton'>GENERATE REPORT</button>
            <h3>SECTIONS</h3>
            {['Anthropometry', 'Vitals', 'Blood Investigations', 'Scanning and X Ray', 'Psychology', 'Diet and Nutrition', 'Consultation Facilitation', 'Physical Fitness'].map((section, index) => (
              <div key={index} className="secondrightfirstboxitem" onClick={() => { departmentFunction(section);}}>
                {section}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondMain;

