import React, { useContext, useEffect, useState } from "react";
import api from "../../ApiConfig";
import toast from "react-hot-toast";
import { AuthContexts } from "../../Context/AuthContext";

const LikePost = ({ postId, likes }) => {
  const { state } = useContext(AuthContexts);
  const [isPostLiked, setIsPostLiked] = useState();

  useEffect(() => {
    for (let i = 0; i < likes.length; i++) {
      if (likes[i] == state?.currentUser?.userId) {
        setIsPostLiked(true);
      } else {
        setIsPostLiked(false);
      }
    }
  }, [state, likes]);

  const handlePostLike = async () => {
    const token = JSON.parse(localStorage.getItem("Token"));

    if (token) {
      const response = await api.post("/like-unlike-post", { token, postId });

      if (response.data.success) {
        toast.success(response.data.message);
        setIsPostLiked(response.data.isPostLike);
      } else {
        toast.error(response.data.message);
      }
    }
  };

  return (
    <div>
      <i
        class="fa-solid fa-thumbs-up"
        style={{
          cursor: "pointer",
          color: `${isPostLiked ? "blue" : "black"}`,
        }}
        onClick={handlePostLike}
      ></i>
    </div>
  );
};

export default LikePost;
