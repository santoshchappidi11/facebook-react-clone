import React from "react";

const FollowBtn = ({ isRequest, searchUser, sendAndRemoveFriendRequest }) => {
  return (
    <>
      <button onClick={() => sendAndRemoveFriendRequest(searchUser._id)}>
        {isRequest ? "Unfollow" : "Follow"}
      </button>
    </>
  );
};

export default FollowBtn;
