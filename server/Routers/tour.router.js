const express = require('express');
const router = express.Router();
const PostController = require('../Controllers/post.controller');

router.post('/create_post', PostController.createPost);
router.get('/posts', PostController.getPosts);


router.get('user_posts/:id', PostController.getUserPost);


router.get('/:id', PostController.getPost);
router.patch('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);

router.patch('/:id/like', PostController.likePost);
router.patch('/:id/unlike', PostController.unlikePost);




module.exports = router;