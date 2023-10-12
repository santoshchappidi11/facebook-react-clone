import React from "react";
import "./CreateStory.css";
import logo from "./../../images/logo.JPG";
import photostory from "./../../images/photostory.jpg";
import textstory from "./../../images/textstory.jpg";
import { useNavigate } from "react-router-dom";

const CreateStory = () => {
  const navigateTo = useNavigate();

  return (
    <div id="create-story">
      <div id="left">
        <div id="left-main">
          <div id="left-header">
            <i
              class="fa-solid fa-xmark fa-xl"
              onClick={() => navigateTo("/")}
            ></i>
            <img src={logo} alt="logo" onClick={() => navigateTo("/")} />
          </div>
          <div id="left-body">
            <div id="body-header">
              <h2>Your story</h2>
              <i class="fa-solid fa-gear fa-lg"></i>
            </div>
            <div id="body-main">
              <i class="fa-solid fa-circle-user"></i>
              <h4>Santosh Chappidi</h4>
            </div>
          </div>
        </div>
      </div>
      <div id="right">
        <div id="right-header">
          <div>
            <i class="fa-solid fa-bars fa-lg"></i>
          </div>
          <div>
            <i class="fa-solid fa-bell fa-lg"></i>
          </div>
          <i class="fa-solid fa-circle-user fa-2x"></i>
        </div>
        <div id="right-body">
          <img src={photostory} alt="story" />
          <img src={textstory} alt="story" />
        </div>
      </div>
    </div>
  );
};

export default CreateStory;
