const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/adminController');
const fncCommon = require('../app/common/common');

router.get('/login',adminController.login);
router.get('/',fncCommon.requiredAuth_Admin,adminController.index);

module.exports = router;