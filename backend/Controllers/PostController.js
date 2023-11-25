import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";
import PostModel from "../Models/PostModel.js";
import { v4 as uuidv4 } from "uuid";

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await PostModel.find({});

    if (allPosts?.length) {
      return res.status(200).json({ success: true, allPosts });
    }

    return res.status(404).json({ success: false, message: "No Posts!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const addPost = async (req, res) => {
  try {
    const { token, postImg, caption, profileImg, userFirstName, userLastName } =
      req.body;

    //   console.log(token, postImg, caption, profileImg, userFirstName, userLastName)

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);

    if (user) {
      const newPost = new PostModel({
        image: postImg,
        caption: caption,
        userImage: profileImg,
        userId: user._id,
        userFirstName,
        userLastName,
      });

      await newPost.save();

      const allPosts = await PostModel.find({});

      return res
        .status(200)
        .json({ success: true, message: "New Post Addded!", allPosts });
    }

    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteYourPost = async (req, res) => {
  try {
    const { token, postId } = req.body;

    console.log(token, "token");
    console.log(postId, "post id");

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is required!" });

    if (!postId)
      return res
        .status(404)
        .json({ success: false, message: "Post Id is required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);

    if (user) {
      const postDeleted = await PostModel.findOneAndDelete(
        { _id: postId },
        { userId },
        { new: true }
      );

      if (postDeleted) {
        const allMyPosts = await PostModel.find({ userId });

        return res
          .status(200)
          .json({ success: true, message: "Post Deleted!", posts: allMyPosts });
      }

      return res.status(404).json({
        success: false,
        message: "Something went wrong! can't delete",
      });
    }

    return res.status(404).json({ success: false, message: "User not found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const { token, postId } = req.body;

    if (!token || !postId)
      return res
        .status(404)
        .json({ success: false, message: "All fields are required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);

    if (user) {
      const post = await PostModel.findById(postId);

      if (post) {
        return res.status(200).json({ success: true, post });
      }

      return res
        .status(404)
        .json({ success: false, message: "No post found!" });
    }

    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const likeUnlikePost = async (req, res) => {
  try {
    const { token, postId } = req.body;

    if (!postId)
      return res
        .status(404)
        .json({ success: false, message: "Post ID is required!" });

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);
    const post = await PostModel.findById(postId);

    if (post && post?.likes) {
      let flag = false;

      for (let i = 0; i < post?.likes?.length; i++) {
        if (post?.likes?.includes(user._id)) {
          flag = true;
        }
      }

      if (flag == false) {
        post?.likes?.push(user._id);
        await post.save();
        const allPosts = await PostModel.find({});
        const singlePost = await PostModel.findById(postId);
        return res.status(200).json({
          success: true,
          message: "You liked the post!",
          isPostLike: true,
          allPosts,
          singlePost,
        });
      }

      const updatedLikes = post?.likes?.filter((item) => item != user._id);
      const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { likes: updatedLikes },
        { new: true }
      );
      await updatedPost.save();
      const allPosts = await PostModel.find({});
      const singlePost = await PostModel.findById(postId);
      return res.status(200).json({
        success: true,
        message: "You unliked the post!",
        isPostLike: false,
        allPosts,
        singlePost,
      });
    }
    return res.status(404).json({ success: false, message: "No post found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { userComment, token, postId, firstName, lastName, profileImg } =
      req.body;

    if (!token || !postId)
      return res
        .status(404)
        .json({ success: false, message: "All fields are required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);

    if (user) {
      const post = await PostModel.findById(postId);

      if (post && post?.comments) {
        const randomId = uuidv4();
        const commentId = randomId.slice(0, 10);

        const commentObj = {
          userId: user._id,
          commentId,
          comment: userComment,
          firstName,
          lastName,
          profileImg,
        };

        post?.comments?.push(commentObj);
        await post.save();
        const allPosts = await PostModel.find({});
        const singlePost = await PostModel.findById(postId);
        return res.status(200).json({
          success: true,
          message: "comment added to post!",
          allPosts,
          post: singlePost,
        });
      }

      return res
        .status(404)
        .json({ success: false, message: "No post found!" });
    }
    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { token, postId, ID } = req.body;

    if (!token || !postId || !ID)
      return res
        .status(404)
        .json({ success: false, message: "All fields are required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);

    if (user) {
      const post = await PostModel.findById(postId);

      if (post && post?.comments) {
        let flag = false;

        for (let i = 0; i < post?.comments?.length; i++) {
          if (
            post?.comments[i]?.userId?.equals(user._id) &&
            post?.comments[i]?.commentId == ID
          ) {
            flag = true;
            // console.log("true reached here");
          }
        }

        if (flag == false) {
          return res.status(404).json({
            success: false,
            message: "Can't delete, Not your comment!",
          });
        }

        const filteredComments = post?.comments?.filter(
          (item) => item.commentId != ID
        );

        post.comments = filteredComments;

        await post.save();

        const singlePost = await PostModel.findById(postId);
        return res.status(200).json({
          success: true,
          message: "Your Comment Deleted!",
          post: singlePost,
        });
      }
      return res
        .status(404)
        .json({ success: false, message: "Post Not found!" });
    }
    return res.status(404).json({ success: false, message: "User not found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getEditComment = async (req, res) => {
  try {
    const { token, postId, ID } = req.body;
    // console.log(token, postId, ID);

    if (!token || !postId || !ID)
      return res
        .status(404)
        .json({ success: false, message: "All fields are required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);

    if (user) {
      const post = await PostModel.findById(postId);

      if (post && post?.comments) {
        let flag = false;

        for (let i = 0; i < post?.comments?.length; i++) {
          if (
            post?.comments[i]?.userId?.equals(user._id) &&
            post?.comments[i]?.commentId == ID
          ) {
            flag = true;
            // console.log("true edit here");
            return res.status(200).json({
              success: true,
              editComment: post?.comments[i],
              comment: post?.comments[i]?.comment,
            });
          }
        }

        if (flag == false) {
          return res.status(404).json({
            success: false,
            message: "Can't edit, Not your comment!",
          });
        }
      }

      return res
        .status(404)
        .json({ success: false, message: "Post Not found!" });
    }

    return res.status(404).json({ success: false, message: "User Not found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { token, postId, ID, updatedComment } = req.body;

    if (!token || !postId || !ID || !updatedComment)
      return res
        .status(404)
        .json({ success: false, message: "All fields are required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);

    if (user) {
      const post = await PostModel.findById(postId);

      if (post && post?.comments) {
        let flag = false;

        for (let i = 0; i < post?.comments?.length; i++) {
          if (
            post?.comments[i]?.userId?.equals(user._id) &&
            post?.comments[i]?.commentId == ID
          ) {
            flag = true;
            // console.log(post.comments[i].comment, "the comment to update!");
          }
        }

        const updatedCommentPost = await PostModel.updateOne(
          { _id: postId, "comments.commentId": ID },
          { $set: { "comments.$.comment": updatedComment } }
        );

        if (updatedCommentPost) {
          const updatedPost = await PostModel.findById(postId);
          return res.status(200).json({
            success: true,
            message: "Your Comment Updated!",
            post: updatedPost,
          });
        }

        if (flag == false) {
          return res.status(404).json({
            success: false,
            message: "Something went wrong, can't update!",
          });
        }
      }

      return res
        .status(404)
        .json({ success: false, message: "Post not found!" });
    }

    return res.status(404).json({ success: false, message: "User not found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getSearchQuery = async (req, res) => {
  try {
    const { firstName } = req.body;

    if (!firstName)
      return res
        .status(404)
        .json({ success: false, message: "Please search Something!" });

    const query = {};
    if (firstName) {
      query.firstName = { $regex: firstName, $options: "i" };
    }

    const allUsers = await UserModel.find(query);

    if (allUsers) {
      return res.status(200).json({ success: true, users: allUsers });
    }

    return res.status(404).json({ success: false, message: "No Match Found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getSearchResult = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId)
      return res
        .status(404)
        .json({ success: false, message: "User Id is required!" });

    const singleUser = await UserModel.findById(userId);
    const allPosts = await PostModel.find({ userId });

    if (singleUser)
      return res
        .status(200)
        .json({ success: true, user: singleUser, posts: allPosts });

    return res.status(404).json({ success: false, message: "No User!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
