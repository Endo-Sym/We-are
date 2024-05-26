import express from 'express';
import { createPost, getPost, deletePost, likeUnlikePost, replyToPost, getFeedPosts, getUserPosts } from './controllers/postController.js';
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();

router.post('/posts', authenticate, createPost);
router.get('/posts/:id', authenticate, getPost);
router.delete('/posts/:id', authenticate, deletePost);
router.patch('/posts/:id/like', authenticate, likeUnlikePost);
router.post('/posts/:id/reply', authenticate, replyToPost);
router.get('/feed', authenticate, getFeedPosts);
router.get('/users/:username/posts', authenticate, getUserPosts);

export default router;
