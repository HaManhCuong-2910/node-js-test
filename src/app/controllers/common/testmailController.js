const sendMail = require('../../Email/sendMail');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

class testSendMailController {

  async index(req, res) {
    try {
      res.render('client/ckeditor', {
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
  //delete files
  async deleteFiles(req, res) {
    try {
      let directory = path.join(__dirname,'../../public/ckeditor_Images');
      fs.unlink(path.join(directory, '1660189656743-error2.png'), (err) => {
        if (err) throw err;
        res.redirect('/testmail');
      });
           

      // fs.readdir(directory, (err, files) => {
      //   if (err) throw err;

        


      //   //---- delete multiple ---
      //   // for (const file of files) {
      //   //   fs.unlink(path.join(directory, file), err => {
      //   //     if (err) throw err;
      //   //   });
      //   // }
      // });
    }
    catch (err) {
      console.log(err);
    }
  }
}
module.exports = new testSendMailController