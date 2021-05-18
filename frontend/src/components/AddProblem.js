import React from "react";
import Editor from "./editor/Editor";
import VerifyUserJSON from './auth/VerifyToken';
import Button from '@material-ui/core/Button';


const initalVal = `[comment]: <> (Введите условие задачи в это поле) 
Пример:
## Вычислить интеграл
\`\`\`KaTeX
\\int_{-\\infty}^\\infty e^{-x^2} dx ?
\`\`\`

[comment]: <> В следующее поле введите ответ, при этом поддерживается LaTeX синтаксис,
[comment]: <> Например ответ на задачу из примера выше \sqrt{pi}
`;

async function SendProblem(problem) {
  const tokenString = sessionStorage.getItem('token');
  return fetch('http://localhost:8000/problems/add', {
    headers: new Headers({
      'Authorization': 'Bearer ' + tokenString,
      'Content-type': 'application/json; charset=UTF-8'
    }),
    method: 'POST',
    body: JSON.stringify(problem)
  }).then(function (response) {
    if (!response.ok) {
      alert(response.statusText);
      return null;
      // throw new Error("HTTP status " + response.status);
    }
    return response.json();
  })
}

class AddProblem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_info: false,
      problem_title: "",
      problem_description: initalVal,
      problem_solution: ""
    };

    this.handleChangeAnswer = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });
      this.state.problem_solution = e.target.value
    };

    this.handleChangeTitle = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });
      this.state.problem_title = e.target.value
    };

    this.handleChangeMD = (value) => {
      this.state.problem_description = value
    };

    this.handleSend = (e) => {
      if (this.state.problem_title === "") {
        alert("Empty title! Please put something in 'Problem Title'");
        return null;
      }
      if (this.state.problem_solution === "") {
        alert("Empty solution! Please put something in 'Solution'");
        return null;
      }
      if (this.state.problem_description === "") {
        alert("Empty description! Please put something in 'Description'");
        return null;
      }
      var response = SendProblem({
        title: this.state.problem_title,
        description_md: this.state.problem_description,
        solution: this.state.problem_solution
      });
      response.then(json => {
        if (json != null) {
          if (json["problem_id"] != undefined) {
            alert('New task with id' + json["problem_id"] + ' is created');
          } else {
            alert(json["details"]);
          }
        }
      })

    };
  }

  componentDidMount = () => {
    var user_resp = VerifyUserJSON()
    user_resp.then(json => this.setState({ user_info: json }))
  };

  render() {
    if (this.state.user_info === null ||
      this.state.user_info === "" ||
      this.state.user_info === undefined) {
      return (
        <div class="container">
          <center>
            ACCESS IS DENIED
          </center>
        </div>
      )
    } else {
      return (
        <div class="container">
          <center>
            <h5 class="font-weight-light">Problem Title</h5>
            <br />
            <input onChange={this.handleChangeTitle} />
          </center>
          <center>
            <Editor onChange={this.handleChangeMD} initVal={initalVal} />
            <br />
            <center>
              <h5 class="font-weight-light">Solution</h5>
              <br />
              <input onChange={this.handleChangeAnswer} />
              <br />
              <Button variant="contained" size="medium" color="#ff5c5c" onClick={this.handleSend}>Send</Button>
            </center>
          </center>
        </div>
      )
    }
  };
}

export default AddProblem;