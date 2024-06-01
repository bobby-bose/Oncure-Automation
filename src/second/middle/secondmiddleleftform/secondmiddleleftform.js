import React from "react";
import {  Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import './secondmiddleleftform.css';

const SecondMiddleleftForm = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="form" style={{ display: "flex", flexDirection: "column", width:"100%" }}>
      <div className="ConsultationFacilitator">
   <p style={{ width: "100%", marginTop: "15px" }}>Consultation Facilitator</p>

    <Box sx={{ minWidth: 120 }} style={{width:"100%"}}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
    </Box>
    </div>
    <div className="ConsultationFacilitator">
   <p style={{ width: "100%", marginTop: "15px" }}>Combinations Suggested</p>

    <Box sx={{ minWidth: 120 }} style={{width:"100%"}}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
    </Box>
    </div>
</div>

  );
};

export default SecondMiddleleftForm;
