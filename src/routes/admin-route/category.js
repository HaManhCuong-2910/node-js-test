const express = require('express');
const router = express.Router();
const categoryController = require('../../app/controllers/admin/categoryController');
const fncCommon = require('../../app/common/common');


router.get('/', fncCommon.requiredAuth_Admin, categoryController.index);
router.get('/:id', fncCommon.requiredAuth_Admin, categoryController.detailCat);

module.exports = router;