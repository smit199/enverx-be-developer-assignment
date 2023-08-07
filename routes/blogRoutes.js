const express = require('express');
const router = express.Router();
const postsController = require('./../controllers/postsController');

router.route('/posts')
.get(postsController.getAllPosts)
.post(postsController.uploadPostImage, postsController.createPost);

router.route('/posts/:id')
.get(postsController.getPostById)
.put(postsController.uploadPostImage, postsController.updatePost)
.delete(postsController.deletePost);

module.exports = router;