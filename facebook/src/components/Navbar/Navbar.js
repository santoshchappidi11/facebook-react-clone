import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import logo from "./../../images/logo.JPG";
import { useNavigate } from "react-router-dom";
import { AuthContexts } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import api from "../../ApiConfig";

const Navbar = () => {
  const { state, Logout } = useContext(AuthContexts);
  const navigateTo = useNavigate();
  const [isShowSidePopup, setIsShowSidePopup] = useState(false);
  const [profileImg, setProfileImg] = useState("");

  const userLogout = () => {
    Logout();
    navigateTo("/login");
    toast.success("Logout Successfull!");
  };

  useEffect(() => {
    const getProfileDetails = async () => {
      const token = JSON.parse(localStorage.getItem("Token"));

      if (token) {
        const response = await api.post("/get-profile-details", { token });

        try {
          if (response.data.success) {
            setProfileImg(response.data.profileImg);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    };
    getProfileDetails();
  }, []);

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
            <img src={logo} alt="logo" onClick={() => navigateTo("/")} />
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
          {/* <i
            class="fa-solid fa-circle-user fa-2x"
            onMouseOver={openShowSidePopup}
            onMouseLeave={closeShowSidePopup}
          ></i> */}
          <div
            id="navbar-profile-img"
            onMouseOver={openShowSidePopup}
            onMouseLeave={closeShowSidePopup}
          >
            <img src={profileImg} alt="profile" />
          </div>
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
              <div id="popup-profile-img">
                <img src={profileImg} alt="profile" />
              </div>
              <h4>
                {state?.currentUser?.firstName} {state?.currentUser?.lastName}
              </h4>
            </div>
            <div id="logout">
              <i class="fa-solid fa-right-from-bracket fa-xl"></i>
              <h4 onClick={() => userLogout()}>Logout</h4>
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
