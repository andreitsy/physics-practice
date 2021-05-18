import React from "react";
import { withRouter } from "react-router";
import Editor from "./editor/Editor";
import Viewer from "./editor/Viewer";
import Button from '@material-ui/core/Button';
import VerifyUserJSON from './auth/VerifyToken';
import getConditionJSON from './problems/GetCondition';
import SendSolution from './problems/SendSolution';


const initialSolutione = `#### Решение
[comment]: <> (введите решение в это поле)
Пример latex формулы:
\`\`\`KaTeX
\\int_{-\\infty}^\\infty e^{-x^2} dx = \\sqrt{\\pi}
\`\`\`
`;

class Problem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      answer: this.props.location.answer,
      solution: this.props.location.solution === undefined ? initialSolutione: this.props.location.solution,
      user_info: false,
      problem_title: "",
      condition: ""
    };

    this.handleChangeAnswer = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });
      this.state.answer = e.target.value
      // console.log("this.state.answer\n", this.state.answer)
    };

    this.handleChangeMD = (value) => {
      this.state.solution = value
      // console.log("this.state.solution\n", this.state.solution)
    };

    this.handleSend = (e) => {
      if (this.state.answer == "")
      {
        alert("Empty answer! Please put something in 'Answer'");
        return null;
      }
      var response = SendSolution({
        problem_id: this.state.id,
        solution_md: this.state.solution,
        answer: this.state.answer
      });
      response.then(json => {
        if (json != null) { 
          if (json["result"]) {
            alert('Correct!');
          }
          else {
            alert('Icorrect!');
          }
        }
      })

    };

  }

  componentDidMount = () => {
    var user_resp = VerifyUserJSON()
    user_resp.then(json => this.setState({ user_info: json }))

    var problem_condition = getConditionJSON(this.state.id)
    problem_condition.then(json => this.setState({
      condition: json["description_md"],
      problem_title: json["title"]
    }))

  }

  render() {
    return (
      <div class="container">
        <br />
        <center>
          <br />
          <h3 class="font-weight-light">{this.state.problem_title} </h3>
          <Viewer value={this.state.condition} />
          <br />
        </center>
        { (this.state.user_info === null ||
          this.state.user_info === false ||
          this.state.user_info === undefined) ?
          [<center> <p> Please login to be able sending problem solutions </p> </center>] :

          [
            <center>
              <h5 class="font-weight-light">Solution </h5>
              <br />
              <Editor onChange={this.handleChangeMD} initVal={this.state.solution}/>
            </center>,
            <br />,
            <center>
              <h5 class="font-weight-light">Answer</h5>
              <br />
              <input onChange={this.handleChangeAnswer} value={this.state.answer}/>
              <br />
              <Button variant="contained" size="small" color="#ff5c5c" onClick={this.handleSend}>send</Button>
            </center>,
            <br />]

        }
      </div>
    );
  }
}

export default withRouter(Problem);