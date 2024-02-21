import React, { useContext, useEffect, useState } from "react";
import "./NewUserProfile.css";
import editcover from "./../../images/editcover.jpg";
import createavatar from "./../../images/edit-create-avatar.jpg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../ApiConfig";
import { AuthContexts } from "../../Context/AuthContext";
import emptyUser from "./../../images/empty-user.jpg";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewUserProfile = () => {
  const { state } = useContext(AuthContexts);
  const navigateTo = useNavigate();
  const [coverImg, setCoverImg] = useState("");
  const [bioData, setBioData] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [profileFile, setProfileFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [isShowRemoveProfileImg, setIsShowRemoveProfileImg] = useState(true);
  const [isShowRemoveCoverImg, setIsShowRemoveCoverImg] = useState(true);
  const [profileId, setProfileId] = useState("");
  const [coverId, setCoverId] = useState("");

  // console.log(profileImg, "profileImg");
  // console.log(coverImg, "coverImg");
  // console.log(bioData, "bioData");

  useEffect(() => {
    if (profileFile == null && !profileImg) {
      setIsShowRemoveProfileImg(false);
    } else {
      setIsShowRemoveProfileImg(true);
    }
  }, [profileFile, profileImg]);

  useEffect(() => {
    if (coverFile == null && !coverImg) {
      setIsShowRemoveCoverImg(false);
    } else {
      setIsShowRemoveCoverImg(true);
    }
  }, [coverFile, coverImg]);

  useEffect(() => {
    const getProfileDetails = async () => {
      const token = JSON.parse(localStorage.getItem("Token"));

      if (token) {
        const response = await api.post("/get-profile-details", { token });

        try {
          if (response.data.success) {
            // toast.success(response.data.message);
            setBioData(response.data.bioData);
            setProfileImg(response.data.profileImg);
            setCoverImg(response.data.coverImg);
            setProfileId(response?.data?.profileId);
            setCoverId(response?.data?.coverId);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    };
    getProfileDetails();
  }, []);

  const handleProfileImg = (e) => {
    setProfileFile(e.target.files[0]);
    setProfileImg(URL.createObjectURL(e.target.files[0]));
    setIsShowRemoveProfileImg(true);
  };

  const handleCoverImage = (e) => {
    setCoverFile(e.target.files[0]);
    setCoverImg(URL.createObjectURL(e.target.files[0]));
    setIsShowRemoveCoverImg(true);

    // const reader = new FileReader();
    // const fileData = e.target.files[0];

    // if (fileData) {
    //   reader.readAsDataURL(fileData);
    // }

    // reader.onload = () => {
    //   setCoverImg(reader.result);
    // };
  };

  const handleRemoveProfileImg = () => {
    setProfileFile(null);
    setProfileImg("");
    // setIsShowRemoveProfileImg(false);
  };

  const handleRemoveCoverImg = () => {
    setCoverFile(null);
    setCoverImg("");
    // setIsShowRemoveCoverImg(false);
  };

  const handleBioValue = (e) => {
    setBioData(e.target.value);
  };

  const handleUserProfileSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("Token"));

    const formData = new FormData();
    if (profileFile) formData.append("profileImg", profileFile);
    if (coverFile) formData.append("coverImg", coverFile);
    if (bioData) formData.append("bioData", bioData);
    if (profileImg) formData.append("profileNow", profileImg);
    if (coverImg) formData.append("coverNow", coverImg);
    if (profileId) formData.append("profileId", profileId);
    if (coverId) formData.append("coverId", coverId);
    // if (token) formData.append("token", token);

    // console.log("Profile File:", profileFile);
    // console.log("Cover File:", coverFile);

    if (token) {
      try {
        const response = await api.post(
          "/new-user-profile",
          // bioData,
          // coverImg,
          // profileImg,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          toast.success(response.data.message);
          navigateTo("/home");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div id="edit-profile-screen">
      <div id="edit-profile">
        <div id="edit-profile-header">
          <h3>Complete Your Profile Details</h3>
          {/* <i
          class="fa-solid fa-xmark fa-lg"
          onClick={closeEditProfilePopup}
        ></i> */}
        </div>
        <div id="edit-profile-body">
          <form
            onSubmit={handleUserProfileSubmit}
            encType="multipart/form-data"
          >
            <div className="edit-sec-1">
              <div className="profile-picture-header">
                <h3>Profile Picture</h3>
                <label>
                  Add <br />
                  <i class="fa fa-2x fa-camera"></i>
                  <input
                    type="file"
                    // name="profileImg"
                    onChange={handleProfileImg}
                  />
                  <br />
                  <span id="profileImageName"></span>
                </label>
              </div>
              <div id="profile-image">
                {profileFile || profileImg ? (
                  <img
                    src={profileFile ? profileImg : profileImg}
                    alt="profile"
                  />
                ) : (
                  <img src={emptyUser} alt="profile" />
                )}
              </div>
              {isShowRemoveProfileImg && (
                <div
                  className="remove-editprofile-img"
                  onClick={handleRemoveProfileImg}
                >
                  <h4>
                    Remove <FontAwesomeIcon icon={faXmark} />
                  </h4>
                </div>
              )}
            </div>
            <div className="edit-sec-2">
              <div className="cover-photo">
                <h3>Cover Photo</h3>
                {/* <p>Add</p> */}
                <label>
                  Add <br />
                  <i class="fa fa-2x fa-camera"></i>
                  <input type="file" onChange={handleCoverImage} />
                  <br />
                  <span id="coverImageName"></span>
                </label>
              </div>
              <div id="cover-image">
                {coverFile || coverImg ? (
                  <img src={coverFile ? coverImg : coverImg} alt="cover" />
                ) : (
                  <img src={editcover} alt="cover" />
                )}
              </div>
              {isShowRemoveCoverImg && (
                <div
                  className="remove-editprofile-img"
                  onClick={handleRemoveCoverImg}
                >
                  <h4>
                    Remove <FontAwesomeIcon icon={faXmark} />
                  </h4>
                </div>
              )}
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
              {/* <p>Describe yourself...</p> */}
              <input
                type="text"
                placeholder="Describe yourself..."
                onChange={handleBioValue}
                value={bioData}
              />
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
                Feature your favourite photos and stories here for all of your
                friends to see.
              </p>
            </div>
            <button type="submit">Save Your About Info</button>
            <button onClick={() => navigateTo("/home")}>Skip</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewUserProfile;
