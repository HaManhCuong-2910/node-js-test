const express = require('express');
const router = express.Router();
const chatboxController = require('../../app/controllers/common/chatboxController');
const upload = require('../../app/common/configUpload_chatBox');


router.post('/send-files',upload.any(),chatboxController.sendFiles);
router.post('/update-readchat',chatboxController.updateReadChat);
router.post('/add-chatbox',chatboxController.addChatBox);
router.post('/update-chatbox',chatboxController.updateChatBox);
router.get('/load-chatbox',chatboxController.loadChatBox);
router.get('/load-listchat',chatboxController.loadListChat);

module.exports = router;