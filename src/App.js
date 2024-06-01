import React from 'react';
import SecondMain from './second/secondmain';
import SecondMiddleRightForm from './second/middle/secondmiddlerightform/secondmiddlerightform';
import ThankYouScreen from './second/middle/secondmiddlerightform/secondmiddlerightform';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import SecondTopMain from './second/top/main';
// import SecondLeftMain from './second/left/secondleftmain';
// import SecondRightMain from './second/right/main/secondrightmain';
// import SecondMiddleMain from './second/middle/secondmiddlemain/secondmiddlemain';


const App = () => {
  return (
    <div className="App">
      <SecondMain/>
      <Router>
      <Routes>
        <Route path="/" exact component={SecondMiddleRightForm} />
        <Route path="/thank-you" component={ThankYouScreen} />
      </Routes>
    </Router>
     {/* < SecondLeftMain /> */}
     {/* < SecondRightMain /> */}
      {/* <SecondTopMain /> */}
      {/* <MainDashboard/> */}
      {/* <SecondMiddleMain/> */}
    </div>
  );
};

export default App;
