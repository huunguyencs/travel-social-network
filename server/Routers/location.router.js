const express = require('express');
const router = express.Router();
const LocationController = require('../Controllers/location.controller');
const auth = require('../Middlewares/auth')

router.post('/create_location', auth, LocationController.createLocation);
router.get('/locations/:province', LocationController.getLocations);

router.get('/:id', LocationController.getLocation);
router.patch('/:id', LocationController.updateLocation);
router.delete('/:id', LocationController.deleteLocation);

router.get("/:id/posts", LocationController.getPosts);


module.exports = router;