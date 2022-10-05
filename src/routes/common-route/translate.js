const express = require('express');
const router = express.Router();
const transController = require('../../app/controllers/common/transController');

router.post('/',transController.index);
router.get('/change',transController.changeLang);

module.exports = router;