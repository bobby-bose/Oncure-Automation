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

const SecondMain = () => {
  const regid='MO1';
 
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Oncure Packages
        const packagesResponse = await fetch(API_ENDPOINTS.PACKAGES_LIST);
        const packagesData = await packagesResponse.json();
        setOncurePackages(packagesData.list); // Adjust this if the structure is different

        // Fetch Patients
        const patientsResponse = await fetch(API_ENDPOINTS.PATIENTS_LIST);
        const patientsData = await patientsResponse.json();
        setData(patientsData); // Assuming patientsData is the data you need

        const coordinationfacilitatorResponse = await fetch(API_ENDPOINTS.COORDINATIONFACILITATOR_LIST);
        const coordinationfacilitatorData = await coordinationfacilitatorResponse.json();
        setCoordinationFacilitator(coordinationfacilitatorData.list); 
      
        const mealsResponse = await fetch(API_ENDPOINTS.MEALS_LIST);
        const mealsData = await mealsResponse.json();
        setMeals(mealsData.list); 
   
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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


  const dispatch = useDispatch();
  const [departments, setDepartments] = useState([]);
    const [chosenPackageId, setChosenPackageId] = useState(0);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [patientName, setPatientName] = useState('John Doe'); // Default value
    const [age, setAge] = useState(30); // Default value
    const [gender, setGender] = useState('male'); // Default value
    const [contactNumber, setContactNumber] = useState('1234567890'); // Default value
    const [address, setAddress] = useState('123 Main St'); // Default value  
  const [leftform, showleftform] = useState(false);
  const [currentDepartment, setcurrentDepartment] = useState('');
  const [time, setTime] = useState(10);
  const [progress, setProgress] = useState(100);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);
  const [selectedPackage, setSelectedPackage] = React.useState('');
  const [OncurePackages, setOncurePackages] = React.useState([]);
  const [selectedCoordinationFacilitator, setselectedCoordinationFacilitator] = React.useState('');
  const [CoordinationFacilitator, setCoordinationFacilitator] = React.useState([]);
  const [selectedMeals, setselectedMeals] = React.useState('');
  const [Meals, setMeals] = React.useState([]);
  const [currentDepartmentName, setCurrentDepartmentName] = useState(null);
  const [currentDepartmentId, setCurrentDepartmentId] = useState(null);

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

 
  const toggleModal = () => setShowModal(!showModal);

  

 // Function to handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  const patientData = {
    name: patientName,
    age: age,
    contact_number: contactNumber,
    address: address,
    coord_facilitator: selectedCoordinationFacilitator, // Add appropriate value
    meals: selectedMeals, // Add appropriate value
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
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

    const fetchDepartments = async (patientId) => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/departments/list/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ patientId }), // Send chosenPackageId in the request body
        });
        if (!response.ok) {
          console.log("!response.ok");
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.error) {
          console.log("data.error");
          setError(data.error);
        } else {
          console.log("setDepartments(data.list);");
          setDepartments(data.list); // Extract the list key from the JSON response
        }
      } catch (error) {
        setError(error.message);
      }
    };
    
const handlePatientClick = (patientId) => {
  console.log("The patient id is",patientId);
  
  
  fetchDepartments(patientId);
  console.log("After the sate change",chosenPackageId)
  fetchCurrentDepartment(patientId);
};
useEffect(() => {
  if (chosenPackageId !== 0) {
    fetchDepartments();
  }
}, [chosenPackageId]);
useEffect(() => {
  if (chosenPackageId !== 0) {
    fetchCurrentDepartment(chosenPackageId);
  }
}, [chosenPackageId]);

const handleDepartmentClick = (id, name) => {
  setCurrentDepartmentId(id);
  departmentFunction(name);
  console.log("The Department Id and Package Id of the Patient is",id,chosenPackageId)
  const getpatientstatus = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/patient/status/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ package_id: chosenPackageId, department_id: id }), // Send chosenPackageId in the request body
      });
      if (!response.ok) {
        console.log("!response.ok");
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.error) {
        console.log("data.error");
        setError(data.error);
      } else {
        console.log("Successfull;");
         // Extract the list key from the JSON response
      }
    } catch (error) {
      setError(error.message);
    }
  };
  getpatientstatus();
};
const fetchCurrentDepartment = async (patientId) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/departments/current/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id:patientId }), 
    });
    if (!response.ok) {
      console.log("!response.ok");
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data.error) {
      console.log("data.error");
      setError(data.error);
    } else {
      console.log("got the current department Id");
      console.log(data.currentid);
      setCurrentDepartmentName(data.currentid); 
      setCurrentDepartmentId(data.currentid);
    }
  } catch (error) {
    setError(error.message);
  }
};

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

<Form.Group controlId="meals">
  <Form.Label style={{ fontWeight: 'bold', fontFamily: 'Roboto' }}>Meals</Form.Label>
  <Form.Control
    as="select"
    value={selectedMeals}
    onChange={(e) => setselectedMeals(e.target.value)}
  >
    <option value="">Select a Meals</option>
    {Meals.map((pack) => (
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
                <Button variant="danger" onClick={stopTimer} className="mb-2">Completed</Button>
              </div>
            </div>
          )}
        </div>
        <div className="bottom-div-three">
          <div className="secondrightfirstbox">
            <button className='secondrightfirstboxbutton'>GENERATE REPORT</button>
            <h3>STEPS</h3>
          
{departments.map((section) => (
 
        <div
          key={section.id}
          className={`secondrightfirstboxitem ${currentDepartmentId === section.name ? 'active' : ''}`}
          onClick={() => handleDepartmentClick(section.id)}
        >
          {section.name}
          {console.log("The currentDepartmentId",currentDepartmentId)}
          {console.log("The section.name",section.name)}
        </div>
      ))}
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondMain;

