import React, { useState } from "react";
import "./FriendFriends.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const FriendFriends = () => {
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
      <div id="friend-friends">
        <div id="friend-friends-up">
          <div id="friend-up-left">
            <h2>Followers</h2>
          </div>
          <div id="friend-up-middle">
            <p>Friend Requests</p>
            <p>Sent Requests</p>
          </div>
          <div id="friend-up-right">
            <div id="friend-up-search">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="search-icon"
              />
              <input type="text" placeholder="Search" />
            </div>
          </div>
        </div>
        <div id="friend-friends-middle">
          <p
            onClick={handleFriends}
            className={`${isShowFollowers ? "friend-friends-active" : ""}`}
          >
            Followers
          </p>
          <p
            onClick={handleFriends}
            className={`${isShowFollowings ? "friend-friends-active" : ""}`}
          >
            Followings
          </p>
        </div>
        <div id="friend-friends-down">
          {isShowFollowers && (
            <div id="friend-down-followers">
              <div className="friend-follower">
                <div className="follower-img">
                  <img src="" alt="follower" />
                </div>
                <h3>MS Dhoni</h3>
              </div>
            </div>
          )}
          {isShowFollowings && (
            <div id="friend-down-followings">
              <div className="friend-following">
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

export default FriendFriends;
