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
  const [followingPosts, setFollowingPosts] = useState();
  const [allStoryUsers, setAllStoryUsers] = useState();
  const [storyCount, setStoryCount] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState();
  const [pageCount, setPageCount] = useState();
  const [isShowFeedPosts, setIsShowFeedPosts] = useState(true);
  const [isShowFollowingPosts, setIsShowFollowingPosts] = useState(false);

  // console.log(followingPosts, "following posts");
  // console.log(allPosts, "all posts");

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
    console.log("clicked decrement");
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
            setAllStoryUsers(response.data.storyUsers);
            setStoryCount(response.data.storyCount);
            setPageSize(response.data.limit);
          } else {
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
          setAllPosts(response.data.allPosts);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
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

  const handleProfileImg = (e) => {
    const reader = new FileReader();

    const fileData = e.target.files[0];

    if (fileData) {
      reader.readAsDataURL(fileData);
    }

    reader.onload = () => {
      setPostImg(reader.result);
      // console.log(reader.result, "URL");
    };
  };

  const handleCreatePostSubmit = async (e) => {
    e.preventDefault();

    if (postImg && caption) {
      const token = JSON.parse(localStorage.getItem("Token"));

      if (token) {
        try {
          const response = await api.post("/add-post", {
            token,
            postImg,
            caption,
            profileImg,
            userFirstName,
            userLastName,
          });

          if (response.data.success) {
            toast.success(response.data.message);
            setAllPosts(response.data.allPosts);
            setCaption("");
            setPostImg("");
            setIsShowCreatePost(false);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    } else {
      toast.error("please select caption and image to post something!");
    }
  };

  return (
    <>
      <div id="home">
        <Navbar />
        <HomeLeft state={state} profileImg={profileImg} />

        <div id="middle">
          <StoryPreview
            allStoryUsers={allStoryUsers}
            incrementPage={incrementPage}
            decrementPage={decrementPage}
          />
          {/* <div id="middle-story-structure">
            <div id="story-structure">
              {allStoryUsers?.length ? (
                allStoryUsers?.map((item) => (
                  <>
                    {" "}
                    <div className="single-story" key={item._id}>
                      {item?.yourStories && (
                        <>
                          <div className="story-preview">
                            <img
                              src={item.yourStories[0].storyImg}
                              alt="story"
                            />
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
          </div> */}
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
                  src={profileImg}
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
              <div>
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

          {isShowFeedPosts && (
            <div id="posts">
              {allPosts?.length ? (
                allPosts?.map((post) => (
                  <div className="post" key={post._id}>
                    <div className="postsec-1">
                      <div className="post-user">
                        <div className="post-img">
                          <img
                            src={post?.userImage}
                            alt="post-img"
                            onClick={() => navigateToProfile(post?.userId)}
                          />
                        </div>
                        <div className="post-details">
                          <h4 onClick={() => navigateToProfile(post?.userId)}>
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
                    <div className="postsec-2">
                      <div className="caption">
                        <p>{post.caption} 😂🤗</p>
                      </div>
                    </div>
                    <div
                      className="postsec-3"
                      onClick={() => navigateTo(`/single-post/${post._id}`)}
                    >
                      <div className="img">
                        <img src={post?.image} alt="postimage" />
                      </div>
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
                          <p>112 shares</p>
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
                    {<CommentBox postId={post._id} setAllPosts={setAllPosts} />}
                  </div>
                ))
              ) : (
                <div id="no-post-msg">
                  <h3>No Posts to show!</h3>
                </div>
              )}
            </div>
          )}

          {isShowFollowingPosts && (
            <div id="posts">
              {followingPosts?.length ? (
                followingPosts?.map((post) => (
                  <div className="post" key={post._id}>
                    <div className="postsec-1">
                      <div className="post-user">
                        <div className="post-img">
                          <img
                            src={post?.userImage}
                            alt="post-img"
                            onClick={() => navigateToProfile(post?.userId)}
                          />
                        </div>
                        <div className="post-details">
                          <h4 onClick={() => navigateToProfile(post?.userId)}>
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
                    <div className="postsec-2">
                      <div className="caption">
                        <p>{post.caption} 😂🤗</p>
                      </div>
                    </div>
                    <div
                      className="postsec-3"
                      onClick={() => navigateTo(`/single-post/${post._id}`)}
                    >
                      <div className="img">
                        <img src={post?.image} alt="postimage" />
                      </div>
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
                          <p>112 shares</p>
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
                    {<CommentBox postId={post._id} setAllPosts={setAllPosts} />}
                  </div>
                ))
              ) : (
                <div id="no-post-msg">
                  <h3>No Posts to show!</h3>
                </div>
              )}
            </div>
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
                <form onSubmit={handleCreatePostSubmit}>
                  <div id="post-body-1">
                    {/* <i class="fa-solid fa-circle-user"></i> */}
                    <div id="post-profile-img">
                      <img src={profileImg} alt="profile" />
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
                  <div id="post-body-4">
                    <h4>Add to your post</h4>
                    <div id="add-to-post">
                      <label>
                        {/* <br /> */}
                        {/* <i class="fa fa-xl fa-camera"></i> */}
                        <img
                          src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png"
                          alt="story"
                        />
                        <input type="file" onClick={handleProfileImg} />
                        {/* <br /> */}
                        {/* <span id="profileImageName"></span> */}
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
