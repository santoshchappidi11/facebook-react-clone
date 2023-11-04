import React, { useEffect, useState } from "react";
import "./SinglePost.css";
import { useParams } from "react-router-dom";
import api from "../../ApiConfig";
import toast from "react-hot-toast";
import Navbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const SinglePost = () => {
  const { postId } = useParams();
  const [singlePost, setSinglePost] = useState({});
  console.log(singlePost);

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
            setSinglePost(response.data.post);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    };

    getSinglePost();
  }, [postId]);

  return (
    <>
      <Navbar />
      <div id="single-post">
        <div id="single-post-left">
          <div id="single-post-header">
            <div id="single-post-profile-img">
              <img src={singlePost.userImage} alt="profile" />
            </div>
            <h3>
              {singlePost.userFirstName} {singlePost.userLastName}
            </h3>
          </div>
          <div id="main-post">
            <div>
              <div id="single-post-caption">
                <h4>
                  Caption : <span>{singlePost?.caption}</span>
                </h4>
              </div>
              <div id="single-post-img">
                <img src={singlePost?.image} alt="post" />
              </div>
            </div>
          </div>
        </div>
        <div id="single-post-right">
          <div id="comment-header">
            <h3>Comments:</h3>
          </div>

          {singlePost?.comments?.length ? (
            singlePost?.comments?.map((item) => (
              <div id="post-single-comment">
                <div id="delete-comment">
                  <FontAwesomeIcon icon={faXmark} />
                </div>
                <div id="comment-profile">
                  <div id="comment-profile-img">
                    <img src={item.profileImg} alt="profile" />
                  </div>
                  <h3>
                    {item.firstName} {item.lastName}
                  </h3>
                </div>
                <div id="main-comment">
                  <h5>{item.comment}</h5>
                </div>
              </div>
            ))
          ) : (
            <p>No Comments Yet!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SinglePost;
