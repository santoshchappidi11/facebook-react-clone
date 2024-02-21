import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
// import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { multerUpload } from "./Middlewares/MulterMiddleware.js";

// Get the current file URL--->
const currentFileURL = import.meta.url;

// Convert the file URL to a file path.--->
const currentFilePath = fileURLToPath(currentFileURL);

// Get the directory name of the current file--->
const currentDirName = dirname(currentFilePath);

import {
  addStory,
  deleteSingleStory,
  deleteStory,
  getAllStories,
  getCurrentUser,
  getFriendProfile,
  getProfileDetails,
  getProfileResult,
  getUserStory,
  login,
  newUserProfileDetails,
  register,
} from "./Controllers/UserController.js";
import {
  addComment,
  addPost,
  addVideoPost,
  deleteComment,
  deleteYourPost,
  getAllPosts,
  getEditComment,
  getFollowingPosts,
  getSearchQuery,
  getSearchResult,
  getSinglePost,
  likeUnlikePost,
  updateComment,
} from "./Controllers/PostController.js";
import { followUnfollowRequest } from "./Controllers/FriendsController.js";

const app = express();

app.use(express.json());
dotenv.config();
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
// app.use(express.static("uploads"));

app.use("/uploads", express.static(path.join(currentDirName, "uploads"))); //---->

// const upload = multer({ dest: "uploads/" });

// ----------------------------------------------->

app.get("/", (req, res) => {
  res.send("working!!!");
});

app.use((req, res, next) => {
  console.log(`Unhandled request: ${req.method} ${req.url}`);
  next();
});

app.post("/register", register);
app.post("/login", login);
app.post("/get-current-user", getCurrentUser);

app.post(
  "/new-user-profile",
  multerUpload.fields([
    { name: "profileImg", maxCount: 1 },
    { name: "coverImg", maxCount: 1 },
  ]),
  newUserProfileDetails
);
app.post("/get-profile-details", getProfileDetails);

// ------------------------------------------------>
app.get("/get-all-posts", getAllPosts);
app.post("/add-post", multerUpload.single("postImg"), addPost);
app.post("/add-video-post", multerUpload.single("postVideo"), addVideoPost);
app.post("/delete-your-post", deleteYourPost);
app.post("/like-unlike-post", likeUnlikePost);
app.post("/add-comment", addComment);
app.post("/delete-comment", deleteComment);
app.post("/get-single-post", getSinglePost);
app.post("/get-edit-comment", getEditComment);
app.post("/update-comment", updateComment);
app.post("/get-search-query", getSearchQuery);
app.post("/get-search-result", getSearchResult);
app.post("/get-profile-result", getProfileResult);
app.post("/get-friend-profile", getFriendProfile);

// -------------------------------------------------->
app.post("/add-story", multerUpload.single("storyImg"), addStory);
app.post("/get-all-stories", getAllStories);
app.post("/get-single-story", getUserStory);
app.post("/delete-story", deleteStory);
app.post("/delete-single-story", deleteSingleStory);

// -------------------------------------------------->
app.post("/send-remove-follow-request", followUnfollowRequest);
app.post("/get-following-posts", getFollowingPosts);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to DB"));

app.listen(8000, () => {
  console.log("listening on port 8000...");
});
