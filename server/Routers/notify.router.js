const express = require('express');
const router = express.Router();
const NotifyController = require('../Controllers/notify.controller');
const auth = require('../Middlewares/auth');


router.post('/create_notify', auth, NotifyController.createNotify);

router.get('/get_notifies', auth, NotifyController.getNotifies);
router.delete('/:id', auth, NotifyController.deleteNotify);

router.patch('/is_seen_notify/:id', auth, NotifyController.isSeenNotify)
router.patch('/mark_all_read', auth, NotifyController.markAllRead)
// router.patch('/:id/unlike', auth, PostController.unlikePost);




module.exports = router;