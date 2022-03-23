const express = require('express');
const router = express.Router();
const EventController = require('../Controllers/event.controller');
const auth = require('../Middlewares/auth');
const authRole = require('../Middlewares/authRole');

router.post('/create_event', auth, authRole([2]), EventController.createEvent);
router.get('/get_all', auth, authRole([2]), EventController.getAll)
router.get('/search', EventController.search)

router.get('/get_events', EventController.getCurrentEvent)
router.get('/:name', EventController.getEvent);

router.patch('/:id', auth, authRole([2]), EventController.updateEvent)
router.delete(':/id', auth, authRole([2]), EventController.deleteEvent)




module.exports = router;