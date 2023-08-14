import React from "react";
import "./Navbar.css";
import logo from "./../../images/logo.JPG";

const Navbar = () => {
  return (
    <div id="navbar">
      <div id="left">
        <div id="logo">
          <img src={logo} alt="logo" />
        </div>
        <div id="search-bar">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search Facebook" />
        </div>
      </div>
      <div id="middle">
        <div>
          <i class="fa-solid fa-house fa-xl"></i>
        </div>
        <div>
          <i class="fa-solid fa-user-group fa-xl"></i>
        </div>
        <div>
          <i class="fa-solid fa-users-rectangle fa-xl"></i>
        </div>
      </div>
      <div id="right">
        <h3>Find Friends</h3>
        <div>
          <i class="fa-solid fa-bars fa-lg"></i>
        </div>
        <div>
          <i class="fa-brands fa-facebook-messenger fa-lg"></i>
        </div>
        <div>
          <i class="fa-solid fa-bell fa-lg"></i>
        </div>
        <i class="fa-solid fa-circle-user fa-2x"></i>
      </div>
    </div>
  );
};

export default Navbar;
