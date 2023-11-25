import React, { useEffect, useState } from "react";
import "./Profile.css";
import Navbar from "../Navbar/Navbar";
import editcover from "./../../images/editcover.jpg";
import createavatar from "./../../images/edit-create-avatar.jpg";
import toast from "react-hot-toast";
import api from "../../ApiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ProfilePosts from "./ProfilePosts";
import ProfileAbout from "./ProfileAbout";
import ProfileFriends from "./ProfileFriends";
import ProfilePhotos from "./ProfilePhotos";
import ProfileVideos from "./ProfileVideos";
// import like from "./../../images/like.JPG";

const Profile = () => {
  const navigateTo = useNavigate();
  const [isShowEditProfile, setIsShowEditProfile] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [bioData, setBioData] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [searchUser, setSearchUser] = useState({});
  const [isShowPosts, setIsShowPosts] = useState(true);
  const [isShowAbout, setIsShowAbout] = useState(false);
  const [isShowFriends, setIsShowFriends] = useState(false);
  const [isShowPhotos, setIsShowPhotos] = useState(false);
  const [isShowVideos, setIsShowVideos] = useState(false);

  const openEditProfilePopup = () => {
    setIsShowEditProfile(true);
  };

  const closeEditProfilePopup = () => {
    setIsShowEditProfile(false);
  };

  const handleMultiplePages = (e) => {
    if (e.target.innerText == "Posts") {
      setIsShowPosts(true);
      setIsShowAbout(false);
      setIsShowFriends(false);
      setIsShowPhotos(false);
      setIsShowVideos(false);
    }
    if (e.target.innerText == "About") {
      setIsShowAbout(true);
      setIsShowPosts(false);
      setIsShowFriends(false);
      setIsShowPhotos(false);
      setIsShowVideos(false);
    }

    if (e.target.innerText == "Friends") {
      setIsShowFriends(true);
      setIsShowPosts(false);
      setIsShowAbout(false);
      setIsShowPhotos(false);
      setIsShowVideos(false);
    }

    if (e.target.innerText == "Photos") {
      setIsShowPhotos(true);
      setIsShowFriends(false);
      setIsShowPosts(false);
      setIsShowAbout(false);
      setIsShowVideos(false);
    }

    if (e.target.innerText == "Videos") {
      setIsShowVideos(true);
      setIsShowPhotos(false);
      setIsShowFriends(false);
      setIsShowPosts(false);
      setIsShowAbout(false);
    }
  };

  useEffect(() => {
    const getSearchResults = async () => {
      const token = JSON.parse(localStorage.getItem("Token"));

      if (token) {
        try {
          const response = await api.post("/get-profile-result", {
            token,
          });

          if (response.data.success) {
            setSearchUser(response.data.user);
            setAllPosts(response.data.posts);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
    };

    getSearchResults();
  }, []);

  useEffect(() => {
    const getProfileDetails = async () => {
      const token = JSON.parse(localStorage.getItem("Token"));

      if (token) {
        const response = await api.post("/get-profile-details", { token });

        try {
          if (response.data.success) {
            setProfileImg(response.data.profileImg);
            setCoverImg(response.data.coverImg);
            setBioData(response.data.bioData);
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

  const deletePost = async (postId) => {
    const token = JSON.parse(localStorage.getItem("Token"));

    if (token) {
      try {
        const response = await api.post("/delete-your-post", { token, postId });

        if (response.data.success) {
          setAllPosts(response.data.posts);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
  };

  const handleProfileImg = (e) => {
    const reader = new FileReader();

    const fileData = e.target.files[0];

    if (fileData) {
      reader.readAsDataURL(fileData);
    }

    reader.onload = () => {
      setProfileImg(reader.result);
      console.log(reader.result, "URL");
    };
  };

  const handleCoverImage = (e) => {
    const reader = new FileReader();

    const fileData = e.target.files[0];

    if (fileData) {
      reader.readAsDataURL(fileData);
    }

    reader.onload = () => {
      setCoverImg(reader.result);
    };
  };

  const handleBioValue = (e) => {
    setBioData(e.target.value);
  };

  const handleUserProfileSubmit = async (e) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem("Token"));

    if (token) {
      try {
        const response = await api.post("/new-user-profile", {
          bioData,
          coverImg,
          profileImg,
          token,
        });

        if (response.data.success) {
          toast.success("Updated your profile!");
          setIsShowEditProfile(false);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div id="profile">
      <Navbar />
      <div id="profile-up">
        <div id="profile-cover-img">
          <div id="cover-img">
            <img src={coverImg} alt="cover" />
          </div>
          <div className="cover-avatar">
            <i class="fa-solid fa-user-pen"></i>
            <h4>Create with avatar</h4>
          </div>
          <div className="cover-photo">
            <i class="fa-solid fa-camera"></i>
            <h4>Add Cover Photo</h4>
          </div>
          <div id="profile-img">
            <img src={profileImg} alt="profile" />
            <i class="fa-solid fa-camera fa-lg"></i>
          </div>
        </div>
        <div id="profile-actions">
          <h2>
            {searchUser?.firstName} {searchUser?.lastName}
          </h2>
          <div id="actions">
            <button
              id="profile-story-btn"
              onClick={() => navigateTo("/create-story")}
            >
              <i class="fa-solid fa-plus"></i> Add to story
            </button>
            <button id="edit-profile-btn" onClick={openEditProfilePopup}>
              <i class="fa-solid fa-pen"></i> Edit profile
            </button>
            <button id="profile-more-btn">
              <i class="fa-solid fa-angle-up"></i>
            </button>
          </div>
        </div>
      </div>
      <div id="profile-down">
        <div id="profile-down-main">
          <div id="profile-down-left">
            <h4
              onClick={handleMultiplePages}
              className={`${isShowPosts ? "profile-down-active" : ""}`}
            >
              Posts
            </h4>
            <h4
              onClick={handleMultiplePages}
              className={`${isShowAbout ? "profile-down-active" : ""}`}
            >
              About
            </h4>
            <h4>Mentions</h4>
            <h4
              onClick={handleMultiplePages}
              className={`${isShowFriends ? "profile-down-active" : ""}`}
            >
              Friends
            </h4>
            <h4
              onClick={handleMultiplePages}
              className={`${isShowPhotos ? "profile-down-active" : ""}`}
            >
              Photos
            </h4>
            <h4
              onClick={handleMultiplePages}
              className={`${isShowVideos ? "profile-down-active" : ""}`}
            >
              Videos
            </h4>
            <h4>More</h4>
          </div>
          <div id="profile-down-right">
            <FontAwesomeIcon icon={faEllipsis} className="ellipsis" />
          </div>
        </div>
      </div>

      <div id="profile-all-activities">
        {isShowPosts && (
          <ProfilePosts
            allPosts={allPosts}
            searchUser={searchUser}
            deletePost={deletePost}
          />
        )}
        {isShowAbout && <ProfileAbout searchUser={searchUser} />}
        {isShowFriends && <ProfileFriends />}
        {isShowPhotos && <ProfilePhotos allPosts={allPosts} />}
        {isShowVideos && <ProfileVideos allPosts={allPosts} />}
      </div>

      {/* -------------------------edit-profile---------------------- */}
      {isShowEditProfile && (
        <div id="edit-profile-screen">
          <div id="edit-profile">
            <div id="profile-header">
              <h3>Edit Your Profile</h3>
              <i
                class="fa-solid fa-xmark fa-lg"
                onClick={closeEditProfilePopup}
              ></i>
            </div>
            <div id="edit-profile-body">
              <form onSubmit={handleUserProfileSubmit}>
                <div className="edit-sec-1">
                  <div className="profile-picture-header">
                    <h3>Profile Picture</h3>
                    {/* <p>Add</p> */}
                    <label>
                      Add <br />
                      <i class="fa fa-2x fa-camera"></i>
                      <input type="file" onClick={handleProfileImg} />
                      <br />
                      <span id="profileImageName"></span>
                    </label>
                  </div>
                  <div id="profile-image">
                    <img src={profileImg} alt="profile" />
                  </div>
                </div>
                <div className="edit-sec-2">
                  <div className="cover-photo">
                    <h3>Cover Photo</h3>
                    {/* <p>Add</p> */}
                    <label>
                      Add <br />
                      <i class="fa fa-2x fa-camera"></i>
                      <input type="file" onClick={handleCoverImage} />
                      <br />
                      <span id="coverImageName"></span>
                    </label>
                  </div>
                  <div id="cover-image">
                    <img src={coverImg ? coverImg : editcover} alt="cover" />
                  </div>
                </div>
                <div className="edit-sec-3">
                  <div className="edit-avatar">
                    <h3>Avatar</h3>
                    <p>Create</p>
                  </div>
                  <span>Only you can view this section</span>
                  <img
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/IkevDJ_fuvX.png"
                    alt="avatar"
                  />
                  <p>Express yourself using an avatar</p>
                  <img id="avatar-img" src={createavatar} alt="avatar" />
                </div>
                <div className="edit-sec-4">
                  <div className="edit-bio">
                    <h3>Bio</h3>
                    <p>Add</p>
                  </div>
                  {/* <p>Describe yourself...</p> */}
                  <input
                    type="text"
                    placeholder="Describe yourself..."
                    onChange={handleBioValue}
                    value={bioData}
                  />
                </div>
                <div className="edit-sec-5">
                  <div className="edit-custom">
                    <h3>Customise your intro</h3>
                    <p>Add</p>
                  </div>
                  <div className="custom-options">
                    <div className="options">
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/VMZOiSIJIwn.png"
                        alt="home"
                      />
                      <p>Current town or city</p>
                    </div>
                    <div className="options">
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/Q9Qu4uLgzdm.png"
                        alt="home"
                      />
                      <p>Workplace</p>
                    </div>
                    <div className="options">
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/jV4o8nAgIEh.png"
                        alt="home"
                      />
                      <p>School or university</p>
                    </div>
                    <div className="options">
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yc/r/-e1Al38ZrZL.png"
                        alt="home"
                      />
                      <p>Home town</p>
                    </div>
                    <div className="options">
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/w44OSixC5Hn.png"
                        alt="home"
                      />
                      <p>Relationship status</p>
                    </div>
                  </div>
                </div>
                <div className="edit-sec-6">
                  <div className="edit-hobbies">
                    <h3>Hobbies</h3>
                    <p>Add</p>
                  </div>
                </div>
                <div className="edit-sec-7">
                  <div className="edit-featured">
                    <h3>Featured</h3>
                    <p>Add</p>
                  </div>
                  <img
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/gL1slwup025.png"
                    alt="featured"
                  />
                  <p>
                    Feature your favourite photos and stories here for all of
                    your friends to see.
                  </p>
                </div>
                <button type="submit">Update Your About Info</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
