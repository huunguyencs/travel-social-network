const express = require('express');
const router = express.Router();
const ProvinceController = require('../Controllers/province.controller');
const auth = require('../Middlewares/auth')

router.post('/create_province', auth, ProvinceController.createProvince);
router.get('/provinces', ProvinceController.getProvinces);

router.get('/:id', ProvinceController.getProvince);
router.patch('/:id', ProvinceController.updateProvince);
router.delete('/:id', ProvinceController.deleteProvince);


module.exports = router;