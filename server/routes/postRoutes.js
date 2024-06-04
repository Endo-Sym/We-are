const express = require('express');
const router = express.Router();
const cors = require('cors');
const {
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
    searchPosts,
    getTags,
    toggleLike
} = require('../controllers/postController.js');

router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    })
);

router.post('/posts', createPost);
router.get('/fetch', fetchPost);
router.get('/search', searchPosts);
router.delete('/posts/:id', deletePost);
router.patch('/posts/:id/like', likeUnlikePost);
router.post('/posts/:id/comment', addComment);
router.get('/comments/:id', getComments);
router.get('/feed', getFeedPosts);
router.get('/users/:username/posts', getUserPosts);
router.get('/tagPost', getTagPost);
router.get('/tags', getTags);
router.post('/toggle-like', toggleLike);

module.exports = router;
