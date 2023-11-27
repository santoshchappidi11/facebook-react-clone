import React from "react";

const FollowBtn = ({ isFollow, searchUserId, sendAndRemoveFriendRequest }) => {
  return (
    <>
      {isFollow ? (
        <>
          <button onClick={() => sendAndRemoveFriendRequest(searchUserId)}>
            Unfollow
          </button>
        </>
      ) : (
        <>
          <button onClick={() => sendAndRemoveFriendRequest(searchUserId)}>
            Follow
          </button>
        </>
      )}
    </>
  );
};

export default FollowBtn;
