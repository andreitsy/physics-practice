import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ModalDialogUp from "./auth/ModalDialogUp";
import ModalDialogIn from "./auth/ModalDialogIn";


function Profile() {
  // declare a new state variable for modal open
  const [openUp, setOpenUp] = useState(false);
  const [openIn, setOpenIn] = useState(false);

  // function to handle modal open register
  const handleOpenRegisterUp = () => {
    setOpenUp(true);
  };

  // function to handle modal open sign in
  const handleOpenRegisterIn = () => {
    setOpenIn(true);
  };

  // function to handle modal close register
  const handleCloseRegisterUp = () => {
    setOpenUp(false);
  };

  // function to handle modal close sign in
  const handleCloseRegisterIn = () => {
    setOpenIn(false);
  };
  return (
    <div className="contact">
      <div class="container h-100">
        <br />
        <center>
          <h4 class="font-weight-light">Join the Physics Practice community </h4>
        </center>
        <div class="row justify-content-center align-self-center">

          <div class="mx-5 my-5 ml-lg-0">
          
           
          </div>
          <div class="mx-5 my-5 ml-lg-0">
            <br />
            <br />
            <Button variant="contained" size="large" color="#ff5c5c" onClick={handleOpenRegisterUp}>
              Register
              </Button>

            <Button variant="contained" size="large" color="#ff5c5c" onClick={handleOpenRegisterIn}>
              Sign In
              </Button>
            <ModalDialogUp open={openUp} handleClose={handleCloseRegisterUp} />
            <ModalDialogIn open={openIn} handleClose={handleCloseRegisterIn} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;