import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";
import PostModel from "../Models/PostModel.js";
import { v4 as uuidv4 } from "uuid";
import { multerUnlink } from "../utils/multer.js";
// import path from "path";
// import fs from "fs";

// import { fileURLToPath } from "url";
// import { dirname } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// import { v2 as cloudinary } from "cloudinary";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, number, password } = req.body.userData;

    if (!firstName || !lastName || !email || !number || !password)
      return res
        .status(404)
        .json({ success: false, message: "All fields are required!" });

    const isEmailExists = await UserModel.find({ email });

    if (isEmailExists?.length)
      return res.status(404).json({
        success: false,
        message: "This email already exists, try different one!",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
      lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
      email,
      number,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "Registered Successfully!",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body.userData;

    if (!email || !password)
      return res
        .status(404)
        .json({ success: false, message: "Please fill all the fields!" });

    const user = await UserModel.findOne({ email });

    if (user?.email) {
      const isPasswordRight = await bcrypt.compare(password, user.password);
      if (isPasswordRight) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        const userObj = {
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          number: user.number,
          followings: user.followings,
        };

        return res.status(200).json({
          success: true,
          message: "Login Successfull!",
          token,
          user: userObj,
          followings: user.followings,
          followers: user.followers,
        });
      }

      return res
        .status(404)
        .json({ success: false, message: "Password is wrong!" });
    }

    return res
      .status(404)
      .json({ success: false, message: "Invalid credentials!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token!" });

    const userId = decodedData.userId;

    const user = await UserModel.findById(userId);

    if (user) {
      const userObj = {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        number: user.number,
        followings: user.followings,
      };

      return res.status(200).json({
        success: true,
        user: userObj,
        followings: user.followings,
        followers: user.followers,
      });
    }

    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const newUserProfileDetails = async (req, res) => {
  try {
    // console.log("Inside newUserProfileDetails");
    // console.log(req.headers, "headers");

    const token = req?.headers?.authorization?.slice(7);
    // console.log(token, "token here");

    const { bioData, coverNow, profileNow, deleteProfileImg, deleteCoverImg } =
      req.body;
    // console.log(bioData, "bio data here");
    // console.log(coverNow, "cover here");
    // console.log(profileNow, "profile here");
    // console.log(deleteProfileImg, "delete profile img");
    // console.log(deleteCoverImg, "delete cover img");
    // console.log(req.files, "files");
    // console.log(req.body, "body here");

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

    // for (const field of Object.keys(req.files)) {
    //   const file = req.files[field][0];
    //   const filePath = path.join(__dirname, "..", "uploads", file.filename);
    //   const fileExists = await fs
    //     .access(filePath)
    //     .then(() => true)
    //     .catch(() => false);

    //   if (fileExists) {
    //     multerUnlink(filePath);
    //     // continue;
    //   }
    // }

    if (
      req.files &&
      (req.files.profileImg !== undefined || req.files.coverImg !== undefined)
    ) {
      const user = await UserModel.findByIdAndUpdate(
        userId,
        {
          bioData: bioData ? bioData : "",
          profileImg: req?.files?.profileImg
            ? req?.files?.profileImg[0]?.filename
            : profileNow
            ? profileNow
            : "",
          coverImg: req?.files?.coverImg
            ? req?.files?.coverImg[0]?.filename
            : coverNow
            ? coverNow
            : "",
        },
        { new: true }
      );

      if (profileNow == undefined && deleteProfileImg) {
        multerUnlink(deleteProfileImg);
      }

      if (coverNow == undefined && deleteCoverImg) {
        multerUnlink(deleteCoverImg);
      }

      if (user) {
        const userNow = await UserModel.findById(userId);

        return res.status(200).json({
          success: true,
          profileImage: userNow.profileImg,
          coverImage: userNow.coverImg,
          bioData: userNow.bioData,
          message: "Saved your profile!",
        });
      }
    } else {
      const user = await UserModel.findByIdAndUpdate(
        userId,
        {
          bioData: bioData ? bioData : "",
          profileImg: profileNow ? profileNow : "",
          coverImg: coverNow ? coverNow : "",
        },
        { new: true }
      );

      if (profileNow == undefined && deleteProfileImg) {
        multerUnlink(deleteProfileImg);
      }

      if (coverNow == undefined && deleteCoverImg) {
        multerUnlink(deleteCoverImg);
      }

      if (user) {
        const userNow = await UserModel.findById(userId);

        return res.status(200).json({
          success: true,
          profileImage: userNow.profileImg,
          coverImage: userNow.coverImg,
          bioData: userNow.bioData,
          message: "Saved your profile!",
        });
      }
    }

    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProfileDetails = async (req, res) => {
  try {
    const { token } = req.body;

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
      return res.status(200).json({
        success: true,
        bioData: user.bioData,
        profileImg: user.profileImg,
        coverImg: user.coverImg,
      });
    }

    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProfileResult = async (req, res) => {
  try {
    const { token } = req.body;

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

    const currentUser = await UserModel.findById(userId);

    if (currentUser) {
      let userFollowers = [];
      let userFollowings = [];

      for (let i = 0; i < currentUser.followers.length; i++) {
        const follower = await UserModel.findById(currentUser.followers[i]);

        if (follower) {
          userFollowers.push(follower);
        }
      }

      for (let i = 0; i < currentUser.followings.length; i++) {
        const following = await UserModel.findById(currentUser.followings[i]);

        if (following) {
          userFollowings.push(following);
        }
      }

      const userPosts = await PostModel.find({ userId });

      return res.status(200).json({
        success: true,
        user: currentUser,
        posts: userPosts,
        followers: userFollowers,
        followings: userFollowings,
      });
    }

    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getFriendProfile = async (req, res) => {
  try {
    const { token, profileId } = req.body;

    if (!token || !profileId)
      return res
        .status(404)
        .json({ success: false, message: "Token and Profile Id is required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);

    if (user) {
      const friendProfile = await UserModel.findById(profileId);

      const friendPosts = await PostModel.find({ userId: profileId });

      let friendFollowers = [];
      let friendFollowings = [];

      for (let i = 0; i < friendProfile.followers.length; i++) {
        const follower = await UserModel.findById(friendProfile.followers[i]);

        if (follower) {
          friendFollowers.push(follower);
        }
      }

      for (let i = 0; i < friendProfile.followings.length; i++) {
        const following = await UserModel.findById(friendProfile.followings[i]);

        if (following) {
          friendFollowings.push(following);
        }
      }

      return res.status(200).json({
        success: true,
        user: friendProfile,
        posts: friendPosts,
        bioData: friendProfile.bioData,
        profileImg: friendProfile.profileImg,
        coverImg: friendProfile.coverImg,
        followers: friendFollowers,
        followings: friendFollowings,
      });
    }

    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addStory = async (req, res) => {
  try {
    const token = req?.headers?.authorization?.slice(7);

    const { caption } = req.body;

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is required!" });

    if (!caption)
      return res
        .status(404)
        .json({ success: false, message: "All Fields are required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);

    if (user) {
      if (req.file && req.file.filename) {
        const randomId = uuidv4();
        const storyId = randomId.slice(0, 10);

        const storyObj = {
          storyId,
          userId: user._id,
          profileImg: user.profileImg,
          firstName: user.firstName,
          lastName: user.lastName,
          caption,
          storyImg: req.file.filename,
          storyAddedTime: Date.now(),
        };

        user?.yourStories?.push(storyObj);
        user.isStoryAdded = true;
        await user?.save();
        return res
          .status(200)
          .json({ success: true, message: "Your Story Added!" });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "No user found!" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllStories = async (req, res) => {
  try {
    const { token, page, limit = 3 } = req.body;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitValue = parseInt(limit);

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
      const storyUsers = await UserModel.find({ isStoryAdded: true })
        .skip(skip)
        .limit(limitValue)
        .lean();

      const allStoryUsers = await UserModel.find({ isStoryAdded: true });
      const myStory = await UserModel.findById(userId);

      return res.status(200).json({
        success: true,
        storyUsers,
        limit,
        storyCount: allStoryUsers.length,
        viewUsers: allStoryUsers,
        myStory,
      });
    }

    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserStory = async (req, res) => {
  try {
    const { token, storyUserId } = req.body;

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is required!" });

    if (!storyUserId)
      return res
        .status(404)
        .json({ success: false, message: "Story Id is required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(storyUserId);

    if (user) {
      return res
        .status(200)
        .json({ success: true, userStory: user.yourStories, storyUser: user });
    }

    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteStory = async (req, res) => {
  try {
    const { token, userID } = req.body;

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is required!" });

    if (!userID)
      return res
        .status(404)
        .json({ success: false, message: "Something went wrong!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token!" });

    // const userId = decodedData?.userId;

    const user = await UserModel.findOneAndUpdate(
      { _id: userID },
      // { isStoryAdded: false },
      { yourStories: [] },
      { new: true }
    );

    if (user) {
      user.isStoryAdded = false;
      await user.save();

      const story = await UserModel.findById(user._id);
      const allStoryUsers = await UserModel.find({ isStoryAdded: true });

      return res.status(200).json({
        success: true,
        message: "Your Story Deleted!",
        myStory: story,
        userStory: story.yourStories,
        allStoryUsers,
      });
    }

    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteSingleStory = async (req, res) => {
  try {
    const { token, singleStoryId, storyImg } = req.body;

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is required!" });

    if (!singleStoryId)
      return res
        .status(404)
        .json({ success: false, message: "story Id is required!" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData)
      return res
        .status(404)
        .json({ success: false, message: "Not a valid token!" });

    const userId = decodedData?.userId;

    const user = await UserModel.findById(userId);

    if (user) {
      multerUnlink(storyImg);

      const updatedStory = await UserModel.findOneAndUpdate(
        { _id: userId },
        { $pull: { yourStories: { storyId: singleStoryId } } },
        { new: true }
      );

      if (updatedStory) {
        if (updatedStory.yourStories.length == 0) {
          user.isStoryAdded = false;
          await user.save();
        }

        const finalUpdatedstory = await UserModel.findById(user._id);
        const allStoryUsers = await UserModel.find({ isStoryAdded: true });
        return res.status(200).json({
          success: true,
          message: "story deleted!",
          myStory: finalUpdatedstory,
          userStory: finalUpdatedstory.yourStories,
          allStoryUsers,
        });
      }
    }

    return res.status(404).json({ success: false, message: "No user found!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
