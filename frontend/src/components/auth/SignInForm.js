import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


async function loginUser(username, password) {
  return fetch('http://localhost:8000/auth/jwt/login', {
    method: 'POST',
    body: new URLSearchParams({
        'username': username,
        'password': password,
    })
}).then(function(response) {
  console.log(response.status);
  if (!response.ok) {
    alert("Incorrect login!");
    return false;
    // throw new Error("HTTP status " + response.status);
  }
  return response.json();
})
 }

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const SignInForm = ({ handleClose }) => {
  const classes = useStyles();
  var response = "";
  // create state variables for each input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    response = loginUser(email, password);
    response.then(function(result) {
      if (result && result !== null) {
        sessionStorage.setItem('token', result["access_token"]);
        window.location.reload();
      }
    });    
    handleClose();
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Sign In
        </Button>
      </div>
      
    </form>
  );
};

export default SignInForm;