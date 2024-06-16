import React from 'react';
import SecondMain from './second/secondmain';
import DashboardDetailCard from './screen/main/dashboarddetailcard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



const App = () => {
  return (
    <div className="App">
      
      <Router>
      <Routes>
      <Route path="/" element={<DashboardDetailCard />} />
          <Route path="/second" element={<SecondMain />} />
      </Routes>
    </Router>
  
    </div>
  );
};

export default App;
