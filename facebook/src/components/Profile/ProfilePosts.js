import React, { useState } from "react";
import "./ProfilePosts.css";
import like from "./../../images/like.JPG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faArrowDownShortWide,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { AuthContexts } from "../../Context/AuthContext";
import emptyUser from "./../../images/empty-user.jpg";
import ReactTimeAgo from "react-time-ago";

const ProfilePosts = ({
  bioData,
  allPosts,
  searchUser,
  deletePost,
  isLoading,
}) => {
  const navigateTo = useNavigate();
  const { state } = useNavigate(AuthContexts);

  return (
    <>
      <div id="profile-posts">
        <div id="profile-posts-left">
          <h3>Intro</h3>
          <p>
            {bioData ? bioData : `No Bio Yet from ${searchUser?.firstName}!`}
          </p>
          <div>
            <FontAwesomeIcon icon={faCircleInfo} className="info-abt" />
            <p>Page ·</p>
            <span>Not Mentioned.</span>
          </div>
        </div>
        <div id="profile-posts-right">
          <div id="profile-posts-header">
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
          <div id="profile-posts-body">
            {isLoading ? (
              <>
                <div id="profile-posts-loading-msg">
                  <h3>Loading...</h3>
                </div>
              </>
            ) : (
              <>
                {" "}
                <div id="profile-posts">
                  {allPosts?.length ? (
                    allPosts?.map((post) => (
                      <div className="profile-post" key={post?._id}>
                        <div className="profile-post-sec-1">
                          <div className="profile-post-user">
                            <div className="profile-post-img">
                              <img
                                src={
                                  post?.userImage ? post?.userImage : emptyUser
                                }
                                alt="profile-post-img"
                              />
                            </div>
                            <div className="profile-post-details">
                              <h4>
                                {post?.userFirstName} {post?.userLastName}
                              </h4>
                              <p>
                                <ReactTimeAgo
                                  date={post?.date}
                                  locale="en-US"
                                />
                                {/* {post.postedOn} */} ·{" "}
                                <i class="fa-solid fa-earth-asia"></i>
                              </p>
                            </div>
                          </div>
                          <div className="options">
                            <div>
                              <i class="fa-solid fa-ellipsis fa-lg"></i>
                            </div>

                            <div
                              onClick={() =>
                                deletePost(
                                  post?._id,
                                  post?.imageId,
                                  post?.postType
                                )
                              }
                            >
                              <i class="fa-solid fa-xmark fa-xl"></i>
                            </div>
                          </div>
                        </div>
                        <div className="profile-post-sec-2">
                          <div className="caption">
                            <p>{post?.caption}</p>
                          </div>
                        </div>
                        <div
                          className="profile-post-sec-3"
                          onClick={() =>
                            navigateTo(`/single-post/${post?._id}`)
                          }
                        >
                          {post?.image?.slice(-3) === "mp4" ? (
                            <div className="video">
                              <video controls autoPlay>
                                <source src={post?.image} type="video/mp4" />
                              </video>
                            </div>
                          ) : (
                            <div className="img">
                              <img src={post?.image} alt="postimage" />
                            </div>
                          )}
                          {/* <div className="img">
                            <img
                              src={`http://localhost:8000/uploads/${post?.image}`}
                              alt="postimage"
                            />
                          </div> */}
                        </div>
                        <div className="profile-post-sec-4">
                          <div className="profile-post-activity">
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
                              <p>0 shares</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div id="profile-no-post-msg">
                      <h3>
                        No Posts Yet from {searchUser?.firstName}{" "}
                        {searchUser?.lastName}!
                      </h3>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePosts;
