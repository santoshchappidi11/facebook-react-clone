import React from "react";

const FollowBtn = ({ isRequest, searchUserId, sendAndRemoveFriendRequest }) => {
  return (
    <>
      {isRequest ? (
        <>
          <button onClick={() => sendAndRemoveFriendRequest(searchUserId)}>
            Follow
          </button>
        </>
      ) : (
        <>
          <button onClick={() => sendAndRemoveFriendRequest(searchUserId)}>
            Unfollow
          </button>
        </>
      )}
    </>
  );
};

export default FollowBtn;
