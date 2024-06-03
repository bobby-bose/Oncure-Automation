import React from "react";
import './secondmiddleleftform.css';

const SecondMiddleleftForm = ({ pid }) => {

  return (
    <div className="form" style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div className="ConsultationFacilitator">
        <p style={{ width: "100%", marginTop: "15px" }}>
          {`${pid}`}
        </p>
      </div>
    </div>
  );
};

export default SecondMiddleleftForm;
