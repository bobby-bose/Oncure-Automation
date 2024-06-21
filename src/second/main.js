import './secondmain.css';
import Avatar from './top/logo/logo';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { API_ENDPOINTS } from '../constants';
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';

class Main extends React.Component {
  handleLogout = () => {
    localStorage.removeItem('loggedIn');
    this.props.onLogout(); // Call the onLogout callback
  };
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
      newPatientRemainingTime: 0,
      newPatientTimerActive: false,
            newdepartments:[],
            newassigneddepartment:null,
            remainingtime:0,
            counterStatus:false,
            showDeleteModal: false,
          };
          this.stopTimer = this.stopTimer.bind(this); 
          this.registernow = this.registernow.bind(this); 
          this.handlePatientClick = this.handlePatientClick.bind(this); 
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
              const coordinationfacilitatorResponse = await fetch(API_ENDPOINTS.COORDINATIONFACILITATOR_LIST);
              const coordinationfacilitatorData = await coordinationfacilitatorResponse.json();
              this.setState({ CoordinationFacilitator: coordinationfacilitatorData.list }); // Ensure this matches the actual structure
              console.log("COOOOOOOOOOOOOOOO",this.CoordinationFacilitator);
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
          

  componentDidMount() {
    this.intervalId = setInterval(this.fetchPatients, 1000);
    this.interval = setInterval(() => {
      if (this.state.status) {
        this.updateeachsecond();
      }
    }, 1000);
   
  }

  
  componentWillUnmount() {
    clearInterval(this.intervalId);
    clearInterval(this.interval);
  }
  changeColor = () => {
    this.setState({color: "blue"});
  }
  stopTimer = async () => {
    this.setState({ status: false }); 
    
  };
   
  handleSetTime = () => {
    const { selectedHour, selectedMinute } = this.state;
    alert(`Time set to: ${selectedHour} hours and ${selectedMinute} minutes`);
    this.updatemiddletimer();
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
  updatemiddletimer = async () => {
    try {
      const { selectedHour, selectedMinute, secondpatientId } = this.state;
      const newTime = `${selectedHour}:${selectedMinute}`;
      console.log("EEEEEEEEEEEEAAAAAAAAAACH",selectedHour, selectedMinute, secondpatientId);
      const response=await axios.post('http://127.0.0.1:8000/api/update_middle_timer/', { patId: secondpatientId, timer: newTime });
      console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPP",response.data.remaining_time);
      this.setState({ remainingtime: response.data.remaining_time });
    } catch (error) {
      console.error("Error updating timer:", error);
    }
  };

  toggleModal = () => {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  };

  handlePatientClick = (iddd) => {
    console.log("0000000000000000000", iddd);
    this.setState({ secondpatientId: iddd }, () => {
        this.fetchfullpatientdetails();
    });
};
  fetchfullpatientdetails = async () => {
    try {
      const { secondpatientId } = this.state;
      console.log("4444444444444444",secondpatientId);
      const response = await axios.post('http://127.0.0.1:8000/api/patient/details/', { patId: secondpatientId });
      console.log("1111111111111111111111", response.data.data);
      this.setState({
        newPatientName: response.data.name || '',
        newPatientAge: response.data.age || 0,
        newPatientMobileNumber: response.data.mobile_number || '',
        newPatientAddress: response.data.address || '',
        newPatientCoordFacilitator: response.data.coord_facilitator || 0,
        newPatientMeals: response.data.meals || null,
        newPatientChosenPackage: response.data.data.chosen_package || 0,
        newPatientAssignedDepartment: response.data.assigned_department || 0,
        newPatientChosenTime: response.data.chosen_time || 0,
        newPatientRemainingTime: response.data.data.remaining_time || 1,
        newPatientTimerActive: response.data.timer_active || false,
      });
      console.log("1111111111111111111111", response.data.departments);
      this.setState({ newdepartments: response.data.departments }); 
      console.log("1111111111111111111111", response.data.assigned_dep);
      this.setState({ newassigneddepartment: response.data.assigned_dep }); 
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
    console.log("AAAAAAAAADDDDDDDDDDDDDD",patientName,age,selectedPackage);
    const patientData = {
      name: patientName,
      age: age,
      contact_number: contactNumber,
      address: address,
      chosen_package: selectedPackage,
      assigned_department: null,
      status: "",
      current_department: ""
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
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
    this.toggleModal();
  };

  handleDelete = async (patientId) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/patients/delete/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patientId }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.error) {
        console.log("Error", data.error);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  handleMiddleSubmit = async (event) => {
    event.preventDefault();
    const { formData } = this.state;
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
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  startTimer = async () => {
console.log("Started the updation of time");
this.setState({ status: true });
  };
  updateeachsecond = async () => {
    try {
      const { secondpatientId } = this.state;
      console.log("111111111111111111111111111111111111",secondpatientId);
      const response = await axios.post('http://127.0.0.1:8000/api/update_each_second/', { patId: secondpatientId });
      console.log("000000000", response.data);
      if (response.data.updated_time === 0) {
        this.setState({ status: false });
      }
      this.setState({
        newPatientRemainingTime: response.data.updated_time || 1,
      });
    } catch (error) {
      console.error("Error updating patient remaining time", error);
    }
};

Completed = async () => {
  try {
    const { secondpatientId, newPatientChosenPackage } = this.state;
    console.log("7777777777", secondpatientId, newPatientChosenPackage);
    const response = await axios.post('http://127.0.0.1:8000/api/update_next_department/', { patId: secondpatientId, cho_pak: newPatientChosenPackage });
    console.log("NEXT DEPARTMENT NEXTTT", response.data.next_department);
    if (response.data.next_department === "FINISHED") {
      alert("Patient visited All Departments");
      this.setState({
        showDeleteModal: true
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
  console.log("THE NEW PACKAGE NAME IS",e.target.value);
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
handleDeleteConfirmDelete=()=>{
  const { secondpatientId } = this.state;
  this.handleDelete(secondpatientId);
  this.setState({ showDeleteModal: false});
}

  render() {
    const {
      data,
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
      newPatientRemainingTime,
      newPatientTimerActive,
      newdepartments,
            newassigneddepartment,
            showDeleteModal
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
                  defaultValue="John Doe" // Default value
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
            <div className="button-row">
              <Avatar src="https://owas.oncurehealth.com/logo.svg" alt="Avatar" />
              <div className="textdetailscontainer">
                <div className="text-details">
                  <p>Patient Name: {this.state.patientName || 'N/A'}</p>
                  <p>Registration ID: {this.state.regid || 'N/A'}</p>
                  <p>Age: {this.state.age || 'N/A'}</p>
                  <p>Gender: {this.state.gender || 'N/A'}</p>
                  <p>Contact Number: {this.state.contactNumber || 'N/A'}</p>
                  <p>Address: {this.state.address || 'N/A'}</p>
                </div>
              </div>
              <button className='secondleftmainbuttonhandlelogout' onClick={this.handleLogout}>Logout</button>
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
            <div className="secondleftfirstboxitem" key={index} onClick={() => this.handlePatientClick(patient.id)}>
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
                        <label htmlFor="regId" className="form-label">Registration Id</label>
                        <input type="text" className="form-control" id="regId" value={formData.regId} onChange={this.handleMiddleChange}/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                        <input type="text" className="form-control" id="contactNumber" value={formData.contactNumber} onChange={this.handleMiddleChange}/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" value={formData.address} onChange={this.handleMiddleChange}/>
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
                  <h2 className="mt-3">Current Department:{newassigneddepartment}</h2> 
                  <h3>Time: {newPatientRemainingTime}</h3>
                  <div className="mt-3 d-flex flex-column">
                      <Button variant="success" onClick={this.startTimer} className="mb-2">Start</Button>
                <div className="duration-container">
                        <h2 className="timerh2">Select Time</h2>
                        <div className="dropdown-container">
                          {/* <select
                            value={selectedHour}
                            onChange={this.handleHourChange}
                            className="dropdown"
                          >
                            {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')} hours</option>
                  ))}
                          </select> */}
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
                                  <Button variant="warning" onClick={this.stopTimer} className="mb-2">Pause</Button>
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
