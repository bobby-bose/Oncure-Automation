import React from 'react';
import MainDashboard from './screen/main/dashboard';
import SecondMain from './second/secondmain';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import SecondTopMain from './second/top/main';
// import SecondLeftMain from './second/left/secondleftmain';
// import SecondRightMain from './second/right/main/secondrightmain';
// import SecondMiddleMain from './second/middle/secondmiddlemain/secondmiddlemain';


const App = () => {
  return (
    <div className="App">
      
      <Router>
      <Routes>
      <Route path="/" element={<MainDashboard />} />
          <Route path="/second" element={<SecondMain />} />
      </Routes>
    </Router>
  
    </div>
  );
};

export default App;
