import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bioData: {
    type: String,
  },
  profileImg: {
    type: String,
  },
  coverImg: {
    type: String,
  },
  postsLiked: {
    type: [String],
  },
  isBlocked: {
    type: String,
    default: false,
  },
  followers: {
    type: [String],
  },
  followings: {
    type: [String],
  },
  // friendRequests: {
  //   type: [String],
  // },
  // sentRequests: {
  //   type: [String],
  // },
  // yourFriends: {
  //   type: [String],
  // },
  yourStories: {
    type: [Object],
  },
  isStoryAdded: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", userSchema);
