import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import logo from "./../../images/logo.JPG";
import { useNavigate } from "react-router-dom";
import { AuthContexts } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import api from "../../ApiConfig";
import emptyUser from "./../../images/empty-user.jpg";
import connectLogo from "../../images/connect_transparent.png";

const Navbar = () => {
  const { state, Logout } = useContext(AuthContexts);
  const navigateTo = useNavigate();
  const [isShowSidePopup, setIsShowSidePopup] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [isShowNavbarSearchBox, setIsShowNavbarSearchBox] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (state?.profileImgUpdated || state?.profileImgUpdated == "") {
      setProfileImg(state?.profileImgUpdated);
    }
  }, [state]);

  const userLogout = () => {
    Logout();
    navigateTo("/");
    toast.success("Logout Successfull!");
  };

  const handleSearchInputValue = (e) => {
    if (e.target.value == "") {
      setIsShowNavbarSearchBox(false);
    } else {
      setIsShowNavbarSearchBox(true);
    }

    setSearchInputValue(e.target.value);
  };

  const navigateToSearchPage = (userId) => {
    navigateTo(`/search/${userId}`);
    setIsShowNavbarSearchBox(false);
  };

  useEffect(() => {
    const getSearchQuery = async () => {
      try {
        const response = await api.post("/get-search-query", {
          firstName: searchInputValue,
        });

        if (response.data.success) {
          setAllUsers(response.data.users);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    getSearchQuery();
  }, [searchInputValue]);

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
            {/* <h2 onClick={() => navigateTo("/home")}>connect</h2> */}
            <img
              src={connectLogo}
              alt="logo"
              onClick={() => navigateTo("/home")}
            />
          </div>
          <div id="search-bar">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Search Connect"
              onChange={handleSearchInputValue}
            />
          </div>
        </div>
        <div id="middle">
          <div className="house-icon isNavItemActive">
            <i class="fa-solid fa-house fa-xl"></i>
          </div>
          <div className="group-icon">
            <i class="fa-solid fa-user-group fa-xl"></i>
          </div>
          <div className="groups-icon">
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
          <div
            id="navbar-profile-img"
            onMouseOver={openShowSidePopup}
            onMouseLeave={closeShowSidePopup}
          >
            <img src={profileImg ? profileImg : emptyUser} alt="profile" />
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
                <img src={profileImg ? profileImg : emptyUser} alt="profile" />
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

      {/* -----------------------------search-results------------------------------------ */}

      {isShowNavbarSearchBox && (
        <div id="navbar-search-results">
          {allUsers?.length > 0 ? (
            allUsers?.map((item) => (
              <div
                className="navbar-search-result"
                key={item._id}
                onClick={() => navigateToSearchPage(item._id)}
              >
                <div className="navbar-search-img">
                  <img
                    src={item?.profileImg ? item?.profileImg : emptyUser}
                    alt="search"
                  />
                </div>
                <h4>
                  {item.firstName} {item.lastName}
                </h4>
              </div>
            ))
          ) : (
            <p>No results!</p>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
