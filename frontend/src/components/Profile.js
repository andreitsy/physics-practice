import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ModalDialogUp from "./auth/ModalDialogUp";
import ModalDialogIn from "./auth/ModalDialogIn";
import VerifyUserJSON from './auth/VerifyToken';
import GetSolutions from './user_solutions/GetSolutions'
import { Link } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openUp: false,
      openIn: false,
      user_info: false
    }
  }

  handleRefresh = () => {
    this.setState({
      openUp: false,
      openIn: false
    });
  };

  componentDidMount = () => {
    var res = VerifyUserJSON()
    res.then(json => this.setState({ user_info: json }))
  }

  // function to handle unlogging
  handleUnlogging = () => {
    sessionStorage.setItem('token', "");
    window.location.reload();
  };

  render() {

    // function to handle modal open register
    const handleOpenRegisterUp = () => {
      this.setState({ openUp: true });
    };

    // function to handle modal open sign in
    const handleOpenRegisterIn = () => {
      this.setState({ openIn: true });
    };

    // function to handle modal close register
    const handleCloseRegisterUp = () => {
      this.setState({ openUp: false });
    };

    // function to handle modal close sign in
    const handleCloseRegisterIn = () => {
      this.setState({ openIn: false });
    };
    if (this.state.user_info === null ||
      this.state.user_info === '' ||
      this.state.user_info === undefined) {
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

                <ModalDialogUp open={this.state.openUp} handleClose={handleCloseRegisterUp} />
                <ModalDialogIn open={this.state.openIn} handleClose={handleCloseRegisterIn} />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (<div className="contact">
        <div class="container h-100">
          <br />
          <center>
            Hello <b>{this.state.user_info["nickname"]}</b>!
            <br />
              <nav class="navbar navbar-expand navbar-dark bg-dark py-1">
              <ul class="navbar-nav ml-auto">
                <li class={`nav-item /add_problem`}>
                  <Link class="nav-link" to="/add_problem">
                    Add new problem
                  </Link>
                </li>
                <li class="navbar-nav ml-auto">
                  <Button variant="contained" size="small" color="#ff5c5c" onClick={this.handleUnlogging}>
                    Log out
                  </Button>
                </li>
              </ul>
            </nav>
            <GetSolutions />
          </center>

        </div>
      </div>
      )
    }
  }
}



export default Profile;