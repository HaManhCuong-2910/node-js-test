const express = require('express');
const router = express.Router();
const testmailController = require('../../app/controllers/common/testmailController');
const upload = require('../../app/common/configUpload_CKED');

router.post('/',testmailController.sendTestMail);
router.post('/delete',testmailController.deleteFiles);
router.post('/upload',upload.any(),testmailController.uploadFiles);
router.get('/',testmailController.index);

module.exports = router;