import React from "react";
import { withRouter } from "react-router";
import Editor from "./editor/Editor";
import Viewer from "./editor/Viewer";
import Button from '@material-ui/core/Button';


class Problem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      answer: "",
      solution: ""
    };

    this.handleChange = (e) => {
      this.state.answer = e.target.value
      // console.log("this.state.answer\n", this.state.answer)
    };

    this.handleChangeMD = (value) => {
      this.state.solution = value
      // console.log("this.state.solution\n", this.state.solution)
    };
  }

  render() {
    return (
      <div class="container">
        <br />
        <center>
          <h5 class="font-weight-light">Solution {this.state.id} </h5>

          <br />
          <Editor onChange={this.handleChangeMD} />

        </center>
        <br />
        <center>
          <h5 class="font-weight-light">Answer</h5>
          <br />

          <input
            onChange={this.handleChange}
          />
        </center>
        <br />
        <center>
          <Button variant="contained" size="small" color="#ff5c5c" onClick={this.handleChange}>
            Send
            </Button>
        </center>

      </div>
    );
  }
}

export default withRouter(Problem);