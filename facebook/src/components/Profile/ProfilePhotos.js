import React from "react";
import "./ProfilePhotos.css";

const ProfilePhotos = ({ allPosts }) => {
 
  return (
    <>
      <div id="profile-photos">
        <div id="profile-photos-header">
          <h2>Photos</h2>
        </div>
        <div id="profile-photos-body">
          <div id="all-photos">
            {allPosts?.length ? (
              allPosts?.map((post) => (
                <>
                  <div className="single-photo" key={post._id}>
                    <img src={post.image} alt="profile" />
                  </div>
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

export default ProfilePhotos;
