const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  text: {
    type: String,
    required: true
  },
  ProfilePicture: {
    type: String
  },
  username: {
    type: String
  }
}, { timestamps: true });

const postSchema = new Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  tags: {
    type: String,
    default: ''
  },
  heading: {
    type: String,
    maxLength: 100
  },
  description: {
    type: String,
    maxLength: 600
  },
  imgUrl: {
    type: String,
    default: ''
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [commentSchema],

}, { timestamps: true });

const postLikeSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  }
});

const Post = mongoose.model("Post", postSchema);
const PostLike = mongoose.model("PostLike", postLikeSchema);

module.exports = Post, PostLike;
