import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import './dashboarddetailcard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Card.css'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const RowAndColumnSpacing = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };
  
  const [cardDetails, setCardDetails] = useState([]);
  
  const fetchCardDetails = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/patient-card-details/');
        console.log("THEEEEEEEEEEEEEEEEE",response)
        const data = response.data;
        console.log("First full Data", data.cardDetails);
        setCardDetails(data.cardDetails);
        console.log("EACH SECOND", data.cardDetails);
    } catch (error) {
      console.log("ERRRRRRRRRRRRORRRR",error);
        console.error('Error fetching card details:', error);
    }
};

  useEffect(() => {
    fetchCardDetails();
    const intervalId = setInterval(fetchCardDetails, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="main-body">
      <div className="button-align">
      <button className='top-button' onClick={handleLogout}>Logout</button>
      </div>
      <div className="content">
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {cardDetails.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Item>
                <div className={`card ${index % 2 === 0 ? 'left-card' : 'right-card'}`}>
             <div class="row-one">
   
   <button className="outlined-button">
  <span className="button-content">{card.patient_name}</span>
  <span className="button-content">{card.total_time}</span>
</button>
</div>
<div class="row-two">
   <button className="outlined-button-row-two">{card.buttonText1}</button>
</div>
<div class="row-two">
   <button className="outlined-button-row-three">{card.buttonText2}</button>
</div>
<div class="row-two">
   <button className="outlined-button-row-two">{card.buttonText3}</button>
</div>
                </div>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
    </div>
  );
};

export default RowAndColumnSpacing;
