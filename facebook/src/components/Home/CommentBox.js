import React, { useContext, useEffect, useState } from "react";
import api from "../../ApiConfig";
import toast from "react-hot-toast";
import { AuthContexts } from "../../Context/AuthContext";

const CommentBox = ({ postId, setAllPosts, setSinglePost }) => {
  const { state } = useContext(AuthContexts);
  const [userComment, setUserComment] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImg, setProfileImg] = useState("");

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

  useEffect(() => {
    if (state?.currentUser?.email) {
      setFirstName(state?.currentUser?.firstName);
      setLastName(state?.currentUser?.lastName);
    }
  }, [state]);

  const handleCommentValue = (e) => {
    setUserComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (userComment) {
      const token = JSON.parse(localStorage.getItem("Token"));

      if (token && firstName && lastName) {
        console.log(token, firstName, lastName, profileImg);
        try {
          const response = await api.post("/add-comment", {
            userComment,
            token,
            postId,
            firstName,
            lastName,
            profileImg,
          });

          if (response.data.success) {
            toast.success(response.data.message);
            if (setAllPosts) {
              setAllPosts(response.data.allPosts);
            }

            if (setSinglePost) {
              setSinglePost(response.data.post);
            }

            setUserComment("");
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    } else {
      toast.error("Please write something, to add comment!");
    }
  };

  return (
    <div id="user-comment">
      <input
        type="text"
        placeholder="Enter Your Comment..."
        onChange={handleCommentValue}
        value={userComment}
      />
      <button onClick={() => handleCommentSubmit(postId)}>Comment</button>
    </div>
  );
};

export default CommentBox;
