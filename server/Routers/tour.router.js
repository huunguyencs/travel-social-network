const express = require('express');
const router = express.Router();
const TourController = require('../Controllers/tour.controller');
const auth = require('../Middlewares/auth')

router.post('/create_tour',auth, TourController.createTour);
// router.get('/tours', TourController.getTours);


router.get('/user_tours/:id', TourController.getUserTour);


router.get('/:id', TourController.getTour);
router.patch('/:id', TourController.updateTour);
router.delete('/:id', TourController.deleteTour);

router.patch('/:id/like', TourController.likeTour);
router.patch('/:id/unlike', TourController.unlikeTour);


module.exports = router;