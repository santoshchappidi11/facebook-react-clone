import React, { useEffect, useState } from "react";
import "./FriendFriends.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import api from "../../ApiConfig";
import emptyUser from "./../../images/empty-user.jpg";

const FriendFriends = ({ profileId }) => {
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
    const getFriendProfileDetails = async () => {
      const token = JSON.parse(localStorage.getItem("Token"));

      if (token && profileId) {
        try {
          const response = await api.post("/get-friend-profile", {
            token,
            profileId,
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

    getFriendProfileDetails();
  }, [profileId]);

  return (
    <>
      <div id="friend-friends">
        <div id="friend-friends-up">
          <div id="friend-up-left">
            <h2>Friends</h2>
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
              {friendFollowers?.length ? (
                friendFollowers?.map((item) => (
                  <>
                    <div className="friend-follower" key={item?._id}>
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
            <div id="friend-down-followings">
              {friendFollowings?.length ? (
                friendFollowings?.map((item) => (
                  <>
                    <div className="friend-following" key={item?._id}>
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
                <div className="no-follow-msg">
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

export default FriendFriends;
