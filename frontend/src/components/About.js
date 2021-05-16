import React from "react";

function About() {
  return (
    <div className="about">
      <div class="container">
        <center>
          <h1 class="font-weight-light">About</h1>
        </center>
        <div class="row align-items-center my-5">
          <div class="col-lg-5">
            <img
              class="img-fluid rounded mb-6 mb-lg-0"
              src="images/about.jpg"
              alt=""
            />
          </div>
          <div class="col-lg-5">
            
            <p>
            Platform is dedicated to solve a series of physics/mathematics problems and share them with other members.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;