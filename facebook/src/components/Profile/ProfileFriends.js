import React, { useState } from "react";
import "./ProfileFriends.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const ProfileFriends = () => {
  const [isShowFollowers, setIsShowFollowers] = useState(true);
  const [isShowFollowings, setIsShowFollowings] = useState(false);

  const handleFriends = (e) => {
    if (e.target.innerText == "Followers") {
      setIsShowFollowers(true);
      setIsShowFollowings(false);
    }

    if (e.target.innerText == "Followings") {
      setIsShowFollowings(true);
      setIsShowFollowers(false);
    }
  };

  return (
    <>
      <div id="profile-friends">
        <div id="profile-friends-up">
          <div id="profile-up-left">
            <h2>Followers</h2>
          </div>
          <div id="profile-up-middle">
            <p>Friend Requests</p>
            <p>Sent Requests</p>
          </div>
          <div id="profile-up-right">
            <div id="profile-up-search">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="search-icon"
              />
              <input type="text" placeholder="Search" />
            </div>
          </div>
        </div>
        <div id="profile-friends-middle">
          <p
            onClick={handleFriends}
            className={`${isShowFollowers ? "profile-friends-active" : ""}`}
          >
            Followers
          </p>
          <p
            onClick={handleFriends}
            className={`${isShowFollowings ? "profile-friends-active" : ""}`}
          >
            Followings
          </p>
        </div>
        <div id="profile-friends-down">
          {isShowFollowers && (
            <div id="profile-down-followers">
              <div className="profile-follower">
                <div className="follower-img">
                  <img src="" alt="follower" />
                </div>
                <h3>MS Dhoni</h3>
              </div>
            </div>
          )}
          {isShowFollowings && (
            <div id="profile-down-followings">
              <div className="profile-following">
                <div className="following-img">
                  <img src="" alt="following" />
                </div>
                <h3>Virat Kholi</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileFriends;
