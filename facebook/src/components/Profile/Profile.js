import React, { useState } from "react";
import "./Profile.css";
import Navbar from "../Navbar/Navbar";
import editcover from "./../../images/editcover.jpg";
import createavatar from "./../../images/edit-create-avatar.jpg";

const Profile = () => {
  const [isShowEditProfile, setIsShowEditProfile] = useState(false);

  const openEditProfilePopup = () => {
    setIsShowEditProfile(true);
  };

  const closeEditProfilePopup = () => {
    setIsShowEditProfile(false);
  };

  return (
    <div id="profile">
      <Navbar />
      <div id="profile-up">
        <div id="profile-cover-img">
          <div id="cover-img"></div>
          <div className="cover-avatar">
            <i class="fa-solid fa-user-pen"></i>
            <h4>Create with avatar</h4>
          </div>
          <div className="cover-photo">
            <i class="fa-solid fa-camera"></i>
            <h4>Add Cover Photo</h4>
          </div>
          <div id="profile-img">
            <img
              src="https://scontent.fbom3-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=-tIpWnFaNRwAX_ICb_0&_nc_ht=scontent.fbom3-2.fna&oh=00_AfAsJ7f4iOsqIP4393bDTy6hp2S21M8OoQfEe-wjMk7vfA&oe=6503FFF8"
              alt="profile"
            />
            <i class="fa-solid fa-camera fa-lg"></i>
          </div>
        </div>
        <div id="profile-actions">
          <h2>Santosh Chappidi</h2>
          <div id="actions">
            <button id="profile-story-btn">
              <i class="fa-solid fa-plus"></i> Add to story
            </button>
            <button id="edit-profile-btn" onClick={openEditProfilePopup}>
              <i class="fa-solid fa-pen"></i> Edit profile
            </button>
            <button id="profile-more-btn">
              <i class="fa-solid fa-angle-up"></i>
            </button>
          </div>
        </div>
      </div>
      <div id="profile-down"></div>

      {/* -------------------------edit-profile---------------------- */}
      {isShowEditProfile && (
        <div id="edit-profile-screen">
          <div id="edit-profile">
            <div id="edit-profile-header">
              <h3>Edit Profile</h3>
              <i
                class="fa-solid fa-xmark fa-lg"
                onClick={closeEditProfilePopup}
              ></i>
            </div>
            <div id="edit-profile-body">
              <form>
                <div className="edit-sec-1">
                  <div className="profile-picture-header">
                    <h3>Profile Picture</h3>
                    <p>Add</p>
                  </div>
                  <img
                    src="https://scontent.fbom3-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=dst-png_p160x160&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=-tIpWnFaNRwAX_ICb_0&_nc_ht=scontent.fbom3-2.fna&oh=00_AfAeSY3zZj5pvrsk6QstGDeEXh0ZZoeNbsVNdMjEUkYJNA&oe=6503FFF8"
                    alt="profile"
                  />
                </div>
                <div className="edit-sec-2">
                  <div className="cover-photo">
                    <h3>Cover Photo</h3>
                    <p>Add</p>
                  </div>
                  <img src={editcover} alt="cover" />
                </div>
                <div className="edit-sec-3">
                  <div className="edit-avatar">
                    <h3>Avatar</h3>
                    <p>Create</p>
                  </div>
                  <span>Only you can view this section</span>
                  <img
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/IkevDJ_fuvX.png"
                    alt="avatar"
                  />
                  <p>Express yourself using an avatar</p>
                  <img id="avatar-img" src={createavatar} alt="avatar" />
                </div>
                <div className="edit-sec-4">
                  <div className="edit-bio">
                    <h3>Bio</h3>
                    <p>Add</p>
                  </div>
                  <p>Describe yourself...</p>
                </div>
                <div className="edit-sec-5">
                  <div className="edit-custom">
                    <h3>Customise your intro</h3>
                    <p>Add</p>
                  </div>
                  <div className="custom-options">
                    <div className="options">
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/VMZOiSIJIwn.png"
                        alt="home"
                      />
                      <p>Current town or city</p>
                    </div>
                    <div className="options">
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/Q9Qu4uLgzdm.png"
                        alt="home"
                      />
                      <p>Workplace</p>
                    </div>
                    <div className="options">
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/jV4o8nAgIEh.png"
                        alt="home"
                      />
                      <p>School or university</p>
                    </div>
                    <div className="options">
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yc/r/-e1Al38ZrZL.png"
                        alt="home"
                      />
                      <p>Home town</p>
                    </div>
                    <div className="options">
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/w44OSixC5Hn.png"
                        alt="home"
                      />
                      <p>Relationship status</p>
                    </div>
                  </div>
                </div>
                <div className="edit-sec-6">
                  <div className="edit-hobbies">
                    <h3>Hobbies</h3>
                    <p>Add</p>
                  </div>
                </div>
                <div className="edit-sec-7">
                  <div className="edit-featured">
                    <h3>Featured</h3>
                    <p>Add</p>
                  </div>
                  <img
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/gL1slwup025.png"
                    alt="featured"
                  />
                  <p>
                    Feature your favourite photos and stories here for all of
                    your friends to see.
                  </p>
                </div>
                <button>Edit Your About Info</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
