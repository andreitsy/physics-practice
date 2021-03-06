import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import SignUpForm from './SignUpForm';

const ModalDialogUp = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <SignUpForm handleClose={handleClose} />
    </Dialog>
  );
};


export default ModalDialogUp;
