const express = require('express');
const router = express.Router();
const MessageController = require('../Controllers/message.controller');
const auth = require('../Middlewares/auth');

router.post("/create_message",auth, MessageController.createMessage);
router.get("/get_conversations",auth, MessageController.getConversations);

module.exports = router;