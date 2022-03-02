const express = require('express');
const router = express.Router();
const VolunteerController = require('../Controllers/volunteer.controller');
const auth = require('../Middlewares/auth')

router.post('/create_volunteer', auth, VolunteerController.createVolunteer);
// router.post('/share', auth, VolunteerController.shareTour);
router.get('/volunteers', VolunteerController.getVolunteers);
router.get('/search', VolunteerController.search);


router.get('/:id', VolunteerController.getVolunteer);
// router.patch('/:id', auth, VolunteerController.updateVolunteer);
router.delete('/:id', auth, VolunteerController.deleteVolunteer);

module.exports = router;