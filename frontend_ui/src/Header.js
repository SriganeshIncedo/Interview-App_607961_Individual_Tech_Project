import React, { Component } from "react";
import "./App.css";
import { NavLink } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <nav
        class="navbar navbar-expand-lg navbar-light"
        style={{ "background-color": "#e3f2fd" }}
      >
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <a
            class="navbar-brand"
            href="/"
            style={{ "font-weight": "bold", color: "orangered" }}
          >
            incedo
          </a>
          <div
            class="offcanvas offcanvas-start text-bg-light"
            tabindex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">
                <span style={{ "font-weight": "bold", color: "orangered" }}>
                  incedo
                </span>
              </h5>
              <button
                type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <NavLink
                    exact
                    to="/"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Home
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink
                    exact
                    to="/interview"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Interview
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
export default Header;
