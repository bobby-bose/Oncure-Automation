import React, { useEffect, useState } from 'react';
import Main from './second/main';
import DashboardDetailCard from './screen/main/dashboarddetailcard';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WaitingPatientsPage from './second/WaitingPatientsPage';
import LoginPage from './login'; // Import your LoginPage component

const App = () => {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedIn');
    if (loggedUser) {
      setLoggedIn(loggedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setLoggedIn(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={loggedIn ? <Navigate to={`/${loggedIn}`} /> : <LoginPage setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/admin"
          element={loggedIn === 'admin' ? <Main onLogout={handleLogout} /> : <Navigate to="/" />}
        />
        <Route
          path="/user"
          element={loggedIn === 'user' ? <DashboardDetailCard onLogout={handleLogout} /> : <Navigate to="/" />}
        />
        <Route
          path="/waiting"
          element={<WaitingPatientsPage  />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;

