const express = require('express');
const router = express.Router();
const PostController = require('../Controllers/post.controller');

router.get("/posts", PostController.getPosts);


module.exports = router;