import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <NavLink exact activeClassName="Navbar-active" to="/">
          Home
        </NavLink>
        <NavLink exact activeClassName="Navbar-active" to="/History">
          History
        </NavLink>
        <NavLink exact activeClassName="Navbar-active" to="/Authors">
          Authors
        </NavLink>
        <NavLink exact activeClassName="Navbar-active" to="/About">
          About
        </NavLink>
      </div>
    );
  }
}
export default Navbar;
