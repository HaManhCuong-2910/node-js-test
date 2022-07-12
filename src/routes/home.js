const express = require('express');
const path = require('path');
const router = express.Router();
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../public/imgs/'));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'-'+ file.originalname);
    }
  })
   
const upload = multer({ storage: storage })
const homeController = require('../app/controllers/homeController');

router.post('/uploadimgs',upload.any(),homeController.upload);
router.get('/',homeController.index);

module.exports = router;