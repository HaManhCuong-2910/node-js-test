const express = require('express');
const router = express.Router();
const navController = require('../../app/controllers/user/navController');

router.get('/:type',navController.index);

module.exports = router;