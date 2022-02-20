const express = require('express');
const router = express.Router();
const EventController = require('../Controllers/event.controller');
const auth = require('../Middlewares/auth');

router.post('/create_event', auth, EventController.createEvent);
router.get('/get_all', auth, EventController.getAll)

router.get('/get_events', EventController.getCurrentEvent)
router.get('/:name', EventController.getEvent);

router.patch('/:id', auth, EventController.updateEvent)




module.exports = router;