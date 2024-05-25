import React from 'react';

const SecondMiddleForm = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-3 col-form-label">UPCOMING : </label>
            <div className="col-sm-9">
            <div className="text-center">
  <input type="text" className="form-control text-center" id="name" value="Psychology : 30mins" />
</div>

            </div>
          </div>
          <div className="form-group row mt-3">
            <label htmlFor="email" className="col-sm-3 col-form-label">CURRENTLY : </label>
            <div className="col-sm-9">
            <div className="text-center">
  <input type="text" className="form-control text-center" id="name" value="0:39 sec" />
</div>
            </div>
            
          </div>
         
        


        </div>
       

        
        <button className="btn btn-primary btn-block mt-3">Finished</button>
        <button className="btn btn-primary btn-block mt-3">Secondary</button>
      </div>
    </div>
  );
};

export default SecondMiddleForm;
