import React, { useState, useEffect, useRef } from 'react';
import { ProgressBar, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SecondMiddleRightForm = ({ currentDepartment }) => {
  const [time, setTime] = useState(10); // Starting from 00:10
  const [progress, setProgress] = useState(100);
  const [isAnimating, setIsAnimating] = useState(false); // Animation starts stopped
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalRef.current); // Clean up interval on component unmount
  }, []);

  const startTimer = () => {
    setTime(10);
    setProgress(100);
    setIsAnimating(true);

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          setProgress((prevTime - 1) * 10); // Update progress based on 10 seconds
          return prevTime - 1;
        } else {
          clearInterval(intervalRef.current);
          setIsAnimating(false); // Stop animation
          return 0;
        }
      });
    }, 1000);
  };

  const addTime = (seconds) => {
    setTime((prevTime) => prevTime + seconds);
    setProgress((prevTime) => (prevTime + seconds) * 10); // Update progress
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsAnimating(false); // Stop animation
  };

  return (
    <div className="container text-center mt-5">
      <ProgressBar now={progress} animated={isAnimating} />
      <h2 className="mt-3">{currentDepartment}</h2>
      <h3>{`${String(Math.floor(time / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`}</h3>
      <div className="mt-3 d-flex flex-column">
        {!isAnimating && (
          <Button variant="success" onClick={startTimer} className="mb-2">
            Start
          </Button>
        )}
        <Button variant="primary" onClick={() => addTime(5)} className="mb-2">
          Add 5 seconds
        </Button>
        <Button variant="primary" onClick={() => addTime(10)} className="mb-2">
          Add 10 seconds
        </Button>
        <Button variant="danger" onClick={stopTimer} className="mb-2">
          Stop
        </Button>
      </div>
    </div>
  );
};

export default SecondMiddleRightForm;
