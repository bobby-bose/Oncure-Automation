import './secondmain.css';
import Avatar from './top/logo/logo';
import SecondLeftMain from './left/secondleftmain';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { API_ENDPOINTS } from '../constants';
import { Button, Form, Modal } from 'react-bootstrap';
import Cookies from 'js-cookie';



const SecondMain = () => {
  const regid='MO1';
  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };
  const [data, setData] = useState([]);
    useEffect(() => {
      fetch(API_ENDPOINTS.PATIENTS_LIST)
        .then(response => response.json())
        .then(data => {
          setData(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);
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
  
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const [showModal, setShowModal] = useState(false);

  const [patientName, setPatientName] = useState('John Doe'); // Default value
  const [age, setAge] = useState(30); // Default value
  const [gender, setGender] = useState('male'); // Default value
  const [contactNumber, setContactNumber] = useState('1234567890'); // Default value
  const [address, setAddress] = useState('123 Main St'); // Default value

  const toggleModal = () => setShowModal(!showModal);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    setShowModal(false);
    
    const patientData = {
      name: patientName,
      age: age,
      gender: gender,
      contact_number: contactNumber,
      address: address,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/patients/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
      setShowModal(false); // Hide modal on successful submission
    } catch (error) {
      console.error('Error:', error);
    }
  }
  

  return (
    <div className="secondmaincontainer">
      
            
      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Patient Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="patientName">
              <Form.Label style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>Patient Name</Form.Label>
              <Form.Control
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                defaultValue="John Doe" // Default value
              />
            </Form.Group>

            <Form.Group controlId="age">
              <Form.Label style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>Age</Form.Label>
              <Form.Control
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                defaultValue={30} // Default value
              />
            </Form.Group>

            <Form.Group controlId="gender">
              <Form.Label style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>Gender</Form.Label>
              <Form.Control
                as="select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                defaultValue="male" // Default value
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="contactNumber">
              <Form.Label style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>Contact Number</Form.Label>
              <Form.Control
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                defaultValue="1234567890" // Default value
              />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                defaultValue="123 Main St" // Default value
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
          
      <div className="top-section">
        <div className="button-row">
          <Avatar src="https://owas.oncurehealth.com/logo.svg" alt="Avatar" />
          <div className="textdetailscontainer">
            <div className="text-details">
              <p>Patient Name: {patientName || 'N/A'}</p>
              <p>Registration ID: {regid || 'N/A'}</p>
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
            <button className='secondleftmainbutton'onClick={toggleModal}> 
              Register Now
            </button>
            <div class="search-bar">
              <input type="text" name="search-record" id="search-record" placeholder="Search records" className="search-bar-input"/>
            </div>
            <div style={{ width: '100%' }}>
      {data.map((patient, index) => (
        <div className="secondleftfirstboxitem" key={index}>
          <div className="secondleftboxspan">
            <span className="secondleftboxspanname">Patient Name</span>
            <span className="value">{patient.name}</span>
          </div>
          <div className="secondleftboxspan">
            <span className="secondleftboxspanname">Reg Id</span>
            <span className="value">{patient.id}</span>
          </div>
          <div className="secondleftboxspan">
            <span className="secondleftboxspanname">Contact Number</span>
            <span className="value">{patient.mobile_number}</span>
          </div>
          <div className="secondleftboxspan">
            <span className="secondleftboxspanname">Address</span>
            <span className="value">{patient.address}</span>
          </div>
        </div>
      ))}
    </div>
            <div className="d-flex justify-content-between w-100 mt-2">
            <button className="btn btn-success flex-grow-1 me-1" onClick={() => {
              showleftform(true);
              handleButtonClick('ZAINUL ABIDEEN', 'M1-0120', '9447100534', 'Kozhikode');
              
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

