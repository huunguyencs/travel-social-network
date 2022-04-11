const express = require('express');
const router = express.Router();
const EventContributeController = require('../Controllers/eventContribute.controller');
const auth = require('../Middlewares/auth');
const authRole = require('../Middlewares/authRole');

router.post('/create', auth, authRole([2]), EventContributeController.createEvent);
router.get('/all', auth, authRole([2]), EventContributeController.getAll)
router.get('/search', EventContributeController.search)

router.get('/current', EventContributeController.getCurrentEvent)
router.get('/:name', EventContributeController.getEvent);

router.patch('/:id', auth, authRole([2]), EventContributeController.updateEvent)
router.delete(':/id', auth, authRole([2]), EventContributeController.deleteEvent)




module.exports = router;