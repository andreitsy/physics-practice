import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


async function registerUser(nickname, username, password) {
  return fetch('http://localhost:8000/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      nickname: nickname,
      email: username,
      password: password})
  }).then(function (response) {
    return ({json_resp: response.json(), status: response.ok});
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

const SignUpForm = ({ handleClose }) => {
  const classes = useStyles();
  // create state variables for each input
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    var response = registerUser(nickname, email, password);
    response.then(function ({json_resp, status}) {
      if (!status) {
        json_resp.then(function (res) {
          alert(res["detail"]);
        })
        return false;
      } else {
        json_resp.then(function (res) {
          alert("Register new user with email " + res["email"] + " now you can login");
        })
      }
        console.log("registered user", json_resp["nickname"])
      });
    handleClose();
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="Nickname"
        variant="filled"
        required
        value={nickname}
        onChange={e => setNickname(e.target.value)}
      />
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
        <Button type="submit" variant="contained" color="secondary">
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;