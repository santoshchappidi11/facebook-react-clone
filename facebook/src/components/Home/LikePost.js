import React, { useContext, useEffect, useState } from "react";
import api from "../../ApiConfig";
import toast from "react-hot-toast";
import { AuthContexts } from "../../Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const LikePost = ({
  postId,
  likes,
  setAllPosts,
  setSinglePost,
  setFollowingPosts,
}) => {
  const { state } = useContext(AuthContexts);
  const [isPostLiked, setIsPostLiked] = useState();

  useEffect(() => {
    for (let i = 0; i < likes?.length; i++) {
      if (likes[i] == state?.currentUser?.userId) {
        setIsPostLiked(true);
      }
      // else {
      //   setIsPostLiked(false);
      // }
    }
  }, [state, likes]);

  const handlePostLike = async () => {
    const token = JSON.parse(localStorage.getItem("Token"));

    if (token) {
      const response = await api.post("/like-unlike-post", { token, postId });

      if (response.data.success) {
        toast.success(response.data.message);
        setIsPostLiked(response.data.isPostLike);
        if (setAllPosts) {
          setAllPosts(response.data.allPosts);
        }

        if (setSinglePost) {
          setSinglePost(response.data.singlePost);
        }

        if (setFollowingPosts) {
          setFollowingPosts(response.data.followingPosts);
        }
      } else {
        toast.error(response.data.message);
      }
    }
  };

  return (
    <div>
      <FontAwesomeIcon
        icon={faThumbsUp}
        style={{
          cursor: "pointer",
          color: `${isPostLiked ? "orangered" : "black"}`,
        }}
        onClick={handlePostLike}
      />
    </div>
  );
};

export default LikePost;
