import React from "react";
import "./StoryPreview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import emptyUser from "./../../images/empty-user.jpg";

const StoryPreview = ({ allStoryUsers, incrementPage, decrementPage }) => {
  const navigateTo = useNavigate();

  return (
    <>
      <div id="middle-story-structure">
        <div id="story-structure">
          {allStoryUsers?.length ? (
            allStoryUsers?.map((item) => (
              <>
                {" "}
                <div
                  className="single-story"
                  key={item?._id}
                  onClick={() => navigateTo(`/view-story/${item?._id}`)}
                >
                  {item?.yourStories && (
                    <>
                      <div className="story-preview">
                        <img src={item?.yourStories[0]?.storyImg} alt="story" />
                      </div>
                    </>
                  )}
                  <div className="story-user">
                    <div className="user-img">
                      <img
                        src={item.profileImg ? item.profileImg : emptyUser}
                        alt="user"
                      />
                    </div>
                    <p>{item?.firstName}</p>
                  </div>
                </div>
              </>
            ))
          ) : (
            <>
              <p>No Stories!</p>
            </>
          )}
        </div>

        <div id="story-arrows">
          <div className="arrow-left" onClick={decrementPage}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <div className="arrow-right" onClick={incrementPage}>
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryPreview;
