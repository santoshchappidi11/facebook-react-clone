import React from "react";
import "./FriendVideos.css";

const FriendVideos = ({ allPosts }) => {
  return (
    <>
      <div id="friend-videos">
        <div id="friend-videos-header">
          <h2>Videos</h2>
        </div>
        <div id="friend-videos-body">
          <div id="all-videos">
            {allPosts?.length ? (
              allPosts?.map((post) => (
                <>
                  <div className="single-video" key={post._id}>
                    <img src={post.image} alt="friend" />
                  </div>
                </>
              ))
            ) : (
              <p>No Videos to show! </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendVideos;
