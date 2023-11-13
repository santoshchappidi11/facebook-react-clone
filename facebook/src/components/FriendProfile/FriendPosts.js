import React from "react";
import "./FriendPosts.css";
import like from "./../../images/like.JPG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faArrowDownShortWide,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const FriendPosts = ({ allPosts, searchUser }) => {
  const navigateTo = useNavigate();

  return (
    <>
      <div id="friend-posts">
        <div id="friend-posts-left">
          <h3>Intro</h3>
          <p>{searchUser?.bioData}</p>
          <div>
            <FontAwesomeIcon icon={faCircleInfo} className="info-abt" />
            <p>Page ·</p>
            <span>Not Mentioned.</span>
          </div>
        </div>
        <div id="friend-posts-right">
          <div id="friend-posts-header">
            <h3>Posts</h3>
            <button>
              {" "}
              <FontAwesomeIcon
                icon={faArrowDownShortWide}
                className="post-filters"
              />
              Filters
            </button>
          </div>
          <div id="friend-posts-body">
            <div id="friend-posts">
              {allPosts?.length ? (
                allPosts?.map((post) => (
                  <div className="friend-post" key={post._id}>
                    <div className="friend-post-sec-1">
                      <div className="friend-post-user">
                        <div className="friend-post-img">
                          <img src={post?.userImage} alt="friend-post-img" />
                        </div>
                        <div className="friend-post-details">
                          <h4>
                            {post?.userFirstName} {post?.userLastName}
                          </h4>
                          <p>
                            2 d · <i class="fa-solid fa-earth-asia"></i>
                          </p>
                        </div>
                      </div>
                      <div className="options">
                        <i class="fa-solid fa-ellipsis fa-lg"></i>
                        <i class="fa-solid fa-xmark fa-xl"></i>
                      </div>
                    </div>
                    <div className="friend-post-sec-2">
                      <div className="caption">
                        <p>{post.caption} 😂🤗</p>
                      </div>
                    </div>
                    <div
                      className="friend-post-sec-3"
                      onClick={() => navigateTo(`/single-post/${post._id}`)}
                    >
                      <div className="img">
                        <img src={post?.image} alt="postimage" />
                      </div>
                    </div>
                    <div className="friend-post-sec-4">
                      <div className="friend-post-activity">
                        <div className="activity-left">
                          <img src={like} alt="like" />
                          <p>{post?.likes ? post?.likes?.length : "0"}</p>
                        </div>
                        <div className="activity-right">
                          <p>
                            {post?.comments ? post?.comments?.length : "0"}{" "}
                            {post?.comments?.length > 1
                              ? "comments"
                              : "comment"}
                          </p>
                          <p>112 shares</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div id="friend-no-post-msg">
                  <h3>
                    No Posts Yet from {searchUser?.firstName}{" "}
                    {searchUser?.lastName}!
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendPosts;
