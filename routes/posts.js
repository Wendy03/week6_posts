const express = require('express');
const router = express.Router();
const PostsControllers = require('../controllers/posts');
const { isAuth, generateSendJWT } = require('../service/auth');

router.get('/posts', isAuth, PostsControllers.getPosts);
router.post('/post', isAuth, PostsControllers.createPost);

module.exports = router;
