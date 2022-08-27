const express = require('express');
const router = express.Router();
const inforController = require('../../app/controllers/infor/inforController');
const fncCommon = require('../../app/common/common');

router.get('/:type',inforController.getInfor);

module.exports = router;