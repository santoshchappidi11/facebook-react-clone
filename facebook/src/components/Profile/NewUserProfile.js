import React, { useContext, useEffect, useState } from "react";
import "./NewUserProfile.css";
import editcover from "./../../images/editcover.jpg";
import createavatar from "./../../images/edit-create-avatar.jpg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../ApiConfig";
import { AuthContexts } from "../../Context/AuthContext";
import emptyUser from "./../../images/empty-user.jpg";

const NewUserProfile = () => {
  const { state } = useContext(AuthContexts);
  const navigateTo = useNavigate();
  const [profileImg, setProfileImg] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [bioData, setBioData] = useState("");

  // console.log(profileImg, "profileImg");
  // console.log(coverImg, "coverImg");
  // console.log(bioData, "bioData");

  // useEffect(() => {
  //   if (state?.currentUser?.name) {
  //     navigateTo("/");
  //   } else {
  //     navigateTo("/login");
  //   }
  // }, [navigateTo, state]);

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
    const reader = new FileReader();

    const fileData = e.target.files[0];

    if (fileData) {
      reader.readAsDataURL(fileData);
    }

    reader.onload = () => {
      setProfileImg(reader.result);
      console.log(reader.result, "URL");
    };
  };

  const handleCoverImage = (e) => {
    const reader = new FileReader();

    const fileData = e.target.files[0];

    if (fileData) {
      reader.readAsDataURL(fileData);
    }

    reader.onload = () => {
      setCoverImg(reader.result);
    };
  };

  const handleBioValue = (e) => {
    setBioData(e.target.value);
  };

  const handleUserProfileSubmit = async (e) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem("Token"));

    if (token) {
      try {
        const response = await api.post("/new-user-profile", {
          bioData,
          coverImg,
          profileImg,
          token,
        });

        if (response.data.success) {
          toast.success(response.data.message);
          navigateTo("/");
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
          <form onSubmit={handleUserProfileSubmit}>
            <div className="edit-sec-1">
              <div className="profile-picture-header">
                <h3>Profile Picture</h3>
                {/* <p>Add</p> */}
                <label>
                  Add <br />
                  <i class="fa fa-2x fa-camera"></i>
                  <input type="file" onClick={handleProfileImg} />
                  <br />
                  <span id="profileImageName"></span>
                </label>
              </div>
              <div id="profile-image">
                <img src={profileImg ? profileImg : emptyUser} alt="profile" />
              </div>
            </div>
            <div className="edit-sec-2">
              <div className="cover-photo">
                <h3>Cover Photo</h3>
                {/* <p>Add</p> */}
                <label>
                  Add <br />
                  <i class="fa fa-2x fa-camera"></i>
                  <input type="file" onClick={handleCoverImage} />
                  <br />
                  <span id="coverImageName"></span>
                </label>
              </div>
              <div id="cover-image">
                <img src={coverImg ? coverImg : editcover} alt="cover" />
              </div>
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
            <button>Save Your About Info</button>
            <button onClick={() => navigateTo("/")}>Skip</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewUserProfile;
