import React, { useContext, useEffect, useState } from "react";
import "./SinglePost.css";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../ApiConfig";
import toast from "react-hot-toast";
import Navbar from "../Navbar/Navbar";
import like from "./../../images/like.JPG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import LikePost from "../Home/LikePost";
import CommentBox from "../Home/CommentBox";
import { AuthContexts } from "../../Context/AuthContext";
import emptyUser from "./../../images/empty-user.jpg";
import postPlaceholder from "./../../images/post-placeholder.png";
import ReactTimeAgo from "react-time-ago";

const SinglePost = () => {
  const { state } = useContext(AuthContexts);
  const { postId } = useParams();
  const navigateTo = useNavigate();
  const [singlePost, setSinglePost] = useState({});
  const [editComment, setEditComment] = useState("");
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [updatedComment, setUpdatedComment] = useState("");
  const [isShowCommentBox, setIsShowCommentBox] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigateToProfile = (Id) => {
    if (state?.currentUser?.userId == Id) {
      navigateTo("/profile");
    } else {
      navigateTo(`/friend-profile/${Id}`);
    }
  };

  const handleUpdatedCommentValue = (e) => {
    setUpdatedComment(e.target.value);
  };

  const toggleCommentBox = () => {
    setIsShowCommentBox(!isShowCommentBox);
  };

  useEffect(() => {
    const getSinglePost = async () => {
      const token = JSON.parse(localStorage.getItem("Token"));

      if (token && postId) {
        try {
          const response = await api.post("/get-single-post", {
            token,
            postId,
          });

          if (response.data.success) {
            setIsLoading(false);
            setSinglePost(response.data.post);
          } else {
            setIsLoading(false);
            toast.error(response.data.message);
          }
        } catch (error) {
          setIsLoading(false);
          toast.error(error.response.data.message);
        }
      }
    };

    getSinglePost();
  }, [postId]);

  const deleteComment = async (ID) => {
    const token = JSON.parse(localStorage.getItem("Token"));

    if (token) {
      try {
        const response = await api.post("/delete-comment", {
          token,
          postId,
          ID,
        });

        if (response.data.success) {
          setSinglePost(response.data.post);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const getEditComment = async (ID) => {
    const token = JSON.parse(localStorage.getItem("Token"));

    if (token && postId) {
      try {
        const response = await api.post("/get-edit-comment", {
          token,
          postId,
          ID,
        });

        if (response.data.success) {
          setIsShowEditModal(true);
          setEditComment(response.data.editComment);
          setUpdatedComment(response.data.comment);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const updateUserComment = async (ID) => {
    const token = JSON.parse(localStorage.getItem("Token"));

    if (token && postId) {
      try {
        const response = await api.post("/update-comment", {
          token,
          postId,
          ID,
          updatedComment,
        });

        if (response.data.success) {
          setIsShowEditModal(false);
          // setUpdatedComment(response.data.comment);
          setSinglePost(response.data.post);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  const closeEditPostModal = () => {
    setIsShowEditModal(false);
  };

  return (
    <>
      <Navbar />
      <div id="single-post">
        <div id="single-post-left">
          <div id="single-post-img">
            {singlePost?.image?.slice(-3) === "mp4" ? (
              <div id="video">
                <video controls>
                  <source src={singlePost?.image} type="video/mp4" />
                </video>
              </div>
            ) : (
              <div id="main-img">
                <img
                  src={singlePost?.image ? singlePost?.image : postPlaceholder}
                  alt="post"
                />
              </div>
            )}
            {/* <div id="main-img">
              <img
                src={
                  singlePost?.image
                    ? `http://localhost:8000/uploads/${singlePost?.image}`
                    : postPlaceholder
                }
                alt="post"
              />
            </div> */}
          </div>
        </div>
        <div id="single-post-right">
          <div id="single-post-user">
            <div id="user-up">
              <div id="post-user">
                <div id="post-user-img">
                  <img
                    src={
                      singlePost?.userImage ? singlePost?.userImage : emptyUser
                    }
                    alt="post-img"
                    onClick={() => navigateToProfile(singlePost?.userId)}
                  />
                </div>
                <div id="post-user-details">
                  <h4 onClick={() => navigateToProfile(singlePost?.userId)}>
                    {singlePost?.userFirstName} {singlePost?.userLastName}
                  </h4>
                  <p>
                    {singlePost?.date && (
                      <ReactTimeAgo date={singlePost?.date} locale="en-US" />
                    )}
                    {/* {singlePost?.postedOn} */} ·{" "}
                    <i class="fa-solid fa-earth-asia"></i>
                  </p>
                </div>
              </div>
              <div className="post-user-options">
                <i class="fa-solid fa-ellipsis fa-lg"></i>
              </div>
            </div>
            <div id="user-middle">
              <p>{singlePost?.caption}</p>
            </div>
            <div id="user-down">
              <div id="user-activity">
                <div id="user-left">
                  <img src={like} alt="like" />
                  <p>{singlePost?.likes ? singlePost?.likes?.length : "0"}</p>
                </div>
                <div id="user-right">
                  <p>
                    <FontAwesomeIcon icon={faMessage} />{" "}
                    {singlePost?.comments ? singlePost?.comments?.length : "0"}
                    {singlePost?.comments?.length > 1
                      ? " comments"
                      : " comment"}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faShare} /> 0 shares
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div id="user-actions">
            <div>
              <LikePost
                postId={singlePost?._id}
                likes={singlePost?.likes}
                setSinglePost={setSinglePost}
              />
              <p>Like</p>
            </div>
            <div onClick={toggleCommentBox}>
              <FontAwesomeIcon icon={faMessage} />
              <p>Comment</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faShare} />
              <p>Share</p>
            </div>
          </div>
          {isShowCommentBox && (
            <CommentBox
              postId={singlePost?._id}
              setSinglePost={setSinglePost}
            />
          )}
          {isLoading ? (
            <>
              <div id="comments-loading-msg">
                <h3>Loading...</h3>
              </div>
            </>
          ) : (
            <div id="single-post-comments">
              {singlePost?.comments?.length > 0 ? (
                singlePost?.comments?.map((item) => (
                  <div className="comment" key={item?.commentId}>
                    <div className="comment-img">
                      <img
                        src={item?.profileImg ? item?.profileImg : emptyUser}
                        alt="comment"
                        onClick={() => navigateToProfile(item?.userId)}
                      />
                    </div>
                    <div className="comment-details">
                      <div className="details">
                        <h5 onClick={() => navigateToProfile(item?.userId)}>
                          {item?.firstName} {item?.lastName}
                        </h5>
                        <div className="main-comment">
                          <p>{item?.comment}</p>
                        </div>
                      </div>
                      <div className="comment-actions">
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="edit"
                          onClick={() => getEditComment(item?.commentId)}
                        />
                        <FontAwesomeIcon
                          icon={faXmark}
                          className="delete"
                          onClick={() => deleteComment(item?.commentId)}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div id="no-single-post-comment">
                  <p>No Comments Yet!</p>
                </div>
              )}
            </div>
          )}
        </div>

        {isShowEditModal && (
          <div id="edit-comment-modal-screen">
            <div id="edit-comment-modal">
              <div id="edit-modal-header">
                <h4>Edit Comment</h4>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="edit-modal-close"
                  onClick={closeEditPostModal}
                />
              </div>
              <div id="edit-modal-body">
                <div id="edit-comment-img">
                  <img
                    src={
                      editComment?.profileImg
                        ? editComment?.profileImg
                        : emptyUser
                    }
                    alt="comment"
                  />
                </div>
                <div id="edit-comment-details">
                  <h5>
                    {editComment?.firstName} {editComment?.lastName}
                  </h5>
                  <div id="edit-main-comment">
                    <input
                      type="text"
                      placeholder="Edit Your Comment..."
                      value={updatedComment}
                      onChange={handleUpdatedCommentValue}
                    />
                    <button
                      type="submit"
                      onClick={() => updateUserComment(editComment?.commentId)}
                    >
                      Update Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SinglePost;
