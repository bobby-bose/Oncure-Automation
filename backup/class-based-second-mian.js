import './secondmain.css';
import Avatar from './top/logo/logo';
import {  useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { API_ENDPOINTS } from '../constants';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

class Main extends React.Component
 {

        constructor(props) {
          super(props);
          this.state = {
            regid: 'MO1',
            data: [],
            CoordinationFacilitator: [],
            progressBar: 100,
            departments: [],
            selectedHour: 0,
            selectedMinute: 0,
            remainingTime: null,
            showModal: false,
            patientName: 'John Doe',
            patientId: null,
            secondpatientId: null,
            age: 30,
            gender: 'male',
            contactNumber: '1234567890',
            address: '123 Main St',
            leftform: false,
            currentDepartment: '',
            selectedPackage: '',
            OncurePackages: [],
            selectedCoordinationFacilitator:'',
            formData: {
              name: '',
              patientId: '',
              contactNumber: '',
              address: ''
            }
          };
        }
      
  
   fetchData = async () => {
    try {
      const packagesResponse = await fetch(API_ENDPOINTS.PACKAGES_LIST);
      const packagesData = await packagesResponse.json();
      setOncurePackages(packagesData.list); // Ensure this matches the actual structure
     
      const coordinationfacilitatorResponse = await fetch(API_ENDPOINTS.COORDINATIONFACILITATOR_LIST);
      const coordinationfacilitatorData = await coordinationfacilitatorResponse.json();
      setCoordinationFacilitator(coordinationfacilitatorData.list); // Ensure this matches the actual structure
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
   fetchPatients = async () => {
    try {
      const patientsResponse = await fetch(API_ENDPOINTS.PATIENTS_LIST);
      const patientsData = await patientsResponse.json();
      setData(patientsData);
    } catch (error) {
      console.error('Error fetching patients data:', error);
    }
  };
  componentDidMount() {
    this.fetchPatients();
    this.intervalId = setInterval(this.fetchPatients, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

     stopTimer = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/update-patient-timer-active/',{ patId: patientId,status:false });
    } catch (error) {
      console.error("Error updating timer:", error);
    }
  };
   handleSetTime = () => {
    alert(`Time set to: ${selectedHour} hours and ${selectedMinute} minutes`);
    updatemiddletimer();
  };
   handleMinuteChange = (event) => {
    setSelectedMinute(parseInt(event.target.value));
  };
   handleHourChange = (event) => {
    setSelectedHour(parseInt(event.target.value));
  };
   handleMiddleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };
   updatemiddletimer = async () => {
    try {
      var newTime=selectedHour+":"+selectedMinute;
      const response = await axios.post('http://127.0.0.1:8000/api/update_middle_timer/',{ patId: patientId,timer:newTime });
    } catch (error) {
      console.error("Error updating timer:", error);
    }
  };
   toggleModal = () => setShowModal(!showModal);
   handlePatientClick = (iddd) => {
    console.log("0000000000000000000",iddd);
    setsecondpatientId(iddd);
    fetchfullpatientdetails(iddd);
  };
   fetchfullpatientdetails = async (idd) => {
    try {
              const response = await axios.post('http://127.0.0.1:8000/api/patient/details/',{ patId: secondpatientId });
              console.log("1111111111111111111111",response)
            } catch (error) {
              console.error("Error updating timer:", error);
            }
          };

   handleButtonClick = (name, patientId, contactNumber, address) => {
    setFormData({ name, patientId, contactNumber, address });
  };
 handleSubmit = async (e) => {
    e.preventDefault();
    const patientData = {
      name: patientName,
      age: age,
      contact_number: contactNumber,
      address: address,
      coord_facilitator: selectedCoordinationFacilitator, // Add appropriate value
      chosen_package: selectedPackage, // Add appropriate value
      assigned_department: null, // Add appropriate value
      status: "", // Add appropriate value
      current_department: "" // Add appropriate value
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
      const data = await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
    toggleModal();
  };
   handleDelete = async (patientId) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/patients/delete/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patientId }), // Send chosenPackageId in the request body
      });
      if (!response.ok) {
       
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.error) {
        console.log("Error",data.error);
      } else {
      }
    } catch (error) {
      console.log("Error",data.error);
    }
};
 handleMiddleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/patients/edit/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  };
   startTimer = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/update-patient-timer-active/',{ patId: patientId,status:true });
      
    } catch (error) {
      console.error("Error updating timer:", error);
    }
  };
   registernow=async()=>{
    fetchData();
    toggleModal();
  }
  render() {
    const {
      data,
      CoordinationFacilitator,
      progressBar,
      departments,
      selectedHour,
      selectedMinute,
      remainingTime,
      showModal,
      patientName,
      patientId,
      secondpatientId,
      age,
      gender,
      contactNumber,
      address,
      leftform,
      currentDepartment,
      selectedPackage,
      OncurePackages,
      formData
    } = this.state;
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
    
                <Form.Group controlId="oncurePackage">
      <Form.Label style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>Oncure Package</Form.Label>
      <Form.Control
        as="select"
        value={selectedPackage}
        onChange={(e) => setSelectedPackage(e.target.value)}
      >
        <option value="">Select a package</option>
        {OncurePackages.map((pack) => (
          <option key={pack.id} value={pack.id}>
            {pack.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
    
    <Form.Group controlId="coordinationfacilitator">
      <Form.Label style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>Coordination Facilitator</Form.Label>
      <Form.Control
        as="select"
        value={selectedCoordinationFacilitator}
        onChange={(e) => setselectedCoordinationFacilitator(e.target.value)}
      >
        <option value="">Select a Coordination facilitator</option>
        {CoordinationFacilitator.map((pack) => (
          <option key={pack.id} value={pack.id}>
            {pack.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
        <Form.Group>
        <Form.Label style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}></Form.Label>
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
             
            </div>
            
          </div>
          <div className="bottom-section">
            <div className="bottom-div-one">
              <div className="secondleftmaincontainer">
                {/* <button className='secondleftmainbutton'onClick={toggleModal}>  */}
                <button className='secondleftmainbutton'onClick={registernow}> 
                  Register Now
                </button>
                <div class="search-bar">
                  <input type="text" name="search-record" id="search-record" placeholder="Search records" className="search-bar-input"/>
                </div>
                <div style={{ width: '100%' }}>
          {data.map((patient, index) => (
            <div>
            <div className="secondleftfirstboxitem" key={index} onClick={() => handlePatientClick(patient.id)}>
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
            <div className="d-flex justify-content-between w-100 mt-2">
            <button className="btn btn-success flex-grow-1 me-1" onClick={() => {
              showleftform(true);
              handleButtonClick(patient.name, patient.id, patient.mobile_number, patient.address);
            }}>EDIT</button>
              <button className="btn btn-danger flex-grow-1 ms-1"
              onClick={() => {
                handleDelete(patient.id);
              }}
              >DELETE</button>
            </div>
            </div>
          ))}
        </div>
              </div>
            </div>
            <div className="bottom-div-two">
              {leftform ? (
                <div className="form" style={{ display: "flex", flexDirection: "column", width: "100%" }} onSubmit={handleMiddleSubmit}>
                  <div className="ConsultationFacilitator">
                  <form style={{ width: '100%' }}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" value={formData.name} onChange={handleMiddleChange}/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="regId" className="form-label">Registration Id</label>
                        <input type="text" className="form-control" id="regId" value={formData.regId} onChange={handleMiddleChange}/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                        <input type="text" className="form-control" id="contactNumber" value={formData.contactNumber} onChange={handleMiddleChange}/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" value={formData.address} onChange={handleMiddleChange}/>
                      </div>
                      <button type="submit" style={{ backgroundColor: 'green', color: 'white' }}>
            Submit
          </button>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="container text-center mt-5">
               <ProgressBar now={progressBar}  />
                  <h2 className="mt-3">Current Department:{currentDepartment}</h2> 
                  <h3>Time: {remainingTime}</h3>
                  <div className="mt-3 d-flex flex-column">
                    
                      <Button variant="success" onClick={startTimer} className="mb-2">Start</Button>
                    
                <div className="duration-container">
                        <h2 className="timerh2">Select Time</h2>
                        <div className="dropdown-container">
                          <select
                            value={selectedHour}
                            onChange={handleHourChange}
                            className="dropdown"
                          >
                            {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')} hours</option>
                  ))}
    
                          </select>
                          <select
                            value={selectedMinute}
                            onChange={handleMinuteChange}
                            className="dropdown"
                          >
                            {Array.from({ length: 60 }, (_, i) => (
                    <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')} minutes</option>
                  ))}
    
                          </select>
                          <button onClick={handleSetTime} className="set-button">Set</button>
                        </div>
                      </div>
                                  <Button variant="danger" onClick={stopTimer} className="mb-2">Completed</Button>
                                </div>
                              </div>
              )}
            </div>
            <div className="bottom-div-three">
              <div className="secondrightfirstbox">
                <h3>STEPS</h3>
    {departments.map((section) => (
     
            <div
              key={section.id}
              className={`secondrightfirstboxitem ${currentDepartment === section.name ? 'active' : ''}`}
              
            >
              {section.name}
            </div>
          ))}
              </div>
            </div>
          </div>
        </div>
      );
    };
};
export default Main;
