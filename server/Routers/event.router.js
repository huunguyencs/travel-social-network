const express = require('express');
const router = express.Router();
const EventController = require('../Controllers/event.controller');
const auth = require('../Middlewares/auth');

router.post('/create_event', EventController.createEvent);

router.get('/get_events', EventController.getCurrentEvent)
router.get('/:name', EventController.getEvent);





module.exports = router;