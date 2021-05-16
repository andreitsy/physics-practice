import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './GetProblems.css'
// get problems from online api
class GetProblems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            problems: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:8000/problems", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(
                // handle the result
                (result) => {
                    this.setState({
                        isLoaded: true,
                        problems: result
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

    render() {
        const { error, isLoaded, problems } = this.state;

        if (error) {
            return <div>Error in loading</div>
        } else if (!isLoaded) {
            return <div>Loading ...</div>
        } else {
            return (
            <div>
                <section class="ftco-section">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-6 text-center mt-5">
                                <h3 class="heading-section">Recent Problems List</h3>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="table-wrap">
                                    <table class="table">
                                    <thead class="thead-dark">
                                        <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Rating</th>
                                        <th>Time created</th>
                                        <th>&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { problems.map(problem => (
                                            <tr class="alert" role="alert">
                                            <td><Link to={`/problem/${problem.id}`} 
                                                 activeClassName="current">{problem.id}</Link> </td>
                                            <td>{problem.title}</td>
                                            <td>{problem.rating}</td>
                                            <td>{problem.time}</td>
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

export default GetProblems;