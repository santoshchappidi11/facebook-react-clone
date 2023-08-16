import React, { useState } from "react";
import "./Navbar.css";
import logo from "./../../images/logo.JPG";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigateTo = useNavigate();
  const [isShowSidePopup, setIsShowSidePopup] = useState(false);

  const openShowSidePopup = () => {
    setIsShowSidePopup(true);
  };

  const closeShowSidePopup = () => {
    setIsShowSidePopup(false);
  };

  return (
    <>
      <div id="navbar">
        <div id="left">
          <div id="logo">
            <img src={logo} alt="logo" onClick={() => navigateTo("/home")} />
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
          <i
            class="fa-solid fa-circle-user fa-2x"
            onMouseOver={openShowSidePopup}
            onMouseLeave={closeShowSidePopup}
          ></i>
        </div>
      </div>

      {/* -------------------------------side-popup------------------------------------- */}

      {isShowSidePopup && (
        <div
          id="sidepopup"
          onMouseOver={openShowSidePopup}
          onMouseLeave={closeShowSidePopup}
        >
          <div id="sidepopup-header">
            <div id="popup-header" onClick={() => navigateTo("/profile")}>
              <i class="fa-solid fa-circle-user fa-2x"></i>
              <h4>Santosh Chappidi</h4>
            </div>
            <div className="profiles">
              <p>See all Profiles</p>
            </div>
          </div>
          <div id="sidepopup-body"></div>
        </div>
      )}
    </>
  );
};

export default Navbar;
