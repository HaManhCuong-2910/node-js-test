const express = require('express');
const router = express.Router();
const testmailController = require('../app/controllers/testmailController');

router.post('/',testmailController.sendTestMail);

module.exports = router;