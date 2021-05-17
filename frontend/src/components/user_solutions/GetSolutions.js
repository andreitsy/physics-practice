import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import VerifyUserJSON from '../auth/VerifyToken';

import './GetSolutions.css'
// get problems from online api
class GetSolutions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            isVerifiedUser: false,
            user_info: false,
            solutions: []
        };
    }

    componentDidMount() {
        const tokenString = sessionStorage.getItem('token');
        var res = VerifyUserJSON();
        res.then(json => {
            if (json !== null && json !== '' && json !== undefined) {
                this.setState({ isVerifiedUser: true, user_info: json });
                fetch("http://localhost:8000/user_solutions", {
                    headers: new Headers({
                        'Authorization': 'Bearer ' + tokenString,
                        "Content-Type": "application/json"
                    }),
                    method: "GET"
                }).then(response => response.json()).then(
                    // handle the result
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            solutions: result
                        });
                    },

                    // Handle error 
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        })
                    },
                )
            }
        })
    }

    render() {
        const { error, solutions } = this.state;

        if (error) {
            return <div>Error in loading</div>
        } else {
            return (
            <div>
                <section class="ftco-section">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-6 text-center mt-5">
                                <h3 class="heading-section">Your solutions list</h3>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="table-wrap">
                                    <table class="table">
                                    <thead class="thead-dark">
                                        <tr>
                                        <th>Problem</th>
                                        <th>Answer</th>
                                        <th>Status</th>
                                        <th>&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { solutions.map(s => (
                                            <tr class="alert" role="alert">
                                            <td><Link to={{pathname:`/problem/${s.problem_id}`,
                                                           solution: s.solution_md,
                                                           answer: s.answer}}
                                                 activeClassName="current">{s.problem_id}</Link> </td>
                                            <td>{s.answer}</td>
                                            <td>{(s.correct) ? <p>&#x2714;</p>: <p>&#x2716;</p>}</td>
                                            
                                            </tr>
                                            ))
                                        }
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            );
        }

    }
}

export default GetSolutions;