import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import {
  addStory,
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
  deleteComment,
  getAllPosts,
  getEditComment,
  getSearchQuery,
  getSearchResult,
  getSinglePost,
  likeUnlikePost,
  updateComment,
} from "./Controllers/PostController.js";

const app = express();

app.use(express.json());
dotenv.config();
app.use(cors());
app.use(morgan("dev"));

// ---------------------------------->
app.post("/register", register);
app.post("/login", login);
app.post("/get-current-user", getCurrentUser);
app.post("/new-user-profile", newUserProfileDetails);
app.post("/get-profile-details", getProfileDetails);
app.get("/get-all-posts", getAllPosts);
app.post("/add-post", addPost);
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
app.post("/add-story", addStory);
app.post("/get-all-stories", getAllStories);
app.post("/get-single-story", getUserStory);
app.post("/delete-story", deleteStory);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to DB"));

app.listen(8000, () => {
  console.log("listening on port 8000...");
});
