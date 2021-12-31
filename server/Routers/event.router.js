const express = require('express');
const router = express.Router();
const EventController = require('../Controllers/event.controller');
const auth = require('../Middlewares/auth');

router.post('/create_event', EventController.createEvent);

router.get('/:name', EventController.getEvent);
router.get('/get_events', EventController.getEvents)




module.exports = router;