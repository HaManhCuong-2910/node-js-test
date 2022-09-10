const express = require('express');
const router = express.Router();
const adminController = require('../../app/controllers/admin/adminController');
const catRoutes = require('../admin-route/category');
const helperRoutes = require('../admin-route/helper');
const fncCommon = require('../../app/common/common');

router.post('/login', adminController.handLogin);
router.get('/login', adminController.login);


router.use('/cham-soc-khach-hang', helperRoutes);
router.use('/quan-ly-danh-muc', catRoutes);


router.get('/', fncCommon.requiredAuth_Admin, adminController.index);

module.exports = router;