const express = require('express');
const router = express.Router();
const ServiceController = require('../Controllers/service.controller');
const auth = require('../Middlewares/auth');
const authRole = require('../Middlewares/authRole');

router.post('/create_service', auth, authRole([1]), ServiceController.createService);
router.get('/services', ServiceController.getServices);
router.get('/all', ServiceController.getAll);
router.get('/get_by_coop/:id', ServiceController.getServiceByCoop)
router.get('/get_detail/:id', ServiceController.getServiceDetail)
router.get('/search', ServiceController.search)

// router.get('/user_services/:id', ServiceController.getUserService);
router.post('/review/:id', auth, ServiceController.reviewService)

router.get('/:id', ServiceController.getService);
router.patch('/:id', auth, authRole([1]), ServiceController.updateService);
router.delete('/:id', auth, authRole([1]), ServiceController.deleteService);



module.exports = router;