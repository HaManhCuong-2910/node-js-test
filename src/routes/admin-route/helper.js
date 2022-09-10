const express = require('express');
const router = express.Router();
const helperController = require('../../app/controllers/admin/helperController');
const fncCommon = require('../../app/common/common');


router.get('/', fncCommon.requiredAuth_Admin, helperController.index);

module.exports = router;