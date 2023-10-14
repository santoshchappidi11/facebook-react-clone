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
        return res.status(200).json({
          success: true,
          message: "You liked the post!",
          isPostLike: true,
        });
      }

      const updatedLikes = post?.likes?.filter((item) => item != user._id);
      const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { likes: updatedLikes },
        { new: true }
      );
      await updatedPost.save();
      return res.status(200).json({
        success: true,
        message: "You unliked the post!",
        isPostLike: false,
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
        return res
          .status(200)
          .json({ success: true, message: "comment added to post!" });
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
