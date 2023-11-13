import React from "react";
import "./ProfileVideos.css";

const ProfileVideos = ({ allPosts }) => {
  return (
    <>
      <div id="profile-videos">
        <div id="profile-videos-header">
          <h2>Videos</h2>
        </div>
        <div id="profile-videos-body">
          <div id="all-videos">
            {allPosts?.length ? (
              allPosts?.map((post) => (
                <>
                  <div className="single-video" key={post._id}>
                    <img src={post.image} alt="profile" />
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

export default ProfileVideos;
