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
                  {post?.image?.slice(-3) === "mp4" && (
                    <div className="video">
                      <video controls autoPlay>
                        <source
                          src={`http://localhost:8000/uploads/${post?.image}`}
                          type="video/mp4"
                        />
                      </video>
                    </div>
                  )}
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
