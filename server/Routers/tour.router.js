const express = require('express');
const router = express.Router();
const TourController = require('../Controllers/tour.controller');
const auth = require('../Middlewares/auth')

router.post('/create_tour', auth, TourController.createTour);
router.get('/tours', TourController.getTours);


router.get('/user_tours/:id', TourController.getUserTour);


router.get('/:id', TourController.getTour);
router.patch('/:id', auth, TourController.updateTour);
router.delete('/:id', auth, TourController.deleteTour);

router.patch('/:id/like', auth, TourController.likeTour);
router.patch('/:id/unlike', auth, TourController.unlikeTour);

router.patch('/:id/join', auth, TourController.joinTour);
router.patch('/:id/unjoin', auth, TourController.unJoinTour);
router.patch('/:id/remove_join', auth, TourController.removeJoin);


module.exports = router;