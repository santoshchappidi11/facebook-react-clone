import React from "react";

import findfriends from "./../../images/findfriends.jpg";
import welcome from "./../../images/welcome.jpg";
import memories from "./../../images/memories.jpg";
import saved from "./../../images/saved.jpg";
import groups from "./../../images/groups.jpg";
import video from "./../../images/video.jpg";
import market from "./../../images/market.jpg";
import feeds from "./../../images/feeds.jpg";
import events from "./../../images/events.jpg";
import ads from "./../../images/ads.jpg";
import { useNavigate } from "react-router-dom";
import emptyUser from "./../../images/empty-user.jpg";

const HomeLeft = ({ state, profileImg }) => {
  const navigateTo = useNavigate();

  return (
    <>
      <div id="left">
        <div className="left-sec">
          <div id="left-profile-img">
            <img src={profileImg ? profileImg : emptyUser} alt="profile" />
          </div>
          <h4
            style={{ marginLeft: "5px" }}
            onClick={() => navigateTo("/profile")}
          >
            {state?.currentUser?.firstName} {state?.currentUser?.lastName}
          </h4>
        </div>
        <div className="left-sec">
          <img src={findfriends} alt="left" />
          <h4>Find Friends</h4>
        </div>
        <div className="left-sec">
          <img src={welcome} alt="left" />
          <h4>Welcome</h4>
        </div>
        <div className="left-sec">
          <img src={memories} alt="left" />
          <h4>Memories</h4>
        </div>
        <div className="left-sec">
          <img src={saved} style={{ marginLeft: "5px" }} alt="left" />
          <h4 style={{ marginLeft: "5px" }}>Saved</h4>
        </div>
        <div className="left-sec">
          <img src={groups} alt="left" />
          <h4>Groups</h4>
        </div>
        <div className="left-sec">
          <img src={video} alt="left" />
          <h4>Video</h4>
        </div>
        <div className="left-sec">
          <img src={market} alt="left" />
          <h4>Market Place</h4>
        </div>
        <div className="left-sec">
          <img src={feeds} alt="left" />
          <h4>feeds</h4>
        </div>
        <div className="left-sec">
          <img src={events} alt="left" />
          <h4>Events</h4>
        </div>
        <div className="left-sec">
          <img src={ads} alt="left" />
          <h4>Adds Manager</h4>
        </div>
        <div className="left-sec">
          <i class="fa-solid fa-angle-down" style={{ marginRight: "5px" }}></i>
          <h4 style={{ marginLeft: "5px" }}>See more</h4>
        </div>
      </div>
    </>
  );
};

export default HomeLeft;
