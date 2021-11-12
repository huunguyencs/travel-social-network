const express = require('express');
const router = express.Router();
const CommentController = require('../Controllers/comment.controller');

router.post('/create_comment', auth, CommentController.createComment);

router.patch('/:id', auth, CommentController.updateComment)
router.delete('/:id', auth, CommentController.deleteComment)


router.patch('/:id/like', auth, CommentController.likeComment)

router.patch('/:id/unlike', auth, CommentController.unlikeComment)



module.exports = router;