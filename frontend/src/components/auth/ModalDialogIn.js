import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import SignInForm from './SignInForm';

const ModalDialogIn = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <SignInForm handleClose={handleClose} />
    </Dialog>
  );
};


export default ModalDialogIn;
