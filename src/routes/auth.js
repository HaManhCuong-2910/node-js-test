const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/authController');
const fncCommon = require('../app/common/common');

router.get('/logout', authController.logout);
router.get('/profile', authController.profile);
router.get('/loginUser', authController.loginUser);

module.exports = router;