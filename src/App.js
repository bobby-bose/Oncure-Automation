import React from 'react';
import Main from './second/main';
import DashboardDetailCard from './screen/main/dashboarddetailcard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



const App = () => {
  return (
    <div className="App">
      
      <Router>
      <Routes>
      <Route path="/" element={<DashboardDetailCard />} />
          <Route path="/second" element={<Main />} />
      </Routes>
    </Router>
  
    </div>
  );
};

export default App;
