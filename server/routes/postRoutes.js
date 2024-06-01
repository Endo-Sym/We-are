// import express from 'express';
// import { createPost, getPost, deletePost, likeUnlikePost, replyToPost, getFeedPosts, getUserPosts, getTagPost } from './controllers/postController.js';
// import protectRoute from "../middlewares/protectRoute.js";

const express = require('express');
const router = express.Router();
const cors = require('cors');
const { resourceUsage } = require('process');
const { createPost, getPost, deletePost, likeUnlikePost, addComment, getComments, getFeedPosts, getUserPosts, getTagPost, test, fetchPost } = require('../controllers/postController.js');


//middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    })
)


// router.post('/posts', authenticate, createPost);
// router.get('/posts/:id', authenticate, getPost);
// router.delete('/posts/:id', authenticate, deletePost);
// router.patch('/posts/:id/like', authenticate, likeUnlikePost);
// router.post('/posts/:id/reply', authenticate, replyToPost);
// router.get('/feed', authenticate, getFeedPosts);
// router.get('/users/:username/posts', authenticate, getUserPosts);

router.post("/", test);
router.post('/posts', createPost);
router.get('/fetch', fetchPost)
// router.get('/posts/:id', getPost);
router.delete('/posts/:id', deletePost);
router.patch('/posts/:id/like', likeUnlikePost);
router.post('/posts/:id/comment', addComment);
router.get('/comments/:id', getComments);
router.get('/feed', getFeedPosts);
router.get('/users/:username/posts', getUserPosts);

router.get('/posts/:tag', getTagPost);

module.exports = router;
