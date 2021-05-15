import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import SignUpForm from './SignUpForm';

const ModalDialog = ({ open, handleClose }) => {
  return (
    // props received from App.js
    <Dialog open={open} onClose={handleClose}>
      <SignUpForm handleClose={handleClose} />
    </Dialog>
  );
};

export default ModalDialog;