const express = require('express');
const router = express.Router();
const LocationController = require('../Controllers/location.controller');
const auth = require('../Middlewares/auth');
const authRole = require('../Middlewares/authRole');

router.post('/create_location', auth, authRole([2]), LocationController.createLocation);
router.get('/locations/:province', LocationController.getLocations);
router.get('/locations', LocationController.getAll)
router.get('/get_all', auth, LocationController.getAllLocations)
router.get('/hot_locations', LocationController.getHotLocations);
router.get('/search', LocationController.search)


router.get('/:name', LocationController.getLocation);
router.patch('/:id', auth, authRole([2]), LocationController.updateLocation);
router.delete('/:id', auth, authRole([2]), LocationController.deleteLocation);

router.get("/:id/posts", LocationController.getPosts);


module.exports = router;