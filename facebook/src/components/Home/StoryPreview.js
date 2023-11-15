import React from "react";
import "./StoryPreview.css";

const StoryPreview = ({ allStoryUsers }) => {
  return (
    <>
      <div id="middle-story-structure">
        <div id="story-structure">
          {allStoryUsers?.length ? (
            allStoryUsers?.map((item) => (
              <>
                {" "}
                <div className="single-story" key={item._id}>
                  {item?.yourStories && (
                    <>
                      <div className="story-preview">
                        <img src={item.yourStories[0].storyImg} alt="story" />
                      </div>
                    </>
                  )}
                  <div className="story-user">
                    <div className="user-img">
                      <img src={item.profileImg} alt="user" />
                    </div>
                    <p>{item.firstName}</p>
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
      </div>
    </>
  );
};

export default StoryPreview;
