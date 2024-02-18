import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userImage: {
    type: String,
  },
  userFirstName: {
    type: String,
  },
  userLastName: {
    type: String,
  },
  likes: {
    type: [String],
  },
  comments: {
    type: [Object],
  },
  postedOn: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Post", postSchema);
