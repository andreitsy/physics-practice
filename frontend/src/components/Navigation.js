import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark py-1">
        <div class="container">
          <Link class="navbar-brand" to="/">
            Problems Practice
          </Link>
          <div>
            <ul class="navbar-nav ml-auto">
            <li
                class={`nav-item  ${
                  props.location.pathname === "/about" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/">
                  Problems
                  <span class="sr-only">(current)</span>
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/news" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/news">
                  News
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/profile" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);