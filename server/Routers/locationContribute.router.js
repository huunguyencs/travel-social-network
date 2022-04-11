const express = require('express');
const router = express.Router();
const LocationContributeController = require('../Controllers/locationContribute.controller');
const auth = require('../Middlewares/auth');
const authRole = require('../Middlewares/authRole');

router.post('/create', auth, authRole([2]), LocationContributeController.createLocation);
router.get('/locations/:province', LocationContributeController.getLocations);
router.get('/all', LocationContributeController.getAll)
router.get('/hot', LocationContributeController.getHotLocations);
router.get('/search', LocationContributeController.search)


router.get('/:name', LocationContributeController.getLocation);
router.patch('/:id', auth, authRole([2]), LocationContributeController.updateLocation);
router.delete('/:id', auth, authRole([2]), LocationContributeController.deleteLocation);

router.get("/:id/posts", LocationContributeController.getPosts);


module.exports = router;