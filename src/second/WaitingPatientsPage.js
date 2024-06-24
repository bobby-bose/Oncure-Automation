import React, { Component } from 'react';
import axios from 'axios';

class WaitingPatientsPage extends Component {
  state = {
    patients: []
  };

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/waiting-patients')
      .then(response => {
        this.setState({ patients: response.data.patients });
      })
      .catch(error => {
        console.error('There was an error fetching the patients!', error);
      });
  }

  render() {
    const { patients } = this.state;

    return (
        <div className="container my-5">
        <h1 className="text-center mb-4" style={{ fontSize: '5rem', fontFamily: 'Roboto, sans-serif' }}>Waiting Patients</h1>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col"  style={{ fontSize: '2rem', fontFamily: 'Roboto, sans-serif' }}>Patient Name</th>
                <th scope="col"  style={{ fontSize: '2rem', fontFamily: 'Roboto, sans-serif' }}>Status</th>
                <th scope="col"  style={{ fontSize: '2rem', fontFamily: 'Roboto, sans-serif' }}>Assigned Department</th>
              </tr>
            </thead>
            <tbody  style={{ fontSize: '2rem', fontFamily: 'Roboto, sans-serif' }}>
              {patients.map(patient => (
                <tr key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{patient.status}</td>
                  <td>{patient.w_assigned_department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default WaitingPatientsPage;
