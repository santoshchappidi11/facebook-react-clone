import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
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
import like from "./../../images/like.JPG";
import Navbar from "../Navbar/Navbar";
import toast from "react-hot-toast";
import api from "../../ApiConfig";
import { AuthContexts } from "../../Context/AuthContext";
import LikePost from "./LikePost";
import CommentBox from "./CommentBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
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
  // const [isShowCommentBox, setIsShowCommentBox] = useState(false);

  // console.log(allPosts);

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
  }, [state]);

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

  // const handleShowCommentbox = () => {
  //   setIsShowCommentBox(!isShowCommentBox);
  // };

  return (
    <>
      <div id="home">
        <Navbar />
        <div id="left">
          <div className="left-sec">
            <div id="left-profile-img">
              <img src={profileImg} alt="profile" />
            </div>
            <h4 style={{ marginLeft: "5px" }}>
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
            <i
              class="fa-solid fa-angle-down"
              style={{ marginRight: "5px" }}
            ></i>
            <h4 style={{ marginLeft: "5px" }}>See more</h4>
          </div>
        </div>
        <div id="middle">
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
                <img src={profileImg} alt="profile" />
              </div>
              <button onClick={openCreatePostPopup}>
                What's on your mind, Santosh?
              </button>
              {/* <input type="text" placeholder="What's on your mind, Santosh?" /> */}
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
          <div id="posts">
            {allPosts?.length ? (
              allPosts?.map((post) => (
                <div className="post" key={post._id}>
                  <div className="postsec-1">
                    <div className="post-user">
                      <div className="post-img">
                        <img src={post?.userImage} alt="post-img" />
                      </div>
                      <div className="post-details">
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
                        <p>531 comments</p>
                        <p>112 shares</p>
                      </div>
                    </div>
                  </div>
                  <div className="postsec-5">
                    <div>
                      <LikePost postId={post._id} likes={post?.likes} setAllPosts={setAllPosts} />
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
                  <CommentBox postId={post._id} />
                </div>
              ))
            ) : (
              <div id="no-post-msg">
                <h3>No Posts to show!</h3>
              </div>
            )}
          </div>
        </div>
        <div id="right">
          <div id="header">
            <h4>Group conversations</h4>
          </div>
          <div id="new-group">
            <i class="fa-solid fa-plus"></i>
            <p>Create New Group</p>
          </div>
        </div>

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
                      placeholder="What's on your mind, Santosh?"
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
                      <i class="fa-solid fa-ellipsis"></i>
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
