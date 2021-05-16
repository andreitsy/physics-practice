import React from 'react';
import GetProblems from './problems/GetProblems'

function Problems() {

  return (
    <div className="home">
      <div className="container">
        <div className="row justify-content-center align-self-center">
          <div className="mx-5 my-5 ml-lg-0">
            <GetProblems />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Problems;