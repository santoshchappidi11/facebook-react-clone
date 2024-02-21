import React, { useContext, useEffect, useState } from "react";
import "./Search.css";
import Navbar from "../Navbar/Navbar";
import toast from "react-hot-toast";
import api from "../../ApiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faCreditCard } from "@fortawesome/free-solid-svg-icons";
// import LikePost from "../Home/LikePost";
// import CommentBox from "../Home/CommentBox";
// import { faShare } from "@fortawesome/free-solid-svg-icons";
// import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import like from "./../../images/like.JPG";
import { AuthContexts } from "../../Context/AuthContext";
import FollowBtn from "./FollowBtn";
import emptyUser from "./../../images/empty-user.jpg";
import ReactTimeAgo from "react-time-ago";

const Search = () => {
  const { state, UserFollowings, UserFollowers } = useContext(AuthContexts);
  const [searchUser, setSearchUser] = useState({});
  const [allPosts, setAllPosts] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const navigateTo = useNavigate();
  const { searchId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isShowFollowBtn, setIsShowFollowBtn] = useState(false);

  console.log(state, "state");
  console.log(searchUser, "search user");

  useEffect(() => {
    for (let i = 0; i < state?.followings?.length; i++) {
      if (searchId == state?.followings[i]) {
        setIsFollow(true);
      }
    }
  }, [searchId, state]);

  useEffect(() => {
    if (searchUser?._id === state?.currentUser?.userId) {
      setIsShowFollowBtn(false);
    } else {
      setIsShowFollowBtn(true);
    }
  }, [searchUser, state]);

  const navigateToProfile = (Id) => {
    if (state?.currentUser?.userId == Id) {
      navigateTo("/profile");
    } else {
      navigateTo(`/friend-profile/${Id}`);
    }
  };

  useEffect(() => {
    const getSearchResults = async () => {
      if (searchId) {
        try {
          const response = await api.post("/get-search-result", {
            userId: searchId,
          });

          if (response.data.success) {
            setIsLoading(false);
            setSearchUser(response.data.user);
            setAllPosts(response.data.posts);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
    };

    getSearchResults();
  }, [searchId]);

  const sendAndRemoveFriendRequest = async (friendId) => {
    const token = JSON.parse(localStorage.getItem("Token"));

    if (token) {
      try {
        const response = await api.post("/send-remove-follow-request", {
          token,
          friendId,
        });

        if (response.data.success) {
          UserFollowings(response.data.followings);
          UserFollowers(response.data.followers);
          setIsFollow(response.data.isFollow);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <div id="search">
      <Navbar />
      <div id="left">
        <h3>Filters</h3>
        {/* <div className="left-sec">
        </div> */}
        <div className="left-sec">
          <i class="fa-solid fa-photo-film fa-lg"></i>
          <h4>All</h4>
        </div>
        <div className="left-sec">
          <i class="fa-solid fa-comment fa-lg"></i>
          <h4>Post</h4>
        </div>
        <div className="left-sec">
          <i class="fa-solid fa-user-group fa-lg"></i>
          <h4>People</h4>
        </div>
        <div className="left-sec">
          <i class="fa-regular fa-image fa-lg"></i>
          <h4>Photos</h4>
        </div>
        <div className="left-sec">
          <i class="fa-brands fa-youtube fa-lg"></i>
          <h4>Videos</h4>
        </div>
        <div className="left-sec">
          <i class="fa-solid fa-store fa-lg"></i>
          <h4>MarketPlace</h4>
        </div>
        <div className="left-sec">
          <i class="fa-solid fa-flag fa-lg"></i>
          <h4>Pages</h4>
        </div>
        <div className="left-sec">
          <i class="fa-solid fa-location-dot fa-lg"></i>
          <h4>Places</h4>
        </div>
        <div className="left-sec">
          <i class="fa-solid fa-users fa-lg"></i>
          <h4>Groups</h4>
        </div>
        <div className="left-sec">
          <i class="fa-solid fa-calendar-plus fa-lg"></i>
          <h4>Events</h4>
        </div>
      </div>
      <div id="middle">
        <div id="middle-header">
          <div id="middle-header-up">
            <div id="middle-header-img">
              <img
                src={
                  searchUser?.profileImg ? searchUser?.profileImg : emptyUser
                }
                alt="search"
                onClick={() => navigateToProfile(searchUser?._id)}
              />
            </div>
            <div id="middle-header-name">
              <h4 onClick={() => navigateToProfile(searchUser?._id)}>
                {searchUser?.firstName} {searchUser?.lastName}
              </h4>
              <span>
                {searchUser?.followers?.length}{" "}
                {searchUser?.followers?.length > 1 ? "followers" : "follower"}
              </span>
            </div>
          </div>
          <div id="middle-header-middle">
            <p>
              <FontAwesomeIcon icon={faCircleInfo} className="profile-info" />
              {searchUser?.bioData
                ? searchUser?.bioData
                : `No Bio Yet from ${searchUser?.firstName}!`}
            </p>
            <p>
              {" "}
              <FontAwesomeIcon
                icon={faCreditCard}
                className="profile-posts"
              />{" "}
              {allPosts?.length ? allPosts?.length : "0"}{" "}
              {allPosts?.length > 1 ? "posts" : "post"} of{" "}
              {searchUser?.firstName} {searchUser?.lastName}.
            </p>
          </div>
          <div id="middle-header-down">
            {isShowFollowBtn ? (
              <FollowBtn
                isFollow={isFollow}
                searchUserId={searchUser?._id}
                sendAndRemoveFriendRequest={sendAndRemoveFriendRequest}
              />
            ) : (
              <button onClick={() => navigateTo("/profile")}>
                View Profile
              </button>
            )}
          </div>
        </div>

        <div id="middle-body">
          {isLoading ? (
            <>
              {" "}
              <div id="search-posts-loading-msg">
                <h3>Loading...</h3>
              </div>
            </>
          ) : (
            <div id="posts">
              {allPosts?.length ? (
                allPosts?.map((post) => (
                  <div className="post" key={post?._id}>
                    <div className="postsec-1">
                      <div className="post-user">
                        <div className="post-img">
                          <img
                            src={post?.userImage ? post?.userImage : emptyUser}
                            alt="post-img"
                            onClick={() => navigateToProfile(post?.userId)}
                          />
                        </div>
                        <div className="post-details">
                          <h4 onClick={() => navigateToProfile(post?.userId)}>
                            {post?.userFirstName} {post?.userLastName}
                          </h4>
                          <p>
                            <ReactTimeAgo date={post?.date} locale="en-US" />
                            {/* {post?.postedOn} */} ·{" "}
                            <i class="fa-solid fa-earth-asia"></i>
                          </p>
                        </div>
                      </div>
                      <div className="options">
                        <i class="fa-solid fa-ellipsis fa-lg"></i>
                        <i class="fa-solid fa-xmark fa-xl"></i>
                      </div>
                    </div>
                    <div className="postsec-2">
                      <div className="caption">
                        <p>{post?.caption}</p>
                      </div>
                    </div>
                    <div
                      className="postsec-3"
                      onClick={() => navigateTo(`/single-post/${post?._id}`)}
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
                    <div className="postsec-4">
                      <div className="post-activity">
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
                    {/* <div className="postsec-5">
                    <div>
                      <LikePost
                        postId={post._id}
                        likes={post?.likes}
                        setAllPosts={setAllPosts}
                      />
                      <p>Like</p>
                    </div>
                    <div id="sec-5-comment">
                      <FontAwesomeIcon icon={faMessage} />
                      <p>Comment</p>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faShare} />
                      <p>Share</p>
                    </div>
                  </div>
                  {<CommentBox postId={post._id} setAllPosts={setAllPosts} />} */}
                  </div>
                ))
              ) : (
                <div id="no-post-msg">
                  <h3>
                    No Posts Yet from {searchUser?.firstName}{" "}
                    {searchUser?.lastName}!
                  </h3>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
