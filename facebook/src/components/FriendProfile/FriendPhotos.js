import React from "react";
import "./FriendPhotos.css";

const FriendPhotos = ({ allPosts }) => {
  return (
    <>
      <div id="friend-photos">
        <div id="friend-photos-header">
          <h2>Photos</h2>
        </div>
        <div id="friend-photos-body">
          <div id="all-photos">
            {allPosts?.length ? (
              allPosts?.map((post) => (
                <>
                  {post?.image?.slice(-3) !== "mp4" && (
                    <div className="single-photo" key={post?._id}>
                      <img
                        src={`http://localhost:8000/uploads/${post?.image}`}
                        alt="profile"
                      />
                    </div>
                  )}
                </>
              ))
            ) : (
              <p>No Photos to show! </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendPhotos;
