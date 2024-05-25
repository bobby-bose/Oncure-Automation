import MainDashboardcard from './dashboardcard';
import DashboardDetailCard from './dashboarddetailcard';
import React, { useEffect, useState,useRef } from "react";
const patientDetails = [
    {"name": "M1B08", "description": "The patient M1B08 is Status"},
    {"name": "M1B09", "description": "The patient M1B09 is Status"},
    {"name": "M1B10", "description": "The patient M1B10 is Status"},
    {"name": "M1B11", "description": "The patient M1B11 is Status"},
    {"name": "M1B12", "description": "The patient M1B12 is Status"},
    {"name": "M1B13", "description": "The patient M1B13 is Status"},
    {"name": "M1B14", "description": "The patient M1B14 is Status"},
    {"name": "M1B15", "description": "The patient M1B15 is Status"},
    {"name": "M1B16", "description": "The patient M1B16 is Status"},
    {"name": "M1B17", "description": "The patient M1B17 is Status"},
    {"name": "M1B18", "description": "The patient M1B18 is Status"},
    {"name": "M1B19", "description": "The patient M1B19 is Status"},
    {"name": "M1B20", "description": "The patient M1B20 is Status"},
    {"name": "M1B21", "description": "The patient M1B21 is Status"},
    {"name": "M1B22", "description": "The patient M1B22 is Status"},
    {"name": "M1B23", "description": "The patient M1B23 is Status"},
    {"name": "M1B24", "description": "The patient M1B24 is Status"},
    {"name": "M1B25", "description": "The patient M1B25 is Status"},
    {"name": "M1B26", "description": "The patient M1B26 is Status"},
    {"name": "M1B27", "description": "The patient M1B27 is Status"}
  ];

  const getColorForNumber = (num) => {
    if (num === "0") {
        return "pink"; // or any other default color
    }
    const colors = ["teal", "lightblue", "lightgreen", "yellow", "purple", "pink", "cyan", "magenta", "teal", "orange"];
    const index = parseInt(num) - 1; // Adjust for 0-based index
    return colors[index % colors.length];
};


export default function MainDashboard() {
    const containerRef = useRef(null);
    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (containerRef.current) {
                setStartIndex((prevIndex) => {
                    if (prevIndex + 4 >= patientDetails.length) {
                        return 0;
                    } else {
                        return prevIndex + 1;
                    }
                });
            }
        }, 1000); // Change the interval time here

        return () => clearInterval(intervalId);
    }, []); // Run effect only once on component mount

    return (
        <div style={{ overflowX: 'hidden', whiteSpace: 'nowrap' }}>
            <DashboardDetailCard />
            <div ref={containerRef} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                {patientDetails.slice(startIndex, startIndex + 4).map((patient, index) => {
                    const lastChar = patient.name.charAt(patient.name.length - 1);
                    const color = getColorForNumber(lastChar);
                    return (
                        <MainDashboardcard key={index} name={patient.name} description={patient.description} backgroundColor={color} />
                    );
                })}
            </div>
        </div>
    );
}