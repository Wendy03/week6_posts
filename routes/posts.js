const express = require('express');
const router = express.Router();
const PostsControllers = require('../controllers/posts');

router.get('/posts', PostsControllers.getPosts);
router.post('/post', PostsControllers.createPost);
router.delete('/posts', PostsControllers.deletePosts);
router.delete('/post/:id', PostsControllers.deleteOnePost);
router.patch('/post/:id', PostsControllers.editPost);

module.exports = router;
