import React, { useContext, useEffect, useState } from "react";
import "./ViewStory.css";
import { useNavigate, useParams } from "react-router-dom";
import logo from "./../../images/logo.JPG";
import { AuthContexts } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import api from "../../ApiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faEllipsis } from "@fortawesome/free-solid-svg-icons";

const ViewStory = () => {
  const { storyUserId } = useParams();
  const navigateTo = useNavigate();
  const { state } = useContext(AuthContexts);
  const [searchUser, setSearchUser] = useState();
  const [userStory, setUserStory] = useState([]);
  //   console.log(userStory.yourStories[0].storyImg, "user story here");

  const navigateToProfile = (Id) => {
    if (state?.currentUser?.userId == Id) {
      navigateTo("/profile");
    } else {
      navigateTo(`/friend-profile/${Id}`);
    }
  };

  useEffect(() => {
    const getProfileResults = async () => {
      const token = JSON.parse(localStorage.getItem("Token"));

      if (token) {
        try {
          const response = await api.post("/get-profile-result", {
            token,
          });

          if (response.data.success) {
            setSearchUser(response.data.user);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
    };

    getProfileResults();
  }, []);

  useEffect(() => {
    const getSingleUserStory = async () => {
      const token = JSON.parse(localStorage.getItem("Token"));

      if (token && storyUserId) {
        try {
          const response = await api.post("/get-single-story", {
            token,
            storyUserId,
          });

          if (response.data.success) {
            setUserStory(response.data.userStory);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    };

    getSingleUserStory();
  }, [storyUserId]);

  return (
    <>
      <div id="view-story">
        <div id="left">
          <div id="left-main">
            <div id="left-header">
              <i
                class="fa-solid fa-xmark fa-xl"
                onClick={() => navigateTo("/")}
              ></i>
              <img src={logo} alt="logo" onClick={() => navigateTo("/")} />
            </div>
            <div id="left-body">
              <div id="body-header">
                <h2>Your story</h2>
                <i class="fa-solid fa-gear fa-lg"></i>
              </div>
              <div id="body-main"></div>
            </div>
          </div>
        </div>
        <div id="right">
          <div id="right-header">
            <div>
              <i class="fa-solid fa-bars fa-lg"></i>
            </div>
            <div>
              <i class="fa-solid fa-bell fa-lg"></i>
            </div>
            <div id="story-right-img">
              <img
                src={searchUser?.profileImg}
                alt="user"
                onClick={() => navigateToProfile(searchUser?._id)}
              />
            </div>
          </div>
          <div id="right-body">
            <div id="story-img">
              <div id="story-up">
                <div id="story-profile">
                  <div id="story-profile-img">
                    <img src="" alt="profile" />
                  </div>
                  <p>Santosh Chappidi</p>
                </div>
                <FontAwesomeIcon icon={faEllipsis} />
              </div>
              <div id="main-img">
                <img src="" alt="story" />
              </div>
              <div id="story-down">
                <p>No Views Yet</p>
                <FontAwesomeIcon icon={faChevronUp} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewStory;
