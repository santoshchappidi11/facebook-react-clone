import React, { useEffect, useState } from "react";
import "./ProfileAbout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlag,
  faClock,
  faPager,
  faUser,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

const ProfileAbout = ({ searchUser }) => {
  // console.log(searchUser, "user here");

  const [isShowBasicInfo, setIsShowBasicInfo] = useState(true);
  const [isShowTransparencyInfo, setIsShowTransparencyInfo] = useState(false);
  const [accountCreated, setAccountCreated] = useState("");

  useEffect(() => {
    if (searchUser?.date) {
      const date = new Date(searchUser?.date);
      setAccountCreated(date.toLocaleDateString());
    }
  }, [searchUser]);

  const handleMultiplePages = (e) => {
    if (e.target.innerText == "Contact and basic info") {
      setIsShowBasicInfo(true);
      setIsShowTransparencyInfo(false);
    }

    if (e.target.innerText == "Page transparency") {
      setIsShowTransparencyInfo(true);
      setIsShowBasicInfo(false);
    }
  };

  return (
    <>
      <div id="profile-about">
        <div id="profile-about-left">
          <h2>About</h2>
          <div id="profile-about-options">
            <h4
              onClick={handleMultiplePages}
              className={`${isShowBasicInfo ? "profile-active" : ""}`}
            >
              Contact and basic info
            </h4>
            <h4
              onClick={handleMultiplePages}
              className={`${isShowTransparencyInfo ? "profile-active" : ""}`}
            >
              Page transparency
            </h4>
          </div>
        </div>
        <div id="profile-about-right">
          {isShowBasicInfo && (
            <div id="basic-info">
              <h3>Categories</h3>
              <div>
                <FontAwesomeIcon icon={faCircleInfo} className="info-icon" />
                <p>SportsPerson</p>
              </div>
            </div>
          )}
          {isShowTransparencyInfo && (
            <div id="page-transparency">
              <h4>Page Transparency</h4>
              <p>
                Facebook is showing information to help you understand the
                purpose of this Page.
              </p>
              <div id="transparency-info">
                <div className="transp-info">
                  <FontAwesomeIcon icon={faFlag} className="flag" />
                  <div>
                    <h4>{searchUser._id}</h4>
                    <p>Page ID</p>
                  </div>
                </div>
                <div className="transp-info">
                  <FontAwesomeIcon icon={faClock} className="clock" />
                  <div>
                    <h4>{accountCreated}</h4>
                    <p>Creation date</p>
                  </div>
                </div>
                <div className="transp-info">
                  <FontAwesomeIcon icon={faUser} className="user" />
                  <div>
                    <h4>Admin info</h4>
                    <p>This Page have single admin.</p>
                  </div>
                </div>
                <div className="transp-info">
                  <FontAwesomeIcon icon={faPager} className="page" />
                  <div>
                    <p>This Page is not currently running ads.</p>
                  </div>
                </div>
              </div>
              <button>See All</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileAbout;
