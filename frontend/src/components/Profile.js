import React from "react";
import { useParams } from "react-router-dom";

function Profile(props) {
  let { id } = useParams();
  return (
    <div className="contact">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">Prfoile</h1>
            <p>
              HERE IS A PROFILE!!!! {id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;