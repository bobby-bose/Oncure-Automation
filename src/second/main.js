import './secondmain.css';
import Avatar from './top/logo/logo';

import ProgressBar from 'react-bootstrap/ProgressBar';
        
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { API_ENDPOINTS } from '../constants';
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';


class Main extends React.Component {
  handleLogout = () => {
    localStorage.removeItem('loggedIn');
    this.props.onLogout(); 
  };
       constructor(props) {
          super(props);
          this.state = {
            regid: 'MO1',
            data: [],
            CoordinationFacilitator: [],
            Meals: [],
            progressBar: 100,
            departments: [],
            selectedHour: 0,
            selectedMinute: 0,
            showModal: false,
            patientName: '',
            patientId: null,
            secondpatientId:299,
            age: 0,
            gender: 'default',
            contactNumber: '',
            address: '',
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
            },
            newPatientId: 0,
      newPatientName: '',
      newPatientAge: 0,
      newPatientMobileNumber: '',
      newPatientAddress: '',
      newPatientCoordFacilitator: 0,
      newPatientMeals: null,
      newPatientChosenPackage: null,
      newPatientAssignedDepartment: 0,
      newPatientChosenTime: 0,
      newPatientRemainingTime1: 0,
      newPatientRemainingTime2: 0,
      newPatientTimerActive: false,
      newPatientProgressBar:100,
            newdepartments:[],
            newassigneddepartment:null,
            remainingtime:0,
            counterStatus:false,
            showDeleteModal: false,
            showBusyModal:false,
            showStart:true,
          };
          this.stopTimer = this.stopTimer.bind(this); 
          this.registernow = this.registernow.bind(this); 
          this.handleDelete = this.handleDelete.bind(this); 
          this.handleMiddleSubmit = this.handleMiddleSubmit.bind(this); 
          this.handleMiddleChange = this.handleMiddleChange.bind(this); 
          this.startTimer = this.startTimer.bind(this);
          this.handleHourChange = this.handleHourChange.bind(this); 
          this.handleMinuteChange = this.handleMinuteChange.bind(this); 
          this.handlePackageChange = this.handlePackageChange.bind(this); 
        }
        fetchData = async () => {
            try {
              const packagesResponse = await fetch(API_ENDPOINTS.PACKAGES_LIST);
              const packagesData = await packagesResponse.json();
              this.setState({ OncurePackages: packagesData.list }); // Ensure this matches the actual structure
              const mealsResponse = await fetch(API_ENDPOINTS.MEALS_LIST);
              const mealsData = await mealsResponse.json();
              this.setState({ Meals: mealsData.list }); 
              const coordinationfacilitatorResponse = await fetch(API_ENDPOINTS.COORDINATIONFACILITATOR_LIST);
              const coordinationfacilitatorData = await coordinationfacilitatorResponse.json();
              this.setState({ CoordinationFacilitator: coordinationfacilitatorData.list }); // Ensure this matches the actual structure
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          fetchPatients = async () => {
            try {
              const patientsResponse = await fetch(API_ENDPOINTS.PATIENTS_LIST);
              const patientsData = await patientsResponse.json();
              this.setState({ data: patientsData });
            } catch (error) {
              console.error('Error fetching patients data:', error);
            }
          };
          waitingpatients = () => {
            this.props.history.push('/waiting');
          };
        
  componentDidMount() {
    this.intervalId = setInterval(this.fetchPatients, 1000);
   this.intervalIdd=setInterval(this.updatetimer,1000);
   this.intervalId_d=setInterval(this.fetchfullpatientdetails,500);
   this.intervalId_dd=setInterval(this.fulltimer,500);

  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
    clearInterval(this.intervalIdd);
    clearInterval(this.intervalId_d);
    clearInterval(this.intervalId_dd);
  }
  changeColor = () => {
    this.setState({color: "blue"});
  }
  stopTimer = async () => {
    console.log("Set to false");
    this.setstatusfalse();
    this.setState({ showStart: true }); 
  };
  handleSetTime = () => {
    this.setState({ showStart: true }); 
    alert("SET FUNCTION CALLED");
    this.updatesettimer();
    
  };

  handleMinuteChange = (event) => {
    this.setState({ selectedMinute: parseInt(event.target.value) });
  };

  handleHourChange = (event) => {
    this.setState({ selectedHour: parseInt(event.target.value) });
  };

  handleMiddleChange = (e) => {
    const { id, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [id]: value
      }
    }));
  };
  

  toggleModal = () => {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  };
updatesettimer=async()=>{
  const { selectedMinute } = this.state;
  try {
    const { secondpatientId } = this.state;
    console.log("The second Patient gfgfgfgfgf Id is",secondpatientId);
    console.log("The second Patient gfgfgfgfgf time is",selectedMinute);
    if(secondpatientId){      
    const response = await axios.post(API_ENDPOINTS.UPDATE_SET_TIMER, { patId: secondpatientId,time:selectedMinute });
  }
  } catch (error) {
    console.error("Error fetching patient details:", error);
  }
}
 
  fetchfullpatientdetails = async () => {
    try {
      const { secondpatientId } = this.state;
      console.log("The second Patient Id is",secondpatientId);
      if(secondpatientId){      
      const response = await axios.post(API_ENDPOINTS.PATIENT_DETAILS, { patId: secondpatientId });
      this.setState({
        newPatientName: response.data.data.name || '',
        newPatientAge: response.data.age || 0,
        newPatientMobileNumber: response.data.mobile_number || '',
        newPatientAddress: response.data.address || '',
        newPatientCoordFacilitator: response.data.coord_facilitator || 0,
        newPatientMeals: response.data.meals || null,
        newPatientChosenPackage: response.data.data.chosen_package || 0,
        newPatientAssignedDepartment: response.data.assigned_department || 0,
        newPatientChosenTime: response.data.chosen_time || 0,
        newPatientRemainingTime1: response.data.remaining_time_minutes || 0,
        newPatientRemainingTime2: response.data.remaining_time_seconds || 0,
        newPatientTimerActive: response.data.data.timer_active || false,
        newPatientProgressBar: response.data.progress_bar || 40
      });
      this.setState({ newdepartments: response.data.departments }); 
      this.setState({ newassigneddepartment: response.data.assigned_dep }); 
    }
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };
  handleButtonClick = (name, patientId, contactNumber, address) => {
    this.setState({ formData: { name, patientId, contactNumber, address } });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { patientName, age, contactNumber, address, selectedPackage } = this.state;
    const patientData = {
      name: patientName,
      age: age,
      contact_number: contactNumber,
      address: address,
      chosen_package: selectedPackage,
    };
    const isEmpty = (value) => value === null || value === 0 || value === '';
    const hasInvalidValue = Object.values(patientData).some(isEmpty);
    if (hasInvalidValue) {
      alert('Please submit full data');
      return;
    }
    try {
      const response = await fetch(API_ENDPOINTS.PATIENT_ADD, {
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
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
    this.toggleModal();
  };


  handleDelete = async (patientId) => {
    try {
      const response = fetch(API_ENDPOINTS.PATIENT_DELETE, {
        method: 'POST',
        body: JSON.stringify({
          patientId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.error) {
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
 

  handleMiddleSubmit = async (event) => {
    this.showleftform(false);
    event.preventDefault();
    const { formData } = this.state;
    try {
      const response = await fetch(API_ENDPOINTS.PATIENT_EDIT, {
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
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  startTimer = async () => {
console.log("Set to true");
this.setstatustrue();
this.setState({ showStart: false }); 
console.log("REACHED 12");
  };


Completed = async () => {
  try {
    const { secondpatientId, newPatientChosenPackage } = this.state;
    const response = await axios.post(API_ENDPOINTS.UPDATE_NEXT_DEPARTMENT, { patId: secondpatientId, cho_pak: newPatientChosenPackage });
    if (response.data.next_department === "FINISHED") {
      alert("Patient visited All Departments");
      this.setState({
        showDeleteModal: true
      });
    }
    if (response.data.next_department === "WAITING") {
      alert("Other Departments are Busy");
      this.setState({
        showBusyModal: true
      });
    }
    else{
      this.setState({ newassigneddepartment: response.data.next_department }); 
    }
    
  } catch (error) {
    console.error("ERROR DEPARTMENT", error);
  }
};
handlePackageChange = (e) => {
 
  this.setState({ selectedPackage: e.target.value });
}
  registernow = async () => {
    this.fetchData();
    this.toggleModal();
  };
  allfinished = (id) => {
    this.handleDelete(id);
}
handleDeleteCloseModal=()=>{
this.setState({ showDeleteModal: false});
}
handleBusyCloseModal=()=>{
this.setState({ showBusyModal: false});
}
handleDeleteConfirmDelete=()=>{
  const { secondpatientId } = this.state;
  this.handleDelete(secondpatientId);
  this.setState({ showDeleteModal: false});
}
showleftform=(val)=>{
  this.setState({ leftform: val});
}

setstatustrue = async () => {
  try {
    const { secondpatientId } = this.state;
    
    const response = await axios.post(API_ENDPOINTS.START_TIMER, { patId: secondpatientId });
    console.log("SET STATUS TRUE");
    
  } catch (error) {
    console.error("Error in setting the status false", error);
  }
};
setstatusfalse = async () => {
  try {
    const { secondpatientId } = this.state;
    
    const response = await axios.post(API_ENDPOINTS.PAUSE_TIMER, { patId: secondpatientId });
    
  } catch (error) {
    console.error("Error in setting the status false", error);
  }
};
updatetimer = async () => {
  try {
              const response = await fetch(API_ENDPOINTS.UPDATE_TIMER);
                           
            } catch (error) {
              console.error('Error updating timer:', error);
            }
          };

          
          fulltimer = async () => {
            try {
                        const response = await fetch(API_ENDPOINTS.FULL_TIMER);
                                     
                      } catch (error) {
                        console.error('Error updating timer:', error);
                      }
                    };

  render() {
    const {
      data,
      Meals,
      CoordinationFacilitator,
      progressBar,
      departments,
      selectedHour,
      selectedMinute,
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
      formData,
      newPatientId,
      newPatientName,
      newPatientAge,
      newPatientMobileNumber,
      newPatientAddress,
      newPatientCoordFacilitator,
      newPatientMeals,
      newPatientChosenPackage,
      newPatientAssignedDepartment,
      newPatientChosenTime,
      newPatientRemainingTime1,
      newPatientRemainingTime2,
      newPatientTimerActive,
      newPatientProgressBar,
      newdepartments,
            newassigneddepartment,
            showDeleteModal,
            showBusyModal,
          showStart 
    } = this.state;
    
    return (
        <div className="secondmaincontainer">
            <Modal show={showDeleteModal} onHide={this.handleDeleteCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        The patient has completed all the departments. Can we remove him from the list?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleDeleteCloseModal}>Cancel</Button>
                        <Button variant="primary" onClick={this.handleDeleteConfirmDelete}>OK</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showBusyModal} onHide={this.handleBusyCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Busy Departments</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        The Remaining Departments are Busy...Please Wait?
                    </Modal.Body>
                    <Modal.Footer>
                      
                        <Button variant="primary" onClick={this.handleBusyCloseModal}>OK</Button>
                    </Modal.Footer>
                </Modal>
        <Modal show={showModal} onHide={this.toggleModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Patient Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="patientName">
                <Form.Label style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>Patient Name</Form.Label>
                <Form.Control
                  type="text"
                  value={patientName}
                  onChange={(e) => this.setState({ patientName: e.target.value })}
                  defaultValue="John Doe" // Default value1zatient Form
                />
              </Form.Group>
              <Form.Group controlId="age">
                <Form.Label style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>Age</Form.Label>
                <Form.Control
                  type="number"
                  value={age}
                  onChange={(e) => this.setState({ age: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="gender">
                <Form.Label style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>Gender</Form.Label>
                <Form.Control
                  as="select"
                  value={gender}
                  onChange={(e) => this.setState({ gender: e.target.value })}
                >
                  <option value="default">Select a Gender</option>
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
                  onChange={(e) => this.setState({ contactNumber: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={address}
                  onChange={(e) => this.setState({ address: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="selectedCoordinationFacilitatorformid">
                <Form.Label style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>Coordination Facilitator</Form.Label>
                <Form.Control
                  as="select"
                  value={this.selectedCoordinationFacilitator}
                  onChange={(e) => this.setState({ selectedCoordinationFacilitator: e.target.value })}
                >
                  {CoordinationFacilitator.map((facilitator) => (
                    <option key={facilitator.id} value={facilitator.id}>
                      {facilitator.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="selectedmealsformid">
                <Form.Label style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>Meals</Form.Label>
                <Form.Control
                  as="select"
                  value={this.selectedMeals}
                  onChange={(e) => this.setState({ selectedMeals: e.target.value })}
                >
                  {Meals.map((meals) => (
                    <option key={meals.id} value={meals.id}>
                      {meals.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="selectedPackage">
        <Form.Label style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>Package</Form.Label>
        <Form.Control
          as="select"
          value={this.selectedPackage}
          onChange={(e) => this.setState({ selectedPackage: e.target.value })}
        >
         
          {OncurePackages.map((pkg) => (
            <option key={pkg.id} value={pkg.id}>
              {pkg.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <div className="top-section">
  <div className="button-row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ marginBottom: '10px',marginTop: '40px' }}>
      <Avatar src="https://owas.oncurehealth.com/logo.svg" alt="Avatar" />
    </div>
    <div className='button-container'>
      <button className='button-handle' onClick={this.handleLogout}>Logout</button>
    </div>
  </div>
</div>

          <div className="bottom-section">
            <div className="bottom-div-one">
              <div className="secondleftmaincontainer">
                <button className='secondleftmainbutton'onClick={this.registernow}> 
                  Register Now
                </button>
                <div class="search-bar">
                  <input type="text" name="search-record" id="search-record" placeholder="Search records" className="search-bar-input"/>
                </div>
                <div style={{ width: '100%' }}>
          {data.map((patient, index) => (
            <div>
            <div className="secondleftfirstboxitem" key={index} onClick={() => this.setState({ secondpatientId: patient.id })}>
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
              this.showleftform(true);
              this.handleButtonClick(patient.name, patient.id, patient.mobile_number, patient.address);
            }}>EDIT</button>
              <button className="btn btn-danger flex-grow-1 ms-1"
              onClick={() => {
                this.handleDelete(patient.id);
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
                <div className="form" style={{ display: "flex", flexDirection: "column", width: "100%" }} onSubmit={this.handleMiddleSubmit}>
                  <div className="ConsultationFacilitator">
                  <form style={{ width: '100%' }}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" value={formData.name} onChange={this.handleMiddleChange}/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                        <input type="text" className="form-control" id="contactNumber" value={formData.contactNumber} onChange={this.handleMiddleChange}/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" value={formData.address} onChange={this.handleMiddleChange}/>
                      </div>
                      <button type="submit" className="btn btn-success flex-grow-1 me-1">Submit</button>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="container text-center mt-2">
               
              
               {/* <ProgressBar now={newPatientProgressBar} /> */}
               <h2 className="mt-3">{newPatientName}</h2> 
                  <h2 className="mt-3">{newassigneddepartment}</h2> 
                  <h3>{newPatientRemainingTime1}:{newPatientRemainingTime2}</h3>
                  <div className="mt-3 d-flex flex-column">
                <div className="duration-container">
                        <h2 className="timerh2">Select Time</h2>
                        <div className="dropdown-container">
                          <select
                            value={selectedMinute}
                            onChange={this.handleMinuteChange}
                            className="dropdown"
                          >
                            {Array.from({ length: 60 }, (_, i) => (
                    <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')} minutes</option>
                  ))}
                          </select>
                          <button onClick={this.handleSetTime} className="set-button">Set</button>
                        </div>
                      </div>
                      {newPatientTimerActive ? (
        <Button variant="warning" onClick={this.stopTimer} className="mb-2">
        Pause
      </Button>
        ) : (
          <Button variant="success" onClick={this.startTimer} className="mb-2">
            Start
          </Button>
        )}
                         <Button variant="danger" onClick={this.Completed} className="mb-2">Completed</Button>          
                                </div>
                              </div>
              )}
            </div>
            <div className="bottom-div-three">
              <div className="secondrightfirstbox">
                <h3>STEPS</h3>
    {newdepartments.map((section) => (
     
            <div
              key={section}
              className={`secondrightfirstboxitem ${newassigneddepartment === section ? 'active' : ''}`}
              
            >
              {section}
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
