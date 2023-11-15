import React, { useContext, useEffect, useState } from "react";
import "./CreateStory.css";
import logo from "./../../images/logo.JPG";
import photostory from "./../../images/photostory.jpg";
import textstory from "./../../images/textstory.jpg";
import { useNavigate } from "react-router-dom";
import api from "../../ApiConfig";
import toast from "react-hot-toast";
import { AuthContexts } from "../../Context/AuthContext";

const CreateStory = () => {
  const { state } = useContext(AuthContexts);
  const navigateTo = useNavigate();
  const [searchUser, setSearchUser] = useState();
  const [isShowCreateStory, setIsShowCreateStory] = useState(false);
  const [caption, setCaption] = useState("");
  const [storyImg, setStoryImg] = useState("");
  const [profileImg, setProfileImg] = useState("");

  const navigateToProfile = (Id) => {
    if (state?.currentUser?.userId == Id) {
      navigateTo("/profile");
    } else {
      navigateTo(`/friend-profile/${Id}`);
    }
  };

  const handleStoryImg = (e) => {
    const reader = new FileReader();

    const fileData = e.target.files[0];

    if (fileData) {
      reader.readAsDataURL(fileData);
    }

    reader.onload = () => {
      setStoryImg(reader.result);
      // console.log(reader.result, "URL");
    };
  };

  const handleCaptionValue = (e) => {
    setCaption(e.target.value);
  };

  const handleCreateStorySubmit = async (e) => {
    e.preventDefault();

    if (storyImg && caption) {
      const token = JSON.parse(localStorage.getItem("Token"));

      if (token) {
        try {
          const response = await api.post("/add-story", {
            token,
            storyImg,
            caption,
          });

          if (response.data.success) {
            toast.success(response.data.message);
            setCaption("");
            setStoryImg("");
            setIsShowCreateStory(false);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
    } else {
      toast.error("please select caption and image to create story!");
    }
  };

  const openCreateStoryPopup = () => {
    setIsShowCreateStory(true);
  };

  const closeCreateStoryPopup = () => {
    setIsShowCreateStory(false);
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
            setProfileImg(response.data.user.profileImg);
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

  return (
    <>
      <div id="create-story">
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
              <div id="body-main">
                <div id="body-user-img">
                  <img
                    src={searchUser?.profileImg}
                    alt="user"
                    onClick={() => navigateToProfile(searchUser?._id)}
                  />
                </div>
                {/* <i class="fa-solid fa-circle-user"></i> */}
                <h4 onClick={() => navigateToProfile(searchUser?._id)}>
                  {searchUser?.firstName} {searchUser?.lastName}
                </h4>
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
            <img src={photostory} alt="story" onClick={openCreateStoryPopup} />
            <img src={textstory} alt="story" />
          </div>
        </div>
      </div>

      {/* -------------------------------------story-post---------------------------------------- */}

      {isShowCreateStory && (
        <div id="create-story-screen">
          <div id="create-story">
            <div id="create-story-header">
              <h4>Create Story</h4>
              <i
                class="fa-solid fa-xmark fa-lg"
                onClick={closeCreateStoryPopup}
              ></i>
            </div>
            <div id="create-story-body">
              <form onSubmit={handleCreateStorySubmit}>
                <div id="story-body-1">
                  {/* <i class="fa-solid fa-circle-user"></i> */}
                  <div id="story-profile-img">
                    <img src={profileImg} alt="profile" />
                  </div>
                  <div id="show-story-to">
                    <h4>
                      {state?.currentUser?.firstName}{" "}
                      {state?.currentUser?.lastName}
                    </h4>
                    <select>
                      <option>Only Me</option>
                      <option>Public</option>
                      <option>Friends</option>
                    </select>
                  </div>
                </div>
                <div id="story-body-2">
                  <input
                    type="text"
                    name="caption"
                    placeholder="What's on your mind, Santosh?"
                    onChange={handleCaptionValue}
                    value={caption}
                  />
                </div>
                <div id="story-body-3">
                  <img
                    src="https://www.facebook.com/images/composer/SATP_Aa_square-2x.png"
                    alt="story"
                  />
                  {storyImg && (
                    <div id="story-img-preview">
                      <img src={storyImg} alt="post" />
                    </div>
                  )}
                  <i class="fa-regular fa-face-smile fa-xl"></i>
                </div>
                <div id="story-body-4">
                  <h4>Add to your story</h4>
                  <div id="add-to-story">
                    <label>
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png"
                        alt="story"
                      />
                      <input type="file" onClick={handleStoryImg} />
                    </label>
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/b37mHA1PjfK.png"
                      alt="story"
                    />
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png"
                      alt="story"
                    />
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/8zlaieBcZ72.png"
                      alt="story"
                    />
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/q7MiRkL7MLC.png"
                      alt="story"
                    />
                    <i className="fa-solid fa-ellipsis"></i>
                  </div>
                </div>
                <div id="story-body-5">
                  <button type="submit">Story</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateStory;
