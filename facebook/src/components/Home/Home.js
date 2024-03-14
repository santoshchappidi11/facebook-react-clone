import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import like from "./../../images/like.JPG";
import Navbar from "../Navbar/Navbar";
import toast from "react-hot-toast";
import api from "../../ApiConfig";
import { AuthContexts } from "../../Context/AuthContext";
import LikePost from "./LikePost";
import CommentBox from "./CommentBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import StoryPreview from "./StoryPreview";
import HomeLeft from "./HomeLeft";
import HomeRight from "./HomeRight";
import emptyUser from "./../../images/empty-user.jpg";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ReactTimeAgo from "react-time-ago";
// import heart from "./../../images/heart.JPG";

const Home = () => {
  const { state } = useContext(AuthContexts);
  const navigateTo = useNavigate();
  const [isShowCreatePost, setIsShowCreatePost] = useState(false);
  const [caption, setCaption] = useState("");
  const [postImg, setPostImg] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [followingPosts, setFollowingPosts] = useState([]);
  const [allStoryUsers, setAllStoryUsers] = useState();
  const [storyCount, setStoryCount] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState();
  const [pageCount, setPageCount] = useState();
  const [isShowFeedPosts, setIsShowFeedPosts] = useState(true);
  const [isShowFollowingPosts, setIsShowFollowingPosts] = useState(false);
  const [isStoryLoading, setIsStoryLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [postFile, setPostFile] = useState(null);
  const [postVideoFile, setPostVideoFile] = useState(null);
  const [postFileName, setPostFileName] = useState("");
  const [isShowRemove, setIsShowRemove] = useState(false);

  // console.log(postVideoFile, "video file");
  // console.log(caption, "caption video");

  // console.log(followingPosts, "following posts");

  useEffect(() => {
    const totalPageCount = Math.ceil(storyCount / pageSize);
    setPageCount(totalPageCount);
  }, [storyCount, pageSize]);

  const incrementPage = () => {
    if (page == pageCount) {
      setPage(1);
    } else {
      setPage((prev) => prev + 1);
    }
  };

  const decrementPage = () => {
    if (page == 1) {
      setPage(pageCount);
    } else {
      setPage((prev) => prev - 1);
    }
  };

  const handleFeedPostsActive = (e) => {
    if (e.target.innerText == "For You") {
      setIsShowFeedPosts(true);
      setIsShowFollowingPosts(false);
    }

    if (e.target.innerText == "Following") {
      setIsShowFollowingPosts(true);
      setIsShowFeedPosts(false);
    }
  };

  const navigateToProfile = (Id) => {
    if (state?.currentUser?.userId == Id) {
      navigateTo("/profile");
    } else {
      navigateTo(`/friend-profile/${Id}`);
    }
  };

  const openCreatePostPopup = () => {
    setIsShowCreatePost(true);
  };

  const closeCreatePostPopup = () => {
    setIsShowCreatePost(false);
    setPostImg("");
    setIsShowRemove(false);
    setCaption("");
    setPostFileName("");
  };

  useEffect(() => {
    if (state?.currentUser?.firstName) {
      setUserFirstName(state?.currentUser?.firstName);
      setUserLastName(state?.currentUser?.lastName);
    }
  }, [state, navigateTo]);

  useEffect(() => {
    const getAllStories = async () => {
      const token = JSON.parse(localStorage.getItem("Token"));

      if (token) {
        try {
          const response = await api.post("/get-all-stories", { token, page });

          if (response.data.success) {
            setIsStoryLoading(false);
            setAllStoryUsers(response.data.storyUsers);
            setStoryCount(response.data.storyCount);
            setPageSize(response.data.limit);
          } else {
            setIsStoryLoading(false);
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
    };

    getAllStories();
  }, [page]);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const response = await api.get("/get-all-posts");

        if (response.data.success) {
          setIsLoading(false);
          setAllPosts(response.data.allPosts);
        } else {
          setIsLoading(false);
          toast.error(response.data.message);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error.response.data.message);
      }
    };

    getAllPosts();
  }, []);

  useEffect(() => {
    const followingUserPosts = async () => {
      const token = JSON.parse(localStorage.getItem("Token"));

      if (token) {
        try {
          const response = await api.post("/get-following-posts", { token });

          if (response.data.success) {
            setFollowingPosts(response.data.posts);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
    };

    followingUserPosts();
  }, []);

  useEffect(() => {
    const getProfileDetails = async () => {
      const token = JSON.parse(localStorage.getItem("Token"));

      if (token) {
        const response = await api.post("/get-profile-details", { token });

        try {
          if (response.data.success) {
            setProfileImg(response.data.profileImg);
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

  const handleCaptionValue = (e) => {
    setCaption(e.target.value);
  };

  const handlePostImg = (e) => {
    if (e.target.files[0].name.slice(-3) !== "mp4") {
      setPostFile(e.target.files[0]);
      setPostImg(URL.createObjectURL(e.target.files[0]));
      setIsShowRemove(true);
      setPostFileName(e.target.files[0].name);
    } else {
      toast.error("Please select a valid image to post");
    }
  };

  const handlePostVideo = (e) => {
    if (e.target.files[0].name.slice(-3) === "mp4") {
      setPostVideoFile(e.target.files[0]);
      setPostFileName(e.target.files[0].name);
      setIsShowRemove(true);
    } else {
      toast.error("Please select a valid video to post!");
    }
  };

  const handleRemovePostImg = () => {
    setPostImg("");
    setIsShowRemove(false);
    setPostFileName("");
  };

  const handleCreateImgPost = async () => {
    if (postImg && caption) {
      const token = JSON.parse(localStorage.getItem("Token"));

      const formData = new FormData();
      if (postFile) formData.append("postImg", postFile);
      if (caption) formData.append("caption", caption);
      if (profileImg) formData.append("profileImg", profileImg);
      if (userFirstName) formData.append("userFirstName", userFirstName);
      if (userLastName) formData.append("userLastName", userLastName);

      if (token) {
        try {
          const response = await api.post(
            "/add-post",
            // token,
            // postImg,
            // caption,
            // profileImg,
            // userFirstName,
            // userLastName,
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
            setAllPosts(response.data.allPosts);
            setCaption("");
            setPostImg("");
            setPostFileName("");
            setPostFile("");
            setIsShowCreatePost(false);
            setIsShowRemove(false);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    } else {
      toast.error("please select caption and image/video to post something!");
    }
  };

  const handleCreateVideoPost = async (postVideoFile, caption) => {
    if (postVideoFile && caption) {
      const token = JSON.parse(localStorage.getItem("Token"));

      const formData = new FormData();
      if (postVideoFile) formData.append("postVideo", postVideoFile);
      if (caption) formData.append("caption", caption);
      if (profileImg) formData.append("profileImg", profileImg);
      if (userFirstName) formData.append("userFirstName", userFirstName);
      if (userLastName) formData.append("userLastName", userLastName);

      if (token) {
        try {
          const response = await api.post(
            "/add-video-post",
            // token,
            // postImg,
            // caption,
            // profileImg,
            // userFirstName,
            // userLastName,
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
            setAllPosts(response.data.allPosts);
            setCaption("");
            setPostImg("");
            setPostFileName("");
            setPostVideoFile("");
            setIsShowCreatePost(false);
            setIsShowRemove(false);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    } else {
      toast.error("please select caption and image/video to post something!");
    }
  };

  const handleCreatePostSubmit = async (e) => {
    e.preventDefault();

    console.log(postFile);
    if (postFile && caption) {
      handleCreateImgPost();
    } else {
      handleCreateVideoPost(postVideoFile, caption);
    }
  };

  return (
    <>
      <div id="home">
        <Navbar />
        <HomeLeft state={state} profileImg={profileImg} />

        <div id="middle">
          {isStoryLoading ? (
            <>
              <div id="story-loading-msg">
                <h3>Loading...</h3>
              </div>
            </>
          ) : (
            <>
              <StoryPreview
                allStoryUsers={allStoryUsers}
                incrementPage={incrementPage}
                decrementPage={decrementPage}
              />
            </>
          )}

          <div id="story" onClick={() => navigateTo("/create-story")}>
            <i class="fa-solid fa-plus"></i>
            <div id="create-story-home">
              <h3>Create Story</h3>
              <p>Share a photo or write something.</p>
            </div>
          </div>
          <div id="post-something">
            <div id="top">
              <div id="post-profile-img">
                <img
                  src={profileImg ? profileImg : emptyUser}
                  alt="profile"
                  onClick={() => navigateTo("/profile")}
                />
              </div>
              <button onClick={openCreatePostPopup}>
                What's on your mind, {state?.currentUser?.firstName}?
              </button>
            </div>
            <div id="down">
              <div>
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/c0dWho49-X3.png"
                  alt="video"
                />
                <p>Live video</p>
              </div>
              <div onClick={openCreatePostPopup}>
                <img
                  src="	https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png"
                  alt="post"
                />
                <p>Photo/video</p>
              </div>
              <div>
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png"
                  alt="activity"
                />
                <p>Feeling/activity</p>
              </div>
            </div>
          </div>

          <div id="filter-feed-posts" onClick={handleFeedPostsActive}>
            <div className="feed-posts">
              <button
                className={isShowFeedPosts ? `${"feed-active"}` : ""}
                style={{
                  backgroundColor: `${isShowFeedPosts ? "white" : ""}`,
                }}
              >
                For You
              </button>
            </div>
            <div className="feed-posts">
              <button
                className={isShowFollowingPosts ? `${"feed-active"}` : ""}
                style={{
                  backgroundColor: `${isShowFollowingPosts ? "white" : ""}`,
                }}
              >
                Following
              </button>
            </div>
          </div>

          {isLoading ? (
            <div id="loading-msg">
              <h3>Loading...</h3>
            </div>
          ) : (
            <>
              {isShowFeedPosts && (
                <div id="posts">
                  {allPosts?.length > 0 ? (
                    allPosts?.map((post) => (
                      <div className="post" key={post._id}>
                        <div className="postsec-1">
                          <div className="post-user">
                            <div className="post-img">
                              <img
                                src={
                                  post?.userImage ? post?.userImage : emptyUser
                                }
                                alt="post-img"
                                onClick={() => navigateToProfile(post?.userId)}
                              />
                            </div>
                            <div className="post-details">
                              <h4
                                onClick={() => navigateToProfile(post?.userId)}
                              >
                                {post?.userFirstName} {post?.userLastName}
                              </h4>
                              <p>
                                <ReactTimeAgo
                                  date={post?.date}
                                  locale="en-US"
                                />
                                {/* {post?.postedOn}  */} ·{" "}
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
                            <p>{post.caption}</p>
                          </div>
                        </div>
                        <div
                          className="postsec-3"
                          onClick={() => navigateTo(`/single-post/${post._id}`)}
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
                              {/* <img src={heart} alt="heart" /> */}
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
                        <div className="postsec-5">
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
                        {
                          <CommentBox
                            postId={post._id}
                            setAllPosts={setAllPosts}
                          />
                        }
                      </div>
                    ))
                  ) : (
                    <div id="no-post-msg">
                      <h3>No Posts to show!</h3>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {isLoading ? (
            <>
              {/* <div id="loading-msg">
               <h3>Loading...</h3>
            </div> */}
            </>
          ) : (
            <>
              {isShowFollowingPosts && (
                <div id="posts">
                  {followingPosts?.length ? (
                    followingPosts?.map((post) => (
                      <div className="post" key={post._id}>
                        <div className="postsec-1">
                          <div className="post-user">
                            <div className="post-img">
                              <img
                                src={
                                  post?.userImage ? post?.userImage : emptyUser
                                }
                                alt="post-img"
                                onClick={() => navigateToProfile(post?.userId)}
                              />
                            </div>
                            <div className="post-details">
                              <h4
                                onClick={() => navigateToProfile(post?.userId)}
                              >
                                {post?.userFirstName} {post?.userLastName}
                              </h4>

                              {post?.date && (
                                <p>
                                  <ReactTimeAgo
                                    date={post?.date}
                                    locale="en-US"
                                  />
                                  {/* {post?.postedOn} */} ·{" "}
                                  <i class="fa-solid fa-earth-asia"></i>
                                </p>
                              )}
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
                          onClick={() =>
                            navigateTo(`/single-post/${post?._id}`)
                          }
                        >
                          {post?.image?.slice(-3) === "mp4" ? (
                            <div className="video">
                              <video controls>
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
                              {/* <img src={heart} alt="heart" /> */}
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
                              postId={post?._id}
                              likes={post?.likes}
                              setFollowingPosts={setFollowingPosts}
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
                        </div> */}
                        {/* {
                          <CommentBox
                            postId={post?._id}
                            setAllPosts={setAllPosts}
                          />
                        } */}
                      </div>
                    ))
                  ) : (
                    <div id="no-post-msg">
                      <h3>No Posts to show!</h3>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
        <HomeRight />

        {/* -------------------------------------create-post---------------------------------------- */}

        {isShowCreatePost && (
          <div id="create-post-screen">
            <div id="create-post">
              <div id="create-post-header">
                <h4>Create Post</h4>
                <i
                  class="fa-solid fa-xmark fa-lg"
                  onClick={closeCreatePostPopup}
                ></i>
              </div>
              <div id="create-post-body">
                <form
                  onSubmit={handleCreatePostSubmit}
                  encType="multipart/form-data"
                >
                  <div id="post-body-1">
                    {/* <i class="fa-solid fa-circle-user"></i> */}
                    <div id="post-profile-img">
                      <img
                        src={profileImg ? profileImg : emptyUser}
                        alt="profile"
                      />
                    </div>
                    <div id="show-post-to">
                      <h4>
                        {state?.currentUser?.firstName}{" "}
                        {state?.currentUser?.lastName}
                      </h4>
                      <select>
                        <option>Only Me</option>
                        <option>Public</option>
                        <option>Friends</option>
                      </select>
                    </div>
                  </div>
                  <div id="post-body-2">
                    <input
                      type="text"
                      name="caption"
                      placeholder={`What's on your mind, ${state?.currentUser?.firstName}`}
                      onChange={handleCaptionValue}
                      value={caption}
                    />
                  </div>
                  <div id="post-body-3">
                    <img
                      src="https://www.facebook.com/images/composer/SATP_Aa_square-2x.png"
                      alt="story"
                    />
                    {postImg && (
                      <div id="post-img-preview">
                        <img src={postImg} alt="post" />
                      </div>
                    )}
                    <i class="fa-regular fa-face-smile fa-xl"></i>
                  </div>
                  <p id="post-file-name">{postFileName}</p>
                  {isShowRemove && (
                    <div id="remove-post-img" onClick={handleRemovePostImg}>
                      <h4>
                        Remove <FontAwesomeIcon icon={faXmark} />
                      </h4>
                    </div>
                  )}
                  <div id="post-body-4">
                    <h4>Add to your post</h4>
                    <div id="add-to-post">
                      <label>
                        <i class="fa-regular fa-image fa-xl"></i>
                        {/* <img
                          src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png"
                          alt="story"
                        /> */}
                        <input type="file" onChange={handlePostImg} />
                      </label>
                      <label>
                        <i class="fa-solid fa-video fa-xl"></i>
                        {/* <img
                          src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png"
                          alt="story"
                        /> */}
                        <input
                          type="file"
                          name="video"
                          accept="video/*"
                          onChange={handlePostVideo}
                        />
                      </label>
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/b37mHA1PjfK.png"
                        alt="story"
                      />
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png"
                        alt="story"
                      />
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/8zlaieBcZ72.png"
                        alt="story"
                      />
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/q7MiRkL7MLC.png"
                        alt="story"
                      />
                      <i className="fa-solid fa-ellipsis"></i>
                    </div>
                  </div>
                  <div id="post-body-5">
                    <button type="submit">Post</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
