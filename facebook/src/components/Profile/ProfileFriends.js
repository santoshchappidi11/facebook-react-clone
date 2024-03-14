import React, { useEffect, useState } from "react";
import "./ProfileFriends.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import api from "../../ApiConfig";
import emptyUser from "./../../images/empty-user.jpg";

const ProfileFriends = () => {
  const [isShowFollowers, setIsShowFollowers] = useState(true);
  const [isShowFollowings, setIsShowFollowings] = useState(false);
  const [friendFollowers, setFriendFollowers] = useState([]);
  const [friendFollowings, setFriendFollowings] = useState([]);

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

  useEffect(() => {
    const getSearchResults = async () => {
      const token = JSON.parse(localStorage.getItem("Token"));

      if (token) {
        try {
          const response = await api.post("/get-profile-result", {
            token,
          });

          if (response.data.success) {
            setFriendFollowers(response.data.followers);
            setFriendFollowings(response.data.followings);
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
              {friendFollowers?.length ? (
                friendFollowers?.map((item) => (
                  <>
                    <div className="profile-follower" key={item?._id}>
                      <div className="follower-img">
                        <img
                          src={item?.profileImg ? item?.profileImg : emptyUser}
                          alt="follower"
                        />
                      </div>
                      <h3>
                        {item?.firstName} {item?.lastName}
                      </h3>
                    </div>
                  </>
                ))
              ) : (
                <div className="no-follow-msg">
                  <p>No Followers!</p>
                </div>
              )}
            </div>
          )}
          {isShowFollowings && (
            <div id="profile-down-followings">
              {friendFollowings?.length ? (
                friendFollowings?.map((item) => (
                  <>
                    <div className="profile-following" key={item?._id}>
                      <div className="following-img">
                        <img
                          src={item?.profileImg ? item?.profileImg : emptyUser}
                          alt="following"
                        />
                      </div>
                      <h3>
                        {item?.firstName} {item?.lastName}
                      </h3>
                    </div>
                  </>
                ))
              ) : (
                <div id="no-follow-msg">
                  <p>No Followings!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileFriends;
