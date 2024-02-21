import React, { useContext, useEffect, useState } from "react";
import "./FriendProfile.css";
import Navbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebookMessenger } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import FriendPosts from "./FriendPosts";
import FriendAbout from "./FriendAbout";
import FriendFriends from "./FriendFriends";
import FriendPhotos from "./FriendPhotos";
import FriendVideos from "./FriendVideos";
import api from "../../ApiConfig";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { AuthContexts } from "../../Context/AuthContext";
import emptyUser from "./../../images/empty-user.jpg";

const FriendProfile = () => {
  const { profileId } = useParams();
  const [profileImg, setProfileImg] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [searchUser, setSearchUser] = useState({});
  const [isShowPosts, setIsShowPosts] = useState(true);
  const [isShowAbout, setIsShowAbout] = useState(false);
  const [isShowFriends, setIsShowFriends] = useState(false);
  const [isShowPhotos, setIsShowPhotos] = useState(false);
  const [isShowVideos, setIsShowVideos] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const { state, UserFollowings } = useContext(AuthContexts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    for (let i = 0; i < state?.followings?.length; i++) {
      if (profileId == state?.followings[i]) {
        setIsFollow(true);
      }
    }
  }, [profileId, state]);

  const sendRemoveFriendRequest = async (friendId) => {
    const token = JSON.parse(localStorage.getItem("Token"));

    if (token) {
      try {
        const response = await api.post("/send-remove-follow-request", {
          token,
          friendId,
        });

        if (response.data.success) {
          UserFollowings(response.data.followings);
          setIsFollow(response.data.isFollow);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
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
    const getFriendProfileDetails = async () => {
      const token = JSON.parse(localStorage.getItem("Token"));

      if (token && profileId) {
        try {
          const response = await api.post("/get-friend-profile", {
            token,
            profileId,
          });

          if (response.data.success) {
            setIsLoading(false);
            setAllPosts(response.data.posts);
            setSearchUser(response.data.user);
            setProfileImg(response.data.profileImg);
            setCoverImg(response.data.coverImg);
          } else {
            setIsLoading(false);
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
    };

    getFriendProfileDetails();
  }, [profileId]);

  return (
    <>
      <div id="friend-profile">
        <Navbar />
        <div id="profile-up">
          <div id="profile-cover-img">
            <div id="cover-img">
              <img src={coverImg && coverImg} alt="cover" />
            </div>

            <div id="profile-img">
              <img src={profileImg ? profileImg : emptyUser} alt="profile" />
              {/* <i class="fa-solid fa-camera fa-lg"></i> */}
            </div>
          </div>
          <div id="profile-actions">
            <h2>
              {searchUser?.firstName} {searchUser?.lastName}
            </h2>
            <div id="actions">
              {isFollow ? (
                <button
                  id="profile-story-btn"
                  onClick={() => sendRemoveFriendRequest(searchUser._id)}
                >
                  <i class="fa-solid fa-minus"></i> Unfollow
                </button>
              ) : (
                <button
                  id="profile-story-btn"
                  onClick={() => sendRemoveFriendRequest(searchUser._id)}
                >
                  <i class="fa-solid fa-plus"></i> Follow
                </button>
              )}
              <button id="edit-profile-btn">
                <i class="fa-brands fa-facebook-messenger fa-lg"></i> Message
              </button>
              <button id="profile-more-btn">
                <i class="fa-solid fa-angle-up"></i>
              </button>
            </div>
          </div>
        </div>
        <div id="friend-profile-down">
          <div id="friend-profile-down-main">
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
            <FriendPosts
              allPosts={allPosts}
              searchUser={searchUser}
              isLoading={isLoading}
            />
          )}
          {isShowAbout && <FriendAbout searchUser={searchUser} />}
          {isShowFriends && <FriendFriends profileId={profileId} />}
          {isShowPhotos && <FriendPhotos allPosts={allPosts} />}
          {isShowVideos && <FriendVideos allPosts={allPosts} />}
        </div>
      </div>
    </>
  );
};

export default FriendProfile;
