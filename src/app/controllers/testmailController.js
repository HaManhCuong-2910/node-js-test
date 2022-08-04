const sendMail = require('../Email/sendMail');
require('dotenv').config();

class testSendMailController {

  async index(req, res) {
    try {
      res.render('ckeditor', {
        layout: false
      });
    }
    catch (error) {
      console.log(error);
    }

  }
  //sendTestMail
  async sendTestMail(req, res) {
    try {
      console.log(req.body.textTest);
    }
    catch (err) {
      console.log(err);
    }
  }
  //uploadFiles
  async uploadFiles(req, res) {
    try {
      console.log(req.files);
      let funcNum = req.query.CKEditorFuncNum;
      let msg = "Upload oke";
      let url = "/ckeditor_Images/" + req.files[0].filename;
      res.send('<script>window.parent.CKEDITOR.tools.callFunction("'+funcNum+'","'+url+'","'+msg+'");</script>');
    }
    catch (err) {
      console.log(err);
    }
  }
}
module.exports = new testSendMailController