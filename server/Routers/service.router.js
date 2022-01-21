const express = require('express');
const router = express.Router();
const ServiceController = require('../Controllers/service.controller');
const auth = require('../Middlewares/auth')

router.post('/create_service', auth, ServiceController.createService);
router.get('/services', ServiceController.getServices);
router.get('/get_by_coop/:id', ServiceController.getServiceByCoop)
router.get('/get_rate/:id', ServiceController.getServiceRate)

// router.get('/user_services/:id', ServiceController.getUserService);
router.post('/review/:id', auth, ServiceController.reviewService)

router.get('/:id', ServiceController.getService);
router.patch('/:id', ServiceController.updateService);
router.delete('/:id', ServiceController.deleteService);



module.exports = router;