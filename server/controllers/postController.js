const { v2: cloudinary } = require('cloudinary');
const User = require('../Model/user');
const Post = require('../Model/post');

const test = (req, res) => {
  const { test } = req.body;
  res.json({ message: "yayyy", data: test });
};

const createPost = async (req, res) => {
  try {
    const { postedBy, tags, heading, description, imgUrl, likes, comments, shares } = req.body;

    if (!postedBy || !heading || !description) {
      return res.status(400).json({ error: "PostedBy, heading, and description fields are required" });
    }

    const user = await User.findById(postedBy);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const maxHeadingLength = 100;
    if (heading.length > maxHeadingLength) {
      return res.status(400).json({ error: `Heading must be less than ${maxHeadingLength} characters` });
    }

    const maxDescriptionLength = 500;
    if (description.length > maxDescriptionLength) {
      return res.status(400).json({ error: `Description must be less than ${maxDescriptionLength} characters` });
    }

    let imageUrl = '';
    if (imgUrl) {
      const uploadedResponse = await cloudinary.uploader.upload(imgUrl);
      imageUrl = uploadedResponse.secure_url;
    }

    const newPost = new Post({ postedBy, tags, heading, description, imgUrl: imageUrl, likes, comments, shares });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.postedBy.toString() !== req.user.userId.toString()) {
      return res.status(401).json({ error: "Unauthorized to delete post" });
    }

    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const searchPosts = async (req, res) => {
  const { query } = req.query;
  try {
    const posts = await Post.find({
      $or: [
        { tags: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { heading: { $regex: query, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error("Error searching posts:", error);
    res.status(500).send("Server Error");
  }
};

const likeUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user.userId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const userLikedPost = post.likes.includes(userId);
    if (userLikedPost) {
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      res.status(200).json({ message: "Post unliked successfully" });
    } else {
      post.likes.push(userId);
      await post.save();
      res.status(200).json({ message: "Post liked successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addComment = async (req, res) => {
  const { id } = req.params;
  const { text, userId, ProfilePicture, username } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).send('Post not found');

    const newComment = {
      userId,
      text,
      ProfilePicture,
      username
    };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Error adding comment' });
  }
};

const getComments = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate('comments.userId', 'username profilePic');
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post.comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFeedPosts = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const following = user.following;
    const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });
    res.status(200).json(feedPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserPosts = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await Post.find({ postedBy: user._id }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTagPost = async (req, res) => {
  const { tag } = req.params;
  try {
    const post = await Post.find({ tags: tag });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fetchPost = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  addComment,
  getComments,
  getFeedPosts,
  getUserPosts,
  getTagPost,
  test,
  fetchPost,
  searchPosts 
};
