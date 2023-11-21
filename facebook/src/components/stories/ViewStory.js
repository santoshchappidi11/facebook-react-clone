import React, { useContext, useEffect, useState } from "react";
import "./ViewStory.css";
import { useNavigate, useParams } from "react-router-dom";
import logo from "./../../images/logo.JPG";
import { AuthContexts } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import api from "../../ApiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faEllipsis,
  faChevronRight,
  faChevronLeft,
  faTrashCan,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const ViewStory = () => {
  const { storyUserId } = useParams();
  const navigateTo = useNavigate();
  const { state } = useContext(AuthContexts);
  const [searchUser, setSearchUser] = useState();
  const [userStory, setUserStory] = useState([]);
  const [storyUser, setStoryUser] = useState();
  const [storyNumber, setStoryNumber] = useState(0);
  const [allStoryUsers, setAllStoryUsers] = useState([]);
  const [myStory, setMyStory] = useState({});

  const incrementPage = () => {
    if (storyNumber == userStory.length - 1) {
      setStoryNumber(0);
    } else {
      setStoryNumber((prev) => prev + 1);
    }
  };

  const decrementPage = () => {
    if (storyNumber == 0) {
      setStoryNumber(userStory.length - 1);
    } else {
      setStoryNumber((prev) => prev - 1);
    }
  };

  const deleteStory = async (userID) => {
    const token = JSON.parse(localStorage.getItem("Token"));

    if (token) {
      try {
        const response = await api.post("/delete-story", { token, userID });

        if (response.data.success) {
          navigateTo("/create-story");
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
  };

  const deleteSingleStory = async (singleStoryId) => {
    const token = JSON.parse(localStorage.getItem("Token"));

    if (token) {
      try {
        const response = await api.post("/delete-single-story", {
          token,
          singleStoryId,
        });

        if (response.data.success) {
          setMyStory(response.data.myStory);
          setUserStory(response.data.userStory);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
  };

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
    const getAllStories = async () => {
      const token = JSON.parse(localStorage.getItem("Token"));

      if (token) {
        try {
          const response = await api.post("/get-all-stories", { token });

          if (response.data.success) {
            setAllStoryUsers(response.data.viewUsers);
            setMyStory(response.data.myStory);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
    };

    getAllStories();
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
            setStoryUser(response.data.storyUser);
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
                <h2>Stories</h2>
                <i class="fa-solid fa-gear fa-lg"></i>
              </div>
              <div id="body-main">
                <div id="your-story">
                  <h4>Your Story</h4>
                  <div id="all-user-stories">
                    <>
                      {myStory?.yourStories?.length ? (
                        <div className="user-story">
                          <div
                            className="story-img"
                            onClick={() =>
                              navigateTo(`/view-story/${myStory._id}`)
                            }
                          >
                            <img src={searchUser?.profileImg} alt="story" />
                          </div>
                          <h4
                            onClick={() =>
                              navigateTo(`/view-story/${myStory._id}`)
                            }
                          >
                            {myStory?.firstName} {myStory?.lastName}(YOU)
                          </h4>
                          <div id="story-actions">
                            <FontAwesomeIcon
                              icon={faPlus}
                              className="add-story"
                              onClick={() => navigateTo("/create-story")}
                            />
                            <FontAwesomeIcon
                              icon={faTrashCan}
                              className="delete-story"
                              onClick={() => deleteStory(searchUser?._id)}
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div id="no-story-msg">
                            <p>No Story Yet!</p>
                            <FontAwesomeIcon
                              icon={faPlus}
                              className="no-story-add"
                              onClick={() => navigateTo("/create-story")}
                            />
                          </div>
                        </>
                      )}
                    </>
                  </div>

                  <div id="your-single-stories">
                    {myStory?.yourStories &&
                      myStory?.yourStories?.map((item) => (
                        <>
                          <div className="single-story" key={item?.storyId}>
                            <div className="single-story-img">
                              <img src={item?.storyImg} alt="story" />
                            </div>
                            <FontAwesomeIcon
                              icon={faTrashCan}
                              className="delete-single-story"
                              onClick={() => deleteSingleStory(item?.storyId)}
                            />
                          </div>
                        </>
                      ))}
                  </div>
                </div>
                <div id="all-stories">
                  <h4>All Stories</h4>
                  <div id="all-user-stories">
                    {allStoryUsers?.length ? (
                      allStoryUsers?.map((item) => (
                        <>
                          <div
                            className="user-story"
                            key={item?._id}
                            onClick={() =>
                              navigateTo(`/view-story/${item._id}`)
                            }
                          >
                            <div className="story-img">
                              <img src={item?.profileImg} alt="story" />
                            </div>
                            <h4>
                              {item?.firstName} {item?.lastName}
                            </h4>
                          </div>
                        </>
                      ))
                    ) : (
                      <>No Stories</>
                    )}
                  </div>
                </div>
              </div>
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
                    <img src={storyUser?.profileImg} alt="profile" />
                  </div>
                  <p>
                    {storyUser?.firstName} {storyUser?.lastName}
                  </p>
                </div>
                <FontAwesomeIcon icon={faEllipsis} />
              </div>
              <div id="main-img">
                <img src={userStory[`${storyNumber}`]?.storyImg} alt="story" />
              </div>
              <div id="story-down">
                <FontAwesomeIcon icon={faChevronUp} />
                <p>No Viewers Yet</p>
              </div>
            </div>
            <div id="main-story-arrows">
              <div className="main-story-arrow-left" onClick={decrementPage}>
                <FontAwesomeIcon icon={faChevronLeft} className="left-arrow" />
              </div>
              <div className="main-story-arrow-right" onClick={incrementPage}>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="right-arrow"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewStory;
