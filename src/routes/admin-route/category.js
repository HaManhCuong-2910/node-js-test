const express = require('express');
const router = express.Router();
const categoryController = require('../../app/controllers/admin/categoryController');
const fncCommon = require('../../app/common/common');

router.post('/update', fncCommon.requiredAuth_Admin, categoryController.handUpdateCat);
router.post('/add', fncCommon.requiredAuth_Admin, categoryController.handAddCate);
router.post('/delete', fncCommon.requiredAuth_Admin, categoryController.handDeleteCate);

router.get('/', fncCommon.requiredAuth_Admin, categoryController.index);

module.exports = router;