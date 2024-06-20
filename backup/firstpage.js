import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import './dashboarddetailcard.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function RowAndColumnSpacing() {
  const [cardDetails, setCardDetails] = useState([]);
  
  
  const fetchCardDetails = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/patient-card-details/');
      const data = await response.json();
      console.log("First full Data", data.cardDetails);
      setCardDetails(data.cardDetails);
      
      console.log("EACH SECOND",cardDetails);
    } catch (error) {
      console.error('Error fetching card details:', error);
    }
  };
  useEffect(() => {
    fetchCardDetails();
    const intervalId = setInterval(fetchCardDetails, 1000); 
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {cardDetails.map((card, index) => (
          <Grid item xs={6} key={index}>
            <Item>
              <div className={`card ${index % 2 === 0 ? 'left-card' : 'right-card'}`}>
                <h2>{card.id}</h2>
                <h2>{card.patient_name}</h2>
                <div className="button-container">
                  <button>{card.buttonText}</button>
                  <span className="time">
                   {/* {card.timer} */}
                   13:00
                  </span>
                </div>
                <h3>Upcoming</h3>
                <button>{card.upcoming}</button>
                <ul>
                  {card.remaining_departments.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
