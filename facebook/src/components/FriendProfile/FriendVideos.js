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

export default FriendVideos;
